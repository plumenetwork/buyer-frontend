'use client';

import { usePrivy, useModalStatus } from '@privy-io/react-auth';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { ready, login, authenticated } = usePrivy();
  const [modalOpen, setModalOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const { isOpen } = useModalStatus();
  const { connectModalOpen } = useConnectModal();

  useEffect(() => {
    if ((isOpen || connectModalOpen) && modalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, connectModalOpen]);

  useLayoutEffect(() => {
    if (ready && !authenticated && !isConnected) {
      login();
    }
    setContentVisible(true);
    if ((ready && authenticated) || isConnected) {
      router.push('/token-purchase');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, authenticated, isConnected]);

  const modalVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };
  if (contentVisible) {
    return (
      <>
        <motion.div
          animate={modalOpen ? 'open' : 'closed'}
          variants={modalVariants}
          className={`flex h-screen w-screen flex-row  items-center justify-center bg-neutral-50`}
        >
          <div className='flex h-[313px] w-auto flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white px-4 pb-4 pt-8'>
            <Image
              src={`${process.env.NEXT_PUBLIC_COMMEMORATIVE_TOKEN_IMAGE_URL}`}
              height={62}
              width={62}
              alt='privy-logo'
              className='mb-4'
            />
            <h1 className='self-center text-2xl font-semibold leading-9 tracking-wide text-[#292929]'>
              Log in or Sign up
            </h1>
            <h3 className='mb-6 text-sm font-medium text-neutral-500'>
              Choose one of the login options below
            </h3>
            <button
              className='mb-3 flex h-10 w-full items-start gap-2 rounded-lg border border-neutral-200 py-2 pl-4 pr-6 shadow-sm'
              onClick={() => {
                login();
              }}
            >
              <Image
                src={'/privy-logo.svg'}
                height={20}
                width={16}
                alt='privy-logo'
              />
              <div className='text-sm font-medium leading-5 text-dark-red'>
                Login with Privy
              </div>
            </button>
            <ConnectButton.Custom>
              {({ openConnectModal, authenticationStatus, mounted }) => {
                const ready = mounted && authenticationStatus !== 'loading';

                return (
                  <div
                    className='h-10 w-full rounded-lg border border-neutral-200 shadow-sm'
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
                      return (
                        <>
                          <button
                            onClick={() => {
                              openConnectModal();
                            }}
                            className='flex h-10 w-full items-start gap-2 py-2 pl-4 '
                          >
                            <Image
                              src={'/rainbowkit-logo.svg'}
                              height={20}
                              width={20}
                              alt='rainbowkit-logo'
                            />{' '}
                            <div className='text-sm font-medium leading-5 text-dark-red'>
                              {' '}
                              Login with RainbowKit
                            </div>
                          </button>
                        </>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </motion.div>
      </>
    );
  }
  return null;
}
