import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, role }:any = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else if (role === 'admin' && router.pathname !== '/admin/dashboard') {
      router.push('/admin/dashboard');
    } else if (role === 'user' && router.pathname !== '/user/home') {
      router.push('/user/home');
    }
  }, [user, role, router]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
