import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  const points = store.getState().points || 150;

  container.innerHTML = `
    <div class="page-container page-perfil">
      <header class="page-header center-brand">
        <div class="brand">Participa 360</div>
      </header>

      <main class="content-padding pb-80">
        <div class="profile-header flex flex-col items-center mt-20 animate-slide-up">
          <div class="avatar-large w-80 h-80 bg-primary-light rounded-full flex-center mb-15">
            <span class="material-symbols-outlined text-primary text-4xl">person</span>
          </div>
          <h2 class="profile-name text-2xl font-bold m-0 mb-5">João Silva</h2>
          <span class="role-badge bg-warning-light text-warning text-xs px-15 py-5 rounded-full font-medium mb-10">Cidadão Engajado</span>
          <p class="profile-email text-muted m-0">joao.silva@email.com</p>
        </div>

        <div class="points-card card bg-gradient-to-r from-primary to-blue text-white p-20 rounded-xl mt-30 shadow-md cursor-pointer animate-slide-up stagger-1" id="go-marketplace-btn">
          <div class="points-header flex items-center gap-15 mb-15">
            <div class="icon-wrapper w-40 h-40 bg-white bg-opacity-20 rounded-full flex-center">
              <span class="material-symbols-outlined trophy text-warning">emoji_events</span>
            </div>
            <div>
              <h3 class="m-0 text-2xl font-bold">\${points} pts</h3>
              <span class="text-sm opacity-90">Nível 3</span>
            </div>
          </div>
          <div class="progress-bar-container h-6 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div class="progress-bar bg-warning h-full" style="width: 75%"></div>
          </div>
          <p class="progress-text mt-10 m-0 text-xs opacity-90">Faltam 50 pts para o Nível 4</p>
        </div>

        <div class="stats-grid grid grid-cols-3 gap-15 mt-20 animate-slide-up stagger-2">
          <div class="stat-box card p-15 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer" id="go-relatos-btn">
            <span class="stat-number text-2xl font-bold text-primary mb-5">12</span>
            <span class="stat-label text-xs text-muted font-medium uppercase tracking-wider">Relatos</span>
          </div>
          <div class="stat-box card p-15 rounded-lg text-center flex flex-col items-center justify-center">
            <span class="stat-number text-2xl font-bold text-green mb-5">8</span>
            <span class="stat-label text-xs text-muted font-medium uppercase tracking-wider">Resolvidos</span>
          </div>
          <div class="stat-box card p-15 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer" id="go-marketplace-btn2">
            <span class="stat-number text-2xl font-bold text-purple mb-5">3</span>
            <span class="stat-label text-xs text-muted font-medium uppercase tracking-wider">Resgates</span>
          </div>
        </div>

        <div class="menu-list card mt-30 rounded-lg overflow-hidden animate-slide-up stagger-3">
          <button class="menu-item w-full flex items-center justify-between p-15 bg-white border-b border-light text-left active:bg-light transition-colors">
            <div class="flex items-center gap-15">
              <span class="material-symbols-outlined text-muted">edit</span>
              <span class="font-medium text-dark">Editar Perfil</span>
            </div>
            <span class="material-symbols-outlined text-muted chevron">chevron_right</span>
          </button>
          <button class="menu-item w-full flex items-center justify-between p-15 bg-white border-b border-light text-left active:bg-light transition-colors">
            <div class="flex items-center gap-15">
              <span class="material-symbols-outlined text-muted">settings</span>
              <span class="font-medium text-dark">Configurações</span>
            </div>
            <span class="material-symbols-outlined text-muted chevron">chevron_right</span>
          </button>
          <button class="menu-item w-full flex items-center justify-between p-15 bg-white text-left active:bg-light transition-colors">
            <div class="flex items-center gap-15">
              <span class="material-symbols-outlined text-muted">info</span>
              <span class="font-medium text-dark">Sobre o App</span>
            </div>
            <span class="material-symbols-outlined text-muted chevron">chevron_right</span>
          </button>
        </div>

        <button class="btn btn-outline full-width mt-30 text-danger border-danger animate-slide-up stagger-4" id="logout-btn">
          Sair
        </button>
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
        <button class="nav-item" onclick="router.navigate('/reportar-categorias')">
          <span class="material-symbols-outlined">add_circle</span>
          <span>Ação</span>
        </button>
        <button class="nav-item" onclick="router.navigate('/alertas')">
          <span class="material-symbols-outlined">notifications</span>
          <span>Alertas</span>
        </button>
        <button class="nav-item active" onclick="router.navigate('/perfil')">
          <span class="material-symbols-outlined">person</span>
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  `;

  document.getElementById('logout-btn').addEventListener('click', () => {
    store.setState({ isAuthenticated: false, points: 0 });
    router.navigate('/login');
  });

  const goMarketplace = () => router.navigate('/marketplace');
  document.getElementById('go-marketplace-btn').addEventListener('click', goMarketplace);
  document.getElementById('go-marketplace-btn2').addEventListener('click', goMarketplace);
  document.getElementById('go-relatos-btn').addEventListener('click', () => router.navigate('/meus-relatos'));
}
