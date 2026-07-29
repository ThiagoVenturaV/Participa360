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
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>Meus Relatos</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>Acompanhe suas contribuições para a comunidade.</p>
        </div>

        {/* Filter chips */}
        <div className="scroll-h">
          {['Todos', 'Em análise', 'Em execução', 'Resolvido'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip ${filter === f ? 'chip-active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List of reports */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {displayReports.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>build</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>{item.category}</h3>
                    <div style={{ fontSize: '10px', color: 'var(--outline)' }}>{item.address}</div>
                  </div>
                </div>

                <span
                  className={`badge ${
                    item.status === 'resolvido'
                      ? 'badge-resolvido'
                      : item.status === 'em_execucao'
                      ? 'badge-em-analise'
                      : 'badge-em-execucao'
                  }`}
                >
                  {item.status === 'resolvido' ? 'Resolvido' : item.status === 'em_execucao' ? 'Em execução' : 'Em análise'}
                </span>
              </div>

              {item.status === 'em_execucao' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', color: 'var(--outline)', marginBottom: '4px' }}>
                    <span>Progresso estimado</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
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
