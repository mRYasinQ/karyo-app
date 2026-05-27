'use client';

import { type PropsWithChildren, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/auth';
import ROUTES from '@/lib/routes';

type AuthRoute = (typeof ROUTES.AUTH)[keyof typeof ROUTES.AUTH];

const RouteGuardProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = Object.values(ROUTES.AUTH).includes(
      pathname as AuthRoute,
    );

    const isDashboardRoute = pathname.startsWith(ROUTES.DASHBOARD.MAIN);

    if (isAuthenticated && isAuthRoute) {
      router.replace(ROUTES.DASHBOARD.MAIN);
    } else if (!isAuthenticated && isDashboardRoute) {
      router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, isLoading, pathname]);

  if (isLoading) return null;

  return children;
};

export default RouteGuardProvider;
