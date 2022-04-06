import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloServerSide = (graphql: any, secret: any) => {
  return new ApolloClient({
    uri: graphql,
    cache: new InMemoryCache(),
    headers: {
      'x-hasura-admin-secret': secret,
    },
  });
};

export default createApolloServerSide;
