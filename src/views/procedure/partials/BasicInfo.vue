<template>
  <div class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-6 bg-white mb-6">
    <div class="space-y-4">
      <div class="space-y-2">
        <h1 class="text-xl font-bold">Información Básica del Procedimiento</h1>
        <h2>Datos principales que se mostrarán en la página</h2>
      </div>
      <div>
        <InputLabel for="title" value="Titulo del Procedimiento" class="text-[17px] mb-2" />
        <TextInput id="title" v-model="modelValue.title" />
      </div>
      <div>
        <InputLabel for="subtitle" value="Subtitulo" class="text-[17px] mb-2" />
        <TextInput id="subtitle" v-model="modelValue.subtitle" />
      </div>
      <div class="space-y-2">
        <InputLabel for="image" value="Imagen Principal (Hero)" class="text-[17px] mb-2" />

        <div v-if="imagePreview" class="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
          <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover" />
          <button type="button"
            class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
            @click="removeImage">
            <LucideX class="w-4 h-4" />
          </button>
        </div>

        <div class="flex items-center gap-4">
          <button type="button" variant="outline"
            class="w-full bg-transparent flex items-center justify-center gap-2 border border-gray-300 shadow rounded-md py-2"
            @click="openFilePicker">
            <LucideUpload class="w-4 h-4" />
            {{ imagePreview ? 'Cambiar imagen' : 'Subir imagen' }}
          </button>

          <input ref="fileInput" id="image" type="file" accept="image/*" class="hidden" @change="onFileChange" />
        </div>

        <p class="text-xs text-muted-foreground">
          Formato recomendado: 1920×1080px
        </p>
      </div>
    </div>
  </div>

  <Section sectionKey="what_is"
    title="¿Qué es?"
    subtitle="Descripción general del procedimiento"
    :modelValue="modelValue.section[0]"
    @update:modelValue="updateSection(0, $event)"
    placeholderTitle="Ej: ¿Qué es la Rinoplastia?"
    placeholderContentOne="Explica en qué consiste el procedimiento..."
    placeholderContentTwo="Explica en qué consiste el procedimiento..."
    :allowImage="true" />
</template>

<script setup lang="ts">
import InputLabel from '@/components/ui/InputLabel.vue'
import TextInput from '@/components/ui/TextInput.vue'
import type { Procedure } from '../types'
import { LucideUpload, LucideX } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import Section from './Section.vue'

const modelValue = defineModel<Procedure>({
  required: true
})

/* if (!modelValue.value.section) {
  modelValue.value.section = []
}

if (!modelValue.value.section[0]) {
  modelValue.value.section[0] = {
    type: 'what_is',
    title: '',
    contentOne: '',
    contentTwo: '',
    image: null
  }
} */

const updateSection = (index: number, section: any) => {
  const newSections = [...modelValue.value.section]
  newSections[index] = section

  modelValue.value = {
    ...modelValue.value,
    section: newSections
  }
}


const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)

const updateModel = (payload: Partial<Procedure>) => {
  modelValue.value = {
    ...modelValue.value,
    ...payload
  }
}

const openFilePicker = () => {
  fileInput.value?.click()
}

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  imagePreview.value = URL.createObjectURL(file)

  updateModel({ image: file })
}

const removeImage = () => {
  imagePreview.value = null
  updateModel({ image: null })

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

watch(
  () => modelValue.value.image,
  (image) => {
    if (typeof image === 'string') {
      imagePreview.value = image
    }
  },
  { immediate: true }
)
</script>
