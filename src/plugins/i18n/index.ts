import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

export type Locale = 'es' | 'en'

export const SUPPORTED_LOCALES: Locale[] = ['es', 'en']
export const DEFAULT_LOCALE: Locale = 'es'

// Función para obtener el idioma del navegador
function getBrowserLocale(): Locale {
  const navigatorLocale = navigator.language.split('-')[0] as Locale
  return SUPPORTED_LOCALES.includes(navigatorLocale) ? navigatorLocale : DEFAULT_LOCALE
}

// Crear instancia de i18n con legacy: false (Composition API)
const i18n = createI18n({
  legacy: false, // IMPORTANTE: esto hace que locale sea un WritableComputedRef
  locale: getBrowserLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    es,
    en
  },
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false
})

// Helper function para cambiar el idioma de forma segura
export function setI18nLocale(locale: Locale): void {
  const i18nLocale = i18n.global.locale
  if (typeof i18nLocale === 'string') {
    console.warn('Cannot set locale: i18n is in legacy mode')
  } else {
    i18nLocale.value = locale
  }
}

// Helper function para obtener el idioma actual
export function getI18nLocale(): Locale {
  const i18nLocale = i18n.global.locale
  const locale = typeof i18nLocale === 'string' ? i18nLocale : i18nLocale.value
  return locale as Locale
}

export default i18n
