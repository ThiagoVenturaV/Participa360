import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import parkImg from '../assets/park_revitalization.jpg';

export default function DetalhesProjeto() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [volunteered, setVolunteered] = useState(false);

  const handleVolunteer = () => {
    setVolunteered(true);
    showToast('Inscrição realizada como voluntário no projeto! 🎉', 'success');
  };

  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <header className="header" style={{ borderBottom: '1px solid var(--surface-dim)', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} className="btn btn-ghost" style={{ padding: 0, minHeight: 'auto' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--on-surface)' }}>Detalhes do Projeto</h1>
        </div>
      </header>

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Hero project card with image */}
        <div
          style={{
            position: 'relative',
            minHeight: '200px',
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundImage: `url(${parkImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justify: 'flex-end',
            padding: '20px',
            boxShadow: 'var(--shadow-ambient)'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 28, 48, 0.85) 0%, transparent 100%)' }}></div>
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span className="badge badge-resolvido" style={{ width: 'max-content' }}>
              Em Andamento
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff', lineHeight: '1.3' }}>Revitalização da Praça Central</h2>
            <div style={{ fontSize: '12px', color: '#e2dfff', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span> Bairro Jardim Esperança
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="card">
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Sobre o Projeto</h3>
          <p style={{ fontSize: '13px', color: 'var(--outline)', lineHeight: '1.5' }}>
            Este projeto visa transformar a antiga praça em um espaço de convivência moderno e seguro para todas as idades. Inclui a instalação de novos bancos ecológicos, iluminação de LED e um playground moderno.
          </p>
        </div>

        {/* Progress Timeline */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Progresso</h3>
            <span style={{ fontSize: '14px', fontWeight: '900', color: 'var(--primary)' }}>65%</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--secondary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>✓</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700' }}>Fase 1: Limpeza</div>
                <div style={{ fontSize: '10px', color: 'var(--outline)' }}>Remoção de entulhos e preparação do terreno.</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>2</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700' }}>Fase 2: Infraestrutura</div>
                <div style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: '600' }}>Em andamento • Fiação e tubulação</div>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer CTA */}
        <div className="card" style={{ backgroundColor: 'var(--surface-container)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>handshake</span>
          </div>
          <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Participe!</h3>
          <p style={{ fontSize: '12px', color: 'var(--outline)' }}>{volunteered ? '✓ Você é um voluntário inscrito neste projeto!' : 'Precisamos de voluntários para o plantio de mudas neste final de semana.'}</p>
          <button
            onClick={handleVolunteer}
            disabled={volunteered}
            className={`btn ${volunteered ? 'btn-success' : 'btn-primary'} btn-block`}
            style={{ borderRadius: '9999px' }}
          >
            {volunteered ? 'Inscrito como Voluntário ✓' : 'Quero ser Voluntário'}
          </button>
        </div>
      </main>
    </div>
  );
}
