import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice';
// Importa otros slices según sea necesario

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Agrega más reducers aquí
  },
});