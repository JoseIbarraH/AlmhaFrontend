<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import type { Locale } from '@/plugins/i18n'
import { LucideLanguages } from 'lucide-vue-next';

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
      class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      :style="color ? { backgroundColor: color } : {}" aria-haspopup="true" :aria-expanded="showDropdown"
      aria-label="Change language">
      <LucideLanguages  />
    </button>

    <!-- Dropdown con transición -->
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div v-if="showDropdown" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10
               dark:bg-gray-700 dark:border-gray-600 dark:shadow-xl"> <!-- Clases Dark Mode para el contenedor -->
        <ul class="py-1">
          <li>
            <button @click="changeLanguage('en')"
              class="w-full text-left px-4 py-2 hover:bg-indigo-100 transition-colors flex items-center gap-2 text-gray-800 dark:text-white dark:hover:bg-indigo-900"
              :class="{
                'bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-400': locale === 'en'
              }">
              <span class="text-lg">🇺🇸</span>
              <span>English</span>
            </button>
          </li>
          <li>
            <button @click="changeLanguage('es')"
              class="w-full text-left px-4 py-2 hover:bg-indigo-100 transition-colors flex items-center gap-2 text-gray-800 dark:text-white dark:hover:bg-indigo-900"
              :class="{
                'bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-400': locale === 'es'
              }">
              <span class="text-lg">🇪🇸</span>
              <span>Español</span>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
