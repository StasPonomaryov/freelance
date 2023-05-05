/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import Alert from './Alert';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const { authUser, loading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push('/');
  }, [authUser, loading]);

  return (
    <>
      {loading ? (
        <Alert type="warning" message="You have no permissions to this page" />
      ) : (
        <div className="grid-container h-screen">
          <header className="site-header bg-white dark:bg-gray-950">
            <Navbar authUser={authUser} signOut={logOut} />
          </header>
          <Sidebar mode="collapse" />
          {children}
          <footer className="site-footer">&copy; Stas Ponomaryov, 2023</footer>
        </div>
      )}
    </>
  );
}
