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
            <LucideX class="w-5 h-5" />
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
                <LucideUser class="w-5 h-5"/>
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

        <div v-if="$can('manage_users') || $can('view_reports') || $can('view_trash')">
          <p class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {{ $t('Helper.Setting.Administration.Title') }}
          </p>
          <div class="space-y-1">
            <SidebarLink v-if="$can('manage_users')" :href="{ name: 'setting.user' }" :active="current({ name: 'setting.user' })">
              <template #icon>
                <LucideUsers class="w-5 h-5" />
              </template>
              <span class="flex-1">{{ $t('Helper.Setting.Administration.User') }}</span>
            </SidebarLink>

            <SidebarLink v-if="$can('manage_users')" :href="{ name: 'setting.role' }" :active="current({ name: 'setting.role' })">
              <template #icon>
                <LucideShieldCheck class="w-5 h-5" />
              </template>
              <span class="flex-1">{{ $t('Helper.Setting.Administration.RolePermission') }}</span>
            </SidebarLink>

            <SidebarLink v-if="$can('view_reports')" :href="{ name: 'setting.audit' }" :active="current({ name: 'setting.audit' })">
              <template #icon>
                <LucideTableConfig class="w-5 h-5" />
              </template>
              <span class="flex-1">{{ $t('Helper.Setting.Administration.Record') }}</span>
            </SidebarLink>

            <SidebarLink v-if="$can('view_trash')" :href="{ name: 'setting.trash' }" :active="current({ name: 'setting.trash' })">
              <template #icon>
                <LucideTrash2 class="w-5 h-5" />
              </template>
              <span class="flex-1">{{ $t('Helper.Setting.Administration.Trash') }}</span>
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
      class="lg:hidden fixed bottom-10 right-10 z-30 p-3 rounded-xl bg-white dark:bg-gray-950 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-200 active:scale-95"
      aria-label="Open Menu">
      <LucideMenu class="w-6 h-6" />
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
import { LucideMenu, LucideShieldCheck, LucideTableConfig, LucideTrash2, LucideUser, LucideUsers, LucideX } from 'lucide-vue-next';

const { current } = useRouteHelper();

// Variable reactiva para controlar la visibilidad de la barra lateral en móvil
const showSidebar = ref(false)


const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

</script>

<style scoped>
aside {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

a {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
