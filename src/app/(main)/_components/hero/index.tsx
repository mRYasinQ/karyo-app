import HeroBackground from './hero-background';
import Information from './information';

const Hero = () => {
  return (
    <section className="container mt-10 flex items-center justify-between max-lg:flex-col-reverse">
      <Information />
      <HeroBackground />
    </section>
  );
};

export default Hero;
