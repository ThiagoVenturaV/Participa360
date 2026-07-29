import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-6 animate-fade-in">
      <div class="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 animate-slide-up stagger-1">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Participa 360</h1>
          <p class="text-slate-500 dark:text-slate-400">Transforme sua cidade</p>
        </div>
        
        <form id="login-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input type="email" id="email" required class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Senha</label>
            <input type="password" id="password" required class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
          </div>
          <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center">
            <span>Entrar</span>
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <a href="#" id="register-link" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">Não tem conta? Cadastre-se</a>
        </div>
      </div>
    </div>
  `;

  const form = container.querySelector('#login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = container.querySelector('#email').value;
    const password = container.querySelector('#password').value;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span>';
    submitBtn.disabled = true;

    try {
      const response = await api.post('/auth/login', { email, password });
      store.dispatch('SET_USER', response.user);
      store.dispatch('SET_TOKEN', response.token);
      
      const role = response.user.role;
      if (role === 'morador') router.navigate('/home-morador');
      else if (role === 'lider') router.navigate('/home-lider');
      else if (role === 'prefeitura') router.navigate('/home-prefeitura');
      else if (role === 'empresa') router.navigate('/home-empresa');
      else router.navigate('/');
    } catch (error) {
      alert('Erro ao fazer login: ' + (error.message || 'Verifique suas credenciais.'));
      submitBtn.innerHTML = '<span>Entrar</span>';
      submitBtn.disabled = false;
    }
  });

  container.querySelector('#register-link').addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/register');
  });
}
