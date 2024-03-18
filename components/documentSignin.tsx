'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import useLocalStorage from '@/lib/useLocalStorage';

export default function DocumentSignin({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [signedStatus, setSignedStatus] = useLocalStorage(
    'signed_style',
    'not_signed_style'
  );
  const [signedMessage, setSignedMessage] = useLocalStorage(
    'signed_message',
    'not signed'
  );

  const signed = async () => {
    if (signedStatus == 'not_signed_style') {
      setSignedStatus('signed_style');
      setSignedMessage('signed');
      window.open(`${process.env.NEXT_PUBLIC_ETHSIGN_LINK}`, '_blank');
    } else {
      setTabs(2);
    }
  };
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
        onClick={() => {
          signed();
        }}
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
    </div>
  );
}
