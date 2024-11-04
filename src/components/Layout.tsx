import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className="flex-1 w-full md:pt-24">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
