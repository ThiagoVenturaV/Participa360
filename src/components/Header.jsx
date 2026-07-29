import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header({ title, showPoints = true }) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-5 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm overflow-hidden border-2 border-indigo-200">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                {user.role === 'morador' ? 'Residente Prata' : user.role === 'lider' ? 'Líder Comunitário' : user.role === 'prefeitura' ? 'Prefeitura' : 'Empresa/IES'}
              </div>
              <div className="text-sm font-bold text-slate-900 leading-none">
                {showPoints && user.role === 'morador' ? `✪ ${user.points || 450} pts` : user.name}
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-xl font-extrabold text-indigo-900 tracking-tight">
            Participa 360
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative" aria-label="Notificações">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>
  );
}
