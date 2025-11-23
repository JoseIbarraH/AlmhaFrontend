<template>
  <div
    class="relative rounded w-full justify-center flex items-center border-2 border-dashed overflow-hidden"
    :class="[
      error ? 'border-red-500' : 'border-gray-300',
      aspectClass
    ]"
  >
    <input
      type="file"
      accept="image/*,video/*"
      class="absolute inset-0 opacity-0 cursor-pointer"
      @change="handleFileChange"
    />

    <!-- Si no hay imagen/video: mostrar "+" -->
    <!-- <span v-if="!preview" class="text-4xl text-gray-400 font-bold">+</span> -->
    <span v-if="!preview" class="text-4xl text-gray-400 font-bold">
      <LucideImagePlus class="w-10 h-10" />
    </span>

    <!-- Si hay imagen/video: mostrar preview -->
    <div v-else class="w-full h-full relative">
      <!-- Imagen -->
      <img
        v-if="isImage"
        :src="preview"
        alt="Preview"
        class="w-full h-full object-cover rounded"
      />

      <!-- Video -->
      <video
        v-else-if="isVideo"
        :src="preview"
        class="w-full h-full object-cover rounded"
        controls
        muted
      />

      <CloseButton
        v-if="closeButton"
        @click="removeImage"
        class="absolute top-2 right-2 p-1 bg-black/100 hover:bg-black/70"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import CloseButton from '@/components/ui/CloseButton.vue'
import { LucideImagePlus } from 'lucide-vue-next';

const props = withDefaults(
  defineProps<{
    modelValue: File | string | null
    error?: string
    closeButton?: boolean
    aspect?: 'square' | '16:9'
  }>(),
  {
    closeButton: true,
    aspect: 'square',
  }
)

const emit = defineEmits(['update:modelValue'])

const preview = ref<string | null>(null)
const fileType = ref<'image' | 'video' | null>(null)

const isImage = computed(() => fileType.value === 'image')
const isVideo = computed(() => fileType.value === 'video')

// Cambia la clase según el aspect ratio
const aspectClass = computed(() => {
  return props.aspect === '16:9' ? 'aspect-video' : 'aspect-square'
})

// Observa cambios en el valor para generar preview
watch(
  () => props.modelValue,
  (value) => {
    if (value instanceof File) {
      preview.value = URL.createObjectURL(value)
      fileType.value = value.type.startsWith('image/') ? 'image' : 'video'
    } else if (typeof value === 'string' && value.trim() !== '') {
      preview.value = value.startsWith('http')
        ? value
        : `${window.location.origin}/${value.replace(/^\/+/, '')}`
      const extension = value.split('.').pop()?.toLowerCase()
      const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi']
      fileType.value = videoExtensions.includes(extension || '') ? 'video' : 'image'
    } else {
      preview.value = null
      fileType.value = null
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
  fileType.value = null
}
</script>
