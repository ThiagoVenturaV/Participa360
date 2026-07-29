import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportarCategorias() {
  const navigate = useNavigate();

  const categories = [
    { id: 'Buraco', title: 'Buraco', icon: 'build', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'Iluminação Pública', title: 'Iluminação Pública', icon: 'lightbulb', color: 'bg-amber-100 text-amber-700' },
    { id: 'Coleta de Lixo', title: 'Coleta de Lixo', icon: 'delete', color: 'bg-emerald-100 text-emerald-700' },
    { id: 'Vandalismo', title: 'Vandalismo', icon: 'format_paint', color: 'bg-purple-100 text-purple-700' },
    { id: 'Vazamento de Água', title: 'Vazamento de Água', icon: 'water_drop', color: 'bg-blue-100 text-blue-700' },
    { id: 'Outro', title: 'Outro', icon: 'more_horiz', color: 'bg-slate-100 text-slate-700' }
  ];

  const handleSelect = (catId) => {
    navigate('/reportar-detalhes', { state: { category: catId } });
  };

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <header className="flex items-center gap-3 px-5 py-4 bg-white border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-[#0b1c30]">Participa 360</h1>
      </header>

      <main className="px-5 pt-5 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0b1c30]">Qual é o problema?</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Selecione a categoria que melhor descreve o problema que você deseja relatar. Isso nos ajuda a direcioná-lo para o departamento correto.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col items-center justify-center text-center space-y-3 active:scale-95"
            >
              <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
              </div>
              <span className="text-xs font-bold text-[#0b1c30]">{cat.title}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
