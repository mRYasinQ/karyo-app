import Icon from '@/components/common/icon';
import IconButton from '@/components/ui/icon-button';

import MENU_ITEMS from './_constants/menu-items';
import MenuItem from './menu-item';

import { Drawer } from '@base-ui/react';

const NavbarDrawer = () => {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger
        render={
          <IconButton variant="secondary" mode="ghost" className="lg:hidden">
            <Icon name="icon-[basil--menu-solid]" />
          </IconButton>
        }
      />

      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 bg-gray-900/20 backdrop-blur-lg transition-opacity duration-450 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0" />

        <Drawer.Viewport className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs justify-end outline-none">
          <Drawer.Popup className="h-full w-full rounded-l-xl bg-white shadow-2xl transition-transform duration-450 ease-in-out data-ending-style:translate-x-full data-starting-style:translate-x-full">
            <Drawer.Content className="flex h-full flex-col gap-32 p-24">
              <div className="flex justify-end">
                <Drawer.Close
                  render={
                    <IconButton variant="secondary" mode="ghost">
                      <Icon name="icon-[basil--cross-solid]" />
                    </IconButton>
                  }
                />
              </div>

              <ul className="flex flex-col gap-18">
                {MENU_ITEMS.map(({ link, label }) => (
                  <MenuItem key={link} link={link}>
                    {label}
                  </MenuItem>
                ))}
              </ul>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default NavbarDrawer;
