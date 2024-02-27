import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export default function IdentityVerification() {
  const inputRef = useRef<HTMLInputElement>(null);
  const subscribeUser = async (e: any) => {
    e.preventDefault();

    if (inputRef.current) {
      const res = await fetch('/api/newsletter', {
        body: JSON.stringify({
          email: inputRef.current.value,
        }),

        headers: {
          'Content-Type': 'application/json',
        },

        method: 'POST',
      });
    }
  };
  return (
    <div className='flex w-4/6 flex-col items-center bg-white px-52 py-52 2xl:px-80  2xl:py-64'>
      <h1 className='m-6 text-3xl font-semibold text-black'>
        Identity Verification
      </h1>
      <h3 className='mb-8 text-center text-base text-gray-700'>
        Please enter your email into the following box if you would like to
        continue, and be notified of the final launch of this asset on mainnet.
      </h3>
      <p className='mb-2 self-start text-sm font-medium'>Email Address</p>
      <Input
        ref={inputRef}
        required
        type='email'
        placeholder='example@email.com'
        autoCorrect='off'
      />
      <Button className='my-5 h-auto w-full' onClick={subscribeUser}>
        Continue
      </Button>
      <p className='mt-5 text-center text-sm text-gray-500'>
        To purchase this real-world asset on mainnet, you will have to undergo a
        Know Your Customer (KYC) process with an external provider. This will
        involve sending personal information like your name, date of birth, and
        government ID to a third-party company that will verify your information
        and eligibility for purchasing this asset.
      </p>
    </div>
  );
}
