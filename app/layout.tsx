import PrivyProviders from '@/components/privyProvider';
import { Toaster } from '@/components/ui/toaster';
import '@rainbow-me/rainbowkit/styles.css';
import { Inter } from 'next/font/google';
import RainbowKitProviders from '../components/rainbowKitProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Toaster />
        <RainbowKitProviders>
          <PrivyProviders>{children}</PrivyProviders>
        </RainbowKitProviders>
      </body>
    </html>
  );
}
