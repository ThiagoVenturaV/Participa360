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
          
          <div class="pt-2">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Como você vai usar o app?</label>
            <div class="grid grid-cols-2 gap-3">
              <label class="cursor-pointer">
                <input type="radio" name="role" value="morador" class="peer sr-only" checked>
                <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/20 transition-all text-center">
                  <span class="material-symbols-outlined text-indigo-500 mb-1">person</span>
                  <div class="font-medium text-sm text-slate-900 dark:text-white">Morador</div>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="role" value="lider" class="peer sr-only">
                <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/20 transition-all text-center">
                  <span class="material-symbols-outlined text-emerald-500 mb-1">groups</span>
                  <div class="font-medium text-sm text-slate-900 dark:text-white">Líder Comunitário</div>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="role" value="prefeitura" class="peer sr-only">
                <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/20 transition-all text-center">
                  <span class="material-symbols-outlined text-amber-500 mb-1">account_balance</span>
                  <div class="font-medium text-sm text-slate-900 dark:text-white">Prefeitura</div>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="role" value="empresa" class="peer sr-only">
                <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/20 transition-all text-center">
                  <span class="material-symbols-outlined text-purple-500 mb-1">domain</span>
                  <div class="font-medium text-sm text-slate-900 dark:text-white">Empresa/IES</div>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors mt-6 flex justify-center items-center">
            <span>Criar Conta</span>
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
    const role = container.querySelector('input[name="role"]:checked').value;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span>';
    submitBtn.disabled = true;

    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      store.dispatch('SET_USER', response.user);
      store.dispatch('SET_TOKEN', response.token);
      
      if (role === 'morador') router.navigate('/home-morador');
      else if (role === 'lider') router.navigate('/home-lider');
      else if (role === 'prefeitura') router.navigate('/home-prefeitura');
      else if (role === 'empresa') router.navigate('/home-empresa');
      else router.navigate('/');
    } catch (error) {
      alert('Erro ao registrar: ' + (error.message || 'Tente novamente.'));
      submitBtn.innerHTML = '<span>Criar Conta</span>';
      submitBtn.disabled = false;
    }
  });

  container.querySelector('#login-link').addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/login');
  });
}
