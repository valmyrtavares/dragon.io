import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');
console.log('ROOT ELEMENT:', rootElement);

if (!rootElement) {
  alert('Elemento #root NÃO encontrado!');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
