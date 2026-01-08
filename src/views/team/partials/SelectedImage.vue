<template>
  <section class="bg-white rounded-2xl shadow-lg dark:bg-gray-900 p-6 sticky top-6">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left mb-4 dark:text-gray-100">
      Foto del miembro del equipo
    </h3>

    <div class="relative">
      <ImageCropperModal id="teamImage" :aspect-ratio="2 / 3" :preview-url="previewUrl" @done="handleCrop" />
    </div>

    <div class="mt-6 pt-6 border-t border-slate-200">
      <label class="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Estado del Miembro
      </label>

      <div class="flex gap-3">
        <!-- ACTIVO -->
        <label class="flex-1 relative cursor-pointer">
          <input type="radio" name="status" value="active" v-model="statusModel" class="peer sr-only">
          <div class="px-4 py-3 border-2 border-slate-200 rounded-lg
               peer-checked:border-emerald-500 peer-checked:bg-emerald-50
               transition-all text-center">
            <div class="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-1"></div>
            <span class="text-sm font-medium text-slate-700 peer-checked:text-emerald-700">
              Activo
            </span>
          </div>
        </label>

        <!-- INACTIVO -->
        <label class="flex-1 relative cursor-pointer">
          <input type="radio" name="status" value="inactive" v-model="statusModel" class="peer sr-only">
          <div class="px-4 py-3 border-2 border-slate-200 rounded-lg
               peer-checked:border-slate-400 peer-checked:bg-slate-50
               transition-all text-center">
            <div class="w-3 h-3 bg-slate-400 rounded-full mx-auto mb-1"></div>
            <span class="text-sm font-medium text-slate-700">
              Inactivo
            </span>
          </div>
        </label>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ImageCropperModal from '@/components/ui/ImageCropperModal.vue'
import type { TeamMemberFrontend } from '../types'

const model = defineModel<TeamMemberFrontend>({
  required: true
})

const previewUrl = computed(() => {
  if (!model.value.image) return ''

  if (typeof model.value.image === 'string') {
    return model.value.image
  }

  if (model.value.image instanceof File) {
    return URL.createObjectURL(model.value.image)
  }
})

const statusModel = computed({
  get() {
    return model.value.status ?? 'inactive'
  },
  set(value: 'active' | 'inactive') {
    model.value.status = value
  }
})

function handleCrop(payload: { file: string | File; url: string }) {
  model.value.image = payload.file
}
</script>
