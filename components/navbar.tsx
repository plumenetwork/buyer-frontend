'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useChainModal } from '@rainbow-me/rainbowkit';
import makeBlockie from 'ethereum-blockies-base64';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAccount, useChainId, useDisconnect } from 'wagmi';
import { plumeTestnet } from 'wagmi/chains';

function shortenAddress(address: string) {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 5)}...${address.slice(-3)}`;
}

function customizeAddress(address: string) {
  if (!address || address.length < 18) return address;
  return `${address.slice(0, 18)}...`;
}

export default function NavBar() {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  const { wallets } = useWallets();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [blockie, setBlockie] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const { openChainModal, chainModalOpen } = useChainModal();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { toast } = useToast();

  const getAddressAndGenerateBlockie = (userAddress: any) => {
    setUserAddress(userAddress);
    const generatedBlockie = makeBlockie(userAddress);
    setBlockie(generatedBlockie);
  };

  useLayoutEffect(() => {
    let userAddress = '';
    if (ready && authenticated && wallets && wallets[0]) {
      userAddress = wallets[0].address;
      getAddressAndGenerateBlockie(userAddress);
    }

    if (ready && authenticated && chainId != plumeTestnet.id) {
      (async () => {
        try {
          await wallets[0]?.switchChain?.(plumeTestnet.id);
        } catch {
          toast({
            variant: 'fail',
            title: 'wallet address changed from Plume.',
            description: 'Please set it back to Plume Network',
          });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets, ready, authenticated]);

  useLayoutEffect(() => {
    let userAddress = '';
    if (isConnected && address) {
      userAddress = address;
      getAddressAndGenerateBlockie(userAddress);
    }
  }, [address, isConnected]);

  useEffect(() => {
    if (isConnected && address && chainId != plumeTestnet.id) {
      openChainModal?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, chainModalOpen]);

  const logoutHandler = () => {
    if (ready && authenticated) {
      logout().then(() => {
        localStorage.removeItem('currentTab');
        localStorage.removeItem('signed_style');
        localStorage.removeItem('signed_message');
      });
    }
    if (isConnected) {
      disconnect();
      localStorage.removeItem('currentTab');
      localStorage.removeItem('signed_style');
      localStorage.removeItem('signed_message');
      localStorage.removeItem('txLink');
    }

    router.replace('/');
  };
  return (
    <div className='absolute right-8 top-6 flex flex-row items-center justify-center'>
      <div className='mr-3 flex flex-row items-center justify-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-neutral-500'>
        <span className='me-1 flex h-2 w-2 rounded-full bg-pill-green'></span>
        <span className='text-xs font-medium leading-5'>Plume Testnet</span>
      </div>
      <DropdownMenu
        onOpenChange={(open) => {
          setIsDropDownOpen(open);
        }}
      >
        <DropdownMenuTrigger className='flex items-center justify-center gap-2 rounded-xl p-2 data-[state=closed]:border-2 data-[state=open]:border-2 data-[state=closed]:border-neutral-200 data-[state=open]:border-dropdown-blue'>
          <div className='items-center justify-center text-sm text-white'>
            <Image
              src={blockie !== '' ? blockie : '/profile-placeholder.svg'}
              width={24}
              height={24}
              className='rounded-full'
              alt='profile-avatar'
            />
          </div>
          <div className='flex flex-row items-center justify-center gap-0.5 text-sm font-semibold text-neutral-600'>
            <div>{shortenAddress(userAddress)}</div>
            <div>
              {isDropDownOpen ? (
                <Image
                  src={'/chevron-up.svg'}
                  width={20}
                  height={20}
                  alt='copy-icon'
                />
              ) : (
                <Image
                  src={'/chevron-down.svg'}
                  width={20}
                  height={20}
                  alt='copy-icon'
                />
              )}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-[240px] rounded-md p-0 shadow-lg'
        >
          <div className='px-4 py-3'>
            <DropdownMenuLabel className='m-0 p-0 text-xs font-medium leading-[18px] text-neutral-400'>
              WALLET ID
            </DropdownMenuLabel>
            <DropdownMenuLabel className='m-0 p-0 text-sm font-medium text-dark-red'>
              <button
                onClick={() => {
                  toast({
                    variant: 'pass',
                    title: 'Wallet address successfully copied.',
                  });
                  navigator.clipboard.writeText(userAddress);
                }}
                className='flex flex-row items-center justify-between gap-2'
              >
                <div>{customizeAddress(userAddress)}</div>
                <Image
                  src={'/copy-icon.svg'}
                  width={16}
                  height={16}
                  alt='copy-icon'
                />
              </button>
            </DropdownMenuLabel>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='py-1'>
            <button
              onClick={logoutHandler}
              className='flex w-full items-center justify-start rounded-sm px-2 py-2 text-sm font-medium text-dark-red '
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
    </div>
  );
}
