import axios from 'axios'
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


api.interceptors.request.use((config) => {
  const lang = localStorage.getItem('lang') || document.documentElement.lang || 'es'
  config.headers['Accept-Language'] = lang

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
    console.error("error en api:", error)
    if (status === 401 && !isLoginRoute && !isLoginRequest) {
      router.push({ name: 'auth.login' })
      /* return Promise.reject({ silent: true }) */
    }
    if (status === 419) {
      router.push({ name: 'auth.login' })
      /* return Promise.reject({ silent: true }) */
    }

    return Promise.reject(error)
  }
)
