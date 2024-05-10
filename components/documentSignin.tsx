'use client';

import useLocalStorage from '@/lib/useLocalStorage';
import { SignWebClient } from '@ethsign/sign-sdk';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

const contractId = process.env
  .NEXT_PUBLIC_PLUME_TESTNET_ETHSIGN_CONTRACT_ID as string;

export default function DocumentSignin({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { address: userAddress } = useAccount() as { address: string };
  const [signedStatus, setSignedStatus] = useLocalStorage(
    'signed_style',
    'not_signed_style'
  );
  const [signedMessage, setSignedMessage] = useLocalStorage(
    'signed_message',
    'not signed'
  );

  const webClient = new SignWebClient({
    getApiKey: async () => {
      const response = await fetch('/api/ethsign');
      const json = (await response.json()) as { webApiKey: string };
      return json.webApiKey;
    },
  });

  const handleContinue = () => {
    if (signedStatus === 'not_signed_style') {
      window.open(`https://app.ethsign.xyz/contract/${contractId}`, '_blank');
    } else {
      setTabs(2);
    }
  };

  const handleView = async () => {
    // const previewUrl = await webClient.generatePreviewUrl(contractId);
    const previewUrl = `https://app.ethsign.xyz/contract/${contractId}`;
    window.open(previewUrl, '_blank');
  };

  useEffect(() => {
    const checkIfSigned = async () => {
      try {
        const response = await fetch('/api/ethsign', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ userAddress }),
        });
        const data = await response.json();
        console.log(data.contractStatus.signed);
        if (data.status < 400) {
          if (data.contractStatus.signed) {
            toast({
              variant: 'pass',
              title: 'Contract Signed',
              description: 'You have successfully signed the onchain contract.',
            });
            setSignedStatus('signed_style');
            setSignedMessage('signed');
          }
        } else {
          toast({
            variant: 'fail',
            title: data.title,
            description: data.description,
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          variant: 'fail',
          title: 'Fetching Failed',
          description: 'Failed to fetch',
        });
      }
    };

    if (userAddress && signedStatus === 'not_signed_style') {
      const interval = setInterval(checkIfSigned, 500);
      return () => clearInterval(interval);
    }
  }, [userAddress, signedStatus, setTabs, setSignedStatus, setSignedMessage]);

  return (
    <div className='flex w-[575px] flex-col items-center bg-white'>
      <h1 className='mb-3 text-3xl font-semibold leading-9 text-dark-blue'>
        Documents to Sign
      </h1>
      <h3 className='my-3 text-base font-normal leading-6 text-gray-700'>
        Please read the documents carefully and sign them.
      </h3>
      <div className='flex w-full flex-row items-center justify-between py-12 text-sm leading-4 text-dark-red'>
        <div className='flex flex-row items-center'>
          <Image
            src='./document-icon.svg'
            alt='Document Icon'
            width={25}
            height={25}
            className='mr-3'
          />
          Private Sample Asset Document
        </div>
        <div>
          <p className={signedStatus}>{signedMessage}</p>
        </div>
      </div>
      <Button
        className='my-3 aspect-[12/1] w-full px-6 py-3 text-sm leading-6'
        onClick={handleContinue}
      >
        {signedStatus === 'not_signed_style' ? (
          <>
            Sign with EthSign
            <Image
              src='./link-icon.svg'
              alt='Document Icon'
              width={22}
              height={22}
              className='ml-2'
            />
          </>
        ) : (
          <p>Continue</p>
        )}
      </Button>
      {signedStatus === 'signed_style' && (
        <>
          <Button
            className='mb-3 aspect-[12/1] w-full px-6 py-3 text-sm leading-6'
            onClick={handleView}
          >
            View Contract on EthSign
            <Image
              src='./link-icon.svg'
              alt='Document Icon'
              width={22}
              height={22}
              className='ml-2'
            />
          </Button>
        </>
      )}
    </div>
  );
}
