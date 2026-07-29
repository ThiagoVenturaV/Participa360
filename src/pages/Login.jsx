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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login(email, password);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9ff] px-5 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#1f108e] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-lg shadow-indigo-200">
            360
          </div>
          <h1 className="text-2xl font-extrabold text-[#0b1c30]">Participa 360</h1>
          <p className="text-slate-500 text-sm mt-1">Transforme sua cidade com a comunidade</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              'Entrar'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-bold text-[#1f108e] hover:underline">
            Cadastre-se como Morador
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 text-center mb-3">
            Demo Logins Rápido:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => { setEmail('morador@participa360.com.br'); setPassword('demo123'); }}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-left hover:bg-indigo-50 transition-colors"
            >
              <div className="font-bold text-indigo-900">Morador</div>
              <div className="text-[10px] text-slate-500">450 pts</div>
            </button>
            <button
              onClick={() => { setEmail('lider@participa360.com.br'); setPassword('demo123'); }}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-left hover:bg-emerald-50 transition-colors"
            >
              <div className="font-bold text-emerald-900">Líder</div>
              <div className="text-[10px] text-slate-500">1.200 pts</div>
            </button>
            <button
              onClick={() => { setEmail('prefeitura@participa360.com.br'); setPassword('demo123'); }}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-left hover:bg-amber-50 transition-colors"
            >
              <div className="font-bold text-amber-900">Prefeitura</div>
              <div className="text-[10px] text-slate-500">Gestão</div>
            </button>
            <button
              onClick={() => { setEmail('empresa@participa360.com.br'); setPassword('demo123'); }}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-left hover:bg-purple-50 transition-colors"
            >
              <div className="font-bold text-purple-900">Empresa/IES</div>
              <div className="text-[10px] text-slate-500">CSR</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
