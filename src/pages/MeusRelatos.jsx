import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function MeusRelatos() {
  const [filter, setFilter] = useState('Todos');
  const [reports, setReports] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch('/api/reports', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setReports(data);
        }
      } catch (err) {
        console.error('Failed to fetch reports', err);
      }
    }
    fetchReports();
  }, [token]);

  const defaultReports = [
    {
      id: 1,
      category: 'Buraco na Via',
      address: 'Rua das Flores, 123',
      status: 'em_execucao',
      progress: 60,
      date: '12/10/2023'
    },
    {
      id: 2,
      category: 'Iluminação Quebrada',
      address: 'Praça Central',
      status: 'resolvido',
      progress: 100,
      date: '05/10/2023'
    },
    {
      id: 3,
      category: 'Coleta de Lixo Atrasada',
      address: 'Av. Brasil, Zona Sul',
      status: 'em_analise',
      progress: 20,
      date: 'Há 2 dias'
    }
  ];

  const displayReports = reports.length > 0 ? reports : defaultReports;

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <Header showPoints={false} />

      <main className="px-5 pt-3 space-y-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0b1c30]">Meus Relatos</h1>
          <p className="text-xs text-slate-500 mt-0.5">Acompanhe suas contribuições para a comunidade.</p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['Todos', 'Em análise', 'Em execução', 'Resolvido'].map((f) => (
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

        {/* List of reports */}
        <div className="space-y-3">
          {displayReports.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#1f108e] flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">build</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{item.category}</h3>
                    <div className="text-[10px] text-slate-400">{item.address}</div>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    item.status === 'resolvido'
                      ? 'bg-emerald-100 text-[#006c49]'
                      : item.status === 'em_execucao'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-[#1f108e]'
                  }`}
                >
                  {item.status === 'resolvido' ? 'Resolvido' : item.status === 'em_execucao' ? 'Em execução' : 'Em análise'}
                </span>
              </div>

              {item.status === 'em_execucao' && (
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                    <span>Progresso estimado</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-[#1f108e] h-full rounded-full" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
