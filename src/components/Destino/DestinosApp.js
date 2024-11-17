import React, { useState, useEffect } from 'react';

const DestinosApp = () => {
  const [destinos, setDestinos] = useState([]);
  const [nuevoDestino, setNuevoDestino] = useState({
    Nombre: '',
    Coordenadas: '',
    fecha: '',
    hora: ''
  });

  const [editDestino, setEditDestino] = useState(null);

  // Cargar los destinos desde el backend
  useEffect(() => {
    fetch('http://localhost:3007/destino') 
      .then((response) => response.json())
      .then((data) => {
        setDestinos(data.destino); // Asegúrate que la respuesta tenga la propiedad 'destino'
      })
      .catch((error) => {
        console.error('Error al cargar destinos:', error);
      });
  }, []);

  // Agregar un nuevo destino
  const handleAddDestino = () => {
    fetch('http://localhost:3007/destino', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoDestino),
    })
      .then((response) => response.json())
      .then((data) => {
        setDestinos([...destinos, data.result]); // Agregar el nuevo destino a la lista
        setNuevoDestino({
          Nombre: '',
          Coordenadas: '',
          fecha: '',
          hora: ''
        });
      })
      .catch((error) => {
        console.error('Error al agregar destino:', error);
      });
  };

  // Editar un destino
  const handleEditDestino = () => {
    fetch(`http://localhost:3007/destino/${editDestino.id}`, { // Cambié las comillas
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editDestino),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedDestinos = destinos.map((destino) =>
          destino.id === editDestino.id ? data.result : destino
        );
        setDestinos(updatedDestinos);
        setEditDestino(null); // Cerrar el formulario de edición
      })
      .catch((error) => {
        console.error('Error al editar destino:', error);
      });
  };

  // Eliminar un destino
  const handleDeleteDestino = (id) => {
    fetch(`http://localhost:3007/destino/${id}`, { // Cambié las comillas
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setDestinos(destinos.filter((destino) => destino.id !== id)); // Eliminar el destino de la lista
      })
      .catch((error) => {
        console.error('Error al eliminar destino:', error);
      });
  };

  return (
    <div>
      <h1>Destinos</h1>

      <div>
        <h2>Agregar Nuevo Destino</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoDestino.Nombre}
          onChange={(e) => setNuevoDestino({ ...nuevoDestino, Nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Coordenadas"
          value={nuevoDestino.Coordenadas}
          onChange={(e) => setNuevoDestino({ ...nuevoDestino, Coordenadas: e.target.value })}
        />
        <input
          type="date"
          value={nuevoDestino.fecha}
          onChange={(e) => setNuevoDestino({ ...nuevoDestino, fecha: e.target.value })}
        />
        <input
          type="time"
          value={nuevoDestino.hora}
          onChange={(e) => setNuevoDestino({ ...nuevoDestino, hora: e.target.value })}
        />
        <button onClick={handleAddDestino}>Agregar</button>
      </div>

      <div>
        <h2>Lista de Destinos</h2>
        <ul>
          {destinos.map((destino) => (
            <li key={destino.id}>
              <span>{destino.Nombre} - {destino.Coordenadas} - {destino.fecha} {destino.hora}</span>
              <button onClick={() => setEditDestino(destino)}>Editar</button>
              <button onClick={() => handleDeleteDestino(destino.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>

      {editDestino && (
        <div>
          <h2>Editar Destino</h2>
          <input
            type="text"
            value={editDestino.Nombre}
            onChange={(e) => setEditDestino({ ...editDestino, Nombre: e.target.value })}
          />
          <input
            type="text"
            value={editDestino.Coordenadas}
            onChange={(e) => setEditDestino({ ...editDestino, Coordenadas: e.target.value })}
          />
          <input
            type="date"
            value={editDestino.fecha}
            onChange={(e) => setEditDestino({ ...editDestino, fecha: e.target.value })}
          />
          <input
            type="time"
            value={editDestino.hora}
            onChange={(e) => setEditDestino({ ...editDestino, hora: e.target.value })}
          />
          <button onClick={handleEditDestino}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default DestinosApp;
