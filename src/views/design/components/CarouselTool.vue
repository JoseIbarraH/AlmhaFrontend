<template>
  <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 dark:border-gray-600">

    <!-- Empty state -->
    <div v-if="!carouselTool || carouselTool.length === 0" class="py-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {{ $t('Dashboard.Design.ChooseCarouselImage.NewImage') }}
      </p>
      <button type="button" @click="emit('create_item')"
        class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agregar primera imagen
      </button>
    </div>

    <!-- Grid de imágenes -->
    <div v-else class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2
                  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
                  dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">

        <div v-for="(item, index) in carouselTool" :key="item.id || index" class="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300
                 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <!-- Imagen -->
          <div class="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-900">
            <img :src="item.full_path" :alt="item.title || `Imagen ${index + 1}`"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">

            <!-- Overlay oscuro en hover -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
          </div>

          <!-- Información de la imagen (opcional) -->
          <div v-if="item.title" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p class="text-white text-sm font-medium truncate">{{ item.title }}</p>
            <p v-if="item.subtitle" class="text-white/80 text-xs truncate">{{ item.subtitle }}</p>
          </div>

          <!-- Botones de acción -->
          <div class="absolute top-2 right-2 flex gap-2">
            <!-- Botón editar -->
            <button type="button" @click="emit('edit_item', item)" title="Editar imagen" class="p-2 bg-white/95 backdrop-blur-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50
                     rounded-lg shadow-lg transition-all hover:scale-110
                     dark:bg-gray-800/95 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Editar imagen">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            <!-- Botón eliminar -->
            <button type="button" @click="emit('delete_item', item.id)" title="Eliminar imagen" class="p-2 bg-white/95 backdrop-blur-sm text-gray-700 hover:text-red-600 hover:bg-red-50
                     rounded-lg shadow-lg transition-all hover:scale-110
                     dark:bg-gray-800/95 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-700
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Eliminar imagen">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <!-- Badge de número -->
          <div
            class="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded">
            #{{ index + 1 }}
          </div>
        </div>
      </div>

      <!-- Botón agregar más imágenes -->
      <div class="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <button type="button" @click="emit('create_item')" class="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-blue-500 text-blue-600
                 rounded-lg hover:bg-blue-50 hover:border-blue-600 transition-all
                 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-900/20
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Agregar imagen
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { MediaItem, Setting } from '../types'

defineProps<{
  carouselToolSetting: Setting
  carouselTool: MediaItem[]
}>()

const emit = defineEmits<{
  (e: 'create_item'): void
  (e: 'edit_item', data: MediaItem): void;
  (e: 'delete_item', id: number): void;
}>();

</script>
