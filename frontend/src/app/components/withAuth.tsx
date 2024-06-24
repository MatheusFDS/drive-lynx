// components/withAuth.tsx

import { ComponentType } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

const withAuth = <T extends {}>(Component: ComponentType<T>) => {
  const AuthenticatedComponent = (props: T) => {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
      router.push('/login');
      return null;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
