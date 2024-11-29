import React from 'react';
import TimeAgo from 'javascript-time-ago';
import ReactDOM from 'react-dom/client';
import App from './App';
import de from 'javascript-time-ago/locale/de';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

