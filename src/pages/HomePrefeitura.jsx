import React from 'react';
import Header from '../components/Header';

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

        {/* Heatmap Section */}
        <section className="card" style={{ padding: '20px', borderRadius: '24px' }}>
          <div className="section-header">
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--on-surface)' }}>Pontos Críticos e Relatos ao Vivo</h3>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>Filtros</span>
          </div>

          <div style={{ width: '100%', height: '180px', borderRadius: '16px', background: 'linear-gradient(135deg, #fef3c7 0%, #ffe4e6 50%, #e0e7ff 100%)', border: '1px solid var(--outline-variant)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px', marginTop: '12px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '12px', boxShadow: 'var(--shadow-default)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--error)', display: 'inline-block' }}></span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--on-surface)' }}>Crítico: Infraestrutura</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--outline)', marginBottom: '8px' }}>Centro, Rua Principal. Rompimento na rede de água relatado por 15 cidadãos.</p>
              <button className="btn btn-primary btn-sm btn-block">Despachar Equipe</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
