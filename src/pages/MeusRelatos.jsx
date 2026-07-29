import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function MeusRelatos() {
  const [filter, setFilter] = useState('Todos');
  const { user } = useAuth();
  const { projetos, problemas } = useData();

  const role = user?.role || 'morador';
  const isPrefeitura = role === 'prefeitura';
  const isEmpresa = role === 'empresa';

  // Format list items for display
  const allItems = isPrefeitura
    ? problemas.map((p) => ({
        id: p.id,
        title: p.titulo,
        subtitle: `${p.bairro} • Solicitado por ${p.criadoPor}`,
        status: p.status,
        progress: p.status === 'resolvido' ? 100 : p.status === 'em_progresso' || p.status === 'execucao' ? 60 : 25,
        type: 'Demanda Urbana'
      }))
    : isEmpresa
    ? projetos.map((pr) => ({
        id: pr.id,
        title: pr.titulo,
        subtitle: `Patrocínio: ${pr.empresa || 'Disponível para Aporte'} • ${pr.valorInvestimento}`,
        status: pr.status,
        progress: Math.round((pr.etapas.filter((e) => e.concluida).length / pr.etapas.length) * 100),
        type: 'Projeto ESG'
      }))
    : projetos.map((pr) => ({
        id: pr.id,
        title: pr.titulo,
        subtitle: `${pr.bairro} • Líder: ${pr.lider}`,
        status: pr.status,
        progress: Math.round((pr.etapas.filter((e) => e.concluida).length / pr.etapas.length) * 100),
        type: 'Projeto'
      }));

  const filteredItems = allItems.filter((item) => {
    if (filter === 'Todos') return true;
    if (filter === 'Em análise') return item.status === 'em_analise' || item.status === 'pendente' || item.status === 'aprovado';
    if (filter === 'Em execução') return item.status === 'em_progresso' || item.status === 'execucao';
    if (filter === 'Resolvido') return item.status === 'resolvido' || item.status === 'concluido';
    return true;
  });

  const getPageTitle = () => {
    if (isPrefeitura) return 'Gestão de Projetos Urbanos e Demandas';
    if (isEmpresa) return 'Portfólio de Projetos ESG Patrocinados';
    return 'Meus Relatos e Projetos';
  };

  const getPageSubtitle = () => {
    if (isPrefeitura) return 'Supervisão técnica de relatos e obras do município.';
    if (isEmpresa) return 'Acompanhamento do impacto social dos seus investimentos.';
    return 'Acompanhe suas contribuições e projetos ativos na comunidade.';
  };

  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>{getPageTitle()}</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>{getPageSubtitle()}</p>
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

        {/* List of items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredItems.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '20px', fontSize: '13px', color: 'var(--outline)' }}>
              Nenhum item encontrado no status "{filter}".
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        {isPrefeitura ? 'location_city' : isEmpresa ? 'domain' : 'build'}
                      </span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>{item.title}</h3>
                      <div style={{ fontSize: '10px', color: 'var(--outline)' }}>{item.subtitle}</div>
                    </div>
                  </div>

                  <span
                    className={`badge ${
                      item.status === 'resolvido' || item.status === 'concluido'
                        ? 'badge-resolvido'
                        : item.status === 'em_progresso' || item.status === 'execucao'
                        ? 'badge-em-andamento'
                        : 'badge-em-analise'
                    }`}
                  >
                    {item.status === 'resolvido' || item.status === 'concluido'
                      ? 'Resolvido ✓'
                      : item.status === 'em_progresso' || item.status === 'execucao'
                      ? 'Em Execução'
                      : 'Em Análise'}
                  </span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', color: 'var(--outline)', marginBottom: '4px' }}>
                    <span>Progresso do Projeto / Atendimento</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
