'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useAccount, useDisconnect } from 'wagmi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import makeBlockie from 'ethereum-blockies-base64';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

function shortenAddress(address: string) {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 5)}...${address.slice(-3)}`;
}

function customizeAddress(address: string) {
  if (!address || address.length < 15) return address;
  return `${address.slice(0, 15)}...${address.slice(-2)}`;
}

export default function NavBar() {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  const { wallets } = useWallets();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [blockie, setBlockie] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const getAddressAndGenerateBlockie = () => {
    let address = '';
    if (wallets && wallets[0]) {
      address = wallets[0].address;
    }
    if (address !== '') {
      setUserAddress(address);
      const generatedBlockie = makeBlockie(address);
      setBlockie(generatedBlockie);
    }
  };

  useEffect(() => {
    getAddressAndGenerateBlockie();
  }, [wallets]);

  const logoutHandler = async () => {
    if (ready && authenticated) {
      await logout();
    }

    if (isConnected) {
      disconnect();
    }
    router.push('/');
  };
  return (
    <div className='absolute right-8 top-6 flex flex-row items-center justify-center'>
      <div className='mr-3 flex flex-row items-center justify-center rounded-full bg-[#F5F5F5] p-2 text-xs font-medium text-[#737373]'>
        <span className='me-3 flex h-3 w-3 rounded-full bg-green-500'></span>
        Plume Testnet
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center justify-center rounded-xl border-2 border-gray-300 p-2'>
          <div className='items-center justify-center text-sm text-white'>
            <Image
              src={blockie !== '' ? blockie : '/profile-placeholder.svg'}
              width={32}
              height={32}
              className='mx-2 rounded-full'
              alt='profile-avatar'
            />
          </div>
          <div className='text-xm pt-1 font-semibold text-gray-700'>
            {shortenAddress(userAddress)}
          </div>
          <div>
            {
              <Image
                src={'/chevron-down.svg'}
                width={20}
                height={20}
                className='ml-1'
                alt='copy-icon'
              />
            }
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className='pb-0 text-xs text-gray-400'>
            WALLET ID
          </DropdownMenuLabel>
          <DropdownMenuLabel className='pt-1 text-base font-medium text-gray-700'>
            <button
              onClick={() => {
                toast('Copied to Clipboard', {
                  action: {
                    label: 'X',
                    onClick: () => console.log('Undo'),
                  },
                });
                navigator.clipboard.writeText(userAddress);
              }}
              className='flex items-center'
            >
              {customizeAddress(userAddress)}
              <Image
                src={'/copy-icon.svg'}
                width={16}
                height={16}
                className='ml-2'
                alt='copy-icon'
              />
            </button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              onClick={logoutHandler}
              className='flex items-center font-medium text-gray-700 '
            >
              <Image
                src={'/logout.svg'}
                width={16}
                height={16}
                className='mr-2'
                alt='copy-icon'
              />{' '}
              Log out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </div>
  );
}
