import store from './store.js';

const routes = {
  '/login': { page: () => import('./pages/login.js'), requiresAuth: false },
  '/register': { page: () => import('./pages/register.js'), requiresAuth: false },
  '/home': { page: () => import('./pages/home-morador.js'), requiresAuth: true, allowedRoles: ['morador'] },
  '/home-lider': { page: () => import('./pages/home-lider.js'), requiresAuth: true, allowedRoles: ['lider'] },
  '/home-prefeitura': { page: () => import('./pages/home-prefeitura.js'), requiresAuth: true, allowedRoles: ['prefeitura'] },
  '/home-empresa': { page: () => import('./pages/home-empresa.js'), requiresAuth: true, allowedRoles: ['empresa'] },
  '/reportar': { page: () => import('./pages/reportar-categorias.js'), requiresAuth: true, allowedRoles: ['morador', 'lider'] },
  '/reportar-detalhes': { page: () => import('./pages/reportar-detalhes.js'), requiresAuth: true, allowedRoles: ['morador', 'lider'] },
  '/reportar-sucesso': { page: () => import('./pages/reportar-sucesso.js'), requiresAuth: true, allowedRoles: ['morador', 'lider'] },
  '/alertas': { page: () => import('./pages/alertas.js'), requiresAuth: true },
  '/meus-relatos': { page: () => import('./pages/meus-relatos.js'), requiresAuth: true, allowedRoles: ['morador', 'lider'] },
  '/marketplace': { page: () => import('./pages/marketplace.js'), requiresAuth: true, allowedRoles: ['morador', 'lider'] },
  '/projeto/:id': { page: () => import('./pages/detalhes-projeto.js'), requiresAuth: true },
  '/perfil': { page: () => import('./pages/perfil.js'), requiresAuth: true }
};

const router = {
  navigate(path) {
    window.location.hash = path;
  },
  
  async handleRoute() {
    let path = window.location.hash.slice(1) || '/';
    if (path === '/') path = store.isAuthenticated() ? store.getHomeRoute() : '/login';
    
    let route = routes[path];
    let params = {};
    
    if (!route) {
      for (const [routePath, routeConfig] of Object.entries(routes)) {
        if (routePath.includes(':')) {
          const regexPath = routePath.replace(/:[^\s/]+/g, '([^/]+)');
          const regex = new RegExp(`^${regexPath}$`);
          const match = path.match(regex);
          if (match) {
            route = routeConfig;
            params.id = match[1];
            break;
          }
        }
      }
    }
    
    if (!route) {
      this.navigate(store.isAuthenticated() ? store.getHomeRoute() : '/login');
      return;
    }
    
    if (route.requiresAuth && !store.isAuthenticated()) {
      this.navigate('/login');
      return;
    }
    
    if (route.allowedRoles && store.user && !route.allowedRoles.includes(store.user.role)) {
      this.navigate(store.getHomeRoute());
      return;
    }
    
    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.classList.remove('page-transition');
        void appContainer.offsetWidth; // trigger reflow
        appContainer.classList.add('page-transition');
    }
    
    try {
      store.currentPage = path;
      const module = await route.page();
      const renderFn = module.render || module.default;
      if (renderFn && appContainer) {
        appContainer.innerHTML = '';
        const pageContent = await renderFn(appContainer, params);
        if (typeof pageContent === 'string') {
           appContainer.innerHTML = pageContent;
        } else if (pageContent instanceof Node) {
           appContainer.appendChild(pageContent);
        }
      }
    } catch (error) {
      console.error('Failed to load page:', error);
      if (appContainer) {
          appContainer.innerHTML = `<div class="page-content animate-fade-in"><h2>Página em construção</h2><p>Route: ${path}</p></div>`;
      }
    }
  },
  
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }
};

export { router };
export default router;
