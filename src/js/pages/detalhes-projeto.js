import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  container.innerHTML = `
    <div class="page-container page-projeto">
      <header class="page-header floating-header absolute top-0 w-100 flex justify-between p-15 z-10">
        <button class="back-button glass-btn w-40 h-40 rounded-full flex-center bg-white bg-opacity-80 shadow-sm" id="back-btn" aria-label="Voltar">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <button class="more-button glass-btn w-40 h-40 rounded-full flex-center bg-white bg-opacity-80 shadow-sm" aria-label="Mais opções">
          <span class="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <main class="pb-80">
        <div class="hero-card relative h-250 w-100">
          <div class="hero-image placeholder-img-large h-full w-full bg-muted">
            <div class="gradient-overlay absolute bottom-0 w-full h-150 bg-gradient-to-t from-black to-transparent opacity-80"></div>
          </div>
          <div class="hero-content absolute bottom-0 p-20 text-white animate-slide-up w-full">
            <span class="status-badge bg-blue text-white text-xs px-10 py-5 rounded-full inline-block mb-10">Em Andamento</span>
            <h1 class="project-title text-2xl font-bold m-0 mb-5">Revitalização da Praça da Matriz</h1>
            <p class="project-location flex items-center gap-5 text-sm m-0 opacity-90">
              <span class="material-symbols-outlined text-sm">location_on</span> Centro
            </p>
          </div>
        </div>

        <div class="content-padding project-details mt-20">
          <section class="detail-section animate-slide-up stagger-1 mb-30">
            <h3 class="mb-10 font-bold">Sobre o Projeto</h3>
            <p class="text-muted leading-relaxed">Projeto comunitário focado na revitalização completa da Praça da Matriz, incluindo novo paisagismo, iluminação de LED e parquinho infantil.</p>
          </section>

          <section class="detail-section animate-slide-up stagger-2 mb-30">
            <h3 class="mb-15 font-bold">Progresso</h3>
            <div class="progress-stats flex justify-between items-end mb-10">
              <span class="percentage text-3xl font-bold text-primary">65%</span>
              <span class="progress-label text-sm text-muted font-medium">Concluído</span>
            </div>
            <div class="progress-bar-container h-8 bg-muted rounded-full overflow-hidden mb-20">
              <div class="progress-bar bg-primary h-full" style="width: 65%"></div>
            </div>
            <ul class="timeline relative pl-20 border-l-2 border-muted m-0 list-none">
              <li class="completed relative mb-15 text-sm font-medium text-dark">
                <span class="absolute w-12 h-12 bg-primary rounded-full -left-27 top-2 border-2 border-white"></span>
                Planejamento
              </li>
              <li class="in-progress relative mb-15 text-sm font-bold text-primary">
                <span class="absolute w-12 h-12 bg-white border-2 border-primary rounded-full -left-27 top-2"></span>
                Execução das Obras
              </li>
              <li class="pending relative text-sm font-medium text-muted">
                <span class="absolute w-12 h-12 bg-muted rounded-full -left-27 top-2 border-2 border-white"></span>
                Inauguração
              </li>
            </ul>
          </section>

          <section class="detail-section animate-slide-up stagger-3 mb-30">
            <h3 class="mb-15 font-bold">Galeria</h3>
            <div class="gallery-scroll horizontal-scroll flex gap-15 overflow-x-auto pb-10 hide-scrollbar">
              <div class="gallery-item placeholder-img w-150 h-100 bg-muted rounded-lg flex-shrink-0 flex items-end p-10">
                <span class="text-white text-sm font-medium drop-shadow-md">Antes</span>
              </div>
              <div class="gallery-item placeholder-img w-150 h-100 bg-muted rounded-lg flex-shrink-0 flex items-end p-10">
                <span class="text-white text-sm font-medium drop-shadow-md">Durante</span>
              </div>
              <div class="gallery-item placeholder-img w-150 h-100 bg-muted rounded-lg flex-shrink-0 flex items-end p-10">
                <span class="text-white text-sm font-medium drop-shadow-md">Projeto</span>
              </div>
            </div>
          </section>

          <section class="detail-section partice-section animate-slide-up stagger-4 mb-30">
            <div class="cta-card bg-primary-light rounded-xl p-20 flex gap-15 items-start">
              <div class="cta-icon text-primary mt-5"><span class="material-symbols-outlined text-3xl">volunteer_activism</span></div>
              <div class="cta-content flex-1">
                <h4 class="m-0 mb-5 font-bold text-dark">Participe!</h4>
                <p class="text-sm text-muted m-0 mb-15">Precisamos de voluntários para o plantio no próximo sábado.</p>
                <button class="btn btn-primary w-full py-10 rounded-lg font-medium">Quero Ajudar</button>
              </div>
            </div>
          </section>

          <section class="detail-section animate-slide-up stagger-5 mb-30">
            <h3 class="mb-15 font-bold">Liderança & Apoio</h3>
            <div class="leaders-list flex flex-col gap-15">
              <div class="leader-item flex items-center gap-15 card p-15 rounded-lg border border-light">
                <div class="avatar-small circle bg-muted w-40 h-40 flex-center rounded-full"><span class="material-symbols-outlined text-white">person</span></div>
                <div class="leader-info flex flex-col">
                  <span class="name font-bold text-dark">Ana Silva</span>
                  <span class="role text-sm text-muted">Líder Comunitária</span>
                </div>
              </div>
              <div class="leader-item flex items-center gap-15 card p-15 rounded-lg border border-light">
                <div class="avatar-small circle bg-muted w-40 h-40 flex-center rounded-full"><span class="material-symbols-outlined text-white">domain</span></div>
                <div class="leader-info flex flex-col">
                  <span class="name font-bold text-dark">Prefeitura Municipal</span>
                  <span class="role text-sm text-muted">Apoio Institucional</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <nav class="bottom-nav">
        <!-- bottom nav items can go here if global -->
      </nav>
    </div>
  `;

  document.getElementById('back-btn').addEventListener('click', () => {
    window.history.back();
  });
}
