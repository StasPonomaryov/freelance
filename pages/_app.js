import Layout from '@/components/Layout';
import '@/styles/globals.css';

import { AuthUserProvider } from '../context/AuthUserContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
}
