import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Página principal
import TiqueteApp from './components/Tiquete/TiqueteApp';
import UsuariosApp from './components/Usuarios/UsuariosApp';
import PagosApp from './components/Pagos/PagosApp';
import DestinosApp from './components/Destino/DestinosApp'; // Asegúrate de que la ruta esté correcta

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Página principal */}
          <Route path="/tiquetes" element={<TiqueteApp />} />
          <Route path="/pagos" element={<PagosApp />} />
          <Route path="/usuarios" element={<UsuariosApp />} />
          <Route path="/destinos" element={<DestinosApp />} /> {/* Ruta de Destinos */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;