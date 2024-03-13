'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const { ready, authenticated } = usePrivy();
    const { isConnected } = useAccount();
    useLayoutEffect(() => {
      const checkAuth = async () => {
        const isNotAuthenticated = ready && !authenticated && !isConnected;
        if (isNotAuthenticated) {
          router.replace('/');
        }
      };
      checkAuth();
    }, [ready, authenticated, isConnected]);
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
