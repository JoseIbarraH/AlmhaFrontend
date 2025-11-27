<template>
  <div class="mb-4">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 dark:text-gray-100 mb-4">
      {{ $t('Dashboard.Design.Backgrounds.Title') }}
    </h3>

    <!-- Grid de 3 columnas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      <!-- Card 1 - Background 1 -->
      <div
        class="relative bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="aspect-video relative">
          <img v-if="backgrounds?.background1?.[0]?.full_path" :src="backgrounds.background1[0].full_path"
            :alt="backgrounds.background1[0].title || 'Background 1'" class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span class="text-gray-400 text-sm">Sin imagen</span>
          </div>
        </div>


        <div class="absolute bottom-2 right-2">
          <button type="button" :disabled="!$can('update_design')"
            @click="backgrounds?.background1?.[0] && emit('edit_item', backgrounds.background1[0], backgrounds.background1Setting.id)"
            title="Editar" class="p-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg shadow-md transition-all
                  dark:bg-gray-800/90 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:bg-gray-700">
            <LucideSquarePen class="w-4 h-4"/>
          </button>
        </div>

        <!-- Label opcional -->
        <div class="absolute top-2 left-2">
          <span class="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded">
            Background 1
          </span>
        </div>
      </div>

      <!-- Card 2 - Background 2 -->
      <div
        class="relative bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="aspect-video relative">
          <img v-if="backgrounds?.background2?.[0]?.full_path" :src="backgrounds.background2[0].full_path"
            :alt="backgrounds.background2[0].title || 'Background 2'" class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span class="text-gray-400 text-sm">Sin imagen</span>
          </div>
        </div>

        <div class="absolute bottom-2 right-2">
          <button type="button" :disabled="!$can('update_design')"
            @click="backgrounds?.background2?.[0] && emit('edit_item', backgrounds.background2[0], backgrounds.background2Setting.id)"
            title="Editar" class="p-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg shadow-md transition-all
                  dark:bg-gray-800/90 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:bg-gray-700">
            <LucideSquarePen class="w-4 h-4"/>
          </button>
        </div>

        <div class="absolute top-2 left-2">
          <span class="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded">
            Background 2
          </span>
        </div>
      </div>

      <!-- Card 3 - Background 3 -->
      <div
        class="relative bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="aspect-video relative">
          <img v-if="backgrounds?.background3?.[0]?.full_path" :src="backgrounds.background3[0].full_path"
            :alt="backgrounds.background3[0].title || 'Background 3'" class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span class="text-gray-400 text-sm">Sin imagen</span>
          </div>
        </div>

        <div class="absolute bottom-2 right-2">
          <button type="button" :disabled="!$can('update_design')"
            @click="backgrounds?.background3?.[0] && emit('edit_item', backgrounds.background3[0], backgrounds.background3Setting.id)"
            title="Editar" class="p-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg shadow-md transition-all
                  dark:bg-gray-800/90 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:bg-gray-700">
            <LucideSquarePen class="w-4 h-4"/>
          </button>
        </div>

        <div class="absolute top-2 left-2">
          <span class="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded">
            Background 3
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideSquarePen } from 'lucide-vue-next';
import type { Backgrounds, MediaItem } from '../types';

withDefaults(defineProps<{
  backgrounds?: Backgrounds
}>(), {
  backgrounds: () => ({
    background1: [],
    background1Setting: { id: 0, enabled: false },
    background2: [],
    background2Setting: { id: 0, enabled: false },
    background3: [],
    background3Setting: { id: 0, enabled: false },
  })
})

const emit = defineEmits<{
  (e: 'edit_item', data: MediaItem, idSetting: number): void;
  (e: 'refresh'): void
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
