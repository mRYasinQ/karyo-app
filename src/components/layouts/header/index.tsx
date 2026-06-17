import Logo from '@/components/common/logo';

import Navbar from './navbar';

const Header = () => {
  return (
    <header className="container flex items-center justify-between py-8">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
