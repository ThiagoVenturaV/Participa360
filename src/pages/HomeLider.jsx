import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useGsapPage } from '../utils/useGsapPage';

export default function HomeLider() {
  const pageRef = useRef(null);
  useGsapPage(pageRef);

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();
  const { projetos, createProjeto, toggleEtapaProjeto } = useData();

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectLocation, setProjectLocation] = useState('');

  const [assignedTask1, setAssignedTask1] = useState(false);
  const [managedTask2, setManagedTask2] = useState(false);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectTitle) return;
    createProjeto({
      titulo: projectTitle,
      bairro: projectLocation || 'Bairro do Recife'
    });
    setShowNewProjectModal(false);
    setProjectTitle('');
    setProjectLocation('');
    showToast(`Projeto "${projectTitle}" criado com sucesso! 🚀`, 'success');
  };

  const handleAssignTask1 = () => {
    setAssignedTask1(true);
    showToast('Tarefa "Aglomerado de Buracos" atribuída à equipe de voluntários! 🛠️', 'success');
  };

  const handleManageTask2 = () => {
    setManagedTask2(true);
    showToast('Solicitação de 3 caminhões enviada para a Secretaria de Obras! 🚛', 'info');
  };

  return (
    <div ref={pageRef} className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>
            Painel da Liderança Comunitária
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>
            Olá, {user?.name || 'Elena Santos'}. Gestão dos projetos e voluntários locais.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="btn btn-primary btn-lg btn-block"
          style={{ gap: '8px', borderRadius: '16px', boxShadow: 'var(--shadow-ambient)' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_circle</span>
          NOVO PROJETO COMUNITÁRIO
        </button>

        {/* Metrics Grid */}
        <div className="grid-2">
          <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/ranking')}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>military_tech</span> Rank #2 Liderança
            </div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>1.200 pts</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>SEU ENGAJAMENTO</div>
          </div>

          <div className="card" style={{ cursor: 'pointer' }} onClick={() => showToast('342 voluntários prontos para convocação', 'info')}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>groups</span> Ativos na Rede
            </div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>342</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>VOLUNTÁRIOS</div>
          </div>
        </div>

        {/* Real Projects Checklist section */}
        <section className="section" style={{ marginBottom: 0 }}>
          <div className="section-header">
            <h2 className="section-title" style={{ fontSize: '16px' }}>Gestão de Etapas de Projetos</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {projetos.map((proj) => {
              const concluídas = proj.etapas.filter((e) => e.concluida).length;

              return (
                <div key={proj.id} className="card" style={{ padding: '16px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--on-surface)' }}>{proj.titulo}</h3>
                    <span className="badge badge-em-andamento" style={{ fontSize: '10px' }}>
                      {concluídas}/{proj.etapas.length} etapas
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {proj.etapas.map((etapa) => (
                      <div
                        key={etapa.id}
                        onClick={() => {
                          toggleEtapaProjeto(proj.id, etapa.id);
                          showToast(`Etapa "${etapa.titulo}" atualizada!`, 'info');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 10px',
                          borderRadius: '12px',
                          backgroundColor: etapa.concluida ? '#ecfdf5' : 'var(--surface-container)',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: etapa.concluida ? 'var(--secondary)' : 'var(--outline)' }}>
                          {etapa.concluida ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <span style={{ textDecoration: etapa.concluida ? 'line-through' : 'none', color: etapa.concluida ? 'var(--secondary)' : 'var(--on-surface)', fontWeight: '600' }}>
                          {etapa.titulo}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => navigate(`/projeto/${proj.id}`)} className="btn btn-outline btn-sm btn-block" style={{ borderRadius: '9999px', marginTop: '4px' }}>
                    Ver Detalhes do Projeto →
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Urgent Tasks */}
        <section className="card" style={{ padding: '20px', borderRadius: '24px' }}>
          <div className="section-header">
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--on-surface)' }}>Necessidades e Tarefas Urgentes</h3>
            <span onClick={() => showToast('Fila de tarefas da liderança atualizada', 'info')} style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>VER TODOS →</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', padding: '12px', borderRadius: '16px', backgroundColor: 'var(--surface-container)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fef2f2', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>warning</span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }}>Aglomerado de Buracos</div>
                  <div style={{ fontSize: '11px', color: 'var(--outline)' }}>{assignedTask1 ? '✓ Atribuído a Voluntário' : 'Rua Oak e 5ª Ave • 12 moradores'}</div>
                </div>
              </div>
              <button
                onClick={handleAssignTask1}
                disabled={assignedTask1}
                className={`btn btn-sm ${assignedTask1 ? 'btn-success' : 'btn-secondary'}`}
              >
                {assignedTask1 ? 'ATRIBUÍDO ✓' : 'ATRIBUIR'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', padding: '12px', borderRadius: '16px', backgroundColor: 'var(--surface-container)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>park</span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }}>Plantio de Árvores</div>
                  <div style={{ fontSize: '11px', color: 'var(--outline)' }}>{managedTask2 ? '✓ Solicitação Enviada' : 'Precisa de 3 caminhões • Amanhã'}</div>
                </div>
              </div>
              <button
                onClick={handleManageTask2}
                disabled={managedTask2}
                className={`btn btn-sm ${managedTask2 ? 'btn-success' : 'btn-secondary'}`}
              >
                {managedTask2 ? 'SOLICITADO ✓' : 'GERENCIAR'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="modal-backdrop">
          <div className="modal animate-slide-up">
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px' }}>Criar Novo Projeto Comunitário</h3>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="input-group">
                <label className="input-label">Título do Projeto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Horta Comunitária do Bairro"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Localização / Bairro</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Praça das Flores"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                  className="input-field"
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowNewProjectModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Criar Projeto</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
