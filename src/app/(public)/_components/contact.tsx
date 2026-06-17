import Icon from '@/components/common/icon';

const CONTACT_DETAILS = [
  {
    id: 'email',
    icon: 'icon-[basil--envelope-outline]',
    value: 'yasinabbasi.y20@gmail.com',
  },
  {
    id: 'phone',
    icon: 'icon-[basil--phone-outline]',
    value: '0930-221-9698',
    dir: 'ltr',
  },
  {
    id: 'location',
    icon: 'icon-[basil--location-outline]',
    value: 'قزوین، دانشگاه ملی‌و‌مهارت شهید بابایی',
  },
] as const;

const Contact = () => {
  return (
    <section id="contact" className="container py-40 lg:py-80">
      <div className="flex flex-col items-center gap-24 text-center">
        <h2 className="text-heading-03 lg:text-heading-02 text-gray-900">
          ارتباط با ما
        </h2>
        <p className="text-body-md-500 max-w-2xl text-gray-500">
          سوالی دارید یا نیاز به راهنمایی بیشتری هست؟ از طریق راه‌های ارتباطی
          زیر با تیم کاریو در تماس باشید.
        </p>

        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-24 sm:grid-cols-3 lg:gap-40">
          {CONTACT_DETAILS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center gap-12 rounded-2xl border border-gray-100 bg-white p-24"
            >
              <Icon name={item.icon} className="text-primary-500 icon-32" />
              <span className="text-body-md-400 text-gray-600">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
