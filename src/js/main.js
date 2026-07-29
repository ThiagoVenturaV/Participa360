import router from './router.js';
import store from './store.js';
import { api } from './api.js';

// Dynamically insert CSS links (since this is vanilla JS, bundler doesn't inject automatically)
const cssFiles = [
  '/css/design-system.css',
  '/css/components.css',
  '/css/layouts.css',
  '/css/animations.css'
];

cssFiles.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
});

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered');
    } catch (err) {
      console.error('SW registration failed:', err);
    }
  }
  
  // 2. & 3. Check for existing JWT token
  if (store.isAuthenticated()) {
    try {
      // Typically: const user = await api.get('/auth/me');
      const mockUser = { id: 1, name: 'Usuário Teste', role: 'morador' };
      store.setUser(mockUser);
    } catch (e) {
      store.clearAuth();
    }
  }
  
  // 4. Initialize router
  router.init();
  
  // 5. Initialize voice agent FAB
  initVoiceAgent();
  
  // 6. Check for PWA install prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  
  // 7. Show tutorial overlay if first visit
  if (!localStorage.getItem('p360_tutorial_seen')) {
    localStorage.setItem('p360_tutorial_seen', 'true');
    // showTutorial();
  }
});

function initVoiceAgent() {
  const container = document.getElementById('fab-container');
  if (!container) return;
  
  container.innerHTML = `
    <button class="fab-voice" aria-label="Assistente de Voz">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
    </button>
  `;
}
