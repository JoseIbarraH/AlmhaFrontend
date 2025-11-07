<template>
  <div class="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 min-h-[2.25rem] mb-4">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left">
      {{ $t('Dashboard.Design.ChooseCarouselTool.Title') }}
    </h3>

    <transition name="fade">
      <div v-if="hasChanges" class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Divider />

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

  <div>
    <CarouselTool v-model:carousel-tool="form.carouselTool" />
  </div>
</template>

<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import CarouselTool from '../components/CarouselTool.vue';
import { reactive, ref, toRaw, watch } from 'vue';
import type { CarouselToolInt } from '../types';
import type { AxiosError } from 'axios';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';
import Divider from '@/components/ui/Divider.vue';

const { t } = useI18n()

const props = defineProps<{
  carouselTool: CarouselToolInt[]
}>()

const carouselTool = (): CarouselToolInt => ({
  path: ''
})

const form = reactive({
  carouselTool: [carouselTool()]
})

const originalData = ref({
  carouselTool: [carouselTool()]
})

const hasChanges = ref(false)
const loading = ref(false)

const detectChanges = () => {
  const current = toRaw(form.carouselTool)
  const original = originalData.value.carouselTool

  if (current.length !== original.length) {
    hasChanges.value = true
    return
  }

  hasChanges.value = current.some((curr, i) => {
    const orig = original[i]
    if (!curr || !orig) return curr !== orig

    const currPath = curr.path instanceof File ? curr.path.name : curr.path
    const origPath = orig.path instanceof File ? orig.path.name : orig.path

    return currPath !== origPath
  })
}

const validateBeforeSave = (): boolean => {
  const errors: string[] = []

  if (form.carouselTool) {
    for (let i = 0; i < form.carouselTool.length; i++) {
      const item = form.carouselTool[i]

      const hasPath = item && (item.path instanceof File || (typeof item.path === 'string' && item.path.trim() !== ''))

      if (!hasPath) {
        errors.push(t('Dashboard.Design.ChooseCarouselTool.Validations.path'))
      }
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

  form.carouselTool.forEach((item, i) => {
    if (!item) return

    const prefix = `carouselTool[${i}]`

    if (item.path instanceof File) {
      formData.append(`${prefix}[path]`, item.path)
    } else if (typeof item.path === 'string' && item.path.trim() !== '') {
      formData.append(`${prefix}[path]`, item.path)
    }
  })

  return formData
}

const saveChanges = async () => {
  if (!validateBeforeSave()) return

  loading.value = true
  try {
    const formData = buildFormData()

    for (const [key, val] of formData.entries()) {
      console.log(`${key}:`, val)
    }

    const response = await api.post('/api/design/carouselTool', formData, {
      headers: { 'Content-Type': 'multipart/form-data'}
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
      : err.response?.data?.message || t('Dashboard.Design.ChooseCarouselTool.Validations.ErrorUpss')

    showNotification('error', message, 4000)
  } finally {
    loading.value = false
  }
}

const restoreDefaults = () => {
  Object.assign(form.carouselTool, originalData.value.carouselTool)
  hasChanges.value = false
}

watch(
  () => props.carouselTool,
  (value) => {
    form.carouselTool = (value ?? []).map(item => ({ ...carouselTool(), ...item }))

    originalData.value = JSON.parse(JSON.stringify(toRaw(form)))

    hasChanges.value = false
  },
  { immediate: true, deep: true }
)

watch(form, detectChanges, { deep: true })

</script>
