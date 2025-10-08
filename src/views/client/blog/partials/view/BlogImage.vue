<template>
  <div class="transition delay-[0.1s] mb-12">
    <div class="relative overflow-hidden rounded-3xl shadow-2xl">
      <SafeImage :src="resolveSrc(url)" :alt="'Url'"
            class="w-full h-96 md:h-[500px] object-cover" />

      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SafeImage from '@/Components/SafeImage.vue';
import { resolveSrc } from '@/Helpers/utils';

const props = defineProps<{
  url: string
}>()

</script>
