import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ showPoints = true }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const isGovOrCorp = user?.role === 'prefeitura' || user?.role === 'empresa';

  return (
    <>
      <header className="header" style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', zIndex: 40, borderBottom: '1px solid var(--surface-dim)' }}>
        <div className="header-user" onClick={() => navigate('/perfil')} style={{ cursor: 'pointer' }}>
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
                  {user.role === 'morador' ? 'Residente Prata' : user.role === 'lider' ? 'Líder Comunitário' : user.role === 'prefeitura' ? 'Prefeitura' : 'Empresa ESG'}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--on-surface)' }}>
                  {user.name}
                </div>
              </div>
            </>
          ) : (
            <img src="/logo.png" alt="Pilar 360" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user && !isGovOrCorp && (
            <button
              onClick={() => navigate('/ranking')}
              className="btn btn-sm"
              style={{
                borderRadius: '9999px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '800',
                backgroundColor: 'var(--surface-container)',
                color: 'var(--primary)',
                border: '1px solid var(--surface-dim)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d97706' }}>military_tech</span>
              {user.points || 450} pts
            </button>
          )}

          {user && isGovOrCorp && (
            <button
              onClick={() => navigate('/ranking')}
              className="btn btn-sm"
              style={{
                borderRadius: '9999px',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: '800',
                backgroundColor: 'var(--surface-container)',
                color: 'var(--primary)',
                border: '1px solid var(--surface-dim)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>analytics</span>
              {user.role === 'prefeitura' ? 'Painel Gestão' : 'Painel ESG'}
            </button>
          )}

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn btn-outline"
            style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', minHeight: 'auto', position: 'relative' }}
            aria-label="Notificações"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
            <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--error)' }}></span>
          </button>
        </div>
      </header>

      {/* Notifications Drawer Dropdown */}
      {showNotifications && (
        <div className="card animate-slide-up" style={{ position: 'fixed', top: '64px', right: '16px', width: '320px', zIndex: 100, borderRadius: '20px', padding: '16px', boxShadow: 'var(--shadow-elevated)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700' }}>Notificações Recentes</span>
            <button onClick={() => setShowNotifications(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--outline)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '12px', backgroundColor: 'var(--surface-container)' }}>
              <div style={{ fontWeight: '700', color: 'var(--error)' }}>🚨 Urgente: Obras na Rua Flores</div>
              <div style={{ fontSize: '11px', color: 'var(--outline)' }}>Há 10 min</div>
            </div>
            <div style={{ padding: '8px', borderRadius: '12px', backgroundColor: 'var(--surface-container)' }}>
              <div style={{ fontWeight: '700', color: 'var(--secondary)' }}>✓ Relato de Iluminação Resolvido</div>
              <div style={{ fontSize: '11px', color: 'var(--outline)' }}>2h atrás</div>
            </div>
          </div>
          <button onClick={() => { setShowNotifications(false); navigate('/alertas'); }} className="btn btn-ghost btn-sm btn-block" style={{ marginTop: '8px', fontWeight: '700' }}>
            Ver Todas Notificações →
          </button>
        </div>
      )}
    </>
  );
}
