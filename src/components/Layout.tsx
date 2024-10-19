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
      <main className="flex-grow w-[99vw] overflow-x-hidden min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
