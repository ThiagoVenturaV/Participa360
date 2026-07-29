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
    <div className="pb-28 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-600">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-[#0b1c30]">Detalhes do Problema</h1>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#006c49] text-xs font-bold border border-emerald-200">
          +10 pts por relatar
        </span>
      </header>

      <main className="px-5 pt-4 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Categoria Selecionada
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['Buraco', 'Iluminação Pública', 'Coleta de Lixo', 'Vandalismo'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  category === cat ? 'bg-[#1f108e] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photo evidence upload box */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Evidência (Obrigatório)
          </label>
          <button
            type="button"
            onClick={() => setPhotoAdded(!photoAdded)}
            className={`w-full h-36 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all ${
              photoAdded ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-indigo-200 bg-white text-indigo-900 hover:bg-indigo-50'
            }`}
          >
            <span className="material-symbols-outlined text-3xl mb-1">
              {photoAdded ? 'check_circle' : 'photo_camera'}
            </span>
            <span className="text-xs font-bold">
              {photoAdded ? 'Foto Anexada ✓' : 'Toque para Adicionar Foto'}
            </span>
          </button>
        </div>

        {/* Description textarea */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Descrição
            </label>
            <button
              type="button"
              onClick={() => setRecording(!recording)}
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                recording ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-100 text-[#1f108e]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              {recording ? 'Gravando...' : 'Gravar Áudio'}
            </button>
          </div>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Por favor, descreva o problema em detalhes. O que exatamente está errado?"
            className="w-full p-4 rounded-2xl border border-slate-200 bg-white focus:border-[#1f108e] focus:ring-2 focus:ring-indigo-100 outline-none text-xs text-slate-900 resize-none"
          ></textarea>
        </div>

        {/* Location preview */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#1f108e] flex items-center justify-center">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">123 Rua Principal</div>
              <div className="text-[10px] text-slate-400">Coordenadas: -8.0476° N, -34.8770° W</div>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-700 cursor-pointer">Atualizar</span>
        </div>

        {/* Submit CTA */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-4 px-6 rounded-full bg-[#1f108e] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-200 hover:bg-indigo-950 active:scale-98 transition-all"
        >
          {submitting ? (
            <span className="material-symbols-outlined animate-spin text-xl">sync</span>
          ) : (
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
