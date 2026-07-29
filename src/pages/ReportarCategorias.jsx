import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportarCategorias() {
  const navigate = useNavigate();

  const categories = [
    { id: 'Buraco', title: 'Buraco', icon: 'build', bg: '#e2dfff', color: '#1f108e' },
    { id: 'Iluminação Pública', title: 'Iluminação Pública', icon: 'lightbulb', bg: '#fef3c7', color: '#b45309' },
    { id: 'Coleta de Lixo', title: 'Coleta de Lixo', icon: 'delete', bg: '#ecfdf5', color: '#047857' },
    { id: 'Vandalismo', title: 'Vandalismo', icon: 'format_paint', bg: '#f3e8ff', color: '#6b21a8' },
    { id: 'Vazamento de Água', title: 'Vazamento de Água', icon: 'water_drop', bg: '#e0f2fe', color: '#0369a1' },
    { id: 'Outro', title: 'Outro', icon: 'more_horiz', bg: '#f1f5f9', color: '#475569' }
  ];

  const handleSelect = (catId) => {
    navigate('/reportar-detalhes', { state: { category: catId } });
  };

  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <header className="header" style={{ borderBottom: '1px solid var(--surface-dim)', backgroundColor: '#ffffff' }}>
        <button onClick={() => navigate(-1)} className="btn btn-ghost" style={{ padding: 0, minHeight: 'auto' }}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--on-surface)' }}>Pilar 360</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)', marginBottom: '4px' }}>Qual é o problema?</h2>
          <p style={{ fontSize: '13px', color: 'var(--outline)', lineHeight: '1.5' }}>
            Selecione a categoria que melhor descreve o problema que você deseja relatar.
          </p>
        </div>

        <div className="grid-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="card animate-slide-up"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px 16px',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                gap: '12px'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: cat.bg, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{cat.icon}</span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>{cat.title}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
