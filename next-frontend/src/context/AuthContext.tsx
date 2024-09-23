// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

type AuthContextType = {
  user: string | null;
  role: 'admin' | 'user' | null;
  login: (token: string, role: 'admin' | 'user') => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check token and role on mount
    const token = Cookies.get('token');
    const userRole = Cookies.get('role');

    if (token && userRole) {
      setUser(token);
      setRole(userRole as 'admin' | 'user');
    } else {
      router.push('/auth/login');
    }
  }, []);

  const login = (token: string, userRole: 'admin' | 'user') => {
    Cookies.set('token', token);
    Cookies.set('role', userRole);
    setUser(token);
    setRole(userRole);

    // Redirect based on role
    if (userRole === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/user/home');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setUser(null);
    setRole(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
