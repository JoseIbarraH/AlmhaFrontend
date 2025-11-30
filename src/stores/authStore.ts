import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { api } from '@/plugins/api'
import axios from 'axios'
import CryptoJS from 'crypto-js'

// Clave de encriptación (generada única por instalación)
const ENCRYPTION_KEY = import.meta.env.VITE_STORAGE_KEY || 'your-secret-key-here-change-in-production'

// Utilidades de encriptación
const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString()
}

const decrypt = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

// Plugin personalizado de persistencia con encriptación
const encryptedStorage = {
  getItem: (key: string): string | null => {
    const encryptedData = localStorage.getItem(key)
    if (!encryptedData) return null

    try {
      const decryptedData = decrypt(encryptedData)
      return decryptedData
    } catch (error) {
      console.error('Error decrypting data:', error)
      localStorage.removeItem(key) // Limpiar dato corrupto
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
        // Obtener cookie CSRF
        await api.get('/sanctum/csrf-cookie')
        this.permissions = []

        // Intentar login
        const { data } = await api.post('/api/login', { email, password, remember })

        // Guardar usuario y respuesta completa
        this.user = data?.data
        this.permissions = this.user?.roles?.flatMap(role => role.permissions.map(p => p.code)) ?? []

        console.log('Permisos: ', this.permissions)

        // Retornar resultado exitoso
        return {
          success: true,
          message: 'Autenticación exitosa',
          data: data
        }
      } catch (err: unknown) {
        let message = 'Ocurrió un error al iniciar sesión'

        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            message = err.response.data.message || 'Credenciales inválidas'
          } else if (err.response?.data?.message) {
            message = err.response.data.message
          }
        }

        // Retornar resultado fallido sin lanzar excepción
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
      } catch {
        this.user = null
      }
    }
  },

  persist: {
    storage: encryptedStorage
  }
})
