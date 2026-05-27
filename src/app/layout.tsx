import type { Metadata } from 'next';

import ReactQueryProvider from '@/components/providers/react-query';
import RouteGuardProvider from '@/components/providers/route-guard';
import { AuthProvider } from '@/contexts/auth';
import { yekanBakh } from '@/lib/fonts/yekanBakh';
import { cn } from '@/lib/utils';

import '@/styles/app.css';

import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    template: '%s • کاریو',
    default: 'کاریو • ابزار مدیریت پروژه مدرن',
  },
  description:
    'کاریو یک ابزار مدیریت پروژه مدرن است که به تیم‌ها کمک می‌کند تا پروژه‌های خود را به صورت کارآمد و سازمان‌یافته مدیریت کنند. با ویژگی‌های پیشرفته و رابط کاربری ساده، کاریو به شما امکان می‌دهد تا وظایف، زمان‌بندی، و همکاری تیمی را به بهترین شکل ممکن انجام دهید.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fa-IR" dir="rtl" className={cn(yekanBakh.variable)}>
      <body className="bg-white">
        <ReactQueryProvider>
          <Toaster
            position="top-center"
            toastOptions={{ className: 'w-full max-w-410' }}
          />
          <AuthProvider>
            <RouteGuardProvider>{children}</RouteGuardProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
