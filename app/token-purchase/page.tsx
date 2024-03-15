'use client';
import NavBar from '@/components/navbar';
import IdentityVerification from '@/components/identityVerification';
import StepperBar from '@/components/stepperBar';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import DocumentSignin from '@/components/documentSignin';
import TokenPurchaseComponent from '@/components/tokenPurchase';
import ThankYou from '@/components/thankYou';
import withAuth from '@/middleware/auth';

const inter = Inter({ subsets: ['latin'] });

function TokenPurchase() {
  const [tabs, setTabs] = useState(() => {
    const savedTabs =
      typeof window !== 'undefined' ? localStorage.getItem('currentTab') : 0;

    return savedTabs ? Number(savedTabs) : 0;
  });

  const [transactionLink, setTransactionLink] = useState('');
  useEffect(() => {
    localStorage.setItem('currentTab', tabs.toString());
  }, [tabs]);

  const getStepComponent = (tabs: number) => {
    switch (tabs) {
      case 0:
        return <IdentityVerification setTabs={setTabs} />;
      case 1:
        return <DocumentSignin setTabs={setTabs} />;
      case 2:
        return (
          <TokenPurchaseComponent
            setTabs={setTabs}
            setTransactionLink={setTransactionLink}
          />
        );
      default:
        return <ThankYou transactionLink={transactionLink} />;
    }
  };
  return (
    <>
      <NavBar />
      <div
        className={`flex h-screen w-screen items-center justify-center ${inter.className}`}
      >
        <div className='hidden h-full w-1/3 md:flex'>
          <StepperBar tabs={tabs} />
        </div>
        <div className='flex h-full w-2/3 items-center justify-center'>
          {getStepComponent(tabs)}
        </div>
      </div>
    </>
  );
}

export default withAuth(TokenPurchase);
