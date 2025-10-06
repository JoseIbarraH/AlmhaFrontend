import 'vue-i18n'
import type es from '@/i18n/locales/es.json'

type MessageSchema = typeof es

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}
