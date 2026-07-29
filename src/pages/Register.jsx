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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9ff] px-5 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-[#0b1c30]">Criar Conta Morador</h1>
          <p className="text-slate-500 text-sm mt-1">Faça a diferença na sua comunidade</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Maria Silva"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#1f108e] focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#1f108e] focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#1f108e] focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 text-sm transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-full bg-[#1f108e] text-white font-bold hover:bg-indigo-900 transition-colors shadow-md shadow-indigo-200 flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-xl">sync</span>
            ) : (
              'Cadastrar e Começar'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Já possui uma conta?{' '}
          <Link to="/login" className="font-bold text-[#1f108e] hover:underline">
            Fazer Login
          </Link>
        </div>
      </div>
    </div>
  );
}
