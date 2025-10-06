// src/plugins/api.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

// ✅ Crea la instancia de axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH,
  withCredentials: true, // importante si usas cookies httpOnly
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ✅ Interceptor para agregar el token automáticamente a cada request
api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  const access_token = auth.access_token
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }
  return config
})

// =======================================================
// 🧠 Interceptor de respuesta con manejo de refresh token
// =======================================================

let isRefreshing = false
let failedQueue: Array<{ resolve: Function; reject: Function; config: any }> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Si es 401 (token expirado) y no se ha reintentado aún
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Si ya hay un refresh en curso → espera a que termine
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest })
        }).then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      isRefreshing = true

      try {
        // ✅ Llamada al endpoint de refresh token
        const refreshResp = await api.post('refresh-token')
        const newToken = refreshResp.data.access_token

        // ✅ Actualiza token en el store y storage
        const auth = useAuthStore()
        auth.setToken(newToken)

        // ✅ Reprocesa la cola de peticiones en espera
        processQueue(null, newToken)

        // ✅ Reintenta la petición original
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)

        // ❌ Si falla el refresh → logout forzoso
        const auth = useAuthStore()
        auth.logout()
        throw err
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
