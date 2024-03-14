import { AuthUserProvider } from '../context/AuthUserContext';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <NextNProgress />
      <Layout>        
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
}
