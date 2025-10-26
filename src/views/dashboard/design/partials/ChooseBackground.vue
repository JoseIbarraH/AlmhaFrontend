<template>
  <div class="w-full">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left">
          {{ $t('Dashboard.Design.Backgrounds.Title') }}
        </h3>

        <!-- Botones condicionales -->
        <transition name="fade">
          <div v-if="hasChanges" class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <SecondaryButton @click="restoreDefaults" :disabled="loading" class="w-full sm:w-auto">
              Restablecer
            </SecondaryButton>

            <PrimaryButton @click="saveChanges" :class="{ 'opacity-50 cursor-not-allowed': loading }"
              :disabled="loading" class="w-full sm:w-auto">
              <span v-if="loading">Guardando...</span>
              <span v-else>Guardar</span>
            </PrimaryButton>
          </div>
        </transition>
      </div>

      <!-- Contenedor -->
      <div class="space-y-6 mt-6">
        <!-- Card 1 -->
        <div class="grid grid-cols-1 md:grid-cols-2 items-center bg-gray-100 rounded-lg overflow-hidden shadow">
          <div class="aspect-video">
            <ImagesPreview v-model="form.background1.path" class="w-full h-full object-cover" />
          </div>
          <div class="p-4 flex flex-col">
            <InputLabel for="title1" value="Título" />
            <TextInput id="title1" v-model="form.background1.title" placeholder="Título" />
            <InputLabel for="subtitle1" value="Subtítulo" class="mt-2" />
            <TextInput id="subtitle1" v-model="form.background1.subtitle" placeholder="Subtítulo" />
          </div>
        </div>

        <!-- Card 2 -->
        <div class="grid grid-cols-1 md:grid-cols-2 items-center bg-gray-100 rounded-lg overflow-hidden shadow">
          <div class="aspect-video">
            <ImagesPreview v-model="form.background2.path" class="w-full h-full object-cover" />
          </div>
          <div class="p-4 flex flex-col">
            <InputLabel for="title2" value="Título" />
            <TextInput id="title2" v-model="form.background2.title" placeholder="Título" />
            <InputLabel for="subtitle2" value="Subtítulo" class="mt-2" />
            <TextInput id="subtitle2" v-model="form.background2.subtitle" placeholder="Subtítulo" />
          </div>
        </div>

        <!-- Card 3 -->
        <div class="grid grid-cols-1 md:grid-cols-2 items-center bg-gray-100 rounded-lg overflow-hidden shadow">
          <div class="aspect-video">
            <ImagesPreview v-model="form.background3.path" class="w-full h-full object-cover" />
          </div>
          <div class="p-4 flex flex-col">
            <InputLabel for="title3" value="Título" />
            <TextInput id="title3" v-model="form.background3.title" placeholder="Título" />
            <InputLabel for="subtitle3" value="Subtítulo" class="mt-2" />
            <TextInput id="subtitle3" v-model="form.background3.subtitle" placeholder="Subtítulo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ImagesPreview.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import TextInput from '@/components/TextInput.vue'
import InputLabel from '@/components/InputLabel.vue'
import { api } from '@/plugins/api'
import { watch, reactive, ref, toRaw } from 'vue'
import type { Background } from '../types'

const props = defineProps<{
  background1: Background | null
  background2: Background | null
  background3: Background | null
}>()

const createBackground = (): Background => ({
  path: '',
  title: '',
  subtitle: ''
})
const form = reactive({
  background1: createBackground(),
  background2: createBackground(),
  background3: createBackground()
})

const originalData = ref({
  background1: createBackground(),
  background2: createBackground(),
  background3: createBackground()
})

const hasChanges = ref(false)
const loading = ref(false);

const detectChanges = () => {
  const current = JSON.stringify(toRaw(form))
  const original = JSON.stringify(originalData.value)
  hasChanges.value = current !== original
}

const buildFormData = (): FormData => {
  const formData = new FormData()
  for (const key of ['background1', 'background2', 'background3'] as const) {
    const bg = form[key]
    if (!bg) continue

    if (bg.path instanceof File) {
      formData.append(`${key}[path]`, bg.path)
    } else if (typeof bg.path === 'string' && bg.path) {
      formData.append(`${key}[path]`, bg.path)
    }

    formData.append(`${key}[title]`, bg.title || '')
    formData.append(`${key}[subtitle]`, bg.subtitle || '')
  }
  return formData
}

const saveChanges = async () => {
  loading.value = true;
  try {
    const formData = buildFormData()

    for (const [key, val] of formData.entries()) {
      console.log(`${key}:`, val)
    }

    const response = await api.post('/api/design/backgrounds', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    originalData.value = JSON.parse(JSON.stringify(toRaw(form)))

    detectChanges()
    hasChanges.value = false

    console.log('Enviado correctamente:', response.data)
  } catch (error) {
    console.error('Error al enviar:', error)
  } finally {
    loading.value = false;
  }
}

const restoreDefaults = () => {
  Object.assign(form.background1, originalData.value.background1)
  Object.assign(form.background2, originalData.value.background2)
  Object.assign(form.background3, originalData.value.background3)
  hasChanges.value = false
  console.log('Restaurado a los valores originales:', toRaw(form))
}

watch(
  () => [props.background1, props.background2, props.background3],
  ([b1, b2, b3]) => {
    form.background1 = { ...createBackground(), ...b1 }
    form.background2 = { ...createBackground(), ...b2 }
    form.background3 = { ...createBackground(), ...b3 }

    originalData.value = JSON.parse(JSON.stringify(toRaw(form)))
    hasChanges.value = false
  },
  { immediate: true, deep: true }
)

// --- Detectar cambios en tiempo real ---
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
