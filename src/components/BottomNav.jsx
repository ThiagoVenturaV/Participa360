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
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
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
