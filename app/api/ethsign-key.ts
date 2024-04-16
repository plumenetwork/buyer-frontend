import { NextApiRequest, NextApiResponse } from 'next';

import { getWebApiKey } from '@/lib/ethSign-Server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractId, userAddress } = req.body;

  const webApiKey = await getWebApiKey(contractId, userAddress);

  res.status(200).json({ webApiKey });
}
