"use client"
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, role } = useAuth()
  const router = useRouter();
  const pathname = usePathname()


  useEffect(() => {
    if (!user) {
      console.log(user,"op")
      router.push('/auth/login');
    } 
    else if(!user &&  pathname.startsWith('/auth/signup')){
      router.push('/auth/signup');
    }else if (role === 'admin' && pathname !== '/admin/dashboard') {
      router.push('/admin/dashboard');
    } else if (role === 'user' && pathname !== '/user/home') {
      router.push('/user/home');
    }
  }, [user, role, pathname, router]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
