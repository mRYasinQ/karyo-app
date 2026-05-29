'use client';

import { usePathname } from 'next/navigation';

import Icon from '@/components/common/icon';
import Skeleton from '@/components/common/skeleton';
import Avatar from '@/components/ui/avatar';
import IconButton from '@/components/ui/icon-button';
import { useDashboard } from '@/contexts/dashboard';
import ProfileService from '@/services/profile';

import MENU_ITEMS from '../_constants/menu-items';

import { useQuery } from '@tanstack/react-query';

const Header = () => {
  const pathname = usePathname();

  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: ProfileService.getProfile,
  });

  const { toggleMobileMenu } = useDashboard();

  const pageTitle =
    MENU_ITEMS.find(({ href }) => pathname.startsWith(href))?.title ||
    'پیش‌خوان';
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'کاربر';

  return (
    <header className="flex items-center justify-between bg-white px-24 py-20">
      <h1 className="text-subheading-02 text-gray-800">{pageTitle}</h1>
      <div className="flex items-center gap-8">
        {isLoading ? (
          <Skeleton className="h-40 w-40 rounded-full" />
        ) : (
          <Avatar
            src={user?.avatar ?? '/images/avatar-placeholder.webp'}
            alt={fullName}
            fallback={fullName}
          />
        )}
        <IconButton
          variant="secondary"
          mode="ghost"
          className="lg:hidden"
          onClick={toggleMobileMenu}
        >
          <Icon name="icon-[basil--menu-solid]" />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
