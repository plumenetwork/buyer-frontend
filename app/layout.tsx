'use client';

import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <html lang='en'>
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <PrivyProvider
                appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
                onSuccess={() => router.push('/token-purchase')}
                config={{
                  appearance: {
                    accentColor: '#6A6FF5',
                    theme: '#FFFFFF',
                    showWalletLoginFirst: false,
                    logo: '/plume-logo.svg',
                  },
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
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
