<template>
  <!-- Contenedor con z-index para asegurar que los botones estén encima -->
  <div class="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 min-h-[2.25rem] mb-4">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left">
      {{ $t('Dashboard.Design.ChooseCarouselImage.Title') }}
    </h3>

    <transition name="fade">
      <div v-if="hasChanges" class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Divider class="hidden sm:block" />

        <SecondaryButton
          @click="restoreDefaults"
          :disabled="loading"
          class="w-full sm:w-auto relative z-20"
        >
          Restablecer
        </SecondaryButton>

        <PrimaryButton
          @click="saveChanges"
          :class="{ 'opacity-50 cursor-not-allowed': loading }"
          :disabled="loading"
          class="w-full sm:w-auto relative z-20"
        >
          <span v-if="loading">Guardando...</span>
          <span v-else>Guardar</span>
        </PrimaryButton>
      </div>
    </transition>
  </div>

  <!-- Grid de componentes -->
  <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 relative z-0">
    <div class="bg-white rounded-2xl shadow-md flex justify-center items-center aspect-video sm:aspect-auto sm:h-40">
      <Gallery :selected="form.carouselStatic.carouselSetting" @click="handleGallery" />
    </div>

    <div class="bg-white rounded-2xl shadow-md flex justify-center items-center aspect-video sm:aspect-auto sm:h-40">
      <ImageVideo :selected="form.carouselStatic.imageVideoSetting" @click="handleImageVideo" />
    </div>
  </div>

  <!-- Contenido adicional -->
  <div class="w-full pt-4 relative z-0">
    <GalleryImageSelected
      v-if="form.carouselStatic.carouselSetting"
      v-model:carousel="form.carouselStatic.carousel"
    />
    <ImageVideoSelected
      v-if="form.carouselStatic.imageVideoSetting"
      v-model:image-video="form.carouselStatic.imageVideo"
    />
  </div>
</template>

<script setup lang="ts">
import GalleryImageSelected from '../components/CarouselImageSelected.vue';
import ImageVideoSelected from '../components/ImageVideoSelected.vue';
import { showNotification } from '@/components/composables/useNotification';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import ImageVideo from '../components/ImageVideo.vue';
import { reactive, watch, ref, toRaw } from 'vue';
import Gallery from '../components/Carousel.vue';
import type { CarouselStatic } from '../types';
import type { AxiosError } from 'axios';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';
import Divider from '@/components/ui/Divider.vue';

const { t } = useI18n()

const props = defineProps<{
  carouselStatic: CarouselStatic
}>()

const carouselStatic = (): CarouselStatic => ({
  carouselSetting: false,
  imageVideoSetting: false,
  carousel: [],
  imageVideo: {
    path: '',
    title: '',
    subtitle: ''
  }
})

const form = reactive({
  carouselStatic: carouselStatic()
})

const originalData = ref({
  carouselStatic: carouselStatic()
})

const hasChanges = ref(false)
const loading = ref(false)

function handleGallery() {
  form.carouselStatic.carouselSetting = true ? 1 : 0
  form.carouselStatic.imageVideoSetting = false ? 1 : 0
}

function handleImageVideo() {
  form.carouselStatic.imageVideoSetting = true
  form.carouselStatic.carouselSetting = false
}

const detectChanges = () => {
  const current = toRaw(form.carouselStatic)
  const original = originalData.value.carouselStatic

  // Comparar settings
  if ((current.carouselSetting ? 1 : 0) !== (original.carouselSetting) ||
    (current.imageVideoSetting ? 1 : 0) !== original.imageVideoSetting) {
    hasChanges.value = true
    return
  }

  // Comparar carousel
  if (current.carousel.length !== original.carousel.length) {
    hasChanges.value = true
    return
  }

  for (let i = 0; i < current.carousel.length; i++) {
    const curr = current.carousel[i]
    const orig = original.carousel[i]

    if (!curr || !orig) {
      if (curr !== orig) {
        hasChanges.value = true
        return
      }
      continue
    }

    // Comparar path (puede ser File o string)
    const currPath = curr.path instanceof File ? curr.path.name : curr.path
    const origPath = orig.path instanceof File ? orig.path.name : orig.path

    if (currPath !== origPath || curr.title !== orig.title || curr.subtitle !== orig.subtitle) {
      hasChanges.value = true
      return
    }
  }

  // Comparar imageVideo
  const currIV = current.imageVideo
  const origIV = original.imageVideo

  if (!currIV || !origIV) {
    hasChanges.value = currIV !== origIV
    return
  }

  const currIVPath = currIV.path instanceof File ? currIV.path.name : currIV.path
  const origIVPath = origIV.path instanceof File ? origIV.path.name : origIV.path

  if (currIVPath !== origIVPath ||
    currIV.title !== origIV.title ||
    currIV.subtitle !== origIV.subtitle) {
    hasChanges.value = true
    return
  }

  hasChanges.value = false
}

