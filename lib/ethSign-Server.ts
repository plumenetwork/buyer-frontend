import { privateKeyToAccount } from 'viem/accounts';

import { SignClient } from '@ethsign/sign-sdk';

export async function getWebApiKey(contractId: string, userAddress: string) {
  const privateKey = process.env
    .PLUME_TESTNET_FAUCET_PRIVATE_KEY as `0x${string}`;
  const tenantId = process.env.PLUME_TESTNET_ETHSIGN_TENANT_ID as string;

  const client = new SignClient({
    account: privateKeyToAccount(privateKey),
    tenantId: tenantId,
  });

  const contractInfo = await client.checkContractStatus(
    contractId,
    userAddress
  );

  const webApiKey = await client.generateWebApiKey(contractInfo.contractId);

  return webApiKey;
}
