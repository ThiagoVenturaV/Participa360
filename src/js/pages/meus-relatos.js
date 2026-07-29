import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  container.innerHTML = `
    <div class="page-container page-meus-relatos">
      <header class="page-header with-avatar flex justify-between items-center">
        <div class="avatar-small circle bg-muted flex-center w-32 h-32">
          <span class="material-symbols-outlined text-white">person</span>
        </div>
        <div class="brand">Participa 360</div>
        <div class="w-32"></div> <!-- spacer -->
      </header>

      <main class="content-padding pb-80">
        <h1 class="page-title animate-slide-up">Meus Relatos</h1>
        <p class="page-subtitle animate-slide-up stagger-1">Acompanhe suas contribuições para a comunidade.</p>

        <div class="search-bar animate-slide-up stagger-2 mt-15 relative">
          <span class="material-symbols-outlined search-icon absolute left-10 top-50 translate-y-n50 text-muted">search</span>
          <input type="text" class="input-full pl-40" placeholder="Buscar relatos...">
        </div>

        <div class="filter-chips animate-slide-up stagger-3 horizontal-scroll mt-15 mb-20">
          <div class="chip active">Todos</div>
          <div class="chip">Em análise</div>
          <div class="chip">Em execução</div>
          <div class="chip">Resolvido</div>
        </div>

        <div class="reports-list">
          <div class="report-list-card card p-15 mb-15 animate-slide-up stagger-4">
            <div class="report-card-header flex justify-between items-start gap-15">
              <div class="flex gap-15">
                <div class="report-icon-bg bg-primary-light p-10 rounded text-primary flex-center">
                  <span class="material-symbols-outlined">build</span>
                </div>
                <div class="report-info">
                  <h4 class="m-0 mb-5">Buraco na via</h4>
                  <span class="address text-sm text-muted">Rua das Flores, 123</span>
                </div>
              </div>
              <span class="status-badge badge-blue text-xs px-10 py-5 rounded-full">Em execução</span>
            </div>
            <div class="report-progress mt-15">
              <div class="progress-bar-container h-4 bg-muted rounded overflow-hidden">
                <div class="progress-bar bg-blue h-full" style="width: 60%"></div>
              </div>
              <div class="progress-labels flex justify-between text-xs text-muted mt-5">
                <span>Iniciado</span>
                <span>Previsão: 3 dias</span>
              </div>
            </div>
            <div class="report-date text-xs text-muted mt-10">Relatado em 12/05/2026</div>
          </div>

          <div class="report-list-card card p-15 mb-15 animate-slide-up stagger-5">
            <div class="report-card-header flex justify-between items-start gap-15">
              <div class="flex gap-15">
                <div class="report-icon-bg bg-warning-light p-10 rounded text-warning flex-center">
                  <span class="material-symbols-outlined">lightbulb</span>
                </div>
                <div class="report-info">
                  <h4 class="m-0 mb-5">Poste sem luz</h4>
                  <span class="address text-sm text-muted">Av. Brasil, 400</span>
                </div>
              </div>
              <span class="status-badge badge-warning text-xs px-10 py-5 rounded-full">Em análise</span>
            </div>
            <div class="report-date text-xs text-muted mt-10">Relatado em 10/05/2026</div>
          </div>

          <div class="report-list-card card p-15 mb-15 animate-slide-up stagger-6">
            <div class="report-card-header flex justify-between items-start gap-15">
              <div class="flex gap-15">
                <div class="report-icon-bg bg-danger-light p-10 rounded text-danger flex-center">
                  <span class="material-symbols-outlined">delete</span>
                </div>
                <div class="report-info">
                  <h4 class="m-0 mb-5">Lixo Acumulado</h4>
                  <span class="address text-sm text-muted">Praça Central</span>
                </div>
              </div>
              <span class="status-badge badge-green text-xs px-10 py-5 rounded-full">Resolvido</span>
            </div>
            <div class="report-photo-thumb mt-15">
              <div class="photo-placeholder h-100 bg-muted rounded"></div>
            </div>
            <div class="report-date text-xs text-muted mt-10">Relatado em 01/05/2026</div>
          </div>
        </div>

        <button class="btn btn-outline full-width mt-20 animate-slide-up stagger-7">Carregar mais</button>
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
}
