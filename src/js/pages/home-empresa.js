import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export async function render(container) {
  const user = store.getState().user || { name: 'Empresa XPTO' };

  container.innerHTML = `
    <div class="pb-24 min-h-screen bg-slate-50 dark:bg-slate-900 animate-fade-in">
      <header class="p-6 bg-purple-900 text-white flex justify-between items-center animate-slide-up stagger-1">
        <div class="font-bold text-xl tracking-tight flex items-center gap-2">
          <span class="material-symbols-outlined">domain</span>
          Impacto 360
        </div>
        <button class="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center">
          <span class="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <div class="p-5 space-y-6">
        <!-- Welcome Card -->
        <div class="bg-gradient-to-r from-purple-700 to-indigo-600 p-6 rounded-2xl text-white shadow-lg animate-slide-up stagger-2">
          <h1 class="text-2xl font-bold mb-2">Bem-vindo de volta, ${user.name}</h1>
          <p class="text-purple-100 mb-6 text-sm">Continue fazendo a diferença na nossa cidade. Veja oportunidades de impacto hoje.</p>
          <div class="flex gap-3">
            <button class="flex-1 bg-white text-purple-700 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-purple-50 transition-colors">Ver Relatórios</button>
            <button class="flex-1 bg-purple-800/50 hover:bg-purple-800 border border-purple-500 text-white py-2 rounded-lg font-bold text-sm transition-colors">Nova Ação</button>
          </div>
        </div>

        <!-- Impact Metrics -->
        <div class="grid grid-cols-2 gap-4 animate-slide-up stagger-3">
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div class="text-xs font-bold text-slate-500 mb-1 uppercase">Vidas Impactadas</div>
            <div class="text-2xl font-black text-purple-600">12.5k</div>
          </div>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div class="text-xs font-bold text-slate-500 mb-1 uppercase">Investimento</div>
            <div class="text-2xl font-black text-emerald-600">US$ 450k</div>
          </div>
        </div>

        <!-- Solicitacoes -->
        <section class="animate-slide-up stagger-4">
          <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Solicitações da Prefeitura</h2>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-start gap-4">
            <div class="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined">park</span>
            </div>
            <div>
              <div class="flex gap-2 mb-1">
                 <span class="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded">URGENTE</span>
                 <span class="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">AMBIENTAL</span>
              </div>
              <h3 class="font-bold text-slate-900 dark:text-white text-sm">Revitalização Parque Sul</h3>
              <p class="text-xs text-slate-500 mt-1">Busca-se parceiros para plantio e manutenção.</p>
            </div>
          </div>
        </section>

        <!-- Patrocinio -->
        <section class="animate-slide-up stagger-5">
          <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Oportunidades de Patrocínio</h2>
          <div class="bg-slate-900 rounded-2xl overflow-hidden shadow-md relative">
             <div class="h-32 bg-indigo-900 flex items-center justify-center opacity-80">
                <span class="material-symbols-outlined text-white text-5xl opacity-50">school</span>
             </div>
             <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
             <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-white font-bold text-lg mb-1">Educação Digital nas Escolas</h3>
                <div class="flex justify-between items-center">
                  <span class="text-indigo-300 text-sm">Cota: R$ 50.000</span>
                  <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors">Apoiar</button>
                </div>
             </div>
          </div>
        </section>

        <!-- Voluntariado -->
        <section class="animate-slide-up stagger-6">
          <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Voluntariado de Funcionários</h2>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
             <div class="w-16 h-16 rounded-full border-4 border-purple-100 flex items-center justify-center relative">
               <svg class="w-full h-full absolute inset-0 -rotate-90 text-purple-600" viewBox="0 0 36 36">
                 <path class="stroke-current" stroke-dasharray="68, 100" stroke-width="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
               </svg>
               <span class="text-sm font-bold text-slate-700 dark:text-white">68%</span>
             </div>
             <div>
               <div class="font-bold text-slate-900 dark:text-white">Meta Anual de Horas</div>
               <div class="text-sm text-slate-500">Próxima atividade: Sábado, 9h</div>
             </div>
          </div>
        </section>
        
        <!-- ROI -->
        <section class="animate-slide-up stagger-7">
           <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50 text-center cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
              <span class="material-symbols-outlined text-indigo-600 mb-1">analytics</span>
              <div class="font-bold text-indigo-900 dark:text-indigo-300">Gerar Relatório de ROI Social</div>
           </div>
        </section>
      </div>

      <!-- Bottom Nav -->
      <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-3 pb-safe z-40">
        <button class="flex flex-col items-center text-purple-600">
          <span class="material-symbols-outlined">store</span>
          <span class="text-[10px] font-medium mt-1">Home</span>
        </button>
        <button class="flex flex-col items-center text-slate-400 hover:text-purple-600 transition-colors">
          <span class="material-symbols-outlined">handshake</span>
          <span class="text-[10px] font-medium mt-1">Apoios</span>
        </button>
        <div class="w-12"></div>
        <button class="flex flex-col items-center text-slate-400 hover:text-purple-600 transition-colors">
          <span class="material-symbols-outlined">volunteer_activism</span>
          <span class="text-[10px] font-medium mt-1">Equipe</span>
        </button>
        <button class="flex flex-col items-center text-slate-400 hover:text-purple-600 transition-colors">
          <span class="material-symbols-outlined">person</span>
          <span class="text-[10px] font-medium mt-1">Perfil</span>
        </button>
      </nav>

      <!-- Voice FAB -->
      <button id="voice-fab" class="fixed bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg shadow-purple-500/40 flex items-center justify-center z-50 transition-transform active:scale-90">
        <span class="material-symbols-outlined text-2xl">mic</span>
      </button>
    </div>
  `;

  const voiceFab = container.querySelector('#voice-fab');
  voiceFab.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('voice-assist-toggle'));
  });
}
