// import Image from 'next/image';
import Navbar from '@/components/navbar';
import Breadcrum from '@/components/breadcrum';
import AssetInfo from '@/components/asset-info';

export default function Home() {
  return (
    <>
      <Navbar />
      <Breadcrum />
      <AssetInfo />
      <div className='flex justify-between'>
        <div className='absolute top-0 mx-7 h-screen w-1 border-r-2 border-gray-200'></div>
        <div className='absolute right-0 top-0 mr-7 h-screen w-1 border-r-2 border-gray-200'></div>
      </div>
    </>
  );
}
