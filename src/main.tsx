import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

if (window.location.pathname === '/') {
  window.history.replaceState(
    null,
    '',
    `/electrical-rfq${window.location.search}${window.location.hash}`,
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
