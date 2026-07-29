import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function Marketplace() {
  const { user } = useAuth();
  const points = user?.points || 450;

  const rewards = [
    {
      id: 1,
      title: 'Passe Único Integração',
      category: 'MOBILIDADE',
      desc: 'Válido por 24h em toda a rede de transporte público municipal.',
      cost: 150,
      available: true
    },
    {
      id: 2,
      title: 'Apadrinhe uma Árvore',
      category: 'SUSTENTABILIDADE',
      desc: 'A prefeitura plantará uma muda nativa em seu nome no Parque Central.',
      cost: 300,
      available: true
    },
    {
      id: 3,
      title: '5% Desconto no IPTU',
      category: 'TRIBUTOS',
      desc: 'Garanta 5% de desconto extra na cota única do IPTU do próximo ano.',
      cost: 1000,
      available: false
    }
  ];

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <Header showPoints={false} />

      <main className="px-5 pt-3 space-y-5">
        <div>
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Recompensas</h1>
          <p className="text-xs text-slate-500 mt-0.5">Troque seus pontos por benefícios na cidade.</p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#1f108e] to-[#006c49] text-white rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-indigo-200">
            <span>SALDO ATUAL</span>
            <span className="flex items-center gap-1 cursor-pointer">
              <span className="material-symbols-outlined text-sm">history</span> Histórico
            </span>
          </div>

          <div className="text-4xl font-black">{points} <span className="text-xl font-normal">pts</span></div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-indigo-200">
              <span>Nível 2: Cidadão Engajado</span>
              <span>50 pts para Nível 3</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>

        {/* Daily Mission */}
        <div className="bg-[#e5eeff] rounded-2xl p-4 border border-indigo-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1f108e] text-white flex items-center justify-center">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <div>
              <div className="text-xs font-bold text-[#0b1c30]">Missão do Dia</div>
              <div className="text-[11px] text-slate-600">Reporte um buraco na sua rua.</div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#006c49] text-white text-xs font-bold">
            +20 pts
          </span>
        </div>

        {/* Benefits Showcase */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#0b1c30]">Vitrine de Benefícios</h2>

          <div className="space-y-4">
            {rewards.map((r) => (
              <div key={r.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {r.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006c49] text-xs font-bold">
                    ✪ {r.cost} pts
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#0b1c30]">{r.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>

                <button
                  disabled={points < r.cost}
                  className={`w-full py-3 rounded-full text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                    points >= r.cost
                      ? 'bg-[#1f108e] text-white hover:bg-indigo-950 shadow-md shadow-indigo-100'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {points >= r.cost ? 'Resgatar →' : 'Pontos Insuficientes 🔒'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
