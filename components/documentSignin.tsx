import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';

export default function DocumentSignin(props: any) {
  const [signedStatus, setSignedStatus] = useState('not_signed_style');
  const [signedMessage, setSignedMessage] = useState('not signed');

  const signed = async () => {
    if (signedStatus == 'not_signed_style') {
      setSignedStatus('signed_style');
      setSignedMessage('signed');
      window.open(
        'https://app.ethsign.xyz/signin?redirect=%2Fcontract%2FES-V-c749R8BGbo2WxWQjSfHU0',
        '_blank'
      );
    } else {
      props.setTabs(2);
    }
  };
  return (
    <div className='flex w-4/6 flex-col items-center bg-white px-52 py-52 2xl:px-80  2xl:py-64'>
      <h1 className='mb-3 text-3xl font-semibold leading-9'>
        Documents to Sign
      </h1>
      <h3 className='my-3 text-base font-normal leading-6 text-gray-700'>
        Please read carefully and sign documents.
      </h3>
      <div className='flex w-full flex-row justify-between py-12'>
        <div className='flex flex-row'>
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
          <button className={signedStatus}>{signedMessage}</button>
        </div>
      </div>
      <Button
        className='my-3 h-[10%] w-full'
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
          <>Continue</>
        )}
      </Button>
    </div>
  );
}
