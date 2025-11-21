<template>
  <div class="choose-carousel-tool-container">
    <div class="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 min-h-[2.25rem] mb-4">
      <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left dark:text-gray-100">
        {{ $t('Dashboard.Design.ChooseCarouselTool.Title') }}
      </h3>
    </div>

    <div>
      <CarouselTool :carousel-tool="carouselTool ?? []" :carousel-tool-setting="carouselToolSetting"
        @create_item="emit('create_item', carouselToolSetting.id)"
        @edit_item="emit('edit_item', $event, carouselToolSetting.id)" @delete_item="emit('delete_item', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CarouselTool from '../components/CarouselTool.vue';
import type { MediaItem, Setting } from '../types';

withDefaults(defineProps<{
  carouselToolSetting?: Setting
  carouselTool?: MediaItem[]
}>(), {
  carouselToolSetting: () => ({ id: 0, enabled: false }),
  carouselTool: () => []
})

const emit = defineEmits<{
  (e: 'create_item', idSetting: number): void;
  (e: 'edit_item', data: MediaItem, idSetting: number): void;
  (e: 'delete_item', id: number | undefined): void;
  (e: 'refresh'): void
}>();
</script>
