import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function HomeMorador() {
  const navigate = useNavigate();
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleVote = (option) => {
    setSelectedPoll(option);
    setVoted(true);
  };

  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Big Report Button */}
        <button
          onClick={() => navigate('/reportar')}
          className="btn btn-primary btn-lg btn-block"
          style={{ gap: '12px', fontSize: '18px', fontWeight: '800', boxShadow: 'var(--shadow-ambient)', borderRadius: '16px' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>report_problem</span>
          Reportar Problema
        </button>

        {/* Rewards Preview */}
        <section className="section" style={{ marginBottom: 0 }}>
          <div className="section-header">
            <h2 className="section-title" style={{ fontSize: '16px' }}>Recompensas</h2>
            <button onClick={() => navigate('/marketplace')} className="btn btn-ghost btn-sm" style={{ fontWeight: '700', padding: 0 }}>
              Ver todas →
            </button>
          </div>

          <div className="grid-2">
            <div onClick={() => navigate('/marketplace')} className="card" style={{ cursor: 'pointer' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#fffbe3', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <span className="material-symbols-outlined">directions_bus</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>Passe Livre</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--secondary)', marginTop: '4px' }}>300 pts</div>
            </div>

            <div onClick={() => navigate('/marketplace')} className="card" style={{ cursor: 'pointer' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <span className="material-symbols-outlined">park</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>Plantio de Árvore</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--secondary)', marginTop: '4px' }}>500 pts</div>
            </div>
          </div>
        </section>

        {/* Enquete da Cidade */}
        <section className="hero-card" style={{ padding: '20px', borderRadius: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c3c0ff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>poll</span>
            Enquete da Cidade
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', lineHeight: '1.4' }}>
            Qual área precisa de novas ciclovias a seguir?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Distrito Norte', 'Centro da Cidade'].map((option) => (
              <button
                key={option}
                onClick={() => handleVote(option)}
                className="btn"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  backgroundColor: selectedPoll === option ? 'var(--secondary)' : '#ffffff',
                  color: selectedPoll === option ? '#ffffff' : 'var(--on-surface)',
                  fontSize: '13px',
                  borderRadius: '12px',
                  padding: '10px 16px'
                }}
              >
                {option} {voted && selectedPoll === option && ' ✓ (+5 pts)'}
              </button>
            ))}
          </div>
        </section>

        {/* Feed da Comunidade */}
        <section className="section" style={{ marginBottom: 0 }}>
          <div className="section-header">
            <h2 className="section-title" style={{ fontSize: '16px' }}>Feed da Comunidade</h2>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span className="chip chip-active">Todos</span>
              <span className="chip">Oficial</span>
            </div>
          </div>

          <div className="card feed-item" style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>Câmara Municipal</div>
                <div style={{ fontSize: '11px', color: 'var(--outline)' }}>Atualização Oficial • 2h atrás</div>
              </div>
            </div>

            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>
              Projeto de Recapeamento da Rua Principal
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--on-surface)', lineHeight: '1.5' }}>
              As obras começarão nesta segunda-feira na Rua Principal. Espere atrasos e use rotas alternativas.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
