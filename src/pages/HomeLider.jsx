import React from 'react';
import Header from '../components/Header';

export default function HomeLider() {
  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <Header showPoints={false} />

      <main className="px-5 pt-3 space-y-5">
        <div>
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Bom dia, Elena.</h1>
          <p className="text-xs text-slate-500 mt-0.5">Veja o que está acontecendo no bairro Northside hoje.</p>
        </div>

        <button className="w-full py-3.5 px-6 rounded-2xl bg-[#1f108e] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          NOVO PROJETO
        </button>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-sm">trending_up</span> +12% esta semana
            </div>
            <div className="text-2xl font-black text-[#0b1c30]">1.248</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">MORADORES ATIVOS</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="text-xs font-bold text-indigo-600 flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-sm">groups</span> Pronto para ajudar
            </div>
            <div className="text-2xl font-black text-[#0b1c30]">342</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">VOLUNTÁRIOS</div>
          </div>
        </div>

        {/* Campaign Banner */}
        <div className="bg-[#1f108e] text-white rounded-3xl p-5 shadow-lg">
          <div className="text-sm font-bold mb-1">Limpeza de fim de semana</div>
          <div className="text-xs text-indigo-200 mb-3">Iniciativa Parque Riverside</div>
          <div className="flex justify-between text-[11px] font-semibold text-indigo-200 mb-1">
            <span>Vagas de voluntários preenchidas</span>
            <span>45/50</span>
          </div>
          <div className="w-full bg-indigo-950 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>

        {/* Urgent Tasks */}
        <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0b1c30]">Necessidades e Tarefas Urgentes</h3>
            <span className="text-xs font-bold text-[#1f108e] cursor-pointer">VER TODOS →</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">warning</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Aglomerado de Buracos</div>
                  <div className="text-[11px] text-slate-500">Rua Oak e 5ª Ave • 12 moradores</div>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-full bg-indigo-100 text-[#1f108e] text-xs font-bold hover:bg-indigo-200">
                ATRIBUIR
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">park</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Plantio de Árvores</div>
                  <div className="text-[11px] text-slate-500">Precisa de 3 caminhões • Amanhã</div>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-full bg-indigo-100 text-[#1f108e] text-xs font-bold hover:bg-indigo-200">
                GERENCIAR
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
