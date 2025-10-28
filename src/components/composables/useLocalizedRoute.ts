// src/composables/useLocalizedRoute.ts
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNamedRaw, RouteLocationRaw } from 'vue-router'
import { getI18nLocale, type Locale } from '@/plugins/i18n'

export function useLocalizedRoute() {
  const route = useRoute()

  // Obtener el locale actual de la ruta o de i18n
  const locale = computed<Locale>(() => {
    return (route.params.locale as Locale) || getI18nLocale()
  })

  /**
   * Crea un objeto de ruta con el locale incluido automáticamente
   * @param to - Nombre de la ruta o objeto RouteLocation
   * @param params - Parámetros adicionales opcionales
   */
  const localizedRoute = (
    to: string | RouteLocationNamedRaw,
    params?: Record<string, any>
  ): RouteLocationRaw => {
    if (typeof to === 'string') {
      return {
        name: to,
        params: {
          locale: locale.value,
          ...params
        }
      }
    }

    return {
      ...to,
      params: {
        locale: locale.value,
        ...to.params,
        ...params
      }
    }
  }

  return {
    locale,
    localizedRoute
  }
}
