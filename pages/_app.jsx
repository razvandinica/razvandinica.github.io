import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dark-mode.css';
import { useEffect } from 'react';
import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;