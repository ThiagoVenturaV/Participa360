import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useGsapPage } from '../utils/useGsapPage';
import heatmapMapImg from '../assets/heatmap_map.jpg';

export default function HomePrefeitura() {
  const pageRef = useRef(null);
  useGsapPage(pageRef);

  const { showToast } = useToast();
  const { problemas, validarProblema } = useData();

  const [dispatched, setDispatched] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleDispatch = () => {
    setDispatched(true);
    showToast('Equipe de emergência despachada para o Centro (Rua Principal)! 🚒⚡', 'success');
  };

  const handleValidaIA = (prob) => {
    validarProblema(prob.id);
    showToast(`Relato "${prob.titulo}" validado pela IA e prefeitura! +50 pts concedidos ao cidadão! 🤖✅`, 'success');
  };

  const pendentesValidacao = problemas.filter((p) => !p.validado);

  return (
    <div ref={pageRef} className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>Painel de Gestão da Prefeitura</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>Supervisão em tempo real e validação por IA das demandas.</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => showToast('1.432 relatos em acompanhamento pela gestão', 'info')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fef2f2', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>warning</span>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROBLEMAS ATIVOS</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>1.432</div>
              </div>
            </div>
            <span className="badge badge-urgente">+12% vs sem. passada</span>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => showToast('8.901 relatos solucionados nos últimos 30 dias', 'info')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RELATOS RESOLVIDOS</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>8.901</div>
              </div>
            </div>
            <span className="badge badge-resolvido">+5% vs sem. passada</span>
          </div>
        </div>

        {/* Validação de Relatos por IA */}
        <section className="section" style={{ marginBottom: 0 }}>
          <div className="section-header">
            <h3 className="section-title" style={{ fontSize: '15px' }}>
              Relatos em Fila para Validação de IA ({pendentesValidacao.length})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            {pendentesValidacao.length === 0 ? (
              <div className="card" style={{ padding: '16px', fontSize: '13px', color: 'var(--outline)', textAlign: 'center' }}>
                Todos os relatos enviados já foram validados!
              </div>
            ) : (
              pendentesValidacao.map((p) => (
                <div key={p.id} className="card" style={{ padding: '16px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)' }}>
                      Criado por {p.criadoPor}
                    </span>
                    <span className="badge badge-em-analise">Aguardando IA</span>
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--on-surface)' }}>{p.titulo}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--outline)', lineHeight: '1.4' }}>{p.descricao}</p>

                  <button
                    onClick={() => handleValidaIA(p)}
                    className="btn btn-secondary btn-sm btn-block"
                    style={{ borderRadius: '9999px', marginTop: '4px' }}
                  >
                    Aprovar e Validar com IA 🤖✓
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Heatmap Section */}
        <section className="card" style={{ padding: '20px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="section-header">
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--on-surface)' }}>Pontos Críticos e Relatos ao Vivo</h3>
            <span onClick={() => setShowFilterModal(true)} style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>Filtros ({selectedFilter})</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '200px',
              borderRadius: '16px',
              backgroundImage: `url(${heatmapMapImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid var(--surface-dim)'
            }}
          ></div>

          <div
            style={{
              backgroundColor: 'var(--surface-container)',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid var(--surface-dim)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: dispatched ? 'var(--secondary)' : 'var(--error)', display: 'inline-block' }}></span>
              <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--on-surface)' }}>
                {dispatched ? 'Em Atendimento: Equipe Despachada' : 'Crítico: Infraestrutura'}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--on-surface)', lineHeight: '1.5' }}>
              Centro, Rua Principal. Rompimento na rede de água relatado por 15 cidadãos.
            </p>
            <button
              onClick={handleDispatch}
              disabled={dispatched}
              className={`btn ${dispatched ? 'btn-success' : 'btn-primary'} btn-block`}
              style={{ borderRadius: '9999px', marginTop: '4px', fontSize: '13px', fontWeight: '700' }}
            >
              {dispatched ? 'EQUIPE EM DESLOCAMENTO ✓' : 'Despachar Equipe'}
            </button>
          </div>
        </section>
      </main>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-backdrop">
          <div className="modal animate-slide-up">
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px' }}>Filtrar Pontos Críticos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Todos', 'Infraestrutura', 'Iluminação', 'Coleta de Lixo', 'Trânsito'].map((f) => (
                <button
                  key={f}
                  onClick={() => { setSelectedFilter(f); setShowFilterModal(false); showToast(`Filtro "${f}" aplicado!`, 'info'); }}
                  className={`btn ${selectedFilter === f ? 'btn-primary' : 'btn-outline'} btn-block`}
                  style={{ justifyContent: 'flex-start' }}
                >
                  {f}
                </button>
              ))}
            </div>
            <button onClick={() => setShowFilterModal(false)} className="btn btn-ghost btn-block" style={{ marginTop: '12px' }}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
