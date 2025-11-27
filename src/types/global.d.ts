import { ComponentCustomProperties } from 'vue'
import type { VueI18n } from 'vue-i18n' // Importa el tipo correcto

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $can: (permission: string) => boolean
    $t: VueI18n['t'] // <<< usa SOLO el tipo legacy, evita la unión incompatible
  }
}
