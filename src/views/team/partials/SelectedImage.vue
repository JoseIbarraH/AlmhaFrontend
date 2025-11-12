<template>
  <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left mb-4 dark:text-gray-100">
    {{ $t('Dashboard.Team.CreateUpdate.PersonalInfo.Image') }}
  </h3>

  <ImageCropperModal
    id="teamImage"
    :aspect-ratio="2 / 3"
    :preview-url="previewUrl"
    @done="handleCrop"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ImageCropperModal from '@/components/ui/ImageCropperModal.vue'

const modelValue = defineModel<string | File | null>()

const previewUrl = computed(() => {
  if (!modelValue.value) return ''

  if (typeof modelValue.value === 'string') {
    return modelValue.value
  }

  if (modelValue.value instanceof File) {
    return URL.createObjectURL(modelValue.value)
  }

  return ''
})

function handleCrop(payload: { file: string | File; url: string }) {
  modelValue.value = payload.file
}
</script>

