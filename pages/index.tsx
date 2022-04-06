import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Landing from './Landing';
import Logged from './Logged';
import PageHeader from '../components/utils/PageHeader';
import PageTitle from '../components/utils/PageTitle';
import PageFooter from '../components/utils/PageFooter';
import { Loading } from '../components/utils/Loading';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../libs/apollo-client';
import createApolloServerSide from '../libs/apollo-server-side';
import { query_cv_zip_code } from '../graphql/queries';

export default function Home({ list }) {
  const router = useRouter();
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const userInfo = {
    username: keycloak?.tokenParsed?.preferred_username,
    name: keycloak?.tokenParsed?.given_name,
    last_name: keycloak?.tokenParsed?.family_name,
    email: keycloak?.tokenParsed?.email,
    roles: keycloak?.resourceAccess?.myclient?.roles,
  };
  const [refreshedToken, setRefreshedToken] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshToken = (minValidity: any) => {
    return new Promise<void>((resolve, reject) => {
      keycloak
        .updateToken(minValidity)
        .then(function () {
          resolve();
        })
        .catch(function () {
          reject();
        });
    });
  };

  useEffect(() => {
    if (token && !refreshedToken) {
      const fetchData = async () => {
        await refreshToken(5000);
      };
      fetchData().then(() => {
        setRefreshedToken(true);
      });
    }
    setLoading(false);
  }, [token]);

  const checkAuthenticated = (pathname: any) => {
    if (keycloak.authenticated) {
      if (!token) {
        setToken(keycloak.token);
      }
      const apolloClient = createApolloClient(keycloak.token);
      return (
        <>
          <PageTitle />
          <ApolloProvider client={apolloClient}>
            <PageHeader />
            <div className="content">
              <Logged userInfo={userInfo} list={list} />
            </div>
            <PageFooter />
          </ApolloProvider>
        </>
      );
    } else
      return (
        <>
          <PageTitle />
          <PageHeader />
          <div className="content">
            <Landing />
          </div>
          <PageFooter />
        </>
      );
  };
  if (!initialized || loading) {
    return (
      <div className="content">
        <Loading />
      </div>
    );
  }

  switch (router.asPath) {
    default:
      return checkAuthenticated(router.asPath);
  }
}
export const getStaticProps = async () => {
  const apolloClient = createApolloServerSide(process.env.NEXT_PUBLIC_HASURA_GRAPHQL, process.env.HASURA_GRAPHQL_ADMIN_SECRET);
  const { data } = await apolloClient.query({
    query: query_cv_zip_code,
  });
  return {
    props: {
      list: data,
    },
  };
};
