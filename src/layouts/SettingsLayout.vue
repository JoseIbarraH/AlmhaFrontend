<template>
  <div class="flex bg-gray-50 dark:bg-gray-950">
    <!-- Sidebar -->
    <aside :class="{
      'translate-x-0': showSidebar,
      '-translate-x-full': !showSidebar,
    }" class="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
             fixed lg:static inset-y-0 left-0 z-20 lg:translate-x-0 transition-transform duration-300 ease-in-out
             overflow-y-auto flex flex-col">
      <div :class="{'h-16': showSidebar}"></div>
      <!-- Header dentro del sidebar -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">
              {{ $t('Helper.Setting.Title') }}
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('Helper.Setting.Subtitle') }}
            </p>
          </div>

          <button @click="showSidebar = false"
            class="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-all duration-200"
            aria-label="Close Menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-6 space-y-6">
        <div>
          <p class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {{ $t('Helper.Setting.Personal.Title') }}
          </p>
          <div class="space-y-1">
            <SidebarLink :href="{ name: 'setting.profile' }" :active="current({ name: 'setting.profile' })">
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </template>
              <span class="flex-1">{{ $t('Helper.Setting.Personal.Profile') }}</span>
            </SidebarLink>
          </div>
        </div>

        <div class="relative mb-10">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
        </div>

        <div>
          <p class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {{ $t('Helper.Setting.Administration.Title') }}
          </p>
          <div class="space-y-1">
            <SidebarLink :href="{ name: 'setting.user' }" :active="current({ name: 'setting.user' })">
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </template>
              <span class="flex-1">{{ $t('Helper.Setting.Administration.User') }}</span>
            </SidebarLink>

            <SidebarLink :href="{ name: 'setting.role' }" :active="current({ name: 'setting.role' })">
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </template>
              <span class="flex-1">{{ $t('Helper.Setting.Administration.RolePermission') }}</span>
            </SidebarLink>
          </div>
        </div>
      </nav>

      <!-- Footer -->
      <div class="p-6 border-t border-gray-200 dark:border-gray-800">
        <p class="text-xs text-gray-500 dark:text-gray-400 text-center font-medium">
          Versión 1.0.0
        </p>
      </div>
    </aside>

    <!-- Overlay para móvil -->
    <Transition enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-200 ease-in" enter-from-class="opacity-0"
      leave-to-class="opacity-0">
      <div v-if="showSidebar" @click="showSidebar = false"
        class="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm lg:hidden" />
    </Transition>

    <!-- Botón menú móvil -->
    <button @click="toggleSidebar"
      class="lg:hidden fixed bottom-10 right-4 z-30 p-3 rounded-xl bg-white dark:bg-gray-950 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-200 active:scale-95"
      aria-label="Open Menu">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Contenido principal -->
    <main class="flex-1 h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div class="max-w-5xl mx-auto">
        <div
          class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouteHelper } from '@/components/composables/useRouteHelper';
import SidebarLink from '@/components/ui/SidebarLink.vue';
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const { current } = useRouteHelper();

// Variable reactiva para controlar la visibilidad de la barra lateral en móvil
const showSidebar = ref(false)


const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

</script>

<style scoped>
/* Asegura transiciones suaves en el sidebar */
aside {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mejora las transiciones de los enlaces */
a {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
