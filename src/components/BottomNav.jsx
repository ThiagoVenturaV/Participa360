import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const role = user?.role || 'morador';

  const getRoleHome = () => {
    if (role === 'lider') return '/home-lider';
    if (role === 'prefeitura') return '/home-prefeitura';
    if (role === 'empresa') return '/home-empresa';
    return '/home';
  };

  const homePath = getRoleHome();

  const getRoleActionTab = () => {
    if (role === 'prefeitura') {
      return { path: '/meus-relatos', label: 'Gestão', icon: 'account_tree' };
    }
    if (role === 'empresa') {
      return { path: '/meus-relatos', label: 'ESG', icon: 'domain' };
    }
    if (role === 'lider') {
      return { path: '/meus-relatos', label: 'Projetos', icon: 'assignment' };
    }
    return { path: '/reportar', label: 'Ação', icon: 'add_circle' };
  };

  const actionTab = getRoleActionTab();

  const tabs = [
    { path: homePath, label: 'Início', icon: 'home', isHome: true },
    { path: '/ranking', label: role === 'prefeitura' || role === 'empresa' ? 'Dashboard' : 'Ranking', icon: role === 'prefeitura' || role === 'empresa' ? 'analytics' : 'military_tech' },
    actionTab,
    { path: '/alertas', label: 'Alertas', icon: 'notifications' },
    { path: '/perfil', label: 'Perfil', icon: 'person' }
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
