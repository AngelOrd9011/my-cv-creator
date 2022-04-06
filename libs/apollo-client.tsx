import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};
const createApolloClient = (token: any) => {
  const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: new InMemoryCache({
      addTypename: false,
    }),
    defaultOptions: defaultOptions,
  });
  return apolloClient;
};
export default createApolloClient;
