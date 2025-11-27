import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { api } from '@/plugins/api'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /* user: null as any, */
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
      this.loading = true;

      try {
        // Obtener cookie CSRF
        await api.get('/sanctum/csrf-cookie');
        this.permissions = []
        // Intentar login
        const { data } = await api.post('/api/login', { email, password, remember });

        // Guardar usuario y respuesta completa
        this.user = data?.data;
        this.permissions = this.user?.roles ?.flatMap(role => role.permissions.map(p => p.code)) ?? []

        console.log('Permisos: ', this.permissions)

        // Retornar resultado exitoso
        return {
          success: true,
          message: 'Autenticación exitosa',
          data: data
        };
      } catch (err: unknown) {
        let message = 'Ocurrió un error al iniciar sesión';

        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            message = err.response.data.message || 'Credenciales inválidas';
          } else if (err.response?.data?.message) {
            message = err.response.data.message;
          }
        }

        // Retornar resultado fallido sin lanzar excepción
        return {
          success: false,
          message,
          data: null
        };
      } finally {
        this.loading = false;
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
        const { data } = await api.get('/api/user')
        this.permissions = []
        this.user = data
        this.permissions = this.user?.roles ?.flatMap(role => role.permissions.map(p => p.code)) ?? []
        return this.user
      } catch {
        this.user = null
      }
    },
  },

  persist: true,
})
