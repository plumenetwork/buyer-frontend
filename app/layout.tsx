'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import RainbowKitProviders from '../components/rainbowKitProvider';
import PrivyProviders from '@/components/privyProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <RainbowKitProviders>
          <PrivyProviders>{children}</PrivyProviders>
        </RainbowKitProviders>
      </body>
    </html>
  );
}
