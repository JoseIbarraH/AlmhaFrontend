<template>
  <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 dark:border-gray-600">
    <div class="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300
                dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

      <!-- Preview -->
      <div class="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          :src="imageVideo[0]?.full_path"
          :alt="imageVideo[0]?.title || 'Image or Video'"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <!-- Overlay oscuro en hover -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
      </div>

      <!-- Información: title y subtitle -->
      <div v-if="imageVideo[0]?.title"
           class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p class="text-white text-sm font-medium truncate">{{ imageVideo[0].title }}</p>
        <p v-if="imageVideo[0].subtitle" class="text-white/80 text-xs truncate mt-1">{{ imageVideo[0].subtitle }}</p>
      </div>

      <!-- Botones de acción -->
      <div class="absolute top-2 right-2 flex gap-2">
        <!-- Botón Editar -->
        <button
          type="button"
          @click="imageVideo[0] && emit('edit_item', imageVideo[0])"
          title="Editar"
          class="p-2 bg-white/95 backdrop-blur-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50
                 rounded-lg shadow-lg transition-all hover:scale-110
                 dark:bg-gray-800/95 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        <!-- Botón Eliminar -->
        <button
          type="button"
          @click="emit('delete_item', imageVideo[0]?.id)"
          title="Eliminar"
          class="p-2 bg-white/95 backdrop-blur-sm text-gray-700 hover:text-red-600 hover:bg-red-50
                 rounded-lg shadow-lg transition-all hover:scale-110
                 dark:bg-gray-800/95 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-700"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { MediaItem, Setting } from '../types';

defineProps<{
  imageVideoSetting?: Setting
  imageVideo: MediaItem[]
}>()

const emit = defineEmits<{
  (e: 'edit_item', data: MediaItem): void;
  (e: 'delete_item', id: number | undefined): void;
}>();
</script>
