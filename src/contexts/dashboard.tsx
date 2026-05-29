'use client';

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';

interface DashboardContextType {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  return (
    <DashboardContext.Provider
      value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

export { DashboardProvider, useDashboard };
export default DashboardContext;
