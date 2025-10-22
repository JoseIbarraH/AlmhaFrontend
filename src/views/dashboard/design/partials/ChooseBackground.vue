<template>
  <div class="w-full">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between">
        <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left">
          {{ $t('Dashboard.Design.Backgrounds.Title') }}
        </h3>
        <PrimaryButton @click="saveChanges">
          Guardar
        </PrimaryButton>
      </div>

      <!-- Contenedor -->
      <div class="grid grid-cols-1 md:grid-cols-3 mt-6">
        <div class="aspect-video bg-gray-200">
          <ImagesPreview v-model="form.background1.path" class="w-full h-full object-cover" />
        </div>
        <div class="aspect-video bg-gray-200">
          <ImagesPreview v-model="form.background2.path" class="w-full h-full object-cover" />
        </div>
        <div class="aspect-video bg-gray-200">
          <ImagesPreview v-model="form.background3.path" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ImagesPreview.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { api } from '@/plugins/api';
import { watch, reactive } from 'vue';
import type { Background } from '../types';

const props = defineProps<{
  background1: Background | null
  background2: Background | null
  background3: Background | null
}>()

const createBackground = (): Background => ({
  path: null,
  title: '',
  subtitle: ''
})

const form = reactive({
  background1: createBackground(),
  background2: createBackground(),
  background3: createBackground(),
})

// Construye el FormData antes de enviar
const buildFormData = (): FormData => {
  const formData = new FormData()

  for (const key of ['background1', 'background2', 'background3'] as const) {
    const bg = form[key]

    if (!bg) continue

    // Archivo o URL
    if (bg.path instanceof File) {
      formData.append(`${key}[path]`, bg.path)
    } else if (typeof bg.path === 'string' && bg.path) {
      formData.append(`${key}[path]`, bg.path)
    }

    // Textos
    formData.append(`${key}[title]`, bg.title || '')
    formData.append(`${key}[subtitle]`, bg.subtitle || '')
  }

  return formData
}

const saveChanges = async () => {
  try {
    const formData = buildFormData()
    const response = await api.post('/api/design/backgrounds', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    console.log('Enviado correctamente:', response.data)
  } catch (error) {
    console.error('Error al enviar:', error)
  }
}

watch(
  () => props,
  (newProps) => {
    Object.assign(form, newProps)
    console.log('backgrounds cargados:', form)
  },
  { deep: true, immediate: true }
)
</script>
