<template>
  <div class="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 min-h-[2.25rem] mb-4">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left dark:text-gray-100">
      {{ $t('Dashboard.Design.ChooseCarouselNavbar.Title') }}
    </h3>
  </div>

  <div>
    <CarouselNavbar
      :carousel-navbar="carouselNavbar ?? []"
      :carousel-navbar-setting="carouselNavbarSetting"
      @create_item="emit('create_item', carouselNavbarSetting.id)"
      @edit_item="emit('edit_item', $event, carouselNavbarSetting.id)"
      @delete_item="emit('delete_item', $event)"
    />
  </div>

</template>

<script setup lang="ts">
import CarouselNavbar from '../components/CarouselNavbar.vue';
import type { MediaItem, Setting } from '../types';

withDefaults(defineProps<{
  carouselNavbarSetting?: Setting
  carouselNavbar?: MediaItem[]
}>(), {
  carouselNavbarSetting: () => ({ id: 0, enabled: false}),
  carouselNavbar: () => []
})

const emit = defineEmits<{
  (e: 'create_item', idSetting: number): void;
  (e: 'edit_item', data: MediaItem, idSetting: number): void;
  (e: 'delete_item', id: number | undefined): void;
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
