import React, { useState, useRef } from 'react';
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

  const [selectedBairro, setSelectedBairro] = useState('Todos');
  const [selectedRole, setSelectedRole] = useState('Todos');

  const isGovOrCorp = user?.role === 'prefeitura' || user?.role === 'empresa';
  const userPoints = user?.points || 450;
  const userRankIndex = ranking.findIndex((r) => r.nome === user?.name || r.id === user?.id);
  const userRankPosition = userRankIndex >= 0 ? userRankIndex + 1 : '-';

  // Find next reward goal
  const nextReward = recompensas.filter((r) => r.pontos > userPoints).sort((a, b) => a.pontos - b.pontos)[0];
  const ptsNeeded = nextReward ? nextReward.pontos - userPoints : 0;

  // Dynamic filtering of ranking list
  const filteredRanking = ranking.filter((item) => {
    const matchBairro = selectedBairro === 'Todos' || item.bairro.toLowerCase() === selectedBairro.toLowerCase();
    const matchRole =
      selectedRole === 'Todos' ||
      (selectedRole === 'Líderes' && item.role === 'lider') ||
      (selectedRole === 'Moradores' && item.role === 'morador');
    return matchBairro && matchRole;
  });

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
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>
            {isGovOrCorp ? 'Dashboard de Engajamento Comunitário' : 'Ranking da Cidade'}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>
            {isGovOrCorp
              ? 'Métricas globais de participação e engajamento cidadão por bairro.'
              : 'Engajamento comunitário e pontos acumulados este trimestre.'}
          </p>
        </div>

        {/* Dashboard Banner for Prefeitura / Empresa */}
        {isGovOrCorp ? (
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
              <span>VISÃO GERAL DA GESTÃO</span>
              <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none' }}>
                📊 Painel Analítico
              </span>
            </div>

            <div className="grid-2" style={{ gap: '12px', marginTop: '4px' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '900', color: '#fbbf24' }}>1.248</div>
                <div style={{ fontSize: '11px', color: '#c3c0ff', fontWeight: '600' }}>Cidadãos Engajados</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '900', color: '#38bdf8' }}>6.840</div>
                <div style={{ fontSize: '11px', color: '#c3c0ff', fontWeight: '600' }}>Pontos Gerados</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#fbbf24' }}>star</span>
              <div style={{ fontSize: '12px', color: '#c3c0ff' }}>
                <strong style={{ color: '#ffffff' }}>Bairro em Destaque: </strong> Bairro do Recife (1.580 pts)
              </div>
            </div>
          </div>
        ) : (
          /* User Status Card for Morador / Líder */
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
        )}

        {/* Trimestral Leaderboard Section */}
        <section className="section" style={{ marginBottom: 0 }}>
          <div className="section-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <h2 className="section-title" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>military_tech</span>
              Ranking Trimestral por Bairro
            </h2>

            {/* Interactive Filter Chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <div className="scroll-h">
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--outline)', alignSelf: 'center', marginRight: '4px' }}>Bairro:</span>
                {['Todos', 'Bairro do Recife', 'Santo Amaro', 'Boa Viagem', 'Graças', 'Espinheiro'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBairro(b)}
                    className={`chip ${selectedBairro === b ? 'chip-active' : ''}`}
                    style={{ fontSize: '11px', padding: '6px 12px' }}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <div className="scroll-h">
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--outline)', alignSelf: 'center', marginRight: '4px' }}>Função:</span>
                {['Todos', 'Líderes', 'Moradores'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`chip ${selectedRole === r ? 'chip-active' : ''}`}
                    style={{ fontSize: '11px', padding: '6px 12px' }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', marginTop: '12px' }}>
            {filteredRanking.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', fontSize: '13px', color: 'var(--outline)' }}>
                Nenhum participante encontrado com os filtros selecionados.
              </div>
            ) : (
              filteredRanking.map((item, index) => {
                const isUser = !isGovOrCorp && (item.nome === user?.name || item.id === user?.id);

                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      backgroundColor: isUser ? '#f0eeff' : 'transparent',
                      borderBottom: index < filteredRanking.length - 1 ? '1px solid var(--surface-container)' : 'none'
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
              })
            )}
          </div>
        </section>

        {/* How to earn points (Only visible to Morador / Líder) */}
        {!isGovOrCorp && (
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
        )}

        {/* Rewards exchange section (Only visible to Morador / Líder) */}
        {!isGovOrCorp && (
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
        )}
      </main>
    </div>
  );
}
