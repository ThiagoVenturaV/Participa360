import { api } from '../api.js';
import store from '../store.js';
import { router } from '../router.js';

export function render(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-6 animate-fade-in">
      <div class="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 animate-slide-up stagger-1">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Criar Conta</h1>
          <p class="text-slate-500 dark:text-slate-400">Junte-se ao Participa 360</p>
        </div>
        
        <form id="register-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
            <input type="text" id="name" required class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input type="email" id="email" required class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Senha</label>
            <input type="password" id="password" required class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
          </div>

          <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors mt-6 flex justify-center items-center">
            <span>Criar Conta Morador</span>
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <a href="#" id="login-link" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">Já tem conta? Entre</a>
        </div>
      </div>
    </div>
  `;

  const form = container.querySelector('#register-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = container.querySelector('#name').value;
    const email = container.querySelector('#email').value;
    const password = container.querySelector('#password').value;
    const role = 'morador';
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span>';
    submitBtn.disabled = true;

    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      store.dispatch('SET_USER', response.user);
      store.dispatch('SET_TOKEN', response.token);
      router.navigate('/home');
    } catch (error) {
      alert('Erro ao registrar: ' + (error.message || 'Tente novamente.'));
      submitBtn.innerHTML = '<span>Criar Conta Morador</span>';
      submitBtn.disabled = false;
    }
  });

  container.querySelector('#login-link').addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/login');
  });
}
