import type { Metadata } from 'next';

import { yekanBakh } from '@/lib/fonts/yekanBakh';
import { cn } from '@/lib/utils';

import '@/styles/app.css';

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
      <body className="bg-white">{children}</body>
    </html>
  );
}
