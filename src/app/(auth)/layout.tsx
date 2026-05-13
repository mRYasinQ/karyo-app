import Logo from './_components/logo';

export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <body className="bg-white">
      <section className="flex h-dvh w-dvw items-center justify-center">
        <div className="mx-auto flex w-full max-w-440 flex-col gap-64 rounded-lg border border-gray-200 bg-white p-32">
          <header className="flex justify-center">
            <Logo />
          </header>
          {children}
        </div>
      </section>
    </body>
  );
}
