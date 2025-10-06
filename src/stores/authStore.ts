import { sesionDeleteService, sesionSetService } from '@/services/sesionService'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('user') || 'null'),
    token: sessionStorage.getItem('auth-token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setAuth(user: any, token: string) {
      this.user = user
      this.token = token
      sesionSetService('user', JSON.stringify(user))
      sesionSetService('auth-token', token)
    },
    logout() {
      this.user = null
      this.token = null
      sesionDeleteService('user')
      sesionDeleteService('auth-token')
    },
  },
})

