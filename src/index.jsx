import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // Your main CSS file for global styling

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
