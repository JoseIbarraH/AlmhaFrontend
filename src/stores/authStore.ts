import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { api } from '@/plugins/api'
import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = import.meta.env.VITE_STORAGE_KEY

const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString()
}

const decrypt = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

const encryptedStorage = {
  getItem: (key: string): string | null => {
    const encryptedData = localStorage.getItem(key)
    if (!encryptedData) return null

    try {
      const decryptedData = decrypt(encryptedData)
      return decryptedData
    } catch (error) {
      console.error('Error decrypting data:', error)
      localStorage.removeItem(key)
      return null
    }
  },

  setItem: (key: string, value: string): void => {
    try {
      const encryptedData = encrypt(value)
      localStorage.setItem(key, encryptedData)
    } catch (error) {
      console.error('Error encrypting data:', error)
    }
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key)
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    permissions: [] as string[]
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,

    can: (state) => {
      return (permission: string) => {
        return state.permissions.includes(permission)
      }
    }
  },

  actions: {
    async login(email: string, password: string, remember = false) {
      this.loading = true

      try {
        await api.get('/sanctum/csrf-cookie')
        this.permissions = []

        const { data } = await api.post('/api/login', { email, password, remember })

        this.user = data?.data
        this.permissions = this.user?.roles?.flatMap(role => role.permissions.map(p => p.code)) ?? []
        return {
          success: true,
          message: 'Autenticación exitosa',
          data: data
        }
      } catch (err: unknown) {
        let message = 'Ocurrió un error al iniciar sesión'
        return {
          success: false,
          message,
          data: null
        }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await api.post('/api/logout')
      } catch (error) {
        console.log('No autorizado')
      } finally {
        this.user = null
        this.permissions = []
      }
    },

    async fetchUser() {
      try {
        const { data } = await api.get('/api/user')
        this.permissions = []
        this.user = data
        this.permissions = this.user?.roles?.flatMap(role => role.permissions.map(p => p.code)) ?? []
        return this.user
      } catch (error) {
        this.user = null
      }
    }
  },

  persist: {
    storage: encryptedStorage
  }
})
