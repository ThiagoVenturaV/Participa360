import React, { useState } from 'react';
import Header from '../components/Header';

export default function Alertas() {
  const [filter, setFilter] = useState('Todos');

  const alerts = [
    {
      id: 1,
      type: 'URGENTE',
      title: 'Interdição na Rua das Flores',
      desc: 'Devido a obras emergenciais na rede de esgoto, a Rua das Flores estará interditada nos próximos 2 dias. Evite a região.',
      time: 'Há 10 min',
      color: 'border-l-4 border-red-500'
    },
    {
      id: 2,
      type: 'ATUALIZAÇÃO DE RELATO',
      title: 'Buraco na calçada consertado',
      desc: 'O seu relato sobre o buraco na Av. Central foi marcado como resolvido pela prefeitura. Obrigado por contribuir!',
      time: '2h atrás',
      color: 'border-l-4 border-emerald-500'
    },
    {
      id: 3,
      type: 'CONVITE',
      title: 'Mutirão de Limpeza do Parque',
      desc: 'Junte-se a nós neste sábado para revitalizar o Parque das Águas. Precisamos de mãos extras para plantio de mudas.',
      time: 'Ontem',
      color: 'border-l-4 border-indigo-500'
    }
  ];

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <Header showPoints={false} />

      <main className="px-5 pt-3 space-y-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Alertas e Notificações</h1>
          <p className="text-xs text-slate-500 mt-0.5">Mantenha-se atualizado sobre sua comunidade.</p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['Todos', 'Meus Relatos', 'Voluntariado', 'Bairro'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filter === f ? 'bg-[#1f108e] text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Alerts list */}
        <div className="space-y-3">
          {alerts.map((item) => (
            <div key={item.id} className={`bg-white rounded-2xl p-4 border border-slate-100 shadow-sm ${item.color} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {item.type}
                </span>
                <span className="text-[10px] text-slate-400">{item.time}</span>
              </div>
              <h3 className="text-sm font-bold text-[#0b1c30]">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
