'use client';
import { usePrivy } from '@privy-io/react-auth';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const router = useRouter();
  const { ready, login, authenticated } = usePrivy();
  useEffect(() => {
    (async () => {
      if (ready && !authenticated) {
        login();
      }
      if (ready && authenticated) {
        router.push('/token-purchase');
      }
    })();
  }, [ready, authenticated]);
  return (
    <>
      <button className='bg-true-gray-800 absolute right-8 top-8 flex items-center gap-1 rounded-md border border-gray-300 p-2 text-sm font-semibold text-gray-700'>
        <Image
          src={'/switch-networks.svg'}
          width={20}
          height={20}
          alt='Switch network Icon'
        />{' '}
        <span className={inter.className}>Switch Auth Provider</span>
      </button>
    </>
  );
}
