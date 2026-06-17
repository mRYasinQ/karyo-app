import Icon from '@/components/common/icon';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'فضای ابری اختصاصی',
    description:
      'دسترسی سریع و امن به تمامی اطلاعات و فایل‌های تیم در هر لحظه.',
    icon: 'icon-[basil--cloud-upload-outline]',
  },
  {
    id: 2,
    title: 'پشتیبانی ۲۴ ساعته',
    description: 'تیم پشتیبانی ما همیشه آماده پاسخگویی و رفع مشکلات شماست.',
    icon: 'icon-[basil--headset-outline]',
  },
  {
    id: 3,
    title: 'شخصی‌سازی محیط',
    description:
      'امکان تطبیق کامل فرآیندها و بردها با نیازهای منحصر‌به‌فرد تیم شما.',
    icon: 'icon-[basil--edit-outline]',
  },
] as const;

const Services = () => {
  return (
    <section id="services" className="container py-40 lg:py-80">
      <div className="flex flex-col items-center gap-24 text-center">
        <h2 className="text-heading-03 lg:text-heading-02 text-gray-900">
          خدمات ما
        </h2>
        <p className="text-body-md-500 max-w-2xl text-gray-500">
          کاریو فراتر از یک ابزار ساده است؛ ما مجموعه‌ای از خدمات یکپارچه را
          برای رشد تیم شما ارائه می‌دهیم.
        </p>
      </div>

      <div className="mt-40 grid grid-cols-1 gap-24 md:grid-cols-3">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            className="group flex flex-col items-center gap-16 text-center"
          >
            <div className="group-hover:bg-primary-50 group-hover:text-primary-500 flex size-64 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-colors">
              <Icon name={service.icon} className="icon-32" />
            </div>
            <h3 className="text-body-lg-600 text-gray-900">{service.title}</h3>
            <p className="text-body-sm-400 text-gray-500">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
