import axios from 'axios';

// Create Axios Instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthorized errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized or token expired. Logging out...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to home or login might be handled dynamically
      if (window.location.pathname !== '/' && !window.location.pathname.includes('login')) {
         window.location.href = '/'; 
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
