import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export async function render(container) {
  container.innerHTML = `
    <div class="pb-24 min-h-screen bg-slate-100 dark:bg-slate-900 animate-fade-in">
      <header class="p-6 bg-slate-900 text-white flex justify-between items-center animate-slide-up stagger-1">
        <div class="font-bold text-xl tracking-tight flex items-center gap-2">
          <span class="material-symbols-outlined">account_balance</span>
          GovDashboard
        </div>
        <button class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
          <span class="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <div class="p-6 space-y-6">
        <div class="animate-slide-up stagger-2">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Painel de Gestão da Prefeitura</h1>
          <p class="text-slate-500">Visão geral do município</p>
        </div>

        <!-- Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up stagger-3">
          <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div class="text-sm font-semibold text-slate-500 mb-2">PROBLEMAS ATIVOS</div>
            <div class="flex items-end gap-3">
              <div class="text-3xl font-black text-rose-600">1.432</div>
              <div class="text-sm font-bold text-rose-500 mb-1 flex items-center"><span class="material-symbols-outlined text-sm">trending_up</span> +12%</div>
            </div>
          </div>
          <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div class="text-sm font-semibold text-slate-500 mb-2">RELATOS RESOLVIDOS</div>
            <div class="flex items-end gap-3">
              <div class="text-3xl font-black text-emerald-600">8.901</div>
              <div class="text-sm font-bold text-emerald-500 mb-1 flex items-center"><span class="material-symbols-outlined text-sm">trending_up</span> +5%</div>
            </div>
          </div>
          <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div class="text-sm font-semibold text-slate-500 mb-2">ENGAJAMENTO</div>
            <div class="flex items-end gap-3">
              <div class="text-3xl font-black text-indigo-600">68%</div>
              <div class="text-sm font-bold text-indigo-500 mb-1">Estável</div>
            </div>
          </div>
        </div>

        <!-- Heatmap -->
        <section class="animate-slide-up stagger-4">
          <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Pontos Críticos e Relatos ao Vivo</h2>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
             <div class="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4 relative overflow-hidden">
                <!-- simulated heatmap -->
                <div class="absolute inset-0 bg-gradient-to-br from-blue-200 to-emerald-200 dark:from-blue-900/40 dark:to-emerald-900/40 opacity-80"></div>
                <div class="absolute top-1/4 left-1/4 w-12 h-12 bg-rose-500/50 rounded-full blur-xl"></div>
                <div class="absolute top-1/2 left-2/3 w-16 h-16 bg-amber-500/50 rounded-full blur-xl"></div>
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-600 dark:text-slate-300 text-4xl">map</span>
                </div>
             </div>
             <button class="w-full py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
               Despachar Equipe
             </button>
          </div>
        </section>

        <!-- Fila de Ações -->
        <section class="animate-slide-up stagger-5">
          <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Fila de Ações</h2>
          <div class="space-y-3">
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
              <div>
                <div class="font-bold text-slate-900 dark:text-white">Aprovação de Orçamento</div>
                <div class="text-sm text-slate-500">Reparo Av. Central</div>
              </div>
              <div class="flex gap-2">
                <button class="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold">Aprovar</button>
                <button class="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold">Revisar</button>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Obras -->
        <section class="animate-slide-up stagger-6">
          <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Obras Públicas</h2>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
             <div class="flex justify-between items-center mb-2">
               <div class="font-bold text-slate-900 dark:text-white">Nova Praça Sul</div>
               <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">No Prazo</span>
             </div>
             <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                <div class="bg-emerald-500 h-2 rounded-full w-[45%]"></div>
             </div>
          </div>
        </section>
      </div>

      <!-- Bottom Nav -->
      <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-3 pb-safe z-40">
        <button class="flex flex-col items-center text-slate-900 dark:text-white">
          <span class="material-symbols-outlined">monitoring</span>
          <span class="text-[10px] font-medium mt-1">Visão Geral</span>
        </button>
        <button class="flex flex-col items-center text-slate-400 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined">assignment_turned_in</span>
          <span class="text-[10px] font-medium mt-1">Relatos</span>
        </button>
        <div class="w-12"></div>
        <button class="flex flex-col items-center text-slate-400 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined">campaign</span>
          <span class="text-[10px] font-medium mt-1">Comunicar</span>
        </button>
        <button class="flex flex-col items-center text-slate-400 hover:text-slate-900 transition-colors">
          <span class="material-symbols-outlined">admin_panel_settings</span>
          <span class="text-[10px] font-medium mt-1">Config</span>
        </button>
      </nav>

      <!-- Voice FAB -->
      <button id="voice-fab" class="fixed bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg flex items-center justify-center z-50 transition-transform active:scale-90">
        <span class="material-symbols-outlined text-2xl">mic</span>
      </button>
    </div>
  `;
  
  const voiceFab = container.querySelector('#voice-fab');
  voiceFab.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('voice-assist-toggle'));
  });
}
