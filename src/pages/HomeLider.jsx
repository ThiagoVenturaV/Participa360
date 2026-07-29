import React from 'react';
import Header from '../components/Header';

export default function HomeLider() {
  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>Bom dia, Elena.</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>Veja o que está acontecendo no bairro Northside hoje.</p>
        </div>

        <button className="btn btn-primary btn-lg btn-block" style={{ gap: '8px', borderRadius: '16px', boxShadow: 'var(--shadow-ambient)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_circle</span>
          NOVO PROJETO
        </button>

        {/* Metrics Grid */}
        <div className="grid-2">
          <div className="card">
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>trending_up</span> +12% esta semana
            </div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>1.248</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>MORADORES ATIVOS</div>
          </div>

          <div className="card">
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>groups</span> Pronto para ajudar
            </div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>342</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>VOLUNTÁRIOS</div>
          </div>
        </div>

        {/* Campaign Banner */}
        <div className="hero-card" style={{ padding: '20px', borderRadius: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>Limpeza de fim de semana</div>
          <div style={{ fontSize: '12px', color: '#c3c0ff', marginBottom: '12px' }}>Iniciativa Parque Riverside</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', color: '#c3c0ff', marginBottom: '4px' }}>
            <span>Vagas de voluntários preenchidas</span>
            <span>45/50</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '90%' }}></div>
          </div>
        </div>

        {/* Urgent Tasks */}
        <section className="card" style={{ padding: '20px', borderRadius: '24px' }}>
          <div className="section-header">
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--on-surface)' }}>Necessidades e Tarefas Urgentes</h3>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>VER TODOS →</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', padding: '12px', borderRadius: '16px', backgroundColor: 'var(--surface-container)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fef2f2', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>warning</span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }}>Aglomerado de Buracos</div>
                  <div style={{ fontSize: '11px', color: 'var(--outline)' }}>Rua Oak e 5ª Ave • 12 moradores</div>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm">ATRIBUIR</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', padding: '12px', borderRadius: '16px', backgroundColor: 'var(--surface-container)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>park</span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }}>Plantio de Árvores</div>
                  <div style={{ fontSize: '11px', color: 'var(--outline)' }}>Precisa de 3 caminhões • Amanhã</div>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm">GERENCIAR</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
