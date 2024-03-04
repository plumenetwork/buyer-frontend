import TokenInfo from './tokenInfo';
import { Button } from './ui/button';

export default function TokenPurchaseComponent({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className='flex w-4/6 flex-col items-center bg-white px-52 py-52 2xl:px-80  2xl:py-64'>
      <h1 className='text-3xl font-semibold leading-9'>Token Purchase</h1>
      <h3 className='my-4 text-base font-normal leading-6 text-gray-700'>
        Review details of your token before making the purchase.
      </h3>
      <div className='m-1 self-start text-xl font-semibold'>Item Overview</div>
      <TokenInfo />
      <Button
        onClick={() => {
          setTabs(3);
        }}
        className='my-3 h-[15%] w-full text-base hover:bg-[#EBF5FF] hover:text-[#A3A3A3]'
      >
        Purchase
      </Button>
      <Button className='h-[15%] w-full text-base hover:bg-[#EBF5FF] hover:text-[#A3A3A3]'>
        Drip Testnet Gas Tokens
      </Button>
      <p className='m-4 px-20 text-xs font-normal text-[#737373]'>
        *Copy that explicitly states that the user is minting a commemorative
        token And that minting the token shows interest in the actual mainnet
        offering
      </p>
    </div>
  );
}
