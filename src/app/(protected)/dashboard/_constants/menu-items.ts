import ROUTES from '@/lib/routes';

const MENU_ITEMS = [
  {
    title: 'پیش‌خوان',
    href: ROUTES.DASHBOARD.MAIN,
    icon: 'icon-[basil--layout-solid]',
  },
  {
    title: 'نمایه',
    href: ROUTES.DASHBOARD.PROFILE,
    icon: 'icon-[basil--user-solid]',
  },
  {
    title: 'دستگاه‌های من',
    href: ROUTES.DASHBOARD.SESSIONS,
    icon: 'icon-[basil--shield-solid]',
  },
  {
    title: 'میزکار‌های من',
    href: ROUTES.DASHBOARD.WORKSPACES.MAIN,
    icon: 'icon-[basil--rows-solid]',
  },
  {
    title: 'دعوت‌های من',
    href: ROUTES.DASHBOARD.INVITES,
    icon: 'icon-[basil--invoice-solid]',
  },
] as const;

export default MENU_ITEMS;
