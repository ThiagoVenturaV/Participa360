import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ReportarDetalhes() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  
  const [category, setCategory] = useState(location.state?.category || 'Buraco');
  const [description, setDescription] = useState('');
  const [recording, setRecording] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          category,
          description: description || 'Problema relatado via aplicativo',
          address: '123 Rua Principal, Bairro Central',
          latitude: -8.0476,
          longitude: -34.8770
        })
      });

      if (res.ok) {
        navigate('/reportar-sucesso');
      } else {
        alert('Erro ao enviar relato.');
      }
    } catch (err) {
      console.error('Failed to submit report', err);
      alert('Erro ao enviar relato.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <header className="header" style={{ borderBottom: '1px solid var(--surface-dim)', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} className="btn btn-ghost" style={{ padding: 0, minHeight: 'auto' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--on-surface)' }}>Detalhes do Problema</h1>
        </div>
        <span className="badge badge-resolvido" style={{ fontSize: '11px' }}>
          +10 pts por relatar
        </span>
      </header>

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label className="input-label" style={{ marginBottom: '8px', display: 'block' }}>
            Categoria Selecionada
          </label>
          <div className="scroll-h">
            {['Buraco', 'Iluminação Pública', 'Coleta de Lixo', 'Vandalismo'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`chip ${category === cat ? 'chip-active' : ''}`}
                style={{ fontWeight: '700' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photo evidence upload box */}
        <div>
          <label className="input-label" style={{ marginBottom: '8px', display: 'block' }}>
            Evidência (Obrigatório)
          </label>
          <button
            type="button"
            onClick={() => setPhotoAdded(!photoAdded)}
            style={{
              width: '100%',
              height: '140px',
              borderRadius: '24px',
              border: photoAdded ? '2px solid var(--secondary)' : '2px dashed var(--outline-variant)',
              backgroundColor: photoAdded ? 'rgba(0, 108, 73, 0.05)' : '#ffffff',
              color: photoAdded ? 'var(--secondary)' : 'var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '32px', marginBottom: '4px' }}>
              {photoAdded ? 'check_circle' : 'photo_camera'}
            </span>
            <span style={{ fontSize: '12px', fontWeight: '700' }}>
              {photoAdded ? 'Foto Anexada ✓' : 'Toque para Adicionar Foto'}
            </span>
          </button>
        </div>

        {/* Description textarea */}
        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label className="input-label" style={{ margin: 0 }}>Descrição</label>
            <button
              type="button"
              onClick={() => setRecording(!recording)}
              className={`btn btn-sm ${recording ? 'btn-primary' : 'btn-secondary'}`}
              style={{ backgroundColor: recording ? 'var(--error)' : 'rgba(31, 16, 142, 0.1)', color: recording ? '#fff' : 'var(--primary)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>mic</span>
              {recording ? 'Gravando...' : 'Gravar Áudio'}
            </button>
          </div>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Por favor, descreva o problema em detalhes. O que exatamente está errado?"
            className="input-field textarea"
          ></textarea>
        </div>

        {/* Location preview */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>123 Rua Principal</div>
              <div style={{ fontSize: '10px', color: 'var(--outline)' }}>Coordenadas: -8.0476° N, -34.8770° W</div>
            </div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>Atualizar</span>
        </div>

        {/* Submit CTA */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn btn-primary btn-lg btn-block"
          style={{ gap: '8px', borderRadius: '9999px', marginTop: '12px' }}
        >
          {submitting ? 'Enviando...' : (
            <>
              Enviar Relato
              <span className="material-symbols-outlined">send</span>
            </>
          )}
        </button>
      </main>
    </div>
  );
}
