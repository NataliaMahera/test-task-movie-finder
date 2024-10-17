import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="flex-grow min-w-full">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
