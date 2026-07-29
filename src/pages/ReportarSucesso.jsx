import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportarSucesso() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <div className="w-24 h-24 rounded-full bg-emerald-400 text-white flex items-center justify-center mb-6 shadow-xl shadow-emerald-200 animate-bounce">
        <span className="material-symbols-outlined text-5xl">check</span>
      </div>

      <h1 className="text-3xl font-black text-[#0b1c30] mb-2">Relato Enviado!</h1>
      <p className="text-xs text-slate-600 max-w-xs leading-relaxed mb-8">
        A prefeitura foi notificada. Obrigado por ajudar a melhorar nossa comunidade.
      </p>

      {/* Gamification Points Awarded Card */}
      <div className="w-full bg-white rounded-3xl p-6 border border-slate-100 shadow-md mb-8 text-left space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-[#1f108e] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            </div>
            <div>
              <div className="text-base font-black text-[#006c49]">+10 Pontos Ganhos</div>
              <div className="text-xs text-slate-500 font-medium">Saldo Total: 460 pts</div>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">Nvl 4</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-gradient-to-r from-[#1f108e] to-[#006c49] h-full rounded-full" style={{ width: '75%' }}></div>
        </div>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 px-6 rounded-full bg-[#1f108e] text-white font-extrabold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-950 transition-all"
        >
          Voltar para o Início
        </button>
        <button
          onClick={() => navigate('/meus-relatos')}
          className="w-full py-4 px-6 rounded-full bg-indigo-100 text-[#1f108e] font-extrabold text-sm hover:bg-indigo-200 transition-all"
        >
          Ver Meus Relatos
        </button>
      </div>
    </div>
  );
}
