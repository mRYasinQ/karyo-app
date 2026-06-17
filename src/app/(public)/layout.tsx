import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

export default function PublicLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
