import Link from 'next/link';

export default function Breadcrum() {
  return (
    <nav className='bg-gray-25 border-2 border-solid border-gray-200 px-16'>
      <div className='flex h-16 items-center'>
        <div className='flex items-baseline space-x-4'>
          <span className='text-gray-500'>Project /</span>
          <span className='text-gray-950'>Tokenized Asset</span>
        </div>
      </div>
    </nav>
  );
}
