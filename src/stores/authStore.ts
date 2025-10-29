import { defineStore } from 'pinia'
import { api } from '@/plugins/api'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async login(email: string, password: string, remember = false) {
      this.loading = true
      try {
        // Paso CSRF necesario para Laravel Sanctum
        await api.get('/sanctum/csrf-cookie')

        // Login
        await api.post('/api/login', { email, password, remember })

        // Obtener usuario
        const response = await api.get('/api/user')
        this.user = response.data

      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          throw new Error(err.response.data.message || 'Credenciales inválidas')
        }

        throw err;
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await api.post('/api/logout')
      } finally {
        this.user = null
      }
    },

    async fetchUser() {
      try {
        const response = await api.get('/api/user')
        this.user = response.data
      } catch {
        this.user = null
      }
    },
  },

  persist: true,
})
