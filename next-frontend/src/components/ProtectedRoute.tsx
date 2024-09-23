import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, role }: any = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current path

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else if (role === 'admin' && pathname !== '/admin/dashboard') {
      router.push('/admin/dashboard');
    } else if (role === 'user' && pathname !== '/user/home') {
      router.push('/user/home');
    }
  }, [user, role, pathname, router]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
