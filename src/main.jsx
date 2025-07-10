// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

// PASTIKAN BARIS INI ADA ^ // Ini adalah komentar yang benar di JS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
);