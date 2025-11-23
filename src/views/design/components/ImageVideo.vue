<template>
  <!-- Componente 1: Simple con solo ícono -->
  <div class="w-full h-full bg-white rounded-2xl shadow-md border cursor-pointer flex items-center justify-center transition-all duration-300 p-4
           dark:bg-gray-800 dark:shadow-xl dark:shadow-black/20" :class="selected
            ? 'border-blue-500 dark:border-blue-400 dark:ring-2 dark:ring-blue-400'
            : 'border-gray-300 dark:border-gray-700'">
    <LucideImage class="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-gray-900 dark:text-white" />
  </div>
</template>

<script setup lang="ts">
import { LucideImage } from 'lucide-vue-next';

defineProps<{
  selected: boolean | number | null | undefined;
}>()
</script>
