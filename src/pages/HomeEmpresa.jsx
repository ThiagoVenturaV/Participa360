import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useGsapPage } from '../utils/useGsapPage';

export default function HomeEmpresa() {
  const pageRef = useRef(null);
  useGsapPage(pageRef);

  const { showToast } = useToast();
  const { user } = useAuth();
  const { projetos, patrocinarProjeto } = useData();

  const [sponsoringProj, setSponsoringProj] = useState(null);
  const [investValue, setInvestValue] = useState('R$ 50.000');

  const handleConfirmSponsorship = (e) => {
    e.preventDefault();
    if (!sponsoringProj) return;
    patrocinarProjeto(sponsoringProj.id, user?.name || 'Acme Corp', investValue);
    showToast(`Parabéns! Sua empresa apadrinhou o projeto "${sponsoringProj.titulo}" com ${investValue}! 🌟`, 'success');
    setSponsoringProj(null);
  };

  return (
    <div ref={pageRef} className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="card" style={{ padding: '20px', borderRadius: '24px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)', marginBottom: '8px' }}>
            Painel Corporativo ESG — {user?.name || 'Acme Corp'}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', lineHeight: '1.5', marginBottom: '16px' }}>
            Suas iniciativas de responsabilidade social corporativa estão gerando valor tangível e impacto positivo no Recife.
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => showToast('Catálogo de Oportunidades ESG atualizado', 'info')} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
              Explorar Novas Parcerias
            </button>
            <button onClick={() => showToast('Relatório de Impacto ESG baixado!', 'success')} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              Relatório ROI ESG
            </button>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="grid-2">
          <div className="card card-metric">
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <span className="material-symbols-outlined">favorite</span>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--on-surface)' }}>12,5 mil</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>VIDAS IMPACTADAS</div>
          </div>

          <div className="card card-metric">
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--on-surface)' }}>R$ 450 mil</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>INVESTIMENTO TOTAL</div>
          </div>
        </div>

        {/* Sponsorship Opportunities (ESG) */}
        <section className="section" style={{ marginBottom: 0 }}>
          <h3 className="section-title" style={{ fontSize: '15px', marginBottom: '12px' }}>
            Oportunidades de Apadrinhar Projetos (ESG)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {projetos.map((proj) => {
              const isSponsored = Boolean(proj.empresa);

              return (
                <div key={proj.id} className="card" style={{ padding: '16px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase' }}>
                      {proj.bairro}
                    </span>
                    <span className={`badge ${isSponsored ? 'badge-resolvido' : 'badge-em-andamento'}`}>
                      {isSponsored ? `Patrocinado por ${proj.empresa}` : 'Necessita Patrocínio ESG'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--on-surface)' }}>{proj.titulo}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--outline)', lineHeight: '1.4' }}>{proj.descricao}</p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>
                      Investimento: {proj.valorInvestimento}
                    </div>

                    <button
                      onClick={() => setSponsoringProj(proj)}
                      className={`btn btn-sm ${isSponsored ? 'btn-outline' : 'btn-primary'}`}
                      style={{ borderRadius: '9999px' }}
                    >
                      {isSponsored ? 'Ver Parceria' : 'Apadrinhar Projeto ✨'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Sponsorship Modal */}
      {sponsoringProj && (
        <div className="modal-backdrop">
          <div className="modal animate-slide-up">
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>Apadrinhar Projeto Comunitário</h3>
            <p style={{ fontSize: '12px', color: 'var(--outline)', marginBottom: '16px' }}>
              Projeto: <strong>{sponsoringProj.titulo}</strong> ({sponsoringProj.bairro})
            </p>

            <form onSubmit={handleConfirmSponsorship} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="input-group">
                <label className="input-label">Nome da Empresa Investidora</label>
                <input
                  type="text"
                  readOnly
                  value={user?.name || 'Acme Corp'}
                  className="input-field"
                  style={{ backgroundColor: 'var(--surface-container)' }}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Valor do Aporte / Patrocínio</label>
                <input
                  type="text"
                  required
                  value={investValue}
                  onChange={(e) => setInvestValue(e.target.value)}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button type="button" onClick={() => setSponsoringProj(null)} className="btn btn-outline" style={{ flex: 1 }}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirmar Aporte</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
