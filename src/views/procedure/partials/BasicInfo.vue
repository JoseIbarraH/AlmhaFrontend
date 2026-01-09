<template>
  <div class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-6 bg-white mb-6 dark:bg-gray-800 dark:border-gray-900">
    <div class="space-y-4">
      <div class="space-y-2">
        <h1 class="text-xl font-bold dark:text-white">{{ $t('Dashboard.Procedure.Edit.BasicInfo.Title') }}</h1>
        <h2 class="dark:text-gray-400">{{ $t('Dashboard.Procedure.Edit.BasicInfo.Subtitle') }}</h2>
      </div>
      <div>
        <InputLabel for="title" :value="$t('Dashboard.Procedure.Edit.BasicInfo.InputTitle')" class="text-[17px] mb-2" />
        <TextInput id="title" v-model="modelValue.title" :placeholder="$t('Dashboard.Procedure.Edit.BasicInfo.InputTitlePlaceholder')" />
      </div>
      <div>
        <InputLabel for="subtitle" :value="$t('Dashboard.Procedure.Edit.BasicInfo.InputSubtitle')" class="text-[17px] mb-2" />
        <TextInput id="subtitle" v-model="modelValue.subtitle" :placeholder="$t('Dashboard.Procedure.Edit.BasicInfo.InputSubtitlePlaceholder')"  />
      </div>
      <div class="space-y-2">
        <InputLabel for="image" :value="$t('Dashboard.Procedure.Edit.BasicInfo.ImageTitle')" class="text-[17px] mb-2" />

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
            class="w-full bg-transparent flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-300 shadow rounded-md py-2 dark:text-gray-100 dark:hover:text-gray-800"
            @click="openFilePicker">
            <LucideUpload class="w-4 h-4" />
            {{ imagePreview ? $t('Dashboard.Procedure.Edit.BasicInfo.ChangeImage') : $t('Dashboard.Procedure.Edit.BasicInfo.UploadImage') }}
          </button>

          <input ref="fileInput" id="image" type="file" accept="image/*" class="hidden" @change="onFileChange" />
        </div>

        <p class="text-xs text-muted-foreground dark:text-gray-100">
          {{ $t('Dashboard.Procedure.Edit.BasicInfo.Recommendation') }}
        </p>
      </div>
    </div>
  </div>

  <Section
    sectionKey="what_is"
    :title="$t('Dashboard.Procedure.Edit.BasicInfo.Section.Title')"
    :subtitle="$t('Dashboard.Procedure.Edit.BasicInfo.Section.Subtitle')"
    :modelValue="modelValue.section[0]"
    @update:modelValue="updateSection(0, $event)"
    :placeholderTitle="$t('Dashboard.Procedure.Edit.BasicInfo.Section.TitlePlaceholder')"
    :placeholderContentOne="$t('Dashboard.Procedure.Edit.BasicInfo.Section.ContentOnePlaceholder')"
    :placeholderContentTwo="$t('Dashboard.Procedure.Edit.BasicInfo.Section.ContentTwoPlaceholder')"
    :allowImage="true" />
</template>

<script setup lang="ts">
import InputLabel from '@/components/ui/InputLabel.vue'
import TextInput from '@/components/ui/TextInput.vue'
import type { ProcedureFrontend } from '../types'
import { LucideUpload, LucideX } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import Section from './Section.vue'

const modelValue = defineModel<ProcedureFrontend>({
  required: true
})

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

const updateModel = (payload: Partial<ProcedureFrontend>) => {
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
