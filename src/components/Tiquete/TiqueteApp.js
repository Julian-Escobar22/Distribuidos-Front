// src/components/TiqueteApp.js
import React, { useEffect, useState } from 'react';

const TiqueteApp = () => {
  const [tiquetes, setTiquetes] = useState([]);
  const [newTiquete, setNewTiquete] = useState({
    Hora: '',
    Fecha: '',
    Origen: '',
    LLegada: '',
  });

  // Función para obtener todos los tiquetes
  useEffect(() => {
    fetch('http://localhost:3003/tiquet')
      .then((response) => response.json())
      .then((data) => setTiquetes(data.tiquete)) // Asegúrate de que el backend retorne un objeto con la propiedad 'tiquete'
      .catch((err) => console.error('Error al obtener tiquetes:', err));
  }, []);

  const handleChange = (e) => {
    setNewTiquete({
      ...newTiquete,
      [e.target.name]: e.target.value,
    });
  };

  // Función para agregar un nuevo tiquete
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3003/tiquet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTiquete),
    })
      .then((response) => response.json())
      .then((data) => {
        setTiquetes([...tiquetes, data.result]);  // Agregar el nuevo tiquete a la lista
        setNewTiquete({ Hora: '', Fecha: '', Origen: '', LLegada: '' });  // Limpiar el formulario
      })
      .catch((err) => console.error('Error al agregar tiquete:', err));
  };

  // Función para eliminar un tiquete por ID
  const handleDelete = (id) => {
    fetch(`http://localhost:3003/tiquet/${id}`, {  // Asegúrate de que la URL esté entre comillas invertidas para usar la interpolación
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setTiquetes(tiquetes.filter((tiquete) => tiquete.id !== id)); // Eliminar el tiquete de la lista
      })
      .catch((err) => console.error('Error al eliminar tiquete:', err));
  };

  // Función para editar un tiquete
  const handleEdit = (id) => {
    const updatedTiquete = prompt('Ingrese la nueva información del tiquete (separada por comas): Hora, Fecha, Origen, Llegada');
    if (updatedTiquete) {
      const [Hora, Fecha, Origen, LLegada] = updatedTiquete.split(','); // Asumimos que se ingresa la nueva información en este formato

      fetch(`http://localhost:3003/tiquet/${id}`, {  // Igual que en handleDelete, usa las comillas invertidas
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Hora, Fecha, Origen, LLegada }),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedList = tiquetes.map((tiquete) =>
            tiquete.id === id ? data.result : tiquete
          );
          setTiquetes(updatedList); // Actualizar la lista con el tiquete editado
        })
        .catch((err) => console.error('Error al editar tiquete:', err));
    }
  };

  return (
    <div>
      <h1>Lista de Tiquetes</h1>
      <ul>
        {tiquetes.map((tiquete) => (
          <li key={tiquete.id}>
            {tiquete.Hora} - {tiquete.Fecha} - {tiquete.Origen} - {tiquete.LLegada}
            <button onClick={() => handleEdit(tiquete.id)}>Editar</button>
            <button onClick={() => handleDelete(tiquete.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Agregar Nuevo Tiquete</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Hora"
          placeholder="Hora"
          value={newTiquete.Hora}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Fecha"
          placeholder="Fecha"
          value={newTiquete.Fecha}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Origen"
          placeholder="Origen"
          value={newTiquete.Origen}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="LLegada"
          placeholder="Llegada"
          value={newTiquete.LLegada}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar Tiquete</button>
      </form>
    </div>
  );
};

export default TiqueteApp;
