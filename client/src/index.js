import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
