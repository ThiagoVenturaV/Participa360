import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Perfil({ onOpenPWATutorial }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* User Card */}
        <div className="card" style={{ textAlign: 'center', padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '28px', border: '4px solid var(--primary-fixed)', boxShadow: 'var(--shadow-ambient)' }}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--on-surface)' }}>{user?.name || 'Usuário'}</h2>
            <div style={{ fontSize: '12px', color: 'var(--outline)', marginTop: '2px' }}>{user?.email || 'usuario@participa360.com'}</div>
          </div>
          <span className="badge badge-em-execucao" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {user?.role === 'morador' ? 'Morador • Residente Prata' : user?.role === 'lider' ? 'Líder Comunitário' : user?.role === 'prefeitura' ? 'Prefeitura' : 'Empresa / IES'}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid-2">
          <div className="card card-metric">
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--on-surface)' }}>{user?.points || 450}</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>PONTOS CÍVICOS</div>
          </div>
          <div className="card card-metric">
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--secondary)' }}>Nível 2</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--outline)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>CIDADÃO ENGAJADO</div>
          </div>
        </div>

        {/* Menu list */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '24px' }}>
          <button onClick={() => navigate('/meus-relatos')} className="list-item" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: '700' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>history</span> Meus Relatos
            </span>
            <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>chevron_right</span>
          </button>

          <button onClick={() => navigate('/marketplace')} className="list-item" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: '700' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>card_giftcard</span> Minhas Recompensas
            </span>
            <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>chevron_right</span>
          </button>

          <button onClick={onOpenPWATutorial} className="list-item" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: '700' }}>
              <span className="material-symbols-outlined" style={{ color: '#b45309' }}>install_mobile</span> Instalar App (Tutorial PWA)
            </span>
            <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>chevron_right</span>
          </button>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-block"
          style={{ borderColor: '#fecaca', color: '#991b1b', backgroundColor: '#fef2f2', borderRadius: '9999px', marginTop: '8px' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '6px' }}>logout</span>
          Sair da Conta
        </button>
      </main>
    </div>
  );
}
