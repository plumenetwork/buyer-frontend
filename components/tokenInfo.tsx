import Image from 'next/image';
import { Button } from './ui/button';

export default function TokenInfo() {
  return (
    <div className='m-0 w-full p-0'>
      <div className='my-3 flex w-full flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <Image
            src={process.env.NEXT_PUBLIC_COMMEMORATIVE_TOKEN_IMAGE_URL as string}
            alt={`${process.env.NEXT_PUBLIC_COMMEMORATIVE_TOKEN_NAME} Commemorative Token Image`}
            width={60}
            height={80}
            className='mr-2 rounded'
          />
          <div className='text-sm font-semibold leading-5 text-dark-red'>
            1x Commemorative NFT
          </div>
        </div>
        <div className='text-sm font-medium text-neutral-500'>$0 (USDC)</div>
      </div>
      <div className='mt-2 self-start text-xs font-medium uppercase text-neutral-500'>
        Materials
      </div>
      <Button
        className='my-3 flex w-full justify-between bg-zinc-50 text-sm font-medium leading-4 text-dark-red hover:bg-neutral-50'
        onClick={() => {
          window.open(`${process.env.NEXT_PUBLIC_ETHSIGN_LINK}`, '_blank');
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
