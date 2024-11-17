// src/components/Usuarios/UsuariosApp.js
import React, { useState, useEffect } from 'react';

const UsuariosApp = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    email: '',
    password: '',
  });
  const [editUsuario, setEditUsuario] = useState(null);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Cargar los usuarios desde el backend
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUsuarios(data.users))
      .catch((error) => {
        console.error('Error al cargar usuarios:', error);
      });
  }, []);

  // Agregar un nuevo usuario
  const handleAddUsuario = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsuarios([...usuarios, data.result]);
        setNuevoUsuario({
          email: '',
          password: '',
        });
      })
      .catch((error) => {
        console.error('Error al agregar usuario:', error);
      });
  };

  // Editar un usuario
  const handleEditUsuario = () => {
    fetch(`http://localhost:3000/users/${editUsuario.id}`, { // Corregido
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editUsuario),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUsuarios = usuarios.map((usuario) =>
          usuario.id === editUsuario.id ? data.result : usuario
        );
        setUsuarios(updatedUsuarios);
        setEditUsuario(null); // Reset the edit form
      })
      .catch((error) => {
        console.error('Error al editar usuario:', error);
      });
  };

  // Eliminar un usuario
  const handleDeleteUsuario = (id) => {
    fetch(`http://localhost:3000/users/${id}`, { // Corregido
      method: 'DELETE',
    })
      .then(() => {
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar usuario:', error);
      });
  };

  // Login de usuario
  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setLoggedInUser(data.user);
          localStorage.setItem('userJWT', data.userJWT);
        } else {
          console.error('Error en el login:', data.msn);
        }
      })
      .catch((error) => {
        console.error('Error al hacer login:', error);
      });
  };

  return (
    <div>
      <h1>Usuarios</h1>

      {loggedInUser ? (
        <div>
          <h2>Bienvenido, {loggedInUser.email}</h2>
          <button onClick={() => setLoggedInUser(null)}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      )}

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.email}
            <button onClick={() => setEditUsuario(usuario)}>Editar</button>
            <button onClick={() => handleDeleteUsuario(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Agregar Nuevo Usuario</h2>
      <form onSubmit={handleAddUsuario}>
        <input
          type="email"
          placeholder="Email"
          value={nuevoUsuario.email}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={nuevoUsuario.password}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
          required
        />
        <button type="submit">Agregar Usuario</button>
      </form>

      {editUsuario && (
        <div>
          <h2>Editar Usuario</h2>
          <input
            type="email"
            value={editUsuario.email}
            onChange={(e) => setEditUsuario({ ...editUsuario, email: e.target.value })}
          />
          <input
            type="password"
            value={editUsuario.password}
            onChange={(e) => setEditUsuario({ ...editUsuario, password: e.target.value })}
          />
          <button onClick={handleEditUsuario}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default UsuariosApp;
