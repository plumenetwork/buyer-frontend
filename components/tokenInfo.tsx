import Image from 'next/image';
import { Button } from './ui/button';

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
          <div className='text-sm font-semibold leading-5 text-[#424242]'>
            1x Commemorative NFT
          </div>
        </div>
        <div className='text-sm font-medium text-[#737373]'>$0 (USDC)</div>
      </div>
      <div className='mt-2 self-start text-xs font-medium uppercase text-[#737373]'>
        Materials
      </div>
      <Button
        className='my-3 flex w-full justify-between bg-[#FAFAFA] text-sm font-medium leading-4 text-[#424242] hover:bg-[#efecec]'
        onClick={() => {
          window.open(`${process.env.ETH_SIGNIN_LINK}`, '_blank');
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
