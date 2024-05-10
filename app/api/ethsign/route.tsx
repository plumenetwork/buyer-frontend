import { checkContractStatus, getWebApiKey } from '@/lib/ethSign-Server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const webApiKey = await getWebApiKey();
    return NextResponse.json({
      status: 200,
      title: 'EthSign Fetch Successful',
      description: 'The EthSign API key has been successfully fetched.',
      webApiKey,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 400,
      title: 'EthSign Fetch Failed',
      description: 'The EthSign API key could not be fetched.',
    });
  }
}


export async function POST(req: Request) {
  try {
    const { userAddress } = await req.json();
    const contractStatus = await checkContractStatus(userAddress);
    return NextResponse.json({
      status: 200,
      title: 'EthSign Fetch Successful',
      description: 'The EthSign contract status has been successfully fetched.',
      contractStatus,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 400,
      title: 'EthSign Fetch Failed',
      description: 'The EthSign contract status could not be fetched.',
    });
  }
}
