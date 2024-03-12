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
        if (data.title === 'Member Exists') {
          toast({
            variant: 'fail',
            title: data.title,
            description: 'You are an existing member',
          });
        } else if (data.title === 'Invalid Email Address') {
          toast({
            variant: 'fail',
            title: data.title,
            description: data.description,
          });
        } else if (data.title === 'Internal Server Error') {
          toast({
            variant: 'fail',
            title: data.title,
            description: data.description,
          });
        }
      } else {
        setTabs(1);
      }

      setTimeout(() => {
        setButtonDisabled(false);
      }, 2000);
    }
  };
  return (
    <div className='flex w-[575px] flex-col items-center bg-white'>
      <h1 className='m-6 text-3xl font-semibold text-[#1E1E24]'>
        Identity Verification
      </h1>
      <h3 className='mb-8 text-center text-base font-normal leading-6 text-[#374151]'>
        Please enter your email to continue. You will be notified when the real
        asset launches to be first in line to purchase it.
      </h3>
      <p className='mb-2 self-start text-sm font-medium'>Email Address</p>
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
        onClick={subscribeUser}
      >
        Continue
      </Button>
      <p className='mt-5 text-center text-xs font-normal text-[#737373]'>
        To purchase this real-world asset on mainnet, you will have to undergo a
        Know Your Customer (KYC) process with an external provider. This will
        involve sending personal information like your name, date of birth, and
        government ID to a third-party company that will verify your information
        and eligibility for purchasing this asset.
      </p>
    </div>
  );
}
