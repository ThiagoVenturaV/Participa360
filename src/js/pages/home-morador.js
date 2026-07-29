import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export async function render(container) {
  // Skeleton
  container.innerHTML = `
    <div class="p-4 space-y-4 animate-pulse">
      <div class="h-12 bg-slate-200 dark:bg-slate-700 rounded-full w-full"></div>
      <div class="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div>
      <div class="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div>
    </div>
  `;

  // Fetch data
  let dashboardData = {};
  try {
    dashboardData = await api.get('/dashboard/morador');
  } catch (e) {
    console.error('Failed to load dashboard', e);
  }

  const user = store.getState().user || { name: 'Morador', points: 450, tier: 'PRATA' };

  container.innerHTML = `
    <div class="pb-24 min-h-screen bg-slate-50 dark:bg-slate-900 animate-fade-in">
      <!-- Header -->
      <header class="p-6 bg-white dark:bg-slate-800 shadow-sm rounded-b-3xl flex justify-between items-center animate-slide-up stagger-1">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
            ${user.name.charAt(0)}
          </div>
          <div>
            <div class="text-xs font-bold text-indigo-500 tracking-wider">RESIDENTE ${user.tier || 'PRATA'}</div>
            <div class="text-slate-900 dark:text-white font-medium flex items-center gap-1">
              <span class="material-symbols-outlined text-amber-500 text-sm">stars</span>
              ${user.points || 450} pts
            </div>
          </div>
        </div>
        <button class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 relative">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
      </header>

      <div class="p-4 space-y-6">
        <!-- Big CTA -->
        <button id="btn-report" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-3 transition-transform active:scale-95 animate-slide-up stagger-2">
          <span class="material-symbols-outlined text-2xl">add_a_photo</span>
          <span class="font-semibold text-lg">Reportar Problema</span>
        </button>

        <!-- Recompensas -->
        <section class="animate-slide-up stagger-3">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg font-bold text-slate-800 dark:text-white">Recompensas</h2>
            <a href="#" class="text-indigo-600 dark:text-indigo-400 text-sm font-medium">Ver todas</a>
          </div>
          <div class="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
            <div class="min-w-[200px] bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 snap-center shrink-0">
              <div class="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                <span class="material-symbols-outlined">directions_bus</span>
              </div>
              <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Passe Livre</h3>
              <p class="text-sm text-amber-500 font-medium">300 pts</p>
            </div>
            <div class="min-w-[200px] bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 snap-center shrink-0">
              <div class="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                <span class="material-symbols-outlined">psychiatry</span>
              </div>
              <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Plantio de Árvore</h3>
              <p class="text-sm text-amber-500 font-medium">500 pts</p>
            </div>
          </div>
        </section>

        <!-- Enquete -->
        <section class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg animate-slide-up stagger-4">
          <div class="flex items-center gap-2 mb-3 opacity-90 text-sm font-medium uppercase tracking-wider">
            <span class="material-symbols-outlined text-sm">how_to_vote</span>
            Enquete da Cidade
          </div>
          <h3 class="text-xl font-bold mb-4">Qual a prioridade para o bairro Centro?</h3>
          <div class="space-y-2">
            <label class="flex items-center gap-3 p-3 bg-white/20 rounded-xl cursor-pointer hover:bg-white/30 transition-colors">
              <input type="radio" name="enquete" class="w-4 h-4 accent-white">
              <span>Mais iluminação</span>
            </label>
            <label class="flex items-center gap-3 p-3 bg-white/20 rounded-xl cursor-pointer hover:bg-white/30 transition-colors">
              <input type="radio" name="enquete" class="w-4 h-4 accent-white">
              <span>Reparo em calçadas</span>
            </label>
          </div>
        </section>

        <!-- Feed -->
        <section class="animate-slide-up stagger-5">
          <div class="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
            <button class="px-4 py-1.5 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-medium whitespace-nowrap">Todos</button>
            <button class="px-4 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium whitespace-nowrap">Oficial</button>
          </div>
          
          <div class="space-y-4">
            <!-- Feed Card -->
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">SM</div>
                <div>
                  <div class="font-medium text-slate-900 dark:text-white">Secretaria de Mobilidade</div>
                  <div class="text-xs text-slate-500">Há 2 horas • Oficial</div>
                </div>
              </div>
              <p class="text-slate-700 dark:text-slate-300 text-sm mb-3">Avenida Paulista com faixa interditada para manutenção neste domingo. Planeje sua rota!</p>
              <div class="w-full h-32 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
                <span class="material-symbols-outlined text-4xl text-slate-400">construction</span>
              </div>
              <div class="flex items-center gap-4 text-slate-500 text-sm">
                <button class="flex items-center gap-1 hover:text-indigo-500"><span class="material-symbols-outlined text-lg">favorite</span> 124</button>
                <button class="flex items-center gap-1 hover:text-indigo-500"><span class="material-symbols-outlined text-lg">chat_bubble</span> 12</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Bottom Nav -->
      <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-3 pb-safe z-40">
        <button class="flex flex-col items-center text-indigo-600">
          <span class="material-symbols-outlined">home</span>
          <span class="text-[10px] font-medium mt-1">Início</span>
        </button>
        <button class="flex flex-col items-center text-slate-400 hover:text-indigo-600 transition-colors">
          <span class="material-symbols-outlined">map</span>
          <span class="text-[10px] font-medium mt-1">Mapa</span>
        </button>
        <div class="w-12"></div> <!-- Spacer for FAB -->
        <button class="flex flex-col items-center text-slate-400 hover:text-indigo-600 transition-colors">
          <span class="material-symbols-outlined">storefront</span>
          <span class="text-[10px] font-medium mt-1">Prêmios</span>
        </button>
        <button class="flex flex-col items-center text-slate-400 hover:text-indigo-600 transition-colors">
          <span class="material-symbols-outlined">person</span>
          <span class="text-[10px] font-medium mt-1">Perfil</span>
        </button>
      </nav>

      <!-- Voice FAB -->
      <button id="voice-fab" class="fixed bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center z-50 transition-transform active:scale-90">
        <span class="material-symbols-outlined text-2xl">mic</span>
      </button>
    </div>
  `;

  container.querySelector('#btn-report').addEventListener('click', () => router.navigate('/reportar'));
  
  const voiceFab = container.querySelector('#voice-fab');
  voiceFab.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('voice-assist-toggle'));
  });
}
