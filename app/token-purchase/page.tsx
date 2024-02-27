'use client';
import NavBar from '@/components/navbar';
import IdentityVerification from '@/components/identityVerification';
import StepperBar from '@/components/stepperBar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function TokenPurchase() {
  return (
    <>
      <NavBar />
      <div className={`flex h-screen w-full ${inter.className}`}>
        <StepperBar />
        <IdentityVerification />
      </div>
    </>
  );
}
