import Link from 'next/link';

type MenuItemProps = {
  link: string;
  label: string;
};

const MenuItem = ({ link, label }: MenuItemProps) => {
  return (
    <li>
      <Link
        href={link}
        className="text-body-sm-500 hover:text-primary-500 text-gray-600 transition-colors"
      >
        {label}
      </Link>
    </li>
  );
};

export default MenuItem;
