"use client"
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, role } = useAuth()
  const router = useRouter();
  const pathname = usePathname()


  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    } 
    else if(!token &&  pathname.includes('/auth/signup')){
      router.push('/auth/signup');
    }else if (role === 'admin' && pathname !== '/admin/dashboard') {
      router.push('/admin/dashboard');
    } else if (role === 'user' && pathname !== '/user/home') {
      router.push('/user/home');
    }
  }, [token, role, pathname, router]);

  return <>{ children}</>;
};

export default ProtectedRoute;
