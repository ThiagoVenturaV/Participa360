import React from 'react';
import Header from '../components/Header';
import heatmapMapImg from '../assets/heatmap_map.jpg';

export default function HomePrefeitura() {
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
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

        {/* Heatmap Section - Exactly matching Stitch screen reference */}
        <section className="card" style={{ padding: '20px', borderRadius: '24px' }}>
          <div className="section-header">
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--on-surface)' }}>Pontos Críticos e Relatos ao Vivo</h3>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>Filtros</span>
          </div>

          {/* Map container with actual heatmap background image */}
          <div
            style={{
              width: '100%',
              minHeight: '260px',
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
              marginTop: '12px'
            }}
          >
            {/* Overlay card matching user screenshot 1 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: 'var(--shadow-elevated)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--error)', display: 'inline-block' }}></span>
                <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--on-surface)' }}>Crítico: Infraestrutura</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--on-surface)', lineHeight: '1.4' }}>
                Centro, Rua Principal. Rompimento na rede de água relatado por 15 cidadãos.
              </p>
              <button
                className="btn btn-primary btn-block"
                style={{ borderRadius: '9999px', marginTop: '4px', fontSize: '13px', fontWeight: '700' }}
              >
                Despachar Equipe
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
