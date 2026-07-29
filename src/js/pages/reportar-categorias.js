import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  container.innerHTML = `
    <div class="page-container page-categorias">
      <header class="page-header">
        <button class="back-button" id="back-btn" aria-label="Voltar">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div class="brand">Participa 360</div>
      </header>

      <main class="content-padding">
        <h1 class="page-title animate-slide-up">Qual é o problema?</h1>
        <p class="page-subtitle animate-slide-up stagger-1">Selecione a categoria que melhor descreve o problema...</p>

        <div class="category-grid">
          <div class="category-card animate-slide-up stagger-2" data-category="buraco">
            <div class="category-icon-wrapper"><span class="material-symbols-outlined">build</span></div>
            <span class="category-label">Buraco</span>
          </div>
          <div class="category-card animate-slide-up stagger-3" data-category="iluminacao">
            <div class="category-icon-wrapper"><span class="material-symbols-outlined">lightbulb</span></div>
            <span class="category-label">Iluminação Pública</span>
          </div>
          <div class="category-card animate-slide-up stagger-4" data-category="lixo">
            <div class="category-icon-wrapper"><span class="material-symbols-outlined">delete</span></div>
            <span class="category-label">Coleta de Lixo</span>
          </div>
          <div class="category-card animate-slide-up stagger-5" data-category="vandalismo">
            <div class="category-icon-wrapper"><span class="material-symbols-outlined">format_paint</span></div>
            <span class="category-label">Vandalismo</span>
          </div>
          <div class="category-card animate-slide-up stagger-6" data-category="agua">
            <div class="category-icon-wrapper"><span class="material-symbols-outlined">water_drop</span></div>
            <span class="category-label">Vazamento de Água</span>
          </div>
          <div class="category-card animate-slide-up stagger-7" data-category="outro">
            <div class="category-icon-wrapper"><span class="material-symbols-outlined">more_horiz</span></div>
            <span class="category-label">Outro</span>
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

  document.getElementById('back-btn').addEventListener('click', () => {
    window.history.back();
  });

  const categoryCards = container.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      store.setState({ currentReportCategory: category });
      router.navigate(`/reportar-detalhes?category=${category}`);
    });
  });
}
