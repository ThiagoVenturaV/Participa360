import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  const state = store.getState();
  const points = state.points || 10;

  container.innerHTML = `
    <div class="page-container page-sucesso centered-layout">
      <main class="content-padding text-center full-height flex-center flex-column">
        <div class="success-animation-wrapper mb-20">
          <div class="success-circle animate-scale-in">
            <span class="material-symbols-outlined success-check">check</span>
          </div>
        </div>
        
        <h1 class="page-title animate-slide-up stagger-1">Relato Enviado!</h1>
        <p class="page-subtitle animate-slide-up stagger-2 mb-30">A prefeitura foi notificada. Obrigado por ajudar a melhorar nossa comunidade.</p>
        
        <div class="points-earned-card animate-slide-up stagger-3 mb-30">
          <div class="points-header flex-center gap-10">
            <span class="material-symbols-outlined trophy-icon text-warning">emoji_events</span>
            <h3 class="m-0">+10 Pontos Ganhos</h3>
          </div>
          <p class="total-points mt-10">Saldo Total: \${points} pts</p>
          <div class="progress-bar-container mt-15">
            <div class="progress-bar" style="width: 30%"></div>
          </div>
        </div>

        <div class="action-buttons animate-slide-up stagger-4 w-100">
          <button class="btn btn-primary full-width mb-15" id="btn-home">Voltar para o Início</button>
          <button class="btn btn-secondary full-width" id="btn-reports">Ver Meus Relatos</button>
        </div>
      </main>
    </div>
  `;

  document.getElementById('btn-home').addEventListener('click', () => {
    router.navigate('/');
  });

  document.getElementById('btn-reports').addEventListener('click', () => {
    router.navigate('/meus-relatos');
  });

  // Simple confetti effect
  setTimeout(() => {
    console.log('🎉 Confetti Animation Launched');
  }, 100);
}
