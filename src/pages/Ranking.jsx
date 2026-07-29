import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { useGsapPage } from '../utils/useGsapPage';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function Ranking() {
  const pageRef = useRef(null);
  useGsapPage(pageRef);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { ranking, recompensas } = useData();
  const { showToast } = useToast();

  const userPoints = user?.points || 450;
  const userRankIndex = ranking.findIndex((r) => r.nome === user?.name || r.id === user?.id);
  const userRankPosition = userRankIndex >= 0 ? userRankIndex + 1 : '-';

  // Find next reward goal
  const nextReward = recompensas.filter((r) => r.pontos > userPoints).sort((a, b) => a.pontos - b.pontos)[0];
  const ptsNeeded = nextReward ? nextReward.pontos - userPoints : 0;

  const handleRedeemClick = (r) => {
    if (userPoints < r.pontos) {
      showToast(`Faltam ${r.pontos - userPoints} pontos para desbloquear "${r.titulo}"!`, 'info');
      return;
    }
    navigate('/marketplace');
  };

  return (
    <div ref={pageRef} className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>Ranking da Cidade</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>
            Engajamento comunitário e pontos acumulados este trimestre.
          </p>
        </div>

        {/* User Status Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #1e1b4b 100%)',
            color: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: 'var(--shadow-ambient)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', color: '#c3c0ff' }}>
            <span>SUA PONTUAÇÃO</span>
            <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none' }}>
              🏆 {userRankPosition}º Lugar
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '38px', fontWeight: '900', color: '#fbbf24' }}>{userPoints}</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#c3c0ff' }}>pontos</span>
          </div>

          {nextReward ? (
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#fbbf24' }}>
                {nextReward.icon}
              </span>
              <div style={{ fontSize: '12px', flex: 1, lineHeight: '1.4' }}>
                <span style={{ color: '#ffffff', fontWeight: '700' }}>Próxima meta: </span>
                <span style={{ color: '#c3c0ff' }}>{nextReward.titulo}</span>
                <div style={{ fontSize: '11px', color: '#fbbf24', marginTop: '2px', fontWeight: '700' }}>
                  Faltam apenas {ptsNeeded} pts!
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: '#c3c0ff' }}>🎉 Você atingiu o topo das recompensas!</div>
          )}
        </div>

        {/* Trimestral Leaderboard */}
        <section className="section" style={{ marginBottom: 0 }}>
          <h2 className="section-title" style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>military_tech</span>
            Ranking Trimestral do Bairro
          </h2>

          <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px' }}>
            {ranking.map((item, index) => {
              const isUser = item.nome === user?.name || item.id === user?.id;

              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    backgroundColor: isUser ? '#f0eeff' : 'transparent',
                    borderBottom: index < ranking.length - 1 ? '1px solid var(--surface-container)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', textAlign: 'center', fontSize: '16px', fontWeight: '800' }}>
                      {index < 3 ? MEDALS[index] : `${index + 1}º`}
                    </div>

                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: isUser ? 'var(--primary)' : 'var(--surface-container)',
                        color: isUser ? '#ffffff' : 'var(--on-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                        {item.role === 'lider' ? 'star' : 'person'}
                      </span>
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: isUser ? '800' : '700', color: 'var(--on-surface)' }}>
                        {item.nome} {isUser && '(Você)'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--outline)' }}>
                        {item.role === 'lider' ? 'Líder Comunitário' : 'Morador'} • {item.bairro}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '800', fontSize: '14px', color: 'var(--primary)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d97706' }}>star</span>
                    {item.pontos}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How to earn points */}
        <section className="section" style={{ marginBottom: 0 }}>
          <h2 className="section-title" style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>emoji_events</span>
            Como Ganhar Pontos
          </h2>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', borderRadius: '20px' }}>
            {[
              { action: 'Relatar um problema da cidade', pts: '+50 pts', icon: 'report_problem', color: '#3b82f6' },
              { action: 'Validação por IA / Prefeitura', pts: '+50 pts', icon: 'verified', color: '#10b981' },
              { action: 'Avaliar projeto concluído', pts: '+20 pts', icon: 'rate_review', color: '#8b5cf6' },
              { action: 'Projeto da comunidade executado', pts: '+100 pts', icon: 'task_alt', color: '#f59e0b' }
            ].map((rule, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: idx < 3 ? '10px' : '0', borderBottom: idx < 3 ? '1px solid var(--surface-dim)' : 'none' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: `${rule.color}15`, color: rule.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{rule.icon}</span>
                </div>
                <div style={{ flex: 1, fontSize: '13px', fontWeight: '600', color: 'var(--on-surface)' }}>
                  {rule.action}
                </div>
                <span className="badge badge-resolvido" style={{ fontWeight: '800' }}>
                  {rule.pts}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Rewards exchange section */}
        <section className="section">
          <h2 className="section-title" style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>card_giftcard</span>
            Troca de Pontos
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recompensas.map((r) => {
              const canRedeem = userPoints >= r.pontos;
              return (
                <div
                  key={r.id}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '18px',
                    border: canRedeem ? '1.5px solid var(--secondary)' : '1px solid var(--surface-dim)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: canRedeem ? '#ecfdf5' : 'var(--surface-container)',
                        color: canRedeem ? 'var(--secondary)' : 'var(--outline)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <span className="material-symbols-outlined">{r.icon}</span>
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>{r.titulo}</div>
                      <div style={{ fontSize: '11px', color: 'var(--outline)', marginTop: '2px' }}>
                        ✪ {r.pontos} pontos • {r.categoria}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRedeemClick(r)}
                    className={`btn btn-sm ${canRedeem ? 'btn-primary' : 'btn-outline'}`}
                    style={{ borderRadius: '9999px', opacity: canRedeem ? 1 : 0.6 }}
                  >
                    {canRedeem ? 'Resgatar' : 'Bloqueado 🔒'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
