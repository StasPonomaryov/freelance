/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { useAuth } from '../context/AuthUserContext';
import classNames from 'classnames';
import Alert from './Alert';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function Layout(props) {
  const { children } = props;
  const { authUser, loading, logOut } = useAuth();
  const router = useRouter();
  const [collapsed, setSidebarCollapsed] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!loading && !authUser) router.push('/');
  }, [authUser, loading]);

  return (
    <>
      {router.pathname !== '/' ? (
        loading ? (
          <Alert
            color="blue"
            message="You have no permissions to this page"
          />
        ) : (
          <div className={`${inter.className} grid`}>
            <header className="site-header bg-white dark:bg-gray-950">
              <Navbar authUser={authUser} signOut={logOut} />
            </header>
            <div
              className={classNames({
                'grid min-h-screen': true,
                'grid-cols-sidebar': !collapsed,
                'grid-cols-sidebar-collapsed': collapsed,
                'transition-[grid-template-columns] duration-300 ease-in-out': true,
              })}
            >
              <Sidebar
                collapsed={collapsed}
                setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
                shown={showSidebar}
              />
              {children}
            </div>
            <footer className="site-footer p-2">
              &copy; Stas Ponomaryov, 2023
            </footer>
          </div>
        )
      ) : (
        children
      )}
    </>
  );
}
