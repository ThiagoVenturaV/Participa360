import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportarSucesso() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '100vh', padding: '24px' }}>
      <div className="animate-scale-in" style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: 'var(--secondary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: 'var(--shadow-ambient)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>check</span>
      </div>

      <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--on-surface)', marginBottom: '8px' }}>Relato Enviado!</h1>
      <p style={{ fontSize: '13px', color: 'var(--outline)', maxWidth: '300px', lineHeight: '1.5', marginBottom: '32px' }}>
        A prefeitura foi notificada. Obrigado por ajudar a melhorar nossa comunidade.
      </p>

      {/* Gamification Points Awarded Card */}
      <div className="card" style={{ width: '100%', padding: '24px', borderRadius: '24px', textAlign: 'left', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>workspace_premium</span>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: 'var(--secondary)' }}>+10 Pontos Ganhos</div>
              <div style={{ fontSize: '12px', color: 'var(--outline)' }}>Saldo Total: 460 pts</div>
            </div>
          </div>
          <span className="badge badge-em-execucao">Nvl 4</span>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '75%' }}></div>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={() => navigate('/home')}
          className="btn btn-primary btn-lg btn-block"
        >
          Voltar para o Início
        </button>
        <button
          onClick={() => navigate('/meus-relatos')}
          className="btn btn-secondary btn-lg btn-block"
        >
          Ver Meus Relatos
        </button>
      </div>
    </div>
  );
}
