const store = {
  user: null,
  token: localStorage.getItem('p360_token'),
  currentPage: 'login',
  currentReportCategory: null,
  
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

  dispatch(action, payload) {
    if (action === 'SET_USER') this.setUser(payload);
    if (action === 'SET_TOKEN') this.setToken(payload);
  },

  setState(state) {
    Object.assign(this, state);
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
    return routes[this.user?.role] || '/home';
  }
};

export default store;
