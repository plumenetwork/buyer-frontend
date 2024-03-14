'use client';

import { usePrivy } from '@privy-io/react-auth';
import React, { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { ready, login, authenticated } = usePrivy();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useLayoutEffect(() => {
    if (ready && !authenticated && !isConnected) {
      login();
    }
    setContentVisible(true);
    if ((ready && authenticated) || isConnected) {
      router.push('/token-purchase');
    }
  }, [ready, authenticated, isConnected]);

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    closed: {
      x: '100%',
      opacity: 0,
    },
  };
  if (contentVisible) {
    return (
      <>
        <motion.div
          animate={sidebarOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          className={`fixed right-0 top-0 z-20 h-full w-1/5 bg-white p-4`}
        >
          <div className='flex'>
            <p className='text-base font-semibold text-gray-700'>
              SELECT AUTH PROVIDER
            </p>
            <button className='ml-auto text-gray-300' onClick={toggleSidebar}>
              <Image
                src={'/cross.svg'}
                height={12.8}
                width={12.8}
                alt='cross-sidebar'
              />
            </button>
          </div>
          <div className='mt-5 flex flex-col gap-5'>
            <button
              className='flex items-center gap-3 rounded-md border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-800'
              onClick={() => {
                toggleSidebar();
                login();
              }}
            >
              <Image
                src={'/privy-logo.svg'}
                height={20}
                width={16}
                alt='privy-logo'
              />
              Privy
            </button>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={() => {
                              toggleSidebar();
                              openConnectModal();
                            }}
                            type='button'
                            className='w-full'
                          >
                            <span className='flex items-center gap-3 rounded-md border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-800'>
                              <Image
                                src={'/rainbowkit-logo.svg'}
                                height={20}
                                width={16}
                                alt='rainbowkit-logo'
                              />{' '}
                              RainbowKit
                            </span>
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type='button'>
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type='button'
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <Image
                                    src={chain.iconUrl}
                                    alt={chain.name ?? 'Chain icon'}
                                    width={12}
                                    height={12}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button onClick={openAccountModal} type='button'>
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </motion.div>
        <button
          className='absolute right-8 top-8 flex items-center gap-1 rounded-md border border-gray-300 p-2 text-sm font-semibold text-gray-700'
          onClick={toggleSidebar}
        >
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
  return null;
}
