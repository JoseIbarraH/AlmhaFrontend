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
        @edit_item="emit('edit_item', $event, carouselSetting.id)" @delete_item="emit('delete_item', $event)" />

      <ImageVideoSelected v-if="chooseCarouselImage.imageVideo" :image-video="imageVideo"
        :image-video-setting="imageVideoSetting" @create_item="emit('create_item', imageVideoSetting.id)"
        @edit_item="emit('edit_item', $event, imageVideoSetting.id)" @delete_item="emit('delete_item', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CarouselImageSelected from '../components/CarouselImageSelected.vue'
import { showNotification } from '@/components/composables/useNotification'
import ImageVideoSelected from '../components/ImageVideoSelected.vue'
import ImageVideo from '../components/ImageVideo.vue'
import type { MediaItem, Setting } from '../types'
import { useAuthStore } from '@/stores/authStore'
import Gallery from '../components/Carousel.vue'
import { onMounted, ref } from 'vue'
import { api } from '@/plugins/api'
import { useI18n } from 'vue-i18n'

const auth = useAuthStore()
const { t } = useI18n()

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
  (e: 'edit_item', data: MediaItem, idSetting: number): void;
  (e: 'delete_item', id: number | undefined): void;
  (e: 'refresh'): void
}>();

type ChooseState = { imageVideo: boolean, carousel: boolean };

const chooseCarouselImage = ref<ChooseState>({
  imageVideo: false,
  carousel: false
})

const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('carouselId', String(props.carouselSetting.id))
  formData.append('carouselEnabled', String(chooseCarouselImage.value.carousel ? 1 : 0))
  formData.append('imageVideoId', String(props.imageVideoSetting.id))
  formData.append('imageVideoEnabled', String(chooseCarouselImage.value.imageVideo ? 1 : 0))

  return formData
}

const fetchUpdateState = async (previousState: ChooseState) => {
  try {
    const formData = buildFormData()

    await api.post('/api/design/settings/state', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  } catch (err: any) {
    showNotification('error', t('Dashboard.Design.Validations.Error.Select'), 4000)
    chooseCarouselImage.value = previousState
  }
}

const handleToggle = (mode: 'imageVideo' | 'carousel') => {
  if (!auth.can('update_design')) return
  const previousState: ChooseState = { ...chooseCarouselImage.value }

  if (mode === 'imageVideo') {
    chooseCarouselImage.value.imageVideo = true
    chooseCarouselImage.value.carousel = false
  }

  if (mode === 'carousel') {
    chooseCarouselImage.value.carousel = true
    chooseCarouselImage.value.imageVideo = false
  }

  fetchUpdateState(previousState)
}

onMounted(() => {
  chooseCarouselImage.value.carousel = !!props.carouselSetting?.enabled
  chooseCarouselImage.value.imageVideo = !!props.imageVideoSetting?.enabled
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
