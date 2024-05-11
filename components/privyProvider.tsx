'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { plumeTestnet } from 'wagmi/chains';

export default function PrivyProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      onSuccess={() => router.push('/token-purchase')}
      config={{
        appearance: {
          accentColor: '#6A6FF5',
          theme: '#FFFFFF',
          showWalletLoginFirst: false,
          logo: process.env.NEXT_PUBLIC_COMMEMORATIVE_TOKEN_IMAGE_URL,
          walletList: ['metamask'],
        },
        defaultChain: plumeTestnet,
        supportedChains: [plumeTestnet],
        loginMethods: [
          'wallet',
          'google',
          'discord',
          'github',
          'email',
          'twitter',
          'apple',
        ],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
        },
        mfa: { noPromptOnMfaRequired: false },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
