<template>
  <div>
    <!-- Header con botones de guardar -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left dark:text-gray-100">
        {{ $t('Dashboard.Design.ChooseCarouselImage.Title') }}
      </h3>
    </div>

    <!-- Selector de modo -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div @click="handleToggle('carousel')" :class="[
        'bg-white rounded-2xl shadow-md flex justify-center items-center h-40 cursor-pointer transition-all',
        chooseCarouselImage.carousel ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
      ]">
        <Gallery :selected="chooseCarouselImage.carousel" />
      </div>

      <div @click="handleToggle('imageVideo')" :class="[
        'bg-white rounded-2xl shadow-md flex justify-center items-center h-40 cursor-pointer transition-all',
        chooseCarouselImage.imageVideo ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
      ]">
        <ImageVideo :selected="chooseCarouselImage.imageVideo" />
      </div>
    </div>

    <!-- Componentes de edición -->
    <div class="pt-4">
      <CarouselImageSelected v-if="chooseCarouselImage.carousel" :carousel-image="carousel ?? []"
        :carousel-setting="carouselSetting" @create_item="emit('create_item', carouselSetting.id)"
        @edit_item="emit('edit_item', $event)" @delete_item="emit('delete_item', $event)" />

      <ImageVideoSelected v-if="chooseCarouselImage.imageVideo" :image-video="imageVideo"
        :image-video-setting="imageVideoSetting" @edit_item="emit('edit_item', $event)"
        @delete_item="emit('delete_item', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CarouselImageSelected from '../components/CarouselImageSelected.vue'
import ImageVideoSelected from '../components/ImageVideoSelected.vue'
import Gallery from '../components/Carousel.vue'
import ImageVideo from '../components/ImageVideo.vue'
import type { MediaItem, Setting } from '../types'

const props = withDefaults(defineProps<{
  imageVideoSetting?: Setting
  imageVideo?: MediaItem[]
  carouselSetting?: Setting
  carousel?: MediaItem[]
}>(), {
  imageVideoSetting: () => ({ id: 0, enabled: false }),
  imageVideo: () => [],
  carouselSetting: () => ({ id: 0, enabled: false }),
  carousel: () => []
})

const emit = defineEmits<{
  (e: 'create_item', idSetting: number): void;
  (e: 'edit_item', data: MediaItem): void;
  (e: 'delete_item', id: number | undefined): void;
  (e: 'refresh'): void
}>();

const chooseCarouselImage = ref({
  imageVideo: false,
  carousel: false
})

function handleToggle(mode: 'imageVideo' | 'carousel'): void {

  if (mode === 'imageVideo') {
    chooseCarouselImage.value.imageVideo = true
    chooseCarouselImage.value.carousel = false
  }

  if (mode === 'carousel') {
    chooseCarouselImage.value.carousel = true
    chooseCarouselImage.value.imageVideo = false
  }
}

onMounted(() => {
  chooseCarouselImage.value.carousel = !!props.carouselSetting?.enabled
  chooseCarouselImage.value.imageVideo = !!props.imageVideoSetting?.enabled

  console.log("props: ", props)
})

</script>

<style scoped>
/* Estilos de transición */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
