'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function IdentityVerification({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const subscribeUser = async (e: any) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (inputRef.current) {
      const response = await fetch('/api/subscribe', {
        body: JSON.stringify({
          email: inputRef.current.value,
        }),

        headers: {
          'Content-Type': 'application/json',
        },

        method: 'POST',
      });
      const data = await response.json();

      if (data.status >= 400) {
        toast({
          variant: 'fail',
          title: data.title,
          description: data.description,
        });
      } else {
        setTabs(1);
      }
      setButtonDisabled(false);
    }
  };
  return (
    <div className='flex w-[575px] max-w-[640px] flex-col items-center bg-white'>
      <h1 className='m-6 text-3xl font-semibold text-dark-blue'>
        Identity Verification
      </h1>
      <h3 className='mb-8 text-center text-base font-normal leading-6 text-gray-700'>
        Please enter your email to continue. You will be notified when the real
        asset launches to be first in line to purchase it.
      </h3>
      <p className='mb-2 self-start text-sm font-medium'>Email Address</p>
      <form
        className='m-0 w-[575px] max-w-[640px] p-0'
        onSubmit={subscribeUser}
      >
        <Input
          ref={inputRef}
          required
          type='email'
          placeholder='example@email.com'
          autoCorrect='off'
        />
        <Button
          disabled={buttonDisabled}
          className='my-5 aspect-[10/1] w-full disabled:opacity-50'
          type='submit'
        >
          Continue
        </Button>
      </form>
      <p className='mt-5 text-center text-xs font-normal text-neutral-500'>
        To purchase this real-world asset on mainnet, you will have to undergo a
        Know Your Customer (KYC) process with an external provider. This will
        involve sending personal information like your name, date of birth, and
        government ID to a third-party company that will verify your information
        and eligibility for purchasing this asset.
      </p>
    </div>
  );
}
