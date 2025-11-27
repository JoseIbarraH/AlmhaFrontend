<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <LucideImage class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 class="text-lg font-semibold leading-tight text-gray-800 dark:text-white">
          {{ $t('Dashboard.Service.CreateUpdate.SampleImages.Title') }}
        </h3>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div>
        <h3 class="block text-sm font-medium text-gray-700 dark:text-white text-center my-2">
          {{ $t('Dashboard.Service.CreateUpdate.SampleImages.Technique') }}
        </h3>
        <ImagesPreview v-model="modelValue.sample_images.technique" />
      </div>
      <div>
        <h3 class="block text-sm font-medium text-gray-700 dark:text-white text-center my-2">
          {{ $t('Dashboard.Service.CreateUpdate.SampleImages.Recovery') }}
        </h3>
        <ImagesPreview v-model="modelValue.sample_images.recovery" />
      </div>
      <div>
        <h3 class="block text-sm font-medium text-gray-700 dark:text-white text-center my-2">
          {{ $t('Dashboard.Service.CreateUpdate.SampleImages.PostOperativeCare') }}
        </h3>
        <ImagesPreview v-model="modelValue.sample_images.postoperative_care" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import type { Service } from '../types';
import { LucideImage } from 'lucide-vue-next';

const modelValue = defineModel<Service>({ required: true })

</script>
