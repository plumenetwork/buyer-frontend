import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';

export default function IdentityVerification(props: any) {
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const subscribeUser = async (e: any) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (inputRef.current) {
      const response = await fetch('/api/newsletter', {
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
        setStatus(data.status);
        if (data.title === 'Member Exists') {
          setMessage('You are already subscribed to our newsletter');
        } else if (data.title === 'Invalid Resource') {
          setMessage('Invalid email address');
        }
      } else {
        setStatus(201);
        //setComponent
        props.setTabs(1);
        setMessage('Thank you for subscribing');
      }

      setTimeout(() => {
        setMessage('');
        setButtonDisabled(false);
      }, 2000);
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
      {message && (
        <p
          className={`${
            status !== 201 ? 'text-red-500' : 'text-green-500'
          } pt-4 `}
        >
          {message}
        </p>
      )}
      <Button
        disabled={buttonDisabled}
        className='my-5 h-auto w-full disabled:opacity-50'
        onClick={subscribeUser}
      >
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
