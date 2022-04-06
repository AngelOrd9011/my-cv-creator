import { useKeycloak } from '@react-keycloak/ssr';

export const UserHeader = () => {
  const { keycloak } = useKeycloak();
  return {
    context: {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        'X-Hasura-Role': 'user',
      },
    },
  };
};
