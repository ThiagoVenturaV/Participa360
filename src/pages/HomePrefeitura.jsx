import React from 'react';
import Header from '../components/Header';

export default function HomePrefeitura() {
  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <Header showPoints={false} />

      <main className="px-5 pt-3 space-y-5">
        <div>
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Painel de Gestão da Prefeitura</h1>
          <p className="text-xs text-slate-500 mt-0.5">Supervisão em tempo real das operações cívicas.</p>
        </div>

        {/* Stats Grid */}
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">warning</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PROBLEMAS ATIVOS</div>
                <div className="text-2xl font-black text-[#0b1c30]">1.432</div>
              </div>
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">+12% vs sem. passada</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">check_circle</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">RELATOS RESOLVIDOS</div>
                <div className="text-2xl font-black text-[#0b1c30]">8.901</div>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+5% vs sem. passada</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">group</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TAXA DE ENGAJAMENTO</div>
                <div className="text-2xl font-black text-[#0b1c30]">68%</div>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">Estável</span>
          </div>
        </div>

        {/* Heatmap Section */}
        <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0b1c30]">Pontos Críticos e Relatos ao Vivo</h3>
            <span className="text-xs font-bold text-indigo-700 cursor-pointer">Filtros</span>
          </div>

          <div className="w-full h-44 rounded-2xl bg-gradient-to-tr from-amber-100 via-rose-100 to-indigo-100 border border-slate-200 relative overflow-hidden flex flex-col justify-end p-3">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-md space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                <span className="text-xs font-bold text-slate-900">Crítico: Infraestrutura</span>
              </div>
              <p className="text-[11px] text-slate-600">Centro, Rua Principal. Rompimento na rede de água relatado por 15 cidadãos.</p>
              <button className="w-full py-2 rounded-xl bg-[#1f108e] text-white text-xs font-bold hover:bg-indigo-900">
                Despachar Equipe
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
