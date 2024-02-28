'use client';
import NavBar from '@/components/navbar';
import IdentityVerification from '@/components/identityVerification';
import StepperBar from '@/components/stepperBar';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import DocumentSignin from '@/components/documentSignin';
import TokenPurchaseComponent from '@/components/tokenPurchase';

const inter = Inter({ subsets: ['latin'] });

export default function TokenPurchase() {
  const [tabs, setTabs] = useState(0);

  return (
    <>
      <NavBar />
      <div className={`flex h-screen w-full ${inter.className}`}>
        <StepperBar tabs={tabs} />
        {tabs === 0 ? (
          <IdentityVerification setTabs={setTabs} />
        ) : tabs === 1 ? (
          <DocumentSignin setTabs={setTabs} />
        ) : (
          <TokenPurchaseComponent />
        )}
      </div>
    </>
  );
}
