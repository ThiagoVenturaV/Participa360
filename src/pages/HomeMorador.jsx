import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

import urbanBlueprintImg from '../assets/urban_blueprint.jpg';
import avatarMariaImg from '../assets/avatar_maria.jpg';

export default function HomeMorador() {
  const navigate = useNavigate();
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [liked1, setLiked1] = useState(false);
  const [likes1, setLikes1] = useState(124);
  const [liked2, setLiked2] = useState(false);
  const [likes2, setLikes2] = useState(42);

  const handleVote = (option) => {
    setSelectedPoll(option);
    setVoted(true);
  };

  const toggleLike1 = () => {
    setLiked1(!liked1);
    setLikes1(liked1 ? likes1 - 1 : likes1 + 1);
  };

  const toggleLike2 = () => {
    setLiked2(!liked2);
    setLikes2(liked2 ? likes2 - 1 : likes2 + 1);
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

          {/* Post 1 - Projeto de Recapeamento com imagem exatamente igual ao Stitch */}
          <div className="card feed-item" style={{ marginTop: '12px', padding: '20px', borderRadius: '24px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px', color: 'var(--on-surface)', lineHeight: '1.3' }}>
              Projeto de Recapeamento da Rua Principal
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--on-surface)', lineHeight: '1.5', marginBottom: '16px' }}>
              As obras começarão nesta segunda-feira na Rua Principal, entre a 4ª e a 8ª Avenida. Espere atrasos e use rotas alternativas se possível.
            </p>

            {/* Image reference from Stitch screenshot */}
            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', border: '1px solid var(--surface-dim)', boxShadow: 'var(--shadow-sm)' }}>
              <img
                src={urbanBlueprintImg}
                alt="Projeto de Requalificação Urbana"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', items: 'center', justifyBetween: 'space-between', pt: '8px', borderTop: '1px solid var(--surface-dim)' }}>
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px', fontWeight: '600', color: 'var(--outline)' }}>
                <button onClick={toggleLike1} className="btn btn-ghost" style={{ padding: 0, minHeight: 'auto', gap: '6px', color: liked1 ? 'var(--primary)' : 'var(--outline)' }}>
                  <span className={`material-symbols-outlined ${liked1 ? 'font-fill' : ''}`} style={{ fontSize: '18px' }}>thumb_up</span>
                  {likes1}
                </button>
                <button className="btn btn-ghost" style={{ padding: 0, minHeight: 'auto', gap: '6px', color: 'var(--outline)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat_bubble_outline</span>
                  18
                </button>
              </div>

              <button className="btn btn-ghost" style={{ padding: 0, minHeight: 'auto', color: 'var(--outline)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>share</span>
              </button>
            </div>
          </div>

          {/* Post 2 - Maria G. com foto de perfil e badge Resolvido exatamente igual ao Stitch */}
          <div className="card feed-item" style={{ padding: '20px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={avatarMariaImg}
                  alt="Maria G."
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--secondary-container)' }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--on-surface)' }}>Maria G.</div>
                  <div style={{ fontSize: '11px', color: 'var(--outline)' }}>Vizinha • 5h atrás</div>
                </div>
              </div>

              <span className="badge badge-resolvido" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '11px', borderRadius: '9999px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check_circle</span>
                Resolvido
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--on-surface)', lineHeight: '1.6', marginBottom: '12px' }}>
              Obrigada à cidade por consertar o poste de luz na rua Oak tão rápido! Torna o passeio com o cachorro muito mais seguro à noite.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--outline)' }}>
              <button onClick={toggleLike2} className="btn btn-ghost" style={{ padding: 0, minHeight: 'auto', gap: '6px', color: liked2 ? 'var(--error)' : 'var(--outline)' }}>
                <span className={`material-symbols-outlined ${liked2 ? 'font-fill' : ''}`} style={{ fontSize: '18px' }}>favorite</span>
                {likes2}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
