import Icon from '@/components/common/icon';

const FEATURES_DATA = [
  {
    id: 1,
    title: 'مدیریت یکپارچه وظایف',
    description: 'تسک‌های خود را به سادگی ایجاد، دسته‌بندی و پیگیری کنید.',
    icon: 'icon-[basil--box-solid]',
  },
  {
    id: 2,
    title: 'همکاری تیمی آسان',
    description:
      'اعضای تیم را به میزکار دعوت کنید و با هم روی پروژه‌ها کار کنید.',
    icon: 'icon-[basil--stack-solid]',
  },
  {
    id: 3,
    title: 'گزارش‌گیری هوشمند',
    description:
      'روند پیشرفت پروژه‌ها را با نمودارها و گزارش‌های دقیق تحلیل کنید.',
    icon: 'icon-[basil--chart-pie-outline]',
  },
] as const;

const Features = () => {
  return (
    <section id="features" className="container py-40 lg:py-80">
      <div className="flex flex-col items-center gap-24 text-center">
        <h2 className="text-heading-03 lg:text-heading-02 text-gray-900">
          ویژگی‌های کلیدی کاریو
        </h2>
        <p className="text-body-md-500 max-w-2xl text-gray-500">
          هر آنچه برای مدیریت بهتر، سریع‌تر و هوشمندتر پروژه‌هایتان نیاز دارید،
          در یک پلتفرم جمع‌آوری شده است.
        </p>
      </div>

      <div className="mt-40 grid grid-cols-1 gap-24 md:grid-cols-3">
        {FEATURES_DATA.map((feature) => (
          <div
            key={feature.id}
            className="hover:border-primary-500 flex flex-col items-start gap-16 rounded-2xl border border-gray-100 bg-white p-24 transition-colors"
          >
            <div className="bg-primary-50 text-primary-500 flex size-48 items-center justify-center rounded-xl">
              <Icon name={feature.icon} className="icon-24" />
            </div>
            <h3 className="text-body-lg-600 text-gray-900">{feature.title}</h3>
            <p className="text-body-sm-400 text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
