import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export function withAuth(WrappedComponent: React.ComponentType) {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const session = supabase.auth.session();
        if (!session) {
          router.push('/login');
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };
}