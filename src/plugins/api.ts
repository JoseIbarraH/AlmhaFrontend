import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

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

api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status
    const isLoginRoute = router.currentRoute.value.name === 'auth.login'
    const isLoginRequest = error.config.url?.endsWith('/api/login')

    if (status === 401 && !isLoginRoute && !isLoginRequest) {
      const auth = useAuthStore()
      auth.logout()
      router.push({ name: 'auth.login' })
    }

    if (status === 419) {
      return Promise.reject({ silent: true })
    }

    return Promise.reject(error)
  }
)
