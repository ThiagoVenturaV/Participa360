import React from 'react';
import Header from '../components/Header';

export default function HomeEmpresa() {
  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <Header showPoints={false} />

      <main className="px-5 pt-3 space-y-5">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Bem-vindo de volta, Acme Corp</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Suas iniciativas de responsabilidade social corporativa estão fazendo uma diferença tangível na comunidade.
          </p>

          <div className="flex gap-2 pt-2">
            <button className="flex-1 py-2.5 px-3 rounded-xl bg-[#1f108e] text-white text-xs font-bold hover:bg-indigo-900">
              Explorar Novas Parcerias
            </button>
            <button className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100">
              Baixar Relatório ROI
            </button>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <span className="material-symbols-outlined">favorite</span>
            </div>
            <div className="text-2xl font-black text-[#0b1c30]">12,5 mil</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">VIDAS IMPACTADAS</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div className="text-2xl font-black text-[#0b1c30]">US$ 450 mil</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">INVESTIMENTO TOTAL</div>
          </div>
        </div>

        {/* Sponsorship Opportunities */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-[#0b1c30]">Oportunidades de Patrocínio</h3>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
            <div className="h-32 rounded-xl bg-gradient-to-r from-indigo-800 to-purple-800 p-4 text-white flex flex-col justify-end">
              <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-[10px] font-bold w-max mb-1">
                Espaço Público
              </span>
              <h4 className="text-sm font-bold">Polo Digital da Biblioteca Central</h4>
            </div>
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>US$ 50 mil Arrecadados</span>
              <span>Meta: US$ 150 mil</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-[#1f108e] h-full rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
