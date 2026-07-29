import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function HomeMorador() {
  const navigate = useNavigate();
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleVote = (option) => {
    setSelectedPoll(option);
    setVoted(true);
  };

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <Header />

      <main className="px-5 pt-3 space-y-5">
        {/* Big Report Button */}
        <button
          onClick={() => navigate('/reportar')}
          className="w-full py-4 px-6 rounded-2xl bg-[#1f108e] text-white font-extrabold text-lg flex items-center justify-center gap-3 shadow-xl shadow-indigo-200 hover:bg-indigo-950 transition-all transform active:scale-98"
        >
          <span className="material-symbols-outlined text-3xl">report_problem</span>
          Reportar Problema
        </button>

        {/* Rewards Preview */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-[#0b1c30]">Recompensas</h2>
            <button onClick={() => navigate('/marketplace')} className="text-xs font-bold text-[#1f108e] hover:underline flex items-center gap-0.5">
              Ver todas <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div onClick={() => navigate('/marketplace')} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                <span className="material-symbols-outlined">directions_bus</span>
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1">Passe Livre</div>
              <div className="text-[11px] font-bold text-[#006c49] mt-1">300 pts</div>
            </div>

            <div onClick={() => navigate('/marketplace')} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <span className="material-symbols-outlined">park</span>
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1">Plantio de Árvore</div>
              <div className="text-[11px] font-bold text-[#006c49] mt-1">500 pts</div>
            </div>
          </div>
        </section>

        {/* Enquete da Cidade */}
        <section className="bg-[#1f108e] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-indigo-200 flex items-center gap-1.5 mb-2">
            <span className="material-symbols-outlined text-sm">poll</span>
            Enquete da Cidade
          </div>
          <h3 className="text-sm font-bold leading-snug mb-4">
            Qual área precisa de novas ciclovias a seguir?
          </h3>

          <div className="space-y-2">
            {['Distrito Norte', 'Centro da Cidade'].map((option) => (
              <button
                key={option}
                onClick={() => handleVote(option)}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-left transition-all ${
                  selectedPoll === option
                    ? 'bg-emerald-500 text-white font-bold'
                    : 'bg-white text-slate-900 hover:bg-indigo-50'
                }`}
              >
                {option} {voted && selectedPoll === option && ' ✓ (+5 pts)'}
              </button>
            ))}
          </div>
        </section>

        {/* Feed da Comunidade */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0b1c30]">Feed da Comunidade</h2>
            <div className="flex gap-1 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#1f108e] text-white font-semibold">Todos</span>
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 font-semibold">Oficial</span>
            </div>
          </div>

          {/* Feed Post 1 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-900 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">account_balance</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Câmara Municipal</div>
                <div className="text-[11px] text-slate-400">Atualização Oficial • 2h atrás</div>
              </div>
            </div>

            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              Projeto de Recapeamento da Rua Principal
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              As obras começarão nesta segunda-feira na Rua Principal, entre a 4ª e a 8ª Avenida. Espere atrasos e use rotas alternativas.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-slate-500 font-medium">
              <button className="flex items-center gap-1 hover:text-indigo-600">
                <span className="material-symbols-outlined text-base">thumb_up</span> 124
              </button>
              <button className="flex items-center gap-1 hover:text-indigo-600">
                <span className="material-symbols-outlined text-base">chat</span> 18
              </button>
            </div>
          </div>

          {/* Feed Post 2 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  MG
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Maria G.</div>
                  <div className="text-[10px] text-slate-400">Vizinha • 5h atrás</div>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006c49] text-[10px] font-bold">
                ✓ Resolvido
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Obrigada à cidade por consertar o poste de luz na rua Oak tão rápido! Torna o passeio com o cachorro muito mais seguro à noite.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
