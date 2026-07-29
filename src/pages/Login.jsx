import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    setError('');

    try {
      const user = await login(demoEmail, demoPassword);
      if (user.role === 'lider') navigate('/home-lider');
      else if (user.role === 'prefeitura') navigate('/home-prefeitura');
      else if (user.role === 'empresa') navigate('/home-empresa');
      else navigate('/home');
    } catch (err) {
      setError(err.message || 'Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleQuickLogin(email, password);
  };

  return (
    <div className="page page-login animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div className="card animate-slide-up stagger-1" style={{ maxWidth: '420px', width: '100%', padding: '32px', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px', fontWeight: '900', boxShadow: 'var(--shadow-ambient)' }}>
            360
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--on-surface)', marginBottom: '4px' }}>Participa 360</h1>
          <p style={{ fontSize: '14px', color: 'var(--outline)' }}>Transforme sua cidade com a comunidade</p>
        </div>

        {error && (
          <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: '12px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="input-field"
            />
          </div>

          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label className="input-label">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg btn-block"
            style={{ borderRadius: '9999px' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--outline)' }}>
          Não tem uma conta?{' '}
          <Link to="/register" style={{ fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>
            Cadastre-se como Morador
          </Link>
        </div>

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--outline-variant)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--outline)', textAlign: 'center', marginBottom: '12px' }}>
            Logins Rápidos (Clique para Entrar):
          </div>
          <div className="grid-2" style={{ gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleQuickLogin('joao@example.com', 'demo123')}
              disabled={loading}
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 12px', minHeight: 'auto', borderRadius: '12px' }}
            >
              <span style={{ fontWeight: '700', fontSize: '12px', color: 'var(--primary)' }}>João Silva</span>
              <span style={{ fontSize: '10px', color: 'var(--outline)' }}>joao@example.com</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('elena@example.com', 'demo123')}
              disabled={loading}
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 12px', minHeight: 'auto', borderRadius: '12px' }}
            >
              <span style={{ fontWeight: '700', fontSize: '12px', color: 'var(--secondary)' }}>Elena Santos</span>
              <span style={{ fontSize: '10px', color: 'var(--outline)' }}>elena@example.com</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@prefeitura.gov.br', 'demo123')}
              disabled={loading}
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 12px', minHeight: 'auto', borderRadius: '12px' }}
            >
              <span style={{ fontWeight: '700', fontSize: '12px', color: '#b45309' }}>Prefeitura</span>
              <span style={{ fontSize: '10px', color: 'var(--outline)' }}>admin@prefeitura.gov.br</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('contato@acmecorp.com', 'demo123')}
              disabled={loading}
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 12px', minHeight: 'auto', borderRadius: '12px' }}
            >
              <span style={{ fontWeight: '700', fontSize: '12px', color: '#6b21a8' }}>Acme Corp</span>
              <span style={{ fontSize: '10px', color: 'var(--outline)' }}>contato@acmecorp.com</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
