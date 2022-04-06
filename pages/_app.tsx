import '../styles/globals.css';
import 'primereact/resources/themes/vela-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import type { AppProps, AppContext } from 'next/app';
import { SSRKeycloakProvider } from '@react-keycloak/ssr';
import { keycloakConfig, initOptions, getPersistor, Keycloak } from '../libs/keycloak';
import { parseCookies } from '../libs/cookie';

interface Props extends AppProps {
  cookies: unknown;
  token?: string;
}

function MyApp({ Component, pageProps, cookies }: Props) {
  return (
    <SSRKeycloakProvider keycloakConfig={keycloakConfig} persistor={getPersistor(cookies)} initOptions={initOptions}>
      <Component {...pageProps} />
    </SSRKeycloakProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const keycloak = Keycloak(context?.ctx?.req);

  return {
    cookies: parseCookies(context?.ctx?.req),
    token: keycloak.token,
  };
};
export default MyApp;
