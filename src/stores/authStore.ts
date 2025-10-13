import { defineStore } from 'pinia'
import { api } from '@/plugins/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    loading: false,
  }),

  actions: {
    async login(email: string, password: string, remember = false) {
      this.loading = true
      try {
        await api.get('/sanctum/csrf-cookie')
        await api.post('/api/login', { email, password, remember })
        const response = await api.get('/api/user')
        this.user = response.data
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
