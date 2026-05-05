import Link from 'next/link';

import type { PropsWithChildren } from 'react';

type MenuItemProps = { link: string } & PropsWithChildren;

const MenuItem = ({ children, link }: MenuItemProps) => (
  <li className="max-lg:w-full lg:py-32">
    <Link
      href={link}
      className="hover:text-primary text-body-md-500 inline-block w-full text-gray-700 duration-300"
    >
      {children}
    </Link>
  </li>
);

export default MenuItem;
