import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { useData } from '../context/DataContext';
import parkImg from '../assets/park_revitalization.jpg';

export default function DetalhesProjeto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();
  const { projetos, toggleEtapaProjeto, avaliarProjetoConcluido } = useData();

  const [volunteered, setVolunteered] = useState(false);
  const [rated, setRated] = useState(false);

  // Find target project or default to first project
  const project = projetos.find((p) => p.id === id) || projetos[0];

  const etapasConcluidas = project.etapas.filter((e) => e.concluida).length;
  const pct = Math.round((etapasConcluidas / project.etapas.length) * 100);

  const handleVolunteer = () => {
    setVolunteered(true);
    showToast('Inscrição realizada como voluntário no projeto! 🎉', 'success');
  };

  const handleAvaliar = () => {
    if (rated) return;
    setRated(true);
    avaliarProjetoConcluido(project.id);
    showToast('Obrigado por avaliar este projeto! +20 pontos creditados no seu saldo! 🌟', 'success');
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
            justifyContent: 'flex-end',
            padding: '20px',
            boxShadow: 'var(--shadow-ambient)'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 28, 48, 0.85) 0%, transparent 100%)' }}></div>
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span className={`badge ${project.status === 'concluido' ? 'badge-resolvido' : 'badge-em-andamento'}`} style={{ width: 'max-content' }}>
              {project.status === 'concluido' ? 'Projeto Concluído ✓' : 'Em Execução'}
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff', lineHeight: '1.3' }}>{project.titulo}</h2>
            <div style={{ fontSize: '12px', color: '#e2dfff', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span> Bairro: {project.bairro}
            </div>
          </div>
        </div>

        {/* Sponsor Banner if available */}
        {project.empresa && (
          <div className="card" style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '18px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--secondary)' }}>domain</span>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)' }}>Patrocinador ESG Corporativo</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--on-surface)' }}>{project.empresa} ({project.valorInvestimento})</div>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="card">
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Sobre o Projeto</h3>
          <p style={{ fontSize: '13px', color: 'var(--outline)', lineHeight: '1.5' }}>
            {project.descricao}
          </p>
        </div>

        {/* Progress Checklist */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Checklist de Etapas ({etapasConcluidas}/{project.etapas.length})</h3>
            <span style={{ fontSize: '14px', fontWeight: '900', color: 'var(--primary)' }}>{pct}%</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {project.etapas.map((etapa) => (
              <div
                key={etapa.id}
                onClick={() => {
                  toggleEtapaProjeto(project.id, etapa.id);
                  showToast(`Etapa "${etapa.titulo}" alternada!`, 'info');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  backgroundColor: etapa.concluida ? '#ecfdf5' : 'var(--surface-container)',
                  cursor: 'pointer'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: etapa.concluida ? 'var(--secondary)' : 'var(--outline)' }}>
                  {etapa.concluida ? 'check_box' : 'check_box_outline_blank'}
                </span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: etapa.concluida ? 'var(--secondary)' : 'var(--on-surface)', textDecoration: etapa.concluida ? 'line-through' : 'none' }}>
                  {etapa.titulo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rate Completed Project CTA (+20 pts) */}
        <div className="card" style={{ backgroundColor: 'var(--surface-container)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>star</span>
          </div>
          <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Avalie esta Iniciativa</h3>
          <p style={{ fontSize: '12px', color: 'var(--outline)' }}>
            {rated ? '✓ Você já avaliou este projeto e ganhou +20 pontos!' : 'Dê sua opinião sobre os resultados na comunidade e receba +20 pontos.'}
          </p>

          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <button
              onClick={handleAvaliar}
              disabled={rated}
              className={`btn ${rated ? 'btn-success' : 'btn-primary'} style={{ flex: 1 }}`}
              style={{ borderRadius: '9999px', flex: 1 }}
            >
              {rated ? 'Avaliado (+20 pts) ✓' : 'Avaliar Projeto (+20 pts)'}
            </button>
            <button
              onClick={handleVolunteer}
              disabled={volunteered}
              className={`btn ${volunteered ? 'btn-success' : 'btn-outline'}`}
              style={{ borderRadius: '9999px', flex: 1 }}
            >
              {volunteered ? 'Inscrito ✓' : 'Voluntariar-se'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
