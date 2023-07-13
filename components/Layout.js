/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
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

  useEffect(() => {
    if (!loading && !authUser) router.push('/');
  }, [authUser, loading]);

  return (
    <>
      {router.pathname !== '/' ? (
        <div className={`${inter.className} wrapper`}>
          <Head>
            <title>Freelance dashboard</title>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <header className="site-header p-2">
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
              />
              {children}
            </>
          )}
          <footer className="site-footer p-2">
            <div className="footer-content">&copy; Stas Ponomaryov, 2023</div>
          </footer>
        </div>
      ) : (
        children
      )}
    </>
  );
}
