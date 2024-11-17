// src/components/Pagos/PagosApp.js
import React, { useState, useEffect } from 'react';

const PagosApp = () => {
  const [pagos, setPagos] = useState([]);
  const [nuevoPago, setNuevoPago] = useState({
    Metodo: '',
    monto: '',
    fecha: '',
  });

  const [editPago, setEditPago] = useState(null);

  // Cargar los pagos desde el backend
  useEffect(() => {
    fetch('http://localhost:3008/pagos')
      .then((response) => response.json())
      .then((data) => setPagos(data.pago)) // Asegúrate de que la propiedad 'pago' existe en la respuesta
      .catch((error) => {
        console.error('Error al cargar pagos:', error);
      });
  }, []);

  // Agregar un nuevo pago
  const handleAddPago = (e) => {
    e.preventDefault();

    fetch('http://localhost:3008/pagos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoPago),
    })
      .then((response) => response.json())
      .then((data) => {
        setPagos([...pagos, data.result]); // Agregar el nuevo pago a la lista
        setNuevoPago({
          Metodo: '',
          monto: '',
          fecha: '',
        });
      })
      .catch((error) => {
        console.error('Error al agregar pago:', error);
      });
  };

  // Editar un pago
  const handleEditPago = () => {
    fetch(`http://localhost:3008/pagos/${editPago.id}`, { // Cambié las comillas
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editPago),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedPagos = pagos.map((pago) =>
          pago.id === editPago.id ? data.result : pago
        );
        setPagos(updatedPagos);
        setEditPago(null); // Restablecer el formulario de edición
      })
      .catch((error) => {
        console.error('Error al editar pago:', error);
      });
  };

  // Eliminar un pago
  const handleDeletePago = (id) => {
    fetch(`http://localhost:3008/pagos/${id}`, { // Cambié las comillas
      method: 'DELETE',
    })
      .then(() => {
        setPagos(pagos.filter((pago) => pago.id !== id)); // Eliminar el pago de la lista
      })
      .catch((error) => {
        console.error('Error al eliminar pago:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Pagos</h1>

      <ul>
        {pagos.map((pago) => (
          <li key={pago.id}>
            {pago.Metodo} - {pago.monto} - {pago.fecha}
            <button onClick={() => setEditPago(pago)}>Editar</button>
            <button onClick={() => handleDeletePago(pago.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Agregar Nuevo Pago</h2>
      <form onSubmit={handleAddPago}>
        <input
          type="text"
          placeholder="Método de pago"
          value={nuevoPago.Metodo}
          onChange={(e) => setNuevoPago({ ...nuevoPago, Metodo: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Monto"
          value={nuevoPago.monto}
          onChange={(e) => setNuevoPago({ ...nuevoPago, monto: e.target.value })}
          required
        />
        <input
          type="date"
          value={nuevoPago.fecha}
          onChange={(e) => setNuevoPago({ ...nuevoPago, fecha: e.target.value })}
          required
        />
        <button type="submit">Agregar Pago</button>
      </form>

      {editPago && (
        <div>
          <h2>Editar Pago</h2>
          <input
            type="text"
            value={editPago.Metodo}
            onChange={(e) => setEditPago({ ...editPago, Metodo: e.target.value })}
          />
          <input
            type="number"
            value={editPago.monto}
            onChange={(e) => setEditPago({ ...editPago, monto: e.target.value })}
          />
          <input
            type="date"
            value={editPago.fecha}
            onChange={(e) => setEditPago({ ...editPago, fecha: e.target.value })}
          />
          <button onClick={handleEditPago}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default PagosApp;
