import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async'; // MODIFICACIÓN: Importar HelmetProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> {/* MODIFICACIÓN: Envolver la aplicación con HelmetProvider */}
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);