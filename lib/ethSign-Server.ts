import { SignClient } from '@ethsign/sign-sdk';
import { privateKeyToAccount } from 'viem/accounts';

const privateKey = `0x${process.env.PLUME_TESTNET_FAUCET_PRIVATE_KEY}` as `0x${string}`;
const tenantId = process.env.PLUME_TESTNET_ETHSIGN_TENANT_ID as string;
const contractId = process.env.NEXT_PUBLIC_PLUME_TESTNET_ETHSIGN_CONTRACT_ID as string;

const client = new SignClient({
  account: privateKeyToAccount(privateKey),
  tenantId: tenantId,
});

export function getWebApiKey() {
  return client.generateWebApiKey(contractId);
}

export function checkContractStatus(userAddress: string) {
  return client.checkContractStatus(
    contractId,
    userAddress
  );
}
