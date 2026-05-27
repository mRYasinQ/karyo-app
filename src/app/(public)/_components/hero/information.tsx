import Link from 'next/link';

import Button from '@/components/ui/button';
import ROUTES from '@/lib/routes';

const Information = () => {
  return (
    <div className="flex basis-1/2 flex-col items-start gap-44">
      <div className="flex flex-col items-start gap-24">
        <span className="bg-secondary-200 text-caption-02 lg:text-caption-01 rounded-full px-24 py-12 text-gray-900">
          به کاریو خوش آمدید
        </span>
        <h1 className="text-heading-02 lg:text-display-02 text-start text-gray-900">
          مدیریت هوشمند پروژه‌ها در کاریو
        </h1>
      </div>
      <p className="text-body-md-500 lg:text-body-xtra-400 text-gray-900">
        با کاریو، تمام ابزارهای لازم برای ردیابی تسک‌ها، مدیریت تیم و گزارش‌گیری
        هوشمند را در یک فضای مینیمال در اختیار دارید. تمرکزتان را بر اهداف اصلی
        بگذارید و با سرعت بیشتری رشد کنید.
      </p>
      <div className="flex gap-16 max-lg:w-full max-lg:flex-col lg:items-center">
        <Button
          render={<Link href={ROUTES.AUTH.REGISTER} />}
          nativeButton={false}
        >
          رایگان شروع کنید
        </Button>
        <Button mode="soft">تور محصول</Button>
      </div>
    </div>
  );
};

export default Information;
