import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  container.innerHTML = `
    <div class="page-container page-alertas">
      <header class="page-header center-brand">
        <div class="brand">Participa 360</div>
      </header>

      <main class="content-padding pb-80">
        <h1 class="page-title animate-slide-up">Alertas e Notificações</h1>
        <p class="page-subtitle animate-slide-up stagger-1">Mantenha-se atualizado sobre sua comunidade.</p>

        <div class="filter-chips animate-slide-up stagger-2 horizontal-scroll mb-20">
          <div class="chip active">Todos</div>
          <div class="chip">Meus Relatos</div>
          <div class="chip">Voluntariado</div>
          <div class="chip">Bairro</div>
        </div>

        <div class="alerts-list">
          <div class="alert-card urgent animate-slide-up stagger-3 mb-15">
            <div class="alert-header">
              <span class="badge badge-red">URGENTE</span>
              <span class="time text-muted">Agora</span>
            </div>
            <div class="alert-body flex gap-15 mt-10">
              <div class="alert-icon text-red"><span class="material-symbols-outlined">warning</span></div>
              <div class="alert-content">
                <h4 class="m-0 mb-5">Interdição: Av. Principal</h4>
                <p class="text-sm text-muted m-0 mb-10">Avenida principal interditada devido a fortes chuvas. Evite a região.</p>
                <a href="#" class="alert-link text-primary font-medium">Ver Detalhes</a>
              </div>
            </div>
          </div>

          <div class="alert-card update animate-slide-up stagger-4 mb-15">
            <div class="alert-body flex gap-15">
              <div class="alert-icon text-green"><span class="material-symbols-outlined">check_circle</span></div>
              <div class="alert-content flex-1">
                <h4 class="m-0 mb-5">Relato Resolvido!</h4>
                <p class="text-sm text-muted m-0">O buraco que você reportou na Rua das Flores foi consertado.</p>
              </div>
              <div class="alert-thumbnail">
                <div class="placeholder-img w-40 h-40 rounded"></div>
              </div>
            </div>
          </div>

          <div class="alert-card invite animate-slide-up stagger-5 mb-15">
            <div class="alert-body flex gap-15">
              <div class="alert-icon text-purple"><span class="material-symbols-outlined">group</span></div>
              <div class="alert-content">
                <h4 class="m-0 mb-5">Convite: Mutirão no Parque</h4>
                <p class="text-sm text-muted m-0 mb-10">Junte-se aos seus vizinhos neste sábado para revitalizar a praça.</p>
                <div class="alert-actions flex gap-10">
                  <button class="btn btn-primary btn-sm flex-1">Participar</button>
                  <button class="btn btn-secondary btn-sm flex-1">Saber Mais</button>
                </div>
              </div>
            </div>
          </div>

          <div class="alert-card project animate-slide-up stagger-6 mb-15">
            <div class="alert-body flex gap-15">
              <div class="alert-icon text-blue"><span class="material-symbols-outlined">business</span></div>
              <div class="alert-content">
                <h4 class="m-0 mb-5">Novo Projeto no Bairro</h4>
                <p class="text-sm text-muted m-0">A construção da nova creche comunitária foi iniciada.</p>
              </div>
            </div>
          </div>
        </div>

        <button class="btn btn-outline full-width mt-20 animate-slide-up stagger-7">Carregar Mais Antigos</button>
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
        <button class="nav-item active" onclick="router.navigate('/alertas')">
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
