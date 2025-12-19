<template>
  <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 dark:border-gray-600">
    <div class="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300
                dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

      <div class="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-900">
        <!-- Video -->
        <video 
          v-if="isVideo && imageVideo[0]?.path" 
          :src="imageVideo[0]?.path"
          class="w-full h-full object-cover "
          controls
          preload="metadata"
        >
          {{ $t('Dashboard.Design.Backgrounds.VideoNotSupported') }}
        </video>

        <!-- Imagen -->
        <img 
          v-else-if="!isVideo && imageVideo[0]?.path" 
          :src="imageVideo[0]?.path"
          :alt="imageVideo[0]?.title || 'Image or Video'"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />

        <!-- Placeholder -->
        <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <span class="text-gray-400 text-sm">{{ $t('Dashboard.Design.Backgrounds.NoImage') }}</span>
        </div>
      </div>

      <!-- Información de la media -->
      <div 
        v-if="(imageVideo[0]?.title || imageVideo[0]?.subtitle) && imageVideo[0]?.type === 'image'" 
        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <p class="text-white text-sm font-medium truncate">{{ imageVideo[0].title }}</p>
        <p v-if="imageVideo[0].subtitle" class="text-white/80 text-xs truncate mt-1">
          {{ imageVideo[0].subtitle }}
        </p>
      </div>

      <!-- Botones de acción -->
      <div class="absolute top-2 right-2 flex gap-2">
        <button 
          type="button" 
          @click="imageVideo[0] ? emit('edit_item', imageVideo[0]) : emit('create_item')"
          title="Editar" 
          :disabled="!$can('update_design')" 
          class="p-2 bg-white/95 backdrop-blur-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50
                 rounded-lg shadow-lg transition-all hover:scale-110
                 dark:bg-gray-800/95 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
        >
          <LucideSquarePen class="w-4 h-4" />
        </button>

        <button 
          type="button" 
          v-if="imageVideo[0]" 
          @click="emit('delete_item', imageVideo[0]?.id)" 
          title="Eliminar"
          :disabled="!$can('update_design')" 
          class="p-2 bg-white/95 backdrop-blur-sm text-gray-700 hover:text-red-600 hover:bg-red-50
                 rounded-lg shadow-lg transition-all hover:scale-110
                 dark:bg-gray-800/95 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-700"
        >
          <LucideTrash2 class="w-4 h-4" />
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { 
  LucideSquarePen, 
  LucideTrash2
} from 'lucide-vue-next';
import type { MediaItem, Setting } from '../types';

const props = defineProps<{
  imageVideoSetting?: Setting
  imageVideo: MediaItem[]
}>()

const emit = defineEmits<{
  (e: 'create_item'): void;
  (e: 'edit_item', data: MediaItem): void;
  (e: 'delete_item', id: number | undefined): void;
}>();

// Detectar si es video basado en la extensión del archivo
const isVideo = computed(() => {
  if (!props.imageVideo[0]?.path) return false;
  
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'];
  const path = props.imageVideo[0].path.toLowerCase();
  
  return videoExtensions.some(ext => path.endsWith(ext));
});
</script>

<style scoped>
/* Personalizar controles del video */
video::-webkit-media-controls-panel {
  background-color: rgba(0, 0, 0, 0.8);
}

video::-webkit-media-controls-play-button,
video::-webkit-media-controls-current-time-display,
video::-webkit-media-controls-time-remaining-display {
  color: white;
}
</style>