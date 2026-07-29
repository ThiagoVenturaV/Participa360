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
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>Recompensas</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>Troque seus pontos por benefícios na cidade.</p>
        </div>

        {/* Balance Card */}
        <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: '#ffffff', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-ambient)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', color: '#c3c0ff' }}>
            <span>SALDO ATUAL</span>
            <span style={{ display: 'flex', items: 'center', gap: '4px', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>history</span> Histórico
            </span>
          </div>

          <div style={{ fontSize: '36px', fontWeight: '900' }}>{points} <span style={{ fontSize: '18px', fontWeight: '400' }}>pts</span></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', color: '#c3c0ff' }}>
              <span>Nível 2: Cidadão Engajado</span>
              <span>50 pts para Nível 3</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>

        {/* Daily Mission */}
        <div className="card" style={{ backgroundColor: 'var(--surface-container)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined">eco</span>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>Missão do Dia</div>
              <div style={{ fontSize: '11px', color: 'var(--outline)' }}>Reporte um buraco na sua rua.</div>
            </div>
          </div>
          <span className="badge badge-resolvido">+20 pts</span>
        </div>

        {/* Benefits Showcase */}
        <section className="section" style={{ marginBottom: 0 }}>
          <h2 className="section-title" style={{ fontSize: '16px', marginBottom: '12px' }}>Vitrine de Benefícios</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {rewards.map((r) => (
              <div key={r.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--outline)' }}>
                    {r.category}
                  </span>
                  <span className="badge badge-resolvido">
                    ✪ {r.cost} pts
                  </span>
                </div>

                <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--on-surface)' }}>{r.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--outline)', lineHeight: '1.5' }}>{r.desc}</p>

                <button
                  disabled={points < r.cost}
                  className={`btn ${points >= r.cost ? 'btn-primary' : 'btn-outline'} btn-block`}
                  style={{ borderRadius: '9999px', opacity: points < r.cost ? 0.5 : 1 }}
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
