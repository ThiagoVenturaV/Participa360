import store from './store.js';
import router from './router.js';

const API_BASE = '/api';

export async function api(path, options = {}) {
  const token = localStorage.getItem('p360_token');
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  };
  
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }
  
  try {
    const res = await fetch(`${API_BASE}${path}`, config);
    
    if (res.status === 401) {
      store.clearAuth();
      router.navigate('/login');
      throw new Error('Unauthorized');
    }
    
    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

api.get = (path, options) => api(path, { method: 'GET', ...options });
api.post = (path, body, options) => api(path, { method: 'POST', body, ...options });
api.patch = (path, body, options) => api(path, { method: 'PATCH', body, ...options });
api.delete = (path, options) => api(path, { method: 'DELETE', ...options });
