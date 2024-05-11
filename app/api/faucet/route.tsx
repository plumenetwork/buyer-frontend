import { ethers, JsonRpcProvider } from 'ethers';
import { NextResponse } from 'next/server';
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
    if (!ethers.isAddress(walletAddress)) {
      return NextResponse.json({
        status: 400,
        title: 'Invalid Address',
        description:
          'The provided wallet address is not a valid Ethereum address.',
      });
    }

    const contract = new ethers.Contract(ContractAddress, abi, wallet);
    const faucet = await contract.sendETH(walletAddress);
    const response = await faucet.wait();
    const transactionHash = `https://testnet-explorer.plumenetwork.xyz/tx/${response.hash}`;
    return NextResponse.json({
      status: 200,
      title: 'Transaction Successful',
      description:
        'Your transaction has been successfully processed and recorded on the blockchain.',
      hash: transactionHash,
    });
  } catch (error: any) {
    if (error.code === 'CALL_EXCEPTION') {
      return NextResponse.json({
        status: 400,
        title: 'Contract Call Exception',
        description:
          'The transaction failed because an assertion failed in the smart contract.',
      });
    } else if (error.code === 'INSUFFICIENT_FUNDS') {
      return NextResponse.json({
        status: 400,
        title: 'Insufficient Funds',
        description:
          'The account does not have enough funds to complete the transaction.',
      });
    } else if (
      error.code === 'NONCE_EXPIRED' ||
      error.code === 'REPLACEMENT_UNDERPRICED'
    ) {
      return NextResponse.json({
        status: 409, // 409 Conflict might be more appropriate for nonce issues
        title: 'Nonce or Fee Issue',
        description:
          'There is an issue with the transaction nonce or the transaction fee is too low.',
      });
    } else if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
      return NextResponse.json({
        status: 400,
        title: 'Unpredictable Gas Limit',
        description:
          'The gas limit for the transaction could not be estimated. Try specifying a gas limit.',
      });
    } else {
      return NextResponse.json({
        status: 500,
        title: 'Internal Server Error',
        description:
          'We encountered an unexpected issue. Please try again later.',
      });
    }
  }
}
