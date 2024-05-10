'use client';
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  getDefaultConfig,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import {
  bitgetWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  okxWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { plumeTestnet } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;
const { wallets } = getDefaultWallets();
const queryClient = new QueryClient();

const wagmiConfig = getDefaultConfig({
  appName: projectId,
  projectId,
  wallets: [
    ...wallets,
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet,
        metaMaskWallet,
        bitgetWallet,
        coinbaseWallet,
        okxWallet,
      ],
    },
  ],
  chains: [plumeTestnet],
});

export default function RainbowKitProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
