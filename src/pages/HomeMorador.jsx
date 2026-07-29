import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useGsapPage } from '../utils/useGsapPage';

import urbanBlueprintImg from '../assets/urban_blueprint.jpg';
import avatarMariaImg from '../assets/avatar_maria.jpg';

export default function HomeMorador() {
  const pageRef = useRef(null);
  useGsapPage(pageRef);

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, setUser } = useAuth();
  const { projetos, ranking } = useData();

  const [selectedPoll, setSelectedPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [liked1, setLiked1] = useState(false);
  const [likes1, setLikes1] = useState(124);
  const [liked2, setLiked2] = useState(false);
  const [likes2, setLikes2] = useState(42);

  const [showComments1, setShowComments1] = useState(false);
  const [comments1List, setComments1List] = useState([
    { author: 'Carlos A.', text: 'Ótima iniciativa! A rua estava precisando mesmo.' },
    { author: 'Ana P.', text: 'Qual o prazo estimado de conclusão?' }
  ]);
  const [newComment1, setNewComment1] = useState('');

  const userRankIndex = ranking.findIndex((r) => r.nome === user?.name || r.id === user?.id);
  const myPosition = userRankIndex >= 0 ? userRankIndex + 1 : 4;

  const handleVote = (option) => {
    if (voted) return;
    setSelectedPoll(option);
    setVoted(true);
    if (user) {
      setUser({ ...user, points: (user.points || 450) + 5 });
    }
    showToast(`Voto registrado em "${option}"! +5 pontos computados! 🎉`, 'success');
  };

  const toggleLike1 = () => {
    setLiked1(!liked1);
    setLikes1(liked1 ? likes1 - 1 : likes1 + 1);
    showToast(liked1 ? 'Curtida removida' : 'Você curtiu esta publicação! 👍', 'info');
  };

  const toggleLike2 = () => {
    setLiked2(!liked2);
    setLikes2(liked2 ? likes2 - 1 : likes2 + 1);
    showToast(liked2 ? 'Curtida removida' : 'Você curtiu esta publicação! ❤️', 'info');
  };

  const handleAddComment1 = (e) => {
    e.preventDefault();
    if (!newComment1.trim()) return;
    setComments1List([...comments1List, { author: user?.name || 'Você', text: newComment1 }]);
    setNewComment1('');
    showToast('Comentário publicado com sucesso!', 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link da publicação copiado para a área de transferência! 🔗', 'info');
  };

  return (
    <div ref={pageRef} className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
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

        {/* Ranking Banner */}
        <div
          onClick={() => navigate('/ranking')}
          className="hero-card"
          style={{ padding: '18px 20px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c3c0ff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#fbbf24' }}>military_tech</span>
              RANKING DO BAIRRO
            </div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>
              Você está em <span style={{ color: '#fbbf24' }}>{myPosition}º lugar</span>
            </div>
            <div style={{ fontSize: '12px', color: '#c3c0ff', marginTop: '2px' }}>
              Saldo: {user?.points || 450} pts acumulados
            </div>
          </div>
          <button className="btn btn-sm" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', border: 'none', borderRadius: '9999px', fontWeight: '700' }}>
            VER 🏆
          </button>
        </div>

        {/* Projetos da Comunidade em Etapas */}
        <section className="section" style={{ marginBottom: 0 }}>
          <div className="section-header">
            <h2 className="section-title" style={{ fontSize: '16px' }}>Projetos da Comunidade</h2>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>{projetos.length} em andamento</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {projetos.slice(0, 2).map((proj) => {
              const etapasConcluidas = proj.etapas.filter((e) => e.concluida).length;
              const pct = Math.round((etapasConcluidas / proj.etapas.length) * 100);

              return (
                <div
                  key={proj.id}
                  onClick={() => navigate(`/projeto/${proj.id}`)}
                  className="card"
                  style={{ cursor: 'pointer', padding: '16px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase' }}>
                      {proj.bairro}
                    </span>
                    <span className={`badge ${proj.status === 'concluido' ? 'badge-resolvido' : 'badge-em-andamento'}`}>
                      {proj.status === 'concluido' ? 'Concluído ✓' : 'Em Execução'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--on-surface)' }}>{proj.titulo}</h3>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', color: 'var(--outline)', marginBottom: '4px' }}>
                      <span>Progresso por etapas: {etapasConcluidas}/{proj.etapas.length}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>

                  {proj.empresa && (
                    <div style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>domain</span> Patrocínio: {proj.empresa}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

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
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>Recarga VEM</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--secondary)', marginTop: '4px' }}>150 pts</div>
            </div>

            <div onClick={() => navigate('/marketplace')} className="card" style={{ cursor: 'pointer' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <span className="material-symbols-outlined">park</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>Apadrinhe uma Árvore</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--secondary)', marginTop: '4px' }}>300 pts</div>
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
            {['Avenida Cais do Apolo', 'Avenida Visconde de Guararapes'].map((option) => (
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

          {/* Post 1 */}
          <div className="card feed-item" style={{ marginTop: '12px', padding: '20px', borderRadius: '24px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px', color: 'var(--on-surface)', lineHeight: '1.3' }}>
              Projeto de Recapeamento da Rua Principal
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--on-surface)', lineHeight: '1.5', marginBottom: '16px' }}>
              As obras começarão nesta segunda-feira na Rua Principal. Espere atrasos e use rotas alternativas se possível.
            </p>

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
                <button onClick={() => setShowComments1(!showComments1)} className="btn btn-ghost" style={{ padding: 0, minHeight: 'auto', gap: '6px', color: 'var(--outline)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat_bubble_outline</span>
                  {comments1List.length}
                </button>
              </div>

              <button onClick={handleShare} className="btn btn-ghost" style={{ padding: 0, minHeight: 'auto', color: 'var(--outline)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>share</span>
              </button>
            </div>

            {/* Comments Drawer */}
            {showComments1 && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--surface-dim)' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>Comentários:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                  {comments1List.map((c, i) => (
                    <div key={i} style={{ padding: '8px 12px', borderRadius: '12px', backgroundColor: 'var(--surface-container)', fontSize: '12px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{c.author}: </span>
                      <span style={{ color: 'var(--on-surface)' }}>{c.text}</span>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAddComment1} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Escreva um comentário..."
                    value={newComment1}
                    onChange={(e) => setNewComment1(e.target.value)}
                    className="input-field"
                    style={{ flex: 1, minHeight: '36px', padding: '6px 12px', fontSize: '12px' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">Enviar</button>
                </form>
              </div>
            )}
          </div>

          {/* Post 2 */}
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
