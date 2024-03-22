'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { plume } from '../lib/plumeChain';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {
  bitgetWallet,
  coinbaseWallet,
  okxWallet,
  injectedWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

// Mainnet is present, because It helps plume Testnet to connect with coinbase wallet.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, plume],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://plume-testnet.rpc.caldera.xyz/http',
        webSocket: 'wss://plume-testnet.rpc.caldera.xyz/ws',
      }),
    }),
  ]
);

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      bitgetWallet({ projectId, chains }),
      coinbaseWallet({ appName: projectId, chains }),
      okxWallet({ projectId, chains }),
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
      <RainbowKitProvider chains={chains} initialChain={plume.id}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
