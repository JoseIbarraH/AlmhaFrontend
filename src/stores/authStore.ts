import { sesionDeleteService, sesionGetService, sesionSetService } from '@/services/sesionService'
import { defineStore } from 'pinia'
import { api } from '@/plugins/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    access_token: null as string | null,
    remember: false as boolean,
  }),
  actions: {
    /**
     * Guarda user + token + lógica de persistencia.
     */
    setAuth(user: any, access_token: string, remember: boolean = false) {
      this.user = user
      this.access_token = access_token
      this.remember = remember

      const storage = remember ? localStorage : sessionStorage
      storage.setItem('auth', JSON.stringify({ user, access_token, remember }))
    },

    /**
     * Actualiza solo el token en memoria y almacenamiento.
     */
    setToken(access_token: string) {
      this.access_token = access_token

      const storage = this.remember ? localStorage : sessionStorage
      const saved = JSON.parse(storage.getItem('auth') || 'null') || {}
      saved.token = access_token
      storage.setItem('auth', JSON.stringify(saved))
    },

    /**
     * Actualiza solo el usuario.
     */
    setUser(user: any) {
      this.user = user

      const storage = this.remember ? localStorage : sessionStorage
      const saved = JSON.parse(storage.getItem('auth') || 'null') || {}
      saved.user = user
      storage.setItem('auth', JSON.stringify(saved))
    },

    /**
     * Carga sesión guardada (localStorage o sessionStorage).
     */
    loadSession() {
      let saved = JSON.parse(localStorage.getItem('auth') || 'null')
      if (!saved) {
        saved = JSON.parse(sesionGetService('auth') || 'null')
      }
      if (saved) {
        this.user = saved.user
        this.access_token = saved.access_token
        this.remember = saved.remember ?? false
      }
    },

    /**
     * Logout: limpia datos y almacenamiento.
     */
    async logout() {
      try {
        await api.post('logout')
      } catch (e) {
        console.warn('Error en logout:', e)
      }

      this.user = null
      this.access_token = null
      this.remember = false

      localStorage.removeItem('auth')
      sesionDeleteService('auth')
      sesionDeleteService('auth-token')
    }
  }
})
