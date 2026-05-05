'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import Button from '@/components/ui/button';
import ROUTES from '@/lib/routes';

import MENU_ITEMS from './_constants/menu-items';
import MenuItem from './menu-item';

const NavbarDrawer = dynamic(() => import('./navbar-drawer'), {
  ssr: false,
});

const Navbar = () => {
  return (
    <nav className="flex items-center gap-32">
      <ul className="flex items-center gap-32 max-lg:hidden">
        {MENU_ITEMS.map(({ link, label }) => (
          <MenuItem key={link} link={link}>
            {label}
          </MenuItem>
        ))}
      </ul>
      <Button
        className="max-lg:hidden"
        render={<Link href={ROUTES.AUTH.REGISTER} />}
        nativeButton={false}
      >
        شروع کنید!
      </Button>
      <NavbarDrawer />
    </nav>
  );
};

export default Navbar;
