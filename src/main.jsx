import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './css/design-system.css';
import './css/components.css';
import './css/layouts.css';
import './css/animations.css';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('PWA Service Worker registered:', reg);
    }).catch((err) => {
      console.warn('PWA Service Worker registration failed:', err);
    });
  });
}

// Global PWA Install Prompt Listener
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
