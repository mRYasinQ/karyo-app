import type { Metadata } from 'next';
import Link from 'next/link';

import Icon from '@/components/common/icon';
import Button from '@/components/ui/button';
import ROUTES from '@/lib/routes';

export const metadata: Metadata = {
  title: 'صفحه یافت نشد',
};

export default function NotFound() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-24 bg-white text-center">
      <div className="flex flex-col items-center gap-16">
        <div className="bg-primary-50 text-primary-500 flex size-96 items-center justify-center rounded-3xl">
          <Icon name="icon-[basil--document-outline]" className="icon-48" />
        </div>
        <h1 className="text-display-02 text-gray-900">۴۰۴</h1>
        <h2 className="text-heading-03 text-gray-800">صفحه یافت نشد</h2>
        <p className="text-body-md-500 max-w-md text-gray-500">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد، آدرس آن تغییر کرده
          یا به طور موقت از دسترس خارج شده است.
        </p>
      </div>
      <Button render={<Link href={ROUTES.HOME} />} nativeButton={false}>
        بازگشت به صفحه‌اصلی
      </Button>
    </div>
  );
}
