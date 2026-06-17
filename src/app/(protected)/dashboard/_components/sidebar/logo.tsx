import Link from 'next/link';

import ROUTES from '@/lib/routes';

const Logo = () => {
  return (
    <Link href={ROUTES.HOME} className="text-heading-05 text-gray-900">
      کاریو
    </Link>
  );
};

export default Logo;
