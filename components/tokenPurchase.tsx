'use client';

import TokenInfo from './tokenInfo';
import { Button } from './ui/button';
import { abi } from '../lib/MintABI';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { plume } from '../lib/plumeChain';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useWallets } from '@privy-io/react-auth';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
export default function TokenPurchaseComponent({
  setTabs,
  setTransactionLink,
}: {
  setTabs: React.Dispatch<React.SetStateAction<number>>;
  setTransactionLink: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [TestnetToken, setTestnetToken] = useState(false);
  const { wallets } = useWallets();
  const { toast } = useToast();
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: 'mint',
    chainId: plume.id,
  });

  const { data, write, isError } = useContractWrite(config);

  useEffect(() => {
    if (data !== undefined || isError) {
      if (data) {
        setTransactionLink(data.hash);
        setTabs(3);
      }
      setIsLoader(false);
    }
  }, [data, isError]);

  const mintNft = async () => {
    setIsLoader(true);
    try {
      let tx = write && write();
    } catch (error) {
      console.error('Error minting token', error);
    }
  };

  const getTestnetToken = async (e: any) => {
    e.preventDefault();
    setTestnetToken(true);
    let address = '';
    if (wallets && wallets[0]) {
      address = wallets[0].address;
    }
    let response = await fetch('/api/faucet', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        walletAddress: address,
      }),
    });
    const data = await response.json();
    if (data.status < 400) {
      toast({
        variant: 'pass',
        title: data.title,
        description: (
          <>
            {data.description}
            <a
              target='_blank'
              href={data.hash}
              className='flex flex-row'
              rel='noopener noreferrer'
            >
              <span className='text-sm font-medium text-link-blue'>
                Link to the Explorer
              </span>
              <Image
                src='/link-blue-icon.svg'
                alt='Link Icon'
                width={18}
                height={18}
                className='pl-0.5'
              />
            </a>
          </>
        ),
      });
      setButtonDisabled(true);
      setTestnetToken(false);

      setRemainingTime(600);

      const interval = setInterval(() => {
        setRemainingTime((time) => {
          if (time <= 1) {
            clearInterval(interval);
            return 0;
          } else {
            return time - 1;
          }
        });
      }, 1000);
    } else {
      toast({
        variant: 'fail',
        title: data.title,
        description: data.description,
      });
      setTestnetToken(false);
    }
  };

  return (
    <div className='flex w-[575px] flex-col items-center bg-white'>
      <h1 className='text-3xl font-semibold leading-9'>Token Purchase</h1>

      <h3 className='my-4 px-16 text-center text-base font-normal leading-6 text-gray-700'>
        Review details of your token before making the purchase.
      </h3>
      <div className='self-start text-xl font-semibold leading-8 text-dark-blue'>
        Item Overview
      </div>
      <TokenInfo />
      <Button
        onClick={mintNft}
        className='my-3 aspect-[12/1] w-full text-base hover:bg-hover-blue hover:text-neutral-400 disabled:cursor-not-allowed disabled:bg-hover-blue'
        disabled={isLoader}
      >
        {isLoader ? (
          <>
            <ClipLoader color='#027DFC' loading={isLoader} size={30} />
          </>
        ) : (
          <>Purchase</>
        )}
      </Button>
      <Button
        onClick={getTestnetToken}
        className={`aspect-[12/1] w-full text-base hover:bg-hover-blue hover:text-neutral-400 disabled:cursor-not-allowed disabled:bg-hover-blue disabled:text-[rgb(163,163,163)] ${TestnetToken ? 'bg-hover-bg-blue' : 'bg-true-blue'}`}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? (
          ` Drip Testnet Gas Tokens (${Math.floor(remainingTime / 60)}m ${remainingTime % 60 < 10 ? '0' + (remainingTime % 60) : remainingTime % 60}s)`
        ) : TestnetToken ? (
          <> Getting the Testnet Tokens... </>
        ) : (
          'Drip Testnet Gas Tokens '
        )}
      </Button>

      <p className='m-4 px-10 text-center text-xs font-normal text-neutral-500'>
        You are minting a commemorative token that holds no economic value.
        These tokens do not represent real-world assets, cryptocurrency, fiat,
        or any other store of value. They are merely symbolic and serve as proof
        of participation or interest in the mainnet launch.
      </p>
    </div>
  );
}
