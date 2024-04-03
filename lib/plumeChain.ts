import { defineChain, Chain } from 'viem';

export const plume = defineChain({
  id: 161221135,
  name: 'Plume',
  iconUrl: 'https://assets.plumenetwork.xyz/images/logos/plume.png',
  network: 'Plume Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://testnet-rpc.plumenetwork.xyz/http'] },
    default: { http: ['https://testnet-rpc.plumenetwork.xyz/http'] },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://testnet-explorer.plumenetwork.xyz',
    },
  },
  testnet: true,
}) satisfies Chain;
