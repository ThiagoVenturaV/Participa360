const store = {
  user: null,
  token: localStorage.getItem('p360_token'),
  currentPage: 'login',
  
  setUser(user) {
    this.user = user;
  },
  
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('p360_token', token);
    } else {
      localStorage.removeItem('p360_token');
    }
  },
  
  clearAuth() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('p360_token');
  },
  
  isAuthenticated() {
    return !!this.token;
  },
  
  getHomeRoute() {
    const routes = {
      morador: '/home',
      lider: '/home-lider',
      prefeitura: '/home-prefeitura',
      empresa: '/home-empresa'
    };
    return routes[this.user?.role] || '/login';
  }
};

export default store;
