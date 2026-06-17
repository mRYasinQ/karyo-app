import Link from 'next/link';

import Icon from '@/components/common/icon';

type SocialItemProps = {
  link: string;
  icon: string;
  name: string;
};

const SocialItem = ({ link, icon, name }: SocialItemProps) => {
  return (
    <Link
      href={link}
      aria-label={name}
      className="hover:text-primary-500 text-gray-400 transition-colors"
    >
      <Icon name={icon} className="icon-24" />
    </Link>
  );
};

export default SocialItem;
