import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DetalhesProjeto() {
  const navigate = useNavigate();

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-600">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-[#0b1c30]">Detalhes do Projeto</h1>
        </div>
      </header>

      <main className="px-5 pt-4 space-y-5">
        {/* Project Card */}
        <div className="bg-gradient-to-r from-emerald-800 to-indigo-900 text-white rounded-3xl p-6 shadow-xl space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 text-[10px] font-extrabold uppercase">
            Em Andamento
          </span>
          <h2 className="text-xl font-black leading-tight pt-1">Revitalização da Praça Central</h2>
          <div className="text-xs text-indigo-200 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">location_on</span> Bairro Jardim Esperança
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-2">
          <h3 className="text-sm font-bold text-[#0b1c30]">Sobre o Projeto</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Este projeto visa transformar a antiga praça em um espaço de convivência moderno e seguro para todas as idades. Inclui a instalação de novos bancos ecológicos, iluminação de LED e um playground moderno.
          </p>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#0b1c30]">Progresso</h3>
            <span className="text-sm font-black text-[#1f108e]">65%</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-[#1f108e] h-full rounded-full" style={{ width: '65%' }}></div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">✓</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Fase 1: Limpeza</div>
                <div className="text-[10px] text-slate-400">Remoção de entulhos e preparação do terreno.</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#1f108e] text-white flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Fase 2: Infraestrutura</div>
                <div className="text-[10px] text-indigo-600 font-semibold">Em andamento • Fiação e tubulação</div>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer CTA */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-5 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#1f108e] text-white flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">handshake</span>
          </div>
          <h3 className="text-sm font-bold text-[#0b1c30]">Participe!</h3>
          <p className="text-xs text-slate-600">Precisamos de voluntários para o plantio de mudas neste final de semana.</p>
          <button className="w-full py-3 rounded-full bg-[#1f108e] text-white text-xs font-bold hover:bg-indigo-950 shadow-md">
            Quero ser Voluntário
          </button>
        </div>
      </main>
    </div>
  );
}
