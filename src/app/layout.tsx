import type { Metadata } from 'next';

import '@/styles/globals.css';

import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s • کاریو',
    default: 'کاریو • ابزار مدیریت پروژه مدرن',
  },
  description:
    'کاریو یک ابزار مدیریت پروژه مدرن است که به تیم‌ها کمک می‌کند تا پروژه‌های خود را به صورت کارآمد و سازمان‌یافته مدیریت کنند. با ویژگی‌های پیشرفته و رابط کاربری ساده، کاریو به شما امکان می‌دهد تا وظایف، زمان‌بندی، و همکاری تیمی را به بهترین شکل ممکن انجام دهید.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
