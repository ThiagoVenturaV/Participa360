import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header({ showPoints = true }) {
  const { user } = useAuth();

  return (
    <header className="header" style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', zIndex: 40, borderBottom: '1px solid var(--surface-dim)' }}>
      <div className="header-user">
        {user ? (
          <>
            <div className="header-avatar" style={{ backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', border: '2px solid var(--primary-fixed)' }}>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                user.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--outline)' }}>
                {user.role === 'morador' ? 'Residente Prata' : user.role === 'lider' ? 'Líder Comunitário' : user.role === 'prefeitura' ? 'Prefeitura' : 'Empresa/IES'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--on-surface)' }}>
                {showPoints && user.role === 'morador' ? `✪ ${user.points || 450} pts` : user.name}
              </div>
            </div>
          </>
        ) : (
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>
            Participa 360
          </h1>
        )}
      </div>

      <button className="btn btn-outline" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', minHeight: 'auto', position: 'relative' }} aria-label="Notificações">
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
        <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--error)' }}></span>
      </button>
    </header>
  );
}
