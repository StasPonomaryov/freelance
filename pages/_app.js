import { AuthUserProvider } from '../context/AuthUserContext';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

// TODO: add Clients and Orders contexts

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
}
