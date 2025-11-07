<template>
  <h3 class="text-lg font-semibold leading-tight text-gray-800">
    {{ $t('Dashboard.Service.CreateUpdate.ResultsGallery.Title') }}
  </h3>

  <div class="mt-4 max-h-[400px] overflow-y-auto p-2 rounded-lg">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <template v-for="(value, index) in modelValue.results_gallery" :key="index">
        <div class="relative">
          <ImagesPreview v-model="value.path" :close-button="false" />
          <CloseButton @click.stop="removeAfterBefore(index)" class="absolute top-1 right-1"
            aria-label="Eliminar antes/después" />
        </div>
      </template>

      <!-- Botón "+" -->
      <div class="relative w-full h-full flex items-center justify-center">
        <button type="button"
          @click="addBeforeAfterGallery" class="bmt-2 border border-blue-500 text-blue-500 px-3 py-1 rounded"
          aria-label="Agregar antes/después"> + </button> </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import CloseButton from '@/components/ui/CloseButton.vue';
import type { Service } from '../types';

const modelValue = defineModel<Service>({
  required: true
})

const removeAfterBefore = (index: number) => {
  modelValue.value.results_gallery.splice(index, 1)
}

const addBeforeAfterGallery = () => {
  modelValue.value.results_gallery.push({
    path: null
  })
}
</script>
