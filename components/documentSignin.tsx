import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';

export default function DocumentSignin({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [signedStatus, setSignedStatus] = useState('not_signed_style');
  const [signedMessage, setSignedMessage] = useState('not signed');

  const signed = async () => {
    if (signedStatus == 'not_signed_style') {
      setSignedStatus('signed_style');
      setSignedMessage('signed');
      window.open(
        'https://app.ethsign.xyz/contract/ES-V-vg3AVOp0Y1wjGok38861m',
        '_blank'
      );
    } else {
      setTabs(2);
    }
  };
  return (
    <div className='md:px-30 flex w-4/6 flex-col items-center bg-white px-52 py-52 lg:px-52 2xl:px-80  2xl:py-64'>
      <h1 className='mb-3 text-3xl font-semibold leading-9 text-[#1E1E24]'>
        Documents to Sign
      </h1>
      <h3 className='my-3 text-base font-normal leading-6 text-[#374151]'>
        Please read the documents carefully and sign them.
      </h3>
      <div className='flex w-full flex-row items-center justify-between py-12 text-sm leading-4 text-[#424242]'>
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
