'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bsc, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import binanceWallet from '@binance/w3w-rainbow-connector';
import {
  bitgetWallet,
  foxWallet,
  trustWallet,
  rabbyWallet,
  okxWallet,
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc, mainnet],
  [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      bitgetWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      okxWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      foxWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      rabbyWallet({ chains }),
      binanceWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function RainbowKitProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
