<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import type { Locale } from '@/plugins/i18n'

defineProps<{
  color?: string
}>()

const { locale } = useI18n({ useScope: 'global' })
const router = useRouter()
const route = useRoute()

const showDropdown = ref(false)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function changeLanguage(newLocale: Locale) {
  // Cerrar el dropdown
  showDropdown.value = false

  // Cambiar el locale de i18n
  locale.value = newLocale

  // Cambiar la URL manteniendo la ruta actual
  const currentRoute = route.name
  const params = { ...route.params, locale: newLocale }
  const query = { ...route.query }

  if (currentRoute) {
    router.push({
      name: currentRoute as string,
      params: params,
      query: query
    })
  } else {
    // Fallback si no hay nombre de ruta
    const currentPath = route.path.replace(/^\/(es|en)/, '')
    router.push(`/${newLocale}${currentPath || ''}`)
  }
}

// Cerrar dropdown al hacer click fuera
function closeDropdown(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.language-switcher')) {
    showDropdown.value = false
  }
}

// Agregar listener cuando el dropdown está abierto
import { watch, onUnmounted } from 'vue'

watch(showDropdown, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', closeDropdown)
  } else {
    document.removeEventListener('click', closeDropdown)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="language-switcher relative inline-block text-left">
    <!-- Icono para abrir el dropdown -->
    <button @click="toggleDropdown"
      class="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 transition-colors"
      :style="color ? { backgroundColor: color } : {}" aria-haspopup="true" :aria-expanded="showDropdown"
      aria-label="Change language">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
        <path
          d="M 6 3 C 4.300781 3 3 4.300781 3 6 L 3 26 C 3 27.699219 4.300781 29 6 29 L 6.40625 29 L 8 27 L 6 27 C 5.398438 27 5 26.601563 5 26 L 5 6 C 5 5.398438 5.398438 5 6 5 L 26 5 C 26.601563 5 27 5.398438 27 6 L 27 21 L 24 21 C 22.300781 21 21 22.300781 21 24 L 21 27 L 16 27 L 17.59375 29 L 21 29 L 21 32.40625 L 23 34.09375 L 23 24 C 23 23.398438 23.398438 23 24 23 L 44 23 C 44.601563 23 45 23.398438 45 24 L 45 44 C 45 44.601563 44.601563 45 44 45 L 24 45 C 23.398438 45 23 44.601563 23 44 L 23 42 L 21 43.6875 L 21 44 C 21 45.699219 22.300781 47 24 47 L 44 47 C 45.699219 47 47 45.699219 47 44 L 47 24 C 47 22.300781 45.699219 21 44 21 L 29 21 L 29 6 C 29 4.300781 27.699219 3 26 3 Z M 16 8 L 16 10 L 8 10 L 8 12 L 19.90625 12 C 19.597656 14.226563 18.292969 16.054688 16.65625 17.53125 C 14.148438 15.332031 12.875 13.03125 12.875 13.03125 L 11.125 13.96875 C 11.125 13.96875 12.433594 16.378906 15.0625 18.78125 C 14.996094 18.828125 14.941406 18.890625 14.875 18.9375 C 12.234375 20.757813 9.59375 21.65625 9.59375 21.65625 L 10.21875 23.5625 C 10.21875 23.5625 13.125 22.597656 16.03125 20.59375 C 16.238281 20.449219 16.449219 20.28125 16.65625 20.125 C 17.796875 20.96875 19.125 21.742188 20.625 22.34375 L 21.375 20.46875 C 20.226563 20.011719 19.199219 19.417969 18.28125 18.78125 C 20.109375 17.050781 21.636719 14.792969 21.9375 12 L 25 12 L 25 10 L 18 10 L 18 8 Z M 12 25 L 7 31 L 10 31 L 10 35 L 14 35 L 14 31 L 17 31 Z M 33 26.40625 L 27.8125 40.1875 L 30.3125 40.1875 L 31.40625 37 L 36.6875 37 L 37.8125 40.1875 L 40.3125 40.1875 L 35.09375 26.40625 Z M 34 29.40625 L 36 35.09375 L 32 35.09375 Z M 19 33 L 19 36 L 10 36 L 14 40 L 19 40 L 19 43 L 25 38 Z">
        </path>
      </svg>
    </button>

    <!-- Dropdown con transición -->
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div v-if="showDropdown"
        class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
        <ul class="py-1">
          <li>
            <button @click="changeLanguage('en')"
              class="w-full text-left px-4 py-2 hover:bg-indigo-100 transition-colors flex items-center gap-2"
              :class="{ 'bg-indigo-50 font-semibold': locale === 'en' }">
              <span class="text-lg">🇺🇸</span>
              <span>English</span>
            </button>
          </li>
          <li>
            <button @click="changeLanguage('es')"
              class="w-full text-left px-4 py-2 hover:bg-indigo-100 transition-colors flex items-center gap-2"
              :class="{ 'bg-indigo-50 font-semibold': locale === 'es' }">
              <span class="text-lg">🇪🇸</span>
              <span>Español</span>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
