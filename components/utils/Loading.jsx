import 'primeflex/primeflex.css';
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export const Loading = () => {
  return (
    <div className="loading">
      <center>
        <h1>Cargando...</h1>
        <ProgressSpinner className="ui-progress-spinner-color" strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" />
      </center>
    </div>
  );
};
