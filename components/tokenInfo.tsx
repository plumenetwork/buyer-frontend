import { Button } from './ui/button';
import Image from 'next/image';

export default function TokenInfo() {
  return (
    <div className='m-0 w-full p-0'>
      <div className='my-3 flex w-full flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <Image
            src='/NFT-image.png'
            alt='NFT Image'
            width={60}
            height={80}
            className='mr-2 rounded'
          />
          <div className='text-sm font-semibold'>1x Tokenized Share</div>
        </div>
        <div className='text-sm font-medium text-gray-500'>$5,000 (USDC)</div>
      </div>
      <div className='mt-2 self-start text-xs font-medium uppercase text-gray-500'>
        Material
      </div>
      <Button
        className='my-3 flex w-full justify-between bg-[#FAFAFA] text-black hover:bg-[#efecec]'
        onClick={() => {
          window.open(
            'https://app.ethsign.xyz/signin?redirect=%2Fcontract%2FES-V-c749R8BGbo2WxWQjSfHU0',
            '_blank'
          );
        }}
      >
        Private Sample Asset Document
        <Image
          src='./link-dark-icon.svg'
          alt='Document Icon'
          width={22}
          height={22}
          className='ml-2'
        />
      </Button>
    </div>
  );
}
