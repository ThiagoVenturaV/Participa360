import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export async function render(container) {
  const user = store.getState().user || { name: 'João' };

  container.innerHTML = `
    <div class="pb-24 min-h-screen bg-slate-50 dark:bg-slate-900 animate-fade-in">
      <header class="p-6 bg-emerald-700 text-white shadow-md flex justify-between items-center animate-slide-up stagger-1">
        <div class="font-bold text-xl tracking-tight flex items-center gap-2">
          <span class="material-symbols-outlined">groups</span>
          Líder Hub
        </div>
        <button class="relative w-10 h-10 rounded-full bg-emerald-600/50 flex items-center justify-center">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-emerald-700"></span>
        </button>
      </header>

      <div class="p-5 space-y-6">
        <div class="animate-slide-up stagger-2">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Bom dia, ${user.name.split(' ')[0]}.</h1>
          <p class="text-slate-500 dark:text-slate-400">Aqui está o resumo da sua comunidade.</p>
        </div>

        <button class="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 animate-slide-up stagger-2">
          <span class="material-symbols-outlined">add_circle</span>
          <span class="font-semibold">NOVO PROJETO</span>
        </button>

        <!-- Metricas -->
        <div class="grid grid-cols-2 gap-4 animate-slide-up stagger-3">
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
            <div class="text-3xl font-black text-slate-800 dark:text-white mb-1">1.248</div>
            <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Moradores Ativos</div>
          </div>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
            <div class="text-3xl font-black text-emerald-600 mb-1">342</div>
            <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Voluntários</div>
          </div>
        </div>

        <!-- Banner -->
        <div class="bg-gradient-to-r from-emerald-500 to-teal-500 p-5 rounded-2xl text-white shadow-md animate-slide-up stagger-4">
          <div class="flex items-center gap-2 text-sm font-semibold opacity-90 mb-1">
            <span class="material-symbols-outlined text-sm">event</span>
            PRÓXIMO EVENTO
          </div>
          <h2 class="text-xl font-bold mb-3">Limpeza de fim de semana</h2>
          <div class="mb-1 flex justify-between text-sm font-medium">
            <span>Voluntários Confirmados</span>
            <span>45/50</span>
          </div>
          <div class="w-full bg-black/20 rounded-full h-2">
            <div class="bg-white h-2 rounded-full w-[90%]"></div>
          </div>
        </div>

        <!-- Urgentes -->
        <section class="animate-slide-up stagger-5">
          <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Necessidades e Tarefas Urgentes</h3>
          <div class="space-y-3">
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
               <div>
                 <div class="font-medium text-slate-900 dark:text-white mb-1">Doação de agasalhos</div>
                 <div class="text-xs text-rose-500 font-semibold">Alta prioridade</div>
               </div>
               <button class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-lg">ATRIBUIR</button>
            </div>
          </div>
        </section>

        <!-- Colaboradores -->
        <section class="animate-slide-up stagger-6">
          <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Principais Colaboradores</h3>
          <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm divide-y divide-slate-100 dark:divide-slate-700">
            <div class="p-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">M</div>
                <div>
                  <div class="text-sm font-bold text-slate-900 dark:text-white">Maria S.</div>
                  <div class="text-xs text-slate-500">Super Voluntária</div>
                </div>
              </div>
              <div class="text-amber-500 font-bold text-sm">1.2k pts</div>
            </div>
            <div class="p-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-teal-100 text-teal-600 font-bold flex items-center justify-center">P</div>
                <div>
                  <div class="text-sm font-bold text-slate-900 dark:text-white">Pedro A.</div>
                  <div class="text-xs text-slate-500">Organizador</div>
                </div>
              </div>
              <div class="text-amber-500 font-bold text-sm">980 pts</div>
            </div>
          </div>
        </section>
        
        <!-- Central Chat -->
        <section class="animate-slide-up stagger-7">
          <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Central de Líderes</h3>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col h-48">
             <div class="flex-1 overflow-y-auto space-y-2 mb-3">
                <div class="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-sm w-3/4 text-slate-800 dark:text-slate-200">Reunião sobre a praça confirmada para amanhã.</div>
             </div>
             <div class="flex gap-2">
                <input type="text" placeholder="Mensagem..." class="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-sm outline-none">
                <button class="bg-emerald-600 text-white w-10 rounded-lg flex items-center justify-center"><span class="material-symbols-outlined text-sm">send</span></button>
             </div>
          </div>
        </section>
      </div>

      <!-- Bottom Nav -->
      <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-3 pb-safe z-40">
        <button class="flex flex-col items-center text-emerald-600">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="text-[10px] font-medium mt-1">Painel</span>
        </button>
        <button class="flex flex-col items-center text-slate-400 hover:text-emerald-600 transition-colors">
          <span class="material-symbols-outlined">group</span>
          <span class="text-[10px] font-medium mt-1">Membros</span>
        </button>
        <div class="w-12"></div>
        <button class="flex flex-col items-center text-slate-400 hover:text-emerald-600 transition-colors">
          <span class="material-symbols-outlined">assignment</span>
          <span class="text-[10px] font-medium mt-1">Projetos</span>
        </button>
        <button class="flex flex-col items-center text-slate-400 hover:text-emerald-600 transition-colors">
          <span class="material-symbols-outlined">settings</span>
          <span class="text-[10px] font-medium mt-1">Ajustes</span>
        </button>
      </nav>

      <!-- Voice FAB -->
      <button id="voice-fab" class="fixed bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-500/40 flex items-center justify-center z-50 transition-transform active:scale-90">
        <span class="material-symbols-outlined text-2xl">mic</span>
      </button>
    </div>
  `;

  const voiceFab = container.querySelector('#voice-fab');
  voiceFab.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('voice-assist-toggle'));
  });
}
