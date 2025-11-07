<template>
  <div>
    <h3 class="text-lg font-semibold leading-tight text-gray-800">Imagenes de muestra</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div>
        <h3 class="block text-sm font-medium text-gray-700 text-center my-2">Tecnica</h3>
        <ImagesPreview v-model="modelValue.sample_images.technique" />
      </div>
      <div>
        <h3 class="block text-sm font-medium text-gray-700 text-center my-2">Recuperación</h3>
        <ImagesPreview v-model="modelValue.sample_images.recovery" />
      </div>
      <div>
        <h3 class="block text-sm font-medium text-gray-700 text-center my-2">Cuidado Postoperatorio</h3>
        <ImagesPreview v-model="modelValue.sample_images.postoperative_care" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import type { Service } from '../types';

const modelValue = defineModel<Service>({ required: true })

</script>
