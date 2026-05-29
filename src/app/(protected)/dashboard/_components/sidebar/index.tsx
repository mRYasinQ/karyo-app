'use client';

import { usePathname } from 'next/navigation';

import Icon from '@/components/common/icon';
import { useAuth } from '@/contexts/auth';

import MENU_ITEMS from '../../_constants/menu-items';
import Logo from './logo';
import MenuItem from './menu-item';

const Sidebar = () => {
  const pathname = usePathname();

  const { logout } = useAuth();

  return (
    <aside className="hidden w-full max-w-xs flex-col bg-white lg:flex lg:h-screen">
      <div className="flex items-center px-24 py-20">
        <Logo />
      </div>
      <nav className="flex flex-1 flex-col gap-12 overflow-y-auto px-24 py-20">
        {MENU_ITEMS.map(({ title, ...items }) => {
          const isActive = pathname.startsWith(items.href);

          return (
            <MenuItem key={items.href} {...items} isActive={isActive}>
              {title}
            </MenuItem>
          );
        })}
      </nav>
      <div className="px-24 py-20">
        <button
          type="button"
          className="text-caption-02! hover:bg-error-50 hover:text-error inline-flex w-full cursor-pointer items-center gap-8 rounded-lg p-12 text-gray-700 transition-all duration-300"
          onClick={logout}
        >
          <Icon name="icon-[basil--logout-solid]" className="icon-26" />
          خروج از حساب‌کاربری
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
