'use client';

import TokenInfo from './tokenInfo';
import { Button } from './ui/button';
import { abi } from '../lib/abi';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { plume } from '../lib/plumeChain';
const CONTRACT_ADDRESS = '0x1bf8e4838ec63fb2518bb35c87c20f6469d7938d';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
export default function TokenPurchaseComponent({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [TestnetToken, setTestnetToken] = useState(false);
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'mint',
    chainId: plume.id,
  });

  const { data, write } = useContractWrite(config);

  useEffect(() => {
    if (data != undefined) {
      setIsLoader(false);
      setTabs(3);
    }
  }),
    [data];

  const mintNft = async () => {
    setIsLoader(true);
    try {
      let tx = write ? write() : undefined;
      console.log(tx);
    } catch (error) {
      console.error('Error minting token', error);
    }
  };

  const getTestnetToken = async () => {
    // functionality for getting testnet token
    setTestnetToken(true);
    setTimeout(() => {
      setButtonDisabled(true);
      setTestnetToken(false);
      setRemainingTime(600);
      setInterval(() => {
        setRemainingTime((time) => {
          return time - 1;
        });
      }, 1000);
    }, 5000);
  };

  return (
    <div className='flex w-4/6 flex-col items-center bg-white px-52 py-52 2xl:px-80  2xl:py-64'>
      <h1 className='text-3xl font-semibold leading-9'>Token Purchase</h1>

      <h3 className='my-4 text-base font-normal leading-6 text-gray-700'>
        Review details of your token before making the purchase.
      </h3>
      <div className='m-1 self-start text-xl font-semibold'>Item Overview</div>
      <TokenInfo />
      <Button
        onClick={mintNft}
        className='my-3 h-[15%] w-full text-base hover:bg-[#88c4ff] hover:text-[#A3A3A3] disabled:cursor-not-allowed disabled:bg-[#EBF5FF]'
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
        className={`h-[15%] w-full text-base hover:bg-[#88c4ff] hover:text-[#A3A3A3] disabled:cursor-not-allowed disabled:bg-[#EBF5FF] disabled:text-[#A3A3A3] ${TestnetToken ? 'bg-[#47a3ff]' : 'bg-true-blue'}`}
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

      <p className='m-4 px-20 text-center text-xs font-normal text-[#737373]	'>
        *Copy that explicitly states that the user is minting a commemorative
        token And that minting the token shows interest in the actual mainnet
        offering
      </p>
    </div>
  );
}