const validateBeforeSave = (): boolean => {
  // Inicializa un array para guardar todos los mensajes de error
  const errors: string[] = []

  // 1. Revisar y acumular errores del Carrusel Estático

  if (form.carouselStatic.carouselSetting) {
    for (let i = 0; i < form.carouselStatic.carousel.length; i++) {
      const item = form.carouselStatic.carousel[i]

      const hasPath = item && (item.path instanceof File || (typeof item.path === 'string' && item.path.trim() !== ''))

      if (!hasPath) {
        // 💡 Acumula el error en el array
        errors.push(t('Dashboard.Design.ChooseCarouselImage.Validations.Carousel', { n: i + 1 }))
      }
    }
  }

  if (form.carouselStatic.imageVideoSetting) {
    const imgVid = form.carouselStatic.imageVideo

    const hasIVPath = imgVid && (imgVid.path instanceof File || (typeof imgVid.path === 'string' && imgVid.path.trim() !== ''))

    if (!hasIVPath) {
      errors.push(t('Dashboard.Design.ChooseCarouselImage.Validations.ImageVideo'))
    }
  }

  if (errors.length > 0) {
    errors.forEach(message => {
      showNotification('warning', message, 4000)
    })
    return false
  }

  return true
}

const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('carouselSetting', form.carouselStatic.carouselSetting ? '1' : '0')
  formData.append('imageVideoSetting', form.carouselStatic.imageVideoSetting ? '1' : '0')

  form.carouselStatic.carousel.forEach((item, i) => {
    if (!item) return
    if (item.path instanceof File) {
      formData.append(`carousel[${i}][path]`, item.path)
    } else if (typeof item.path === 'string' && item.path.trim() !== '') {
      formData.append(`carousel[${i}][path]`, item.path)
    }
    formData.append(`carousel[${i}][title]`, item.title || '')
    formData.append(`carousel[${i}][subtitle]`, item.subtitle || '')
  })

  const imgVid = form.carouselStatic.imageVideo
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
  if (!validateBeforeSave()) return

  loading.value = true
  try {
    const formData = buildFormData()

    /* for (const [key, val] of formData.entries()) {
      console.log(`${key}:`, val)
    } */

    const response = await api.post('/api/design/carouselImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    originalData.value = JSON.parse(JSON.stringify(toRaw(form)))

    detectChanges()
    hasChanges.value = false

    showNotification('success', response.data.message, 3000)
  } catch (error) {
    const err = error as AxiosError<any>
    const errors = err.response?.data?.errors
    const message = errors
      ? Object.values(errors)
        .flat()
        .join('\n')
      : err.response?.data?.message || t('Dashboard.Design.ChooseCarouselImage.Validations.ErrorUpss')
    showNotification('error', message, 4000)
  } finally {
    loading.value = false
  }
}

const restoreDefaults = () => {
  Object.assign(form.carouselStatic, originalData.value.carouselStatic)
  hasChanges.value = false
  console.log('Restaurado a los valores originales:', toRaw(form))
}

// sincronizar props iniciales
watch(
  () => props.carouselStatic,
  (value) => {
    // 1. Asignar los valores del 'form'
    form.carouselStatic = { ...carouselStatic(), ...value }
    originalData.value = JSON.parse(JSON.stringify(toRaw(form)))
    hasChanges.value = false
  },
  { immediate: true, deep: true }
)

watch(form, detectChanges, { deep: true })

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
