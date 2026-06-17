import Link from 'next/link';

import Button from '@/components/ui/button';
import ROUTES from '@/lib/routes';

const Cta = () => {
  return (
    <section className="container py-40 lg:py-80">
      <div className="bg-primary-500 flex flex-col items-center justify-between gap-24 rounded-3xl p-40 text-center lg:flex-row lg:p-64 lg:text-start">
        <div className="flex flex-col gap-12">
          <h2 className="text-heading-03 lg:text-heading-02 text-white">
            آماده‌اید تا بهره‌وری تیمتان را افزایش دهید؟
          </h2>
          <p className="text-body-md-400 text-primary-100">
            همین حالا به صورت رایگان ثبت‌نام کنید و اولین میزکار خود را بسازید.
          </p>
        </div>
        <Button
          render={<Link href={ROUTES.AUTH.REGISTER} />}
          variant="primary"
          mode="soft"
          nativeButton={false}
          className="max-sm:w-full"
        >
          شروع رایگان
        </Button>
      </div>
    </section>
  );
};

export default Cta;
