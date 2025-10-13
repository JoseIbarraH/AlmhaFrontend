import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

//Configuración base para Laravel Sanctum
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

//Interceptor para leer el token XSRF de las cookies
api.interceptors.request.use((config) => {
  //Search local with backend
  const lang = localStorage.getItem('lang') || document.documentElement.lang || 'es'
  config.headers['Accept-Language'] = lang

  //Read the XSRF-Token of cookie
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }

  return config;
});

// Interceptor de respuesta global (manejo de 401 y 419)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status

    if (status === 401) {
      try {
        console.log('Usuario no autorizado');
        const auth = useAuthStore()
        auth.logout()
      } catch {}
    }

    if (status === 419) {
      return Promise.reject({ silent: true })
    }

    return Promise.reject(error)
  }
)
