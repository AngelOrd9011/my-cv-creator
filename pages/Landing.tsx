import React from 'react';
import styles from '../styles/Landing.module.css';
import { Card } from 'primereact/card';

const Landing = () => {
  return (
    <div className="main-content">
      <div className="grid">
        <div className="col-12 md:col-10 md:col-offset-1">
          <h1>Crea tu CV y descargalo en PDF</h1>
          <div className="grid">
            <div className="col-12 md:col-6">
              <Card title="Agrega tus datos" className="info-card">
                <div className="grid">
                  <div className="col-12 md:col-3 center-text">
                    <i className="pi pi-user-edit" style={{ fontSize: '5em' }}></i>
                  </div>
                  <div className="col-12 md:col-9">
                    <p>
                      Crea en linea tu CV de manera dinamica y facil. Agrega tus datos personales, escolaridad, experiencia y logros
                      adicionales.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 md:col-6">
              <Card title="Descargalo en formato PDF" className="info-card">
                <div className="grid">
                  <div className="col-12 md:col-3 center-text">
                    <i className="pi pi-file-pdf" style={{ fontSize: '5em' }}></i>
                  </div>
                  <div className="col-12 md:col-9">
                    <p>
                      Crea en linea tu CV de manera dinamica y facil. Agrega tus datos personales, escolaridad, experiencia y logros
                      adicionales.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
