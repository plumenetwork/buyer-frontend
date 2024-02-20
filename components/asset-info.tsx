import Image from 'next/image';
import assetImage from '../public/tokenImage.png';

export default function AssetInfo() {
  return (
    <div className='mx-8 flex w-full'>
      <div className='w-2/5'>
        <Image src={assetImage} alt='token image' className='m-10 rounded-lg' />
      </div>
      <div className='w-3/5'></div>
    </div>
  );
}
