<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header mejorado con más altura y mejor jerarquía visual -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 top-0 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div class="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            @click="showSidebar = !showSidebar"
            class="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95"
            aria-label="Toggle Menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showSidebar" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Configuración</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Gestiona tus preferencias y ajustes</p>
          </div>
        </div>
      </div>
    </header>

    <div class="flex relative">
      <!-- Sidebar mejorado con mejor diseño -->
      <aside
        :class="{
          'translate-x-0': showSidebar,
          '-translate-x-full': !showSidebar,
        }"
        class="
          w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          min-h-[calc(100vh-89px)] p-4 lg:p-6
          fixed lg:static inset-y-0 left-0 z-20
          lg:translate-x-0 transition-transform duration-300 ease-in-out
        "
      >
        <nav class="space-y-1.5">
          <!-- Sección Personal -->
          <div class="mb-4">
            <p class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Personal
            </p>

            <SidebarLink :href="{ name: 'dashboard.profile' }" :active="current({ name: 'dashboard.profile' })">
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </template>
              <span class="flex-1">Perfil</span>
            </SidebarLink>

            <!-- <RouterLink
              to="/settings/security"
              class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              @click="showSidebar = false"
            >
              <div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span class="flex-1">Seguridad</span>
              <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>

            <RouterLink
              to="/settings/notifications"
              class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              @click="showSidebar = false"
            >
              <div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <span class="flex-1">Notificaciones</span>
              <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink> -->
          </div>

          <!-- Separador -->
          <div class="py-2">
            <div class="h-px bg-gray-200 dark:bg-gray-800"></div>
          </div>

          <!-- Sección Administración -->
          <div class="pt-2">
            <p class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Administración
            </p>

            <RouterLink
              to="/settings/users"
              class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              @click="showSidebar = false"
            >
              <div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span class="flex-1">Usuarios</span>
              <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>

            <RouterLink
              to="/settings/roles"
              class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              @click="showSidebar = false"
            >
              <div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span class="flex-1">Roles y Permisos</span>
              <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </div>
        </nav>

        <!-- Footer del sidebar con versión -->
        <div class="absolute bottom-4 left-4 right-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div class="px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p class="text-xs text-gray-500 dark:text-gray-400">Versión 1.0.0</p>
          </div>
        </div>
      </aside>

      <!-- Overlay mejorado con blur -->
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        leave-active-class="transition-opacity duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showSidebar"
          @click="showSidebar = false"
          class="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      </Transition>

      <!-- Área de contenido principal mejorada -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouteHelper } from '@/components/composables/useRouteHelper';
import SidebarLink from '@/components/ui/SidebarLink.vue';
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const { current } = useRouteHelper();

// Variable reactiva para controlar la visibilidad de la barra lateral en móvil
const showSidebar = ref(false)
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
