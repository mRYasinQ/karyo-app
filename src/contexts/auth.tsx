'use client';

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

import ROUTES from '@/lib/routes';
import toast from '@/lib/toast';
import AuthService from '@/services/auth';

type LoginOptions = { redirect?: string; hasToast?: boolean };
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, options?: LoginOptions) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const login = (token: string, options?: LoginOptions) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    router.push(options?.redirect ?? ROUTES.DASHBOARD.MAIN);
    if (options?.hasToast !== false) toast.success('با موفقیت وارد شدید.');
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      router.push(ROUTES.HOME);
      toast.success('شما با موفقیت از حساب خود خارج شدید.');
    } catch {
      toast.error('مشکلی در خروج از حساب وجود داشت.');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export { AuthProvider, useAuth };
export default AuthContext;
