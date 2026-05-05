import Header from '@/components/layouts/header';

export default function MainLayout({ children }: LayoutProps<'/'>) {
  return (
    <body className="bg-white">
      <Header />
      {children}
    </body>
  );
}
