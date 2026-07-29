import React, { useState } from 'react';
import Header from '../components/Header';
import { useToast } from '../components/Toast';
import heatmapMapImg from '../assets/heatmap_map.jpg';

export default function HomePrefeitura() {
  const { showToast } = useToast();
  const [dispatched, setDispatched] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleDispatch = () => {
    setDispatched(true);
    showToast('Equipe de emergência despachada para o Centro (Rua Principal)! 🚒⚡', 'success');
  };

  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>Painel de Gestão da Prefeitura</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>Supervisão em tempo real das operações cívicas.</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => showToast('1.432 relatos em acompanhamento pela gestão', 'info')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fef2f2', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>warning</span>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROBLEMAS ATIVOS</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>1.432</div>
              </div>
            </div>
            <span className="badge badge-urgente">+12% vs sem. passada</span>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => showToast('8.901 relatos solucionados nos últimos 30 dias', 'info')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RELATOS RESOLVIDOS</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>8.901</div>
              </div>
            </div>
            <span className="badge badge-resolvido">+5% vs sem. passada</span>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => showToast('Taxa de engajamento populacional: 68%', 'info')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>group</span>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TAXA DE ENGAJAMENTO</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>68%</div>
              </div>
            </div>
            <span className="badge badge-em-analise">Estável</span>
          </div>
        </div>

        {/* Heatmap Section */}
        <section className="card" style={{ padding: '20px', borderRadius: '24px' }}>
          <div className="section-header">
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--on-surface)' }}>Pontos Críticos e Relatos ao Vivo</h3>
            <span onClick={() => setShowFilterModal(true)} style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>Filtros ({selectedFilter})</span>
          </div>

          <div
            style={{
              width: '100%',
              minHeight: '340px',
              borderRadius: '20px',
              backgroundImage: `url(${heatmapMapImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid var(--surface-dim)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justify: 'flex-end',
              padding: '16px',
              marginTop: '12px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '14px',
                boxShadow: 'var(--shadow-elevated)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: dispatched ? 'var(--secondary)' : 'var(--error)', display: 'inline-block' }}></span>
                <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--on-surface)' }}>
                  {dispatched ? 'Em Atendimento: Equipe Despachada' : 'Crítico: Infraestrutura'}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--on-surface)', lineHeight: '1.4' }}>
                Centro, Rua Principal. Rompimento na rede de água relatado por 15 cidadãos.
              </p>
              <button
                onClick={handleDispatch}
                disabled={dispatched}
                className={`btn ${dispatched ? 'btn-success' : 'btn-primary'} btn-block`}
                style={{ borderRadius: '9999px', marginTop: '4px', fontSize: '13px', fontWeight: '700' }}
              >
                {dispatched ? 'EQUIPE EM DESLOCAMENTO ✓' : 'Despachar Equipe'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-backdrop">
          <div className="modal animate-slide-up">
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px' }}>Filtrar Pontos Críticos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Todos', 'Infraestrutura', 'Iluminação', 'Coleta de Lixo', 'Trânsito'].map((f) => (
                <button
                  key={f}
                  onClick={() => { setSelectedFilter(f); setShowFilterModal(false); showToast(`Filtro "${f}" aplicado!`, 'info'); }}
                  className={`btn ${selectedFilter === f ? 'btn-primary' : 'btn-outline'} btn-block`}
                  style={{ justifyContent: 'flex-start' }}
                >
                  {f}
                </button>
              ))}
            </div>
            <button onClick={() => setShowFilterModal(false)} className="btn btn-ghost btn-block" style={{ marginTop: '12px' }}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
