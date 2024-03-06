'use client';
import NavBar from '@/components/navbar';
import IdentityVerification from '@/components/identityVerification';
import StepperBar from '@/components/stepperBar';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import DocumentSignin from '@/components/documentSignin';
import TokenPurchaseComponent from '@/components/tokenPurchase';
import ThankYou from '@/components/thankYou';
import withAuth from '@/middleware/auth';

const inter = Inter({ subsets: ['latin'] });

function TokenPurchase() {
  const [tabs, setTabs] = useState(0);

  const getStepComponent = (tabs: number) => {
    switch (tabs) {
      case 2:
        return <IdentityVerification setTabs={setTabs} />;
      case 1:
        return <DocumentSignin setTabs={setTabs} />;
      case 0:
        return <TokenPurchaseComponent setTabs={setTabs} />;
      default:
        return <ThankYou />;
    }
  };
  return (
    <>
      <NavBar />
      <div className={`flex h-screen w-full ${inter.className}`}>
        <StepperBar tabs={tabs} />
        {getStepComponent(tabs)}
      </div>
    </>
  );
}

export default withAuth(TokenPurchase);
