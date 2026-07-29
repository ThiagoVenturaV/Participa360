import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const getRoleHome = () => {
    if (user?.role === 'lider') return '/home-lider';
    if (user?.role === 'prefeitura') return '/home-prefeitura';
    if (user?.role === 'empresa') return '/home-empresa';
    return '/home';
  };

  const homePath = getRoleHome();

  const tabs = [
    { path: homePath, label: 'Início', icon: 'home', isHome: true },
    { path: '/alertas', label: 'Alertas', icon: 'notifications' },
    { path: '/perfil', label: 'Perfil', icon: 'person' },
    { path: '/reportar', label: 'Ação', icon: 'add_circle' }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isHomeActive = tab.isHome && ['/home', '/home-lider', '/home-prefeitura', '/home-empresa'].includes(location.pathname);
        const isActive = isHomeActive || location.pathname === tab.path;

        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <span className={`material-symbols-outlined ${isActive ? 'font-fill' : ''}`} style={{ fontSize: '24px' }}>
              {tab.icon}
            </span>
            <span style={{ fontSize: '11px', marginTop: '2px', fontWeight: isActive ? '700' : '500' }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
