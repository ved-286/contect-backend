import axios from 'axios'
import { authService } from '@/services/authService'

const api = axios.create({
  baseURL: 'http://localhost:5001/api'
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    
    // Check if token is expired
    if (token && authService.isTokenExpired(token)) {
      try {
        // Try to refresh the token
        const newToken = await authService.refreshToken();
        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        // If refresh fails, the authService will handle the redirect
        return Promise.reject(error);
      }
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const newToken = await authService.refreshToken();
        
        // Update the failed request's authorization header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, the authService will handle the redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;