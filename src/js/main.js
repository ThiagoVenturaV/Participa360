import router from './router.js';
import store from './store.js';
import { api } from './api.js';

import '../css/design-system.css';
import '../css/components.css';
import '../css/layouts.css';
import '../css/animations.css';

async function initApp() {
  // 1. Check for existing JWT token and fetch user
  if (store.isAuthenticated()) {
    try {
      const user = await api.get('/auth/me');
      store.setUser(user);
    } catch (e) {
      console.warn('Invalid or expired token, clearing auth:', e);
      store.clearAuth();
    }
  }
  
  // 2. Initialize router
  router.init();
  
  // 3. Initialize voice agent FAB
  initVoiceAgent();

  // 4. Register Service Worker if supported
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (err) {
      console.error('SW registration failed:', err);
    }
  }

  // 5. PWA install prompt handler
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
  });
}

function initVoiceAgent() {
  const container = document.getElementById('fab-container');
  if (!container) return;
  
  container.innerHTML = `
    <button class="fab-voice" aria-label="Assistente de Voz (Cora)">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
    </button>
  `;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
