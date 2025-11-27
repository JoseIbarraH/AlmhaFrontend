<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
        <LucideClipboardList class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 class="text-lg font-semibold leading-tight text-gray-800 dark:text-white">
        {{ $t('Dashboard.Service.CreateUpdate.MainInfo.Information') }}
      </h3>
    </div>
  </div>
  <div class="mt-4">
    <InputLabel for="procedure-title" :value="$t('Dashboard.Service.CreateUpdate.MainInfo.Title')" />
    <TextInput id="procedure-title" v-model="modelValue.title" type="text"
      class="border rounded-md py-2 px-4 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white w-full
      text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
      :placeholder="$t('Dashboard.Service.CreateUpdate.MainInfo.TitlePlaceholder')" />
  </div>

  <div>
    <InputLabel for="procedure-description" :value="$t('Dashboard.Service.CreateUpdate.MainInfo.Description')"
      class="mt-4" />
    <TextArea id="procedure-description" v-model="modelValue.description" class="w-full rounded px-2 py-1 h-32"
      :placeholder="$t('Dashboard.Service.CreateUpdate.MainInfo.DescriptionPlaceholder')" />
  </div>

  <div>
    <InputLabel for="procedure-image" :value="$t('Dashboard.Service.CreateUpdate.MainInfo.Image')" class="mt-4" />
    <div class="relative w-full h-40 rounded-lg flex items-center justify-center cursor-pointer mt-1">
      <ImagesPreview v-model="modelValue.image" aspect="16:9" class="h-40 w-full object-cover rounded-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import InputLabel from '@/components/ui/InputLabel.vue'
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import type { Service } from '../types';
import { LucideClipboardList } from 'lucide-vue-next';

const modelValue = defineModel<Service>({
  required: true
})

</script>
