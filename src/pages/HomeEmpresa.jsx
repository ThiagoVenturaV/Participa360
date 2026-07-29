import React from 'react';
import Header from '../components/Header';

export default function HomeEmpresa() {
  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="card" style={{ padding: '20px', borderRadius: '24px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)', marginBottom: '8px' }}>Bem-vindo de volta, Acme Corp</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', lineHeight: '1.5', marginBottom: '16px' }}>
            Suas iniciativas de responsabilidade social corporativa estão fazendo uma diferença tangível na comunidade.
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Explorar Novas Parcerias</button>
            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>Baixar Relatório ROI</button>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="grid-2">
          <div className="card card-metric">
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <span className="material-symbols-outlined">favorite</span>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--on-surface)' }}>12,5 mil</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>VIDAS IMPACTADAS</div>
          </div>

          <div className="card card-metric">
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--on-surface)' }}>R$ 450 mil</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>INVESTIMENTO TOTAL</div>
          </div>
        </div>

        {/* Sponsorship Opportunities */}
        <section className="section" style={{ marginBottom: 0 }}>
          <h3 className="section-title" style={{ fontSize: '15px', marginBottom: '12px' }}>Oportunidades de Patrocínio</h3>

          <div className="card" style={{ padding: '16px', borderRadius: '20px' }}>
            <div className="hero-card" style={{ minHeight: '130px', padding: '16px', marginBottom: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: '16px' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#ffffff', width: 'max-content', marginBottom: '4px' }}>
                Espaço Público
              </span>
              <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Polo Digital da Biblioteca Central</h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: 'var(--outline)', marginBottom: '6px' }}>
              <span>US$ 50 mil Arrecadados</span>
              <span>Meta: US$ 150 mil</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '33%' }}></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
