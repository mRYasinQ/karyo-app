import localFont from 'next/font/local';

const yekanBakh = localFont({
  display: 'swap',
  fallback: ['sans-serif'],
  src: [
    {
      path: './YekanBakhFaNum-Light.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: './YekanBakhFaNum-Regular.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: './YekanBakhFaNum-SemiBold.woff2',
      style: 'normal',
      weight: '600',
    },
    {
      path: './YekanBakhFaNum-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
  ],
  variable: '--font-yekanBakh',
});

export { yekanBakh };
