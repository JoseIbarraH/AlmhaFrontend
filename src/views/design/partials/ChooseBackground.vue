<template>
  <div class="mb-4">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 dark:text-gray-100 mb-4">
      {{ $t('Dashboard.Design.Backgrounds.Title') }}
    </h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="num in ([1, 2, 3] as const)" :key="num"
        class="group relative bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow dark:bg-gray-800">

        <div class="aspect-video relative bg-gray-200 dark:bg-gray-700">
          <!-- Video -->
          <video v-if="isVideo(num) && (backgrounds as any)[`background${num}`]?.[0]?.path"
            :src="(backgrounds as any)[`background${num}`][0].path" class="w-full h-full object-cover" muted loop
            controls playsinline preload="metadata">
            {{ $t('Dashboard.Design.Backgrounds.VideoNotSupported') }}
          </video>

          <!-- Imagen -->
          <img v-else-if="!isVideo(num) && (backgrounds as any)[`background${num}`]?.[0]?.path"
            :src="(backgrounds as any)[`background${num}`][0].path"
            :alt="(backgrounds as any)[`background${num}`][0].title || `Background ${num}`"
            class="w-full h-full object-cover" loading="eager" decoding="sync" fetchpriority="high">

          <!-- Placeholder -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <span class="text-gray-400 text-sm">{{ $t('Dashboard.Design.Backgrounds.NoImage') }}</span>
          </div>

          <!-- Overlay para videos (solo en hover para no bloquear controles) -->
          <div v-if="!isVideo(num) && (backgrounds as any)[`background${num}`]?.[0]?.path"
            class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

        </div>

        <!-- Botón de editar -->
        <div class="absolute bottom-2 right-2">
          <button type="button" :disabled="!$can('update_design')" @click="(backgrounds as any)[`background${num}`]?.[0]
            ? emit('edit_item', (backgrounds as any)[`background${num}`][0], (backgrounds as any)[`background${num}Setting`].id)
            : emit('create_item', (backgrounds as any)[`background${num}Setting`].id)" class="p-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg shadow-md transition-all 
                   dark:bg-gray-800/90 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:bg-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed">
            <LucideSquarePen class="w-4 h-4" />
          </button>
        </div>

        <!-- Label del background -->
        <div class="absolute top-2 left-2 flex gap-2">
          <span class="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded">
            {{ $t(`Dashboard.Design.Backgrounds.Background${num}`) }}
          </span>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Backgrounds, MediaItem } from '../types';
import {
  LucideSquarePen
} from 'lucide-vue-next';

const props = withDefaults(defineProps<{
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
  (e: 'create_item', idSetting: number): void;
  (e: 'edit_item', data: MediaItem, idSetting: number): void;
  (e: 'refresh'): void
}>();

// Detectar si es video basado en la extensión del archivo
const isVideo = (num: 1 | 2 | 3): boolean => {
  const backgroundKey = `background${num}` as keyof Backgrounds;
  const background = props.backgrounds[backgroundKey] as MediaItem[];

  if (!background?.[0]?.path) return false;

  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'];
  const path = background[0].path.toLowerCase();

  return videoExtensions.some(ext => path.endsWith(ext));
};

/* // Reproducir video en hover
const playVideo = (event: Event) => {
  const video = event.target as HTMLVideoElement;
  if (video && video.tagName === 'VIDEO') {
    video.play().catch(() => {
      // Silenciar error si el video no puede reproducirse
    });
  }
};

const pauseVideo = (event: Event) => {
  const video = event.target as HTMLVideoElement;
  if (video && video.tagName === 'VIDEO') {
    video.pause();
    video.currentTime = 0; // Reiniciar al inicio
  }
}; */
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

/* Personalizar controles del video (si se muestran) */
video::-webkit-media-controls-panel {
  background-color: rgba(0, 0, 0, 0.8);
}

video::-webkit-media-controls-play-button,
video::-webkit-media-controls-current-time-display,
video::-webkit-media-controls-time-remaining-display {
  color: white;
}
</style>