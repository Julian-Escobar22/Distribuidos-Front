// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Bienvenido a la Aplicación de Gestión</h1>
      <div className="buttons">
        <Link to="/tiquetes">
          <button className="module-button">Tiquetes</button>
        </Link>
        <Link to="/pagos">
          <button className="module-button">Pagos</button>
        </Link>
        <Link to="/usuarios">
          <button className="module-button">Usuarios</button>
        </Link>
        <Link to="/destinos">
          <button className="module-button">Destinos</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;