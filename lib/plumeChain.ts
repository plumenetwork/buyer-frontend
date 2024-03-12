import { Chain } from 'wagmi';

export const plume = {
  id: 161221135,
  name: 'Plume',
  network: 'Plume Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://plume-testnet.rpc.caldera.xyz/http'] },
    default: { http: ['https://plume-testnet.rpc.caldera.xyz/http'] },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://plume-testnet.explorer.caldera.xyz',
    },
  },
  testnet: true,
} as const satisfies Chain;
