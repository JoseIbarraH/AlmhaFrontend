import type { App } from 'vue'
import { useAuthStore } from '@/stores/authStore'

export default {
  install(app: App) {
    const auth = useAuthStore()

    app.config.globalProperties.$can = (permission: string): boolean => {
      return auth.permissions.includes(permission)
    }
  }
}
