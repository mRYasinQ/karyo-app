import Header from '@/components/layouts/header';

export default function PublicLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
