import Image from 'next/image';
import TokenInfo from './tokenInfo';
export default function ThankYou({
  transactionLink,
}: {
  transactionLink: string;
}) {
  return (
    <div className='flex w-[596px] flex-col items-center bg-white'>
      <Image src='/success.svg' alt='Thank You' width={80} height={80} />
      <h1 className='mt-6 text-center text-3xl font-semibold leading-9 text-dark-blue'>
        Thank you for minting!
      </h1>
      <h3 className='my-3 text-base font-normal leading-6 text-gray-700'>
        Your asset will appear shortly in your wallet.
      </h3>
      <div className='mb-4 flex flex-row'>
        <button
          onClick={() => {
            window.open(
              `https://plume-testnet.explorer.caldera.xyz/tx/${transactionLink}`,
              '_blank'
            );
          }}
          className='text-sm font-medium text-link-blue'
        >
          View Transaction{' '}
        </button>
        <Image
          src='/link-blue-icon.svg'
          alt='Link Icon'
          width={22}
          height={22}
        />
      </div>
      <TokenInfo />
      <div className='m-12 flex flex-col items-center'>
        <div className='mb-2 text-xs font-medium uppercase text-neutral-500'>
          Follow us
        </div>
        <div className='flex flex-row space-x-3'>
          {process.env.NEXT_PUBLIC_ISSUER_WEBSITE_URL && (
            <a
              href={`${process.env.NEXT_PUBLIC_ISSUER_WEBSITE_URL}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/website-logo.svg'
                alt='website Icon'
                width={22}
                height={22}
              />
            </a>
          )}
          {process.env.NEXT_PUBLIC_ISSUER_TWITTER_URL && (
            <a
              href={`${process.env.NEXT_PUBLIC_ISSUER_TWITTER_URL}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/twitter-logo.svg'
                alt='Twitter Icon'
                width={22}
                height={22}
              />
            </a>
          )}
          {process.env.NEXT_PUBLIC_ISSUER_LINKEDIN_URL && (
            <a
              href={`${process.env.NEXT_PUBLIC_ISSUER_LINKEDIN_URL}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/linkedin-logo.svg'
                alt='LinkedIn Icon'
                width={22}
                height={22}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
