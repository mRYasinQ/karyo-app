import Link from 'next/link';

import Icon from '@/components/common/icon';
import { cn } from '@/lib/utils';

import type { PropsWithChildren } from 'react';

type MenuItemProps = {
  href: string;
  icon: string;
  isActive: boolean;
} & PropsWithChildren;

const MenuItem = ({ href, icon, isActive, children }: MenuItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-8 rounded-lg p-12',
        'text-caption-02! transition-all duration-300',
        {
          'hover:bg-primary-50 hover:text-primary text-gray-700': !isActive,
          'from-primary to-primary-300 shadow-primary/30 bg-linear-to-l text-white shadow-md':
            isActive,
        },
      )}
    >
      <Icon name={icon} className="icon-26" />
      {children}
    </Link>
  );
};

export default MenuItem;
