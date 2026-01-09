<!-- SectionEditor.vue -->
<template>
  <div
    class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-6 bg-white dark:bg-gray-800 dark:border-gray-900">
    <div class="space-y-4">
      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-xl font-bold dark:text-gray-100">{{ title }}</h1>
        <h2 class="text-gray-600 dark:text-gray-400">{{ subtitle }}</h2>
      </div>

      <!-- Título de la sección -->
      <div>
        <InputLabel :for="`section-title-${sectionKey}`" :value="$t('Dashboard.Procedure.Edit.Section.Title')"
          class="text-[17px] mb-2" />
        <TextInput :id="`section-title-${sectionKey}`" :modelValue="sectionData.title" @update:modelValue="updateTitle"
          :placeholder="placeholderTitle" />
      </div>

      <!-- Contenido de la sección -->
      <div>
        <InputLabel :for="`section-content-${sectionKey}`" :value="$t('Dashboard.Procedure.Edit.Section.Paragraph1')"
          class="text-[17px] mb-2" />
        <textarea :id="`section-content-${sectionKey}`" :value="sectionData.contentOne" @input="updateContentOne"
          rows="8"
          class="w-full max-h-36 px-4 py-3 border-2 border-gray-300 dark:border-gray-900 dark:bg-gray-900 dark:text-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none transition-colors"
          :placeholder="placeholderContentOne" />
        <p class="text-xs text-gray-500 mt-2 dark:text-gray-300">
          {{ sectionData.contentOne?.length ?? 0 }} {{ $t('Dashboard.Procedure.Edit.Section.Characters') }}
        </p>
      </div>

      <div>
        <InputLabel :for="`section-content-${sectionKey}`" :value="$t('Dashboard.Procedure.Edit.Section.Paragraph2')"
          class="text-[17px] mb-2" />
        <textarea :id="`section-content-${sectionKey}`" :value="sectionData.contentTwo" @input="updateContentTwo"
          rows="8"
          class="w-full max-h-36 px-4 py-3 border-2 border-gray-300 dark:border-gray-900 dark:bg-gray-900 dark:text-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none transition-colors"
          :placeholder="placeholderContentTwo" />
        <p class="text-xs text-gray-500 mt-2 dark:text-gray-300">
          {{ sectionData.contentTwo?.length ?? 0 }} {{ $t('Dashboard.Procedure.Edit.Section.Characters') }}
        </p>
      </div>

      <!-- Imagen opcional -->
      <div v-if="allowImage" class="space-y-2">
        <InputLabel :for="`section-image-${sectionKey}`" :value="$t('Dashboard.Procedure.Edit.Section.ImageTitle')" class="text-[17px] mb-2" />

        <div v-if="imagePreview" class="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
          <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover" />
          <button type="button"
            class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
            @click="removeImage">
            <LucideX class="w-4 h-4" />
          </button>
        </div>

        <button type="button"
          class="w-full bg-transparent flex items-center justify-center gap-2 border border-gray-300 shadow rounded-md py-2 hover:bg-gray-300 transition dark:text-gray-100 dark:hover:text-gray-800"
          @click="openFilePicker">
          <LucideUpload class="w-4 h-4" />
          {{ imagePreview ? $t('Dashboard.Procedure.Edit.Section.ChangeImage') :
            $t('Dashboard.Procedure.Edit.Section.UploadImage') }}
        </button>

        <input ref="fileInput" :id="`section-image-${sectionKey}`" type="file" accept="image/*" class="hidden"
          @change="onImageChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import InputLabel from '@/components/ui/InputLabel.vue'
import TextInput from '@/components/ui/TextInput.vue'
import { LucideUpload, LucideX } from 'lucide-vue-next'

interface SectionCustom {
  id?: number
  type: 'what_is' | 'technique' | 'recovery'
  title: string
  contentOne: string
  contentTwo: string
  image: File | null
}

interface Props {
  sectionKey: 'what_is' | 'technique' | 'recovery' // Clave de la sección
  title: string // Título del card
  subtitle: string // Subtítulo del card
  modelValue: SectionCustom | undefined // Datos de la sección
  placeholderTitle?: string
  placeholderContentOne?: string
  placeholderContentTwo?: string
  allowImage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholderTitle: 'Ej: Título de la sección',
  allowImage: false
})

const emit = defineEmits<{
  'update:modelValue': [value: SectionCustom]
}>()

// Refs
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)

// Computed para datos de la sección con valores por defecto
const sectionData = computed<SectionCustom>(() => {
  return props.modelValue ?? {
    id: 0,
    type: props.sectionKey,
    title: '',
    contentOne: '',
    contentTwo: '',
    image: null,
  }
})

// Funciones de actualización
const updateTitle = (newTitle: string) => {
  emit('update:modelValue', {
    ...sectionData.value,
    title: newTitle
  })
}

const updateContentOne = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', {
    ...sectionData.value,
    contentOne: target.value
  })
}

const updateContentTwo = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', {
    ...sectionData.value,
    contentTwo: target.value
  })
}


// Manejo de imagen
const openFilePicker = () => {
  fileInput.value?.click()
}

const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  imagePreview.value = URL.createObjectURL(file)

  emit('update:modelValue', {
    ...sectionData.value,
    image: file
  })
}

const removeImage = () => {
  if (imagePreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value)
  }

  imagePreview.value = null

  emit('update:modelValue', {
    ...sectionData.value,
    image: null
  })

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}


watch(
  () => sectionData.value.image,
  (image) => {
    if (!image) {
      imagePreview.value = null
    } else if (typeof image === 'string') {
      imagePreview.value = image
    }
  },
  { immediate: true }
)

// Cleanup
onBeforeUnmount(() => {
  if (imagePreview.value && imagePreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value)
  }
})
</script>
