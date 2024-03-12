import { NextResponse } from 'next/server';
import { ethers, JsonRpcProvider } from 'ethers';
import { abi } from '../../../lib/FaucetABI';

const ContractAddress = process.env
  .PLUME_TESTNET_FAUCET_CONTRACT_ADDRESS as string;
const provider = new JsonRpcProvider(process.env.PLUME_TESTNET_HTTP_RPC_URL);

const wallet = new ethers.Wallet(
  process.env.PLUME_TESTNET_FAUCET_PRIVATE_KEY as string,
  provider
);

export async function POST(req: Request) {
  try {
    const { walletAddress } = await req.json();
    const contract = new ethers.Contract(ContractAddress, abi, wallet);
    const faucet = await contract.sendETH(walletAddress);
    await faucet.wait();
  } catch {
    return NextResponse.json({ status: 500, title: 'Error' });
  }

  return NextResponse.json({ status: 200, title: 'Success' });
}
