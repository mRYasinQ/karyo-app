import About from './_components/about';
import Contact from './_components/contact';
import Cta from './_components/cta';
import Features from './_components/features';
import Hero from './_components/hero';
import Services from './_components/services';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Features />
      <Contact />
      <Cta />
    </main>
  );
}
