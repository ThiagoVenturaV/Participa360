import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(name, email, password, 'morador');
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar. Tente outro email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-login animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div className="card animate-slide-up stagger-1" style={{ maxWidth: '420px', width: '100%', padding: '32px', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <img src="/logo.png" alt="Pilar 360 Logo" style={{ width: '100%', maxWidth: '200px', height: 'auto', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--on-surface)', marginBottom: '4px' }}>Criar Conta Morador</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)' }}>Faça a diferença na sua comunidade</p>
        </div>

        {error && (
          <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: '12px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Nome Completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Maria Silva"
              className="input-field"
            />
          </div>

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
            {loading ? 'Cadastrando...' : 'Cadastrar e Começar'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--outline)' }}>
          Já possui uma conta?{' '}
          <Link to="/login" style={{ fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>
            Fazer Login
          </Link>
        </div>
      </div>
    </div>
  );
}
