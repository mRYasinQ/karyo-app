const About = () => {
  return (
    <section id="about" className="container py-40 lg:py-80">
      <div className="flex flex-col items-center gap-24 rounded-3xl bg-gray-50 p-40 text-center lg:p-64">
        <h2 className="text-heading-03 lg:text-heading-02 text-gray-900">
          درباره کاریو
        </h2>
        <p className="text-body-md-500 lg:text-body-lg-400 max-w-4xl leading-relaxed text-gray-600">
          کاریو با یک هدف ساده اما مهم متولد شد: رهایی تیم‌ها از پیچیدگی‌های
          ابزارهای مدیریت پروژه و بازگرداندن تمرکز به انجام کارها. ما باور داریم
          که محیط کار دیجیتال باید مینیمال، سریع و هوشمند باشد تا خلاقیت و
          بهره‌وری به بالاترین حد خود برسد.
        </p>
      </div>
    </section>
  );
};

export default About;
