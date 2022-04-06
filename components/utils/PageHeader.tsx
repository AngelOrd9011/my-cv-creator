import React from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
const PageHeader = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const username = keycloak?.tokenParsed?.preferred_username;
  return (
    <>
      <div className="fixed-header">
        <div className="page-header">
          {keycloak && keycloak.authenticated && (
            <>
              <Avatar icon="pi pi-user" className="mr-2" shape="circle" />
              <span>{username}</span>
            </>
          )}
          <h1>My CV Creator</h1>
          {keycloak && !keycloak.authenticated && (
            <Button onClick={() => keycloak.login()} label="Iniciar sesión" icon="pi pi-sign-in" className="log-btn" />
          )}
          {keycloak && keycloak.authenticated && (
            <Button onClick={() => keycloak.logout()} label="Cerrar sesión" icon="pi pi-sign-out" className="log-btn" />
          )}
        </div>
      </div>
    </>
  );
};
export default PageHeader;
