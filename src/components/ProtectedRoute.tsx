"use client"
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, user } :any= useAuth()
  const router = useRouter();
  const pathname = usePathname()


  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    } 
    else if(!token &&  pathname.includes('/auth/signup')){
      router.push('/auth/signup');
    }else if (user.role === 'admin' && pathname !== '/admin/dashboard') {
      router.push('/admin/dashboard');
    } else if (user.role === 'user' && pathname !== '/user/home') {
      router.push('/user/home');
    }
  }, [token, user.role, pathname, router]);

  return <>{ children}</>;
};

export default ProtectedRoute;
