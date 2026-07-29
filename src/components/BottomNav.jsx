import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/home', label: 'Início', icon: 'home' },
    { path: '/alertas', label: 'Alertas', icon: 'notifications' },
    { path: '/perfil', label: 'Perfil', icon: 'person' },
    { path: '/reportar', label: 'Ação', icon: 'add_circle' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-4 py-2 z-40 flex justify-around items-center max-w-md mx-auto">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
              isActive ? 'text-indigo-700 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${isActive ? 'font-fill' : ''}`}>
              {tab.icon}
            </span>
            <span className="text-[11px] font-medium mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
