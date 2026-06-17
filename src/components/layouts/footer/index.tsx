import Logo from '@/components/common/logo';

import MENU_ITEMS from '../_constants/menu-items';
import MenuItem from './menu-item';
import SocialItem from './social-item';

const SOCIAL_ITEMS = [
  {
    name: 'Instagram',
    link: '#',
    icon: 'icon-[basil--instagram-solid]',
  },
  {
    name: 'Telegram',
    link: 'https://t.me/mRYasinQ',
    icon: 'icon-[basil--telegram-solid]',
  },
  {
    name: 'LinkedIn',
    link: '#',
    icon: 'icon-[basil--linkedin-solid]',
  },
] as const;

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white pt-40 pb-24">
      <div className="container flex flex-col gap-40">
        <div className="flex flex-col items-start justify-between gap-24 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-16">
            <Logo />
            <p className="text-body-sm-400 max-w-sm text-gray-600">
              کاریو؛ پلتفرم مینیمال و هوشمند مدیریت پروژه‌ها و وظایف تیمی برای
              کسب‌وکارهای مدرن.
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-24">
            {MENU_ITEMS.map((item) => (
              <MenuItem key={item.link} {...item} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-between gap-16 border-t border-gray-100 pt-24 lg:flex-row">
          <span className="text-caption-02 text-gray-400">
            تمامی حقوق برای کاریو محفوظ است.
          </span>
          <div className="flex items-center gap-16">
            {SOCIAL_ITEMS.map((social) => (
              <SocialItem key={social.name} {...social} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
