<template>
  <h3 class="text-lg font-semibold leading-tight text-gray-800">
    {{ $t('Dashboard.Service.CreateUpdate.MainInfo.Information') }}
  </h3>
  <div class="mt-4">
    <InputLabel for="procedure-title" :value="$t('Dashboard.Service.CreateUpdate.MainInfo.Title')" />
    <TextInput id="procedure-title" v-model="modelValue.title" type="text" class="w-full border rounded px-2 py-1"
      :placeholder="$t('Dashboard.Service.CreateUpdate.MainInfo.TitlePlaceholder')" />
  </div>

  <div>
    <InputLabel for="procedure-description" :value="$t('Dashboard.Service.CreateUpdate.MainInfo.Description')"
      class="mt-4" />
    <TextArea id="procedure-description" v-model="modelValue.description" class="w-full border rounded px-2 py-1 h-32"
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

const modelValue = defineModel<Service>({
  required: true
})

</script>
