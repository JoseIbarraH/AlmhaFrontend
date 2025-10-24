<template>
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left">
      {{ $t('Dashboard.Design.ChooseCarouselImage.Title') }}
    </h3>

    <transition name="fade">
      <div v-if="hasChanges" class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <SecondaryButton @click="restoreDefaults" :disabled="loading" class="w-full sm:w-auto">
          Restablecer
        </SecondaryButton>

        <PrimaryButton @click="saveChanges" :class="{ 'opacity-50 cursor-not-allowed': loading }" :disabled="loading"
          class="w-full sm:w-auto">
          <span v-if="loading">Guardando...</span>
          <span v-else>Guardar</span>
        </PrimaryButton>
      </div>
    </transition>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div class="bg-white rounded-2xl shadow-md">
      <Gallery :selected="form.carouselSetting" @click="handleGallery" />
    </div>
    <div class="bg-white rounded-2xl shadow-md">
      <ImageVideo :selected="form.imageVideoSetting" @click="handleImageVideo" />
    </div>
  </div>

  <div class="w-full pt-4">
    <!-- <GalleryImageSelected v-if="form.carousel" :form="form" /> -->
    <ImageVideoSelected v-if="form.imageVideoSetting" v-model:image-video="form.imageVideo" />
  </div>
</template>

<script setup lang="ts">
import GalleryImageSelected from '../components/CarouselImageSelected.vue';
import type { CarouselStatic, CarouselItem, Background } from '../types';
import ImageVideoSelected from '../components/ImageVideoSelected.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import { onMounted, reactive, watch, ref, toRaw } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import ImageVideo from '../components/ImageVideo.vue';
import Gallery from '../components/Carousel.vue';
import { api } from '@/plugins/api'

const props = defineProps<{
  carouselStatic: CarouselStatic
}>()

const form = reactive({
  carouselSetting: null as boolean | null,
  imageVideoSetting: null as boolean | null,
  carousel: [] as CarouselItem[],
  imageVideo: null as Background | null
})

const originalData = ref({
  carouselSetting: null as boolean | null,
  imageVideoSetting: null as boolean | null,
  carousel: [] as CarouselItem[],
  imageVideo: null as Background | null
})

const hasChanges = ref(false)
const loading = ref(false)

function handleGallery() {
  form.carouselSetting = true
  form.imageVideoSetting = false
}

function handleImageVideo() {
  form.imageVideoSetting = true
  form.carouselSetting = false
}

const detectChanges = () => {
  const current = JSON.stringify(toRaw(form))
  const original = JSON.stringify(originalData.value)
  hasChanges.value = current !== original
}

const restoreDefaults = () => {
  if (!originalData.value) return
  const orig = originalData.value

  form.carouselSetting = orig.carouselSetting
  form.imageVideoSetting = orig.imageVideoSetting

  // mantener la reactividad
  form.carousel.splice(0, form.carousel.length, ...(orig.carousel || []))
  form.imageVideo = orig.imageVideo ? { ...orig.imageVideo } : null

  hasChanges.value = false
  console.log('🔄 Restaurado a valores originales:', toRaw(form))
}

const buildFormData = (): FormData => {
  const formData = new FormData()

  // ✅ enviar booleanos reales, Laravel los reconoce correctamente
  formData.append('carouselSetting', form.carouselSetting ? '1' : '0')
  formData.append('imageVideoSetting', form.imageVideoSetting ? '1' : '0')

  form.carousel.forEach((item, i) => {
    if (!item) return
    if (item.path instanceof File) {
      formData.append(`carousel[${i}][path]`, item.path)
    } else if (typeof item.path === 'string' && item.path.trim() !== '') {
      formData.append(`carousel[${i}][path]`, item.path)
    }
    formData.append(`carousel[${i}][title]`, item.title || '')
    formData.append(`carousel[${i}][subtitle]`, item.subtitle || '')
  })

  const imgVid = form.imageVideo
  if (imgVid) {
    if (imgVid.path instanceof File) {
      formData.append('imageVideo[path]', imgVid.path)
    } else if (typeof imgVid.path === 'string' && imgVid.path.trim() !== '') {
      formData.append('imageVideo[path]', imgVid.path)
    }
    formData.append('imageVideo[title]', imgVid.title || '')
    formData.append('imageVideo[subtitle]', imgVid.subtitle || '')
  }

  return formData
}

const saveChanges = async () => {
  loading.value = true
  try {
    const formData = buildFormData()

    for (const [key, val] of formData.entries()) {
      console.log(`${key}:`, val)
    }

    const response = await api.post('/api/design/carouselImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    // Guardar el estado actual como original
    originalData.value = {
      carouselSetting: form.carouselSetting,
      imageVideoSetting: form.imageVideoSetting,
      carousel: [...form.carousel],
      imageVideo: form.imageVideo ? { ...form.imageVideo } : null
    }

    hasChanges.value = false
    console.log('✅ Enviado correctamente:', response.data)
  } catch (error) {
    console.error('❌ Error al enviar:', error)
  } finally {
    loading.value = false
  }
}

// sincronizar props iniciales
watch(
  () => props.carouselStatic,
  (value) => {
    if (!value) return
    form.carouselSetting = value.carouselSetting
    form.imageVideoSetting = value.imageVideoSetting
    form.carousel = value.carousel
    form.imageVideo = value.imageVideo
    originalData.value = {
      carouselSetting: value.carouselSetting,
      imageVideoSetting: value.imageVideoSetting,
      carousel: [...value.carousel],
      imageVideo: value.imageVideo ? { ...value.imageVideo } : null
    }
    hasChanges.value = false
  },
  { immediate: true, deep: true }
)

watch(form, detectChanges, { deep: true })

onMounted(() => {
  console.log("📦 props recibidas:", props)
})
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
