import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { api } from '@/plugins/api'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /* user: null as any, */
    user: null as User | null,
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async login(email: string, password: string, remember = false) {
      this.loading = true;

      try {
        // Obtener cookie CSRF
        await api.get('/sanctum/csrf-cookie');

        // Intentar login
        const { data } = await api.post('/api/login', { email, password, remember });

        // Guardar usuario y respuesta completa
        this.user = data?.data;

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
        const response = await api.get('/api/user')
        this.user = response.data
      } catch {
        this.user = null
      }
    },
  },

  persist: true,
})
