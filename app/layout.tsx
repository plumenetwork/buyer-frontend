'use client';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <html lang='en'>
      <body className={inter.className}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
          onSuccess={() => router.push('/token-purchase')}
          config={{
            appearance: {
              accentColor: '#6A6FF5',
              theme: '#FFFFFF',
              showWalletLoginFirst: false,
              logo: '/privy.png',
            },
            loginMethods: [
              'wallet',
              'google',
              'discord',
              'github',
              'email',
              'twitter',
              'apple',
            ],
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
              requireUserPasswordOnCreate: false,
            },
            mfa: { noPromptOnMfaRequired: false },
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
