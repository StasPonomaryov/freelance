/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { useAuth } from '../context/AuthUserContext';
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
        <div className={`${inter.className} wrapper bg-amber-200 dark:bg-gray-800 min-h-screen`}>
          <header className={'site-header p-2'}>
            <Navbar authUser={authUser} signOut={logOut} />
          </header>
          {loading ? (
            <div className="h-screen">
              <Alert
                warning={true}
                message="You have no permissions to this page"
              />
            </div>
          ) : (
            <>
              <Sidebar
                collapsed={collapsed}
                setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
                shown={showSidebar}
              />
              {children}
            </>
          )}
          <footer className={'site-footer p-2'}>
            <div class={'footer-content h-full p-2 bg-amber-300 rounded-md dark:bg-gray-600 dark:text-white flex items-center'}>
              &copy; Stas Ponomaryov, 2023
            </div>
          </footer>
        </div>
      ) : (
        children
      )}
    </>
  );
}
