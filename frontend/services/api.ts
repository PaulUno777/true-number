import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshRetryCount = 0;
const MAX_REFRESH_RETRIES = 5;

const clearSession = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  refreshRetryCount = 0;
  window.location.href = '/auth';
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        if (refreshRetryCount >= MAX_REFRESH_RETRIES) {
          console.error(`Auth refresh failed after ${MAX_REFRESH_RETRIES} attempts. Clearing session.`);
          clearSession();
          return Promise.reject(new Error('Max refresh retries exceeded'));
        }

        refreshRetryCount++;
        console.log(`Auth refresh attempt ${refreshRetryCount}/${MAX_REFRESH_RETRIES}`);

        const response = await api.post('/auth/refresh', {
          refreshToken,
        });

        const { accessToken } = response.data;
        Cookies.set('accessToken', accessToken);
        refreshRetryCount = 0; // Reset counter on successful refresh

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error(`Auth refresh failed (attempt ${refreshRetryCount}/${MAX_REFRESH_RETRIES}):`, refreshError);
        
        if (refreshRetryCount >= MAX_REFRESH_RETRIES) {
          console.error(`Max refresh retries exceeded. Clearing session.`);
          clearSession();
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);