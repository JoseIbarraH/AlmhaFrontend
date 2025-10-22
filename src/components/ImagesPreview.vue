<template>
  <div
    class="relative h-[300px] rounded w-full justify-center flex items-center border-2 border-dashed"
    :class="error ? 'border-red-500' : 'border-gray-300'"
  >
    <input
      type="file"
      accept="image/*"
      class="absolute inset-0 opacity-0 cursor-pointer"
      @change="handleFileChange"
    />

    <!-- Si no hay imagen: mostrar "+" -->
    <span v-if="!preview" class="text-4xl text-gray-400 font-bold">+</span>

    <!-- Si hay imagen: mostrar imagen -->
    <div v-else class="w-full h-full relative">
      <img :src="preview" alt="Preview" class="w-full h-full object-cover rounded" />
      <button
        type="button"
        @click="removeImage"
        class="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: File | string | null
  error?: string
}>()

const emit = defineEmits(['update:modelValue'])

const preview = ref<string | null>(null)

// Observa cambios en el valor para generar preview
watch(
  () => props.modelValue,
  (value) => {
    if (value instanceof File) {
      // Si es un archivo, generar URL temporal
      preview.value = URL.createObjectURL(value)
    } else if (typeof value === 'string' && value.trim() !== '') {
      // Si es una URL existente (por ejemplo de tu backend)
      preview.value = value.startsWith('http')
        ? value
        : `${window.location.origin}/${value.replace(/^\/+/, '')}`
    } else {
      preview.value = null
    }
  },
  { immediate: true }
)

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    emit('update:modelValue', file)
  }
}

function removeImage() {
  emit('update:modelValue', null)
  preview.value = null
}
</script>
