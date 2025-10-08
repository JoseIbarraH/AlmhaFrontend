<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 transition delay-[0.2s]">
    <div class="flex items-center mb-6 md:mb-0">

      <img :src="resolveSrc('images/general/icons/medical-icon.png')"
        class="w-16 h-16 rounded-full object-cover mr-4">
      <div>
        <h3 class="font-semibold text-custom-dark">{{ writer }}</h3>
        <p class="text-gray-600">{{ $t('Client.Blog.View.Specialist') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resolveSrc } from '@/Helpers/utils';

const props = defineProps<{
  writer: string
}>()

</script>
