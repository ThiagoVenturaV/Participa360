import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      <Header showPoints={false} />

      <main className="px-5 pt-4 space-y-5">
        {/* User Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-indigo-100 text-[#1f108e] flex items-center justify-center font-bold text-2xl mx-auto border-4 border-indigo-200 shadow-inner">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#0b1c30]">{user?.name || 'Usuário'}</h2>
            <div className="text-xs text-slate-500">{user?.email || 'usuario@participa360.com'}</div>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-[#1f108e] text-xs font-bold uppercase tracking-wider">
            {user?.role === 'morador' ? 'Morador • Residente Prata' : user?.role === 'lider' ? 'Líder Comunitário' : user?.role === 'prefeitura' ? 'Prefeitura' : 'Empresa / IES'}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
            <div className="text-2xl font-black text-[#0b1c30]">{user?.points || 450}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">PONTOS CÍVICOS</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
            <div className="text-2xl font-black text-[#006c49]">Nível 2</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">CIDADÃO ENGAJADO</div>
          </div>
        </div>

        {/* Menu list */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100 text-xs font-bold text-slate-700">
          <button onClick={() => navigate('/meus-relatos')} className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-50">
            <span className="flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-600">history</span> Meus Relatos
            </span>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </button>

          <button onClick={() => navigate('/marketplace')} className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-50">
            <span className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-600">card_giftcard</span> Minhas Recompensas
            </span>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </button>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full py-4 px-6 rounded-full bg-red-50 text-red-600 border border-red-200 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          Sair da Conta
        </button>
      </main>
    </div>
  );
}
