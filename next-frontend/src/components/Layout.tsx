"use client"
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname=usePathname()
  const isLoginPage = pathname.includes("/auth")

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className="flex-grow">
      {!isLoginPage && <Header />}        
      <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
