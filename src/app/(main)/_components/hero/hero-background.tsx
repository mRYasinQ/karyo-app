import Image from 'next/image';

const HeroBackground = () => {
  return (
    <div className="basis-1/2">
      <Image
        className="w-full object-contain"
        src="/images/hero-background.webp"
        alt="کاریو"
        width={1920}
        height={1080}
        priority
      />
    </div>
  );
};

export default HeroBackground;
