import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/print.css';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production builds are prerendered (scripts/prerender.js), so React attaches
// to the existing markup. The dev server starts from an empty root.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
