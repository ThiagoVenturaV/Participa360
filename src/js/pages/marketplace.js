import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  const points = store.getState().points || 150;

  container.innerHTML = `
    <div class="page-container page-marketplace">
      <header class="page-header center-brand">
        <div class="brand">Participa 360</div>
      </header>

      <main class="content-padding pb-80">
        <h1 class="page-title animate-slide-up">Recompensas</h1>
        <p class="page-subtitle animate-slide-up stagger-1">Troque seus pontos por benefícios na cidade.</p>

        <div class="points-balance-card card p-20 bg-primary text-white rounded-lg animate-slide-up stagger-2 mt-20">
          <div class="balance-header flex justify-between items-center mb-10">
            <span class="label text-sm opacity-80">SALDO ATUAL</span>
            <a href="#" class="history-link text-white text-sm opacity-80 underline">Histórico</a>
          </div>
          <div class="balance-number text-4xl font-bold mb-15">\${points} pts</div>
          <div class="level-info flex justify-between text-sm mb-10">
            <span class="level-name font-medium">Cidadão Engajado</span>
            <span class="level-progress-text opacity-80">50 pts para o próximo nível</span>
          </div>
          <div class="progress-bar-container h-6 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <div class="progress-bar bg-white h-full" style="width: 75%"></div>
          </div>
        </div>

        <div class="daily-mission-card card p-15 mt-20 flex gap-15 items-center animate-slide-up stagger-3 border border-primary-light">
          <div class="mission-icon bg-primary-light text-primary p-10 rounded-full flex-center">
            <span class="material-symbols-outlined">directions_walk</span>
          </div>
          <div class="mission-content flex-1">
            <h4 class="m-0 mb-5">Missão do Dia</h4>
            <p class="text-sm text-muted m-0">Avalie 3 relatos no seu bairro.</p>
          </div>
          <div class="mission-action flex flex-column items-end gap-5">
            <span class="points-badge badge-warning text-xs px-10 py-3 rounded-full">+20 pts</span>
            <button class="btn btn-primary btn-sm">Participar</button>
          </div>
        </div>

        <h3 class="section-title mt-30 mb-15 animate-slide-up stagger-4">Vitrine de Benefícios</h3>
        
        <div class="filter-chips animate-slide-up stagger-5 horizontal-scroll mb-20">
          <div class="chip active">Todos</div>
          <div class="chip">Mobilidade</div>
          <div class="chip">Sustentabilidade</div>
          <div class="chip">Cultura</div>
        </div>

        <div class="rewards-grid grid gap-15">
          <div class="reward-card card rounded-lg overflow-hidden animate-slide-up stagger-6">
            <div class="reward-img placeholder-img h-120 bg-muted"></div>
            <div class="reward-content p-15">
              <span class="category-label text-xs font-medium text-primary mb-5 block">Mobilidade</span>
              <h4 class="m-0 mb-5">Passagem de Ônibus</h4>
              <p class="text-sm text-muted m-0 mb-15">1 passagem gratuita no transporte municipal.</p>
              <div class="reward-footer flex justify-between items-center">
                <span class="cost font-bold text-primary">100 pts</span>
                <button class="btn btn-primary btn-sm">Resgatar →</button>
              </div>
            </div>
          </div>

          <div class="reward-card locked card rounded-lg overflow-hidden opacity-70 animate-slide-up stagger-7">
            <div class="reward-img placeholder-img h-120 bg-muted"></div>
            <div class="reward-content p-15 bg-light">
              <span class="category-label text-xs font-medium text-purple mb-5 block">Cultura</span>
              <h4 class="m-0 mb-5">Ingresso Museu</h4>
              <p class="text-sm text-muted m-0 mb-15">Entrada para o Museu de Arte Moderna.</p>
              <div class="reward-footer flex justify-between items-center">
                <span class="cost font-bold text-muted">300 pts</span>
                <div class="locked-progress flex items-center gap-5 text-sm text-muted">
                  <span class="material-symbols-outlined text-sm">lock</span>
                  <span>Faltam 150 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <nav class="bottom-nav">
        <button class="nav-item" onclick="router.navigate('/')">
          <span class="material-symbols-outlined">home</span>
          <span>Início</span>
        </button>
        <button class="nav-item" onclick="router.navigate('/mapa')">
          <span class="material-symbols-outlined">map</span>
          <span>Mapa</span>
        </button>
        <button class="nav-item active" onclick="router.navigate('/reportar-categorias')">
          <span class="material-symbols-outlined">add_circle</span>
          <span>Ação</span>
        </button>
        <button class="nav-item" onclick="router.navigate('/alertas')">
          <span class="material-symbols-outlined">notifications</span>
          <span>Alertas</span>
        </button>
        <button class="nav-item" onclick="router.navigate('/perfil')">
          <span class="material-symbols-outlined">person</span>
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  `;
}
