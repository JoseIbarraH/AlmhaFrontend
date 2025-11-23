<template>
  <div class="w-full h-full bg-white rounded-2xl shadow-md border cursor-pointer flex items-center justify-center transition-all duration-300 p-4
           dark:bg-gray-800 dark:shadow-xl dark:shadow-black/20" :class="selected
            ? 'border-blue-500 dark:border-blue-400 dark:ring-2 dark:ring-blue-400'
            : 'border-gray-300 dark:border-gray-700'">
    <div class="flex items-center justify-between w-full gap-2 sm:gap-4">
      <button type="button" class="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm flex-shrink-0 transition-colors
               dark:bg-gray-700 dark:hover:bg-gray-600 dark:shadow-none">
        <LucideChevronLeft class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-300" />
      </button>

      <div class="flex flex-col items-center justify-center gap-2 flex-1">
        <LucideImage class="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-gray-900 dark:text-white" />

        <div class="flex gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <span class="w-3 h-1.5 rounded-full bg-green-500 dark:bg-green-400"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
        </div>
      </div>

      <button type="button" class="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm flex-shrink-0 transition-colors
               dark:bg-gray-700 dark:hover:bg-gray-600 dark:shadow-none">
        <LucideChevronRight class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-300" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideChevronLeft, LucideChevronRight, LucideImage } from 'lucide-vue-next';


defineProps<{
  selected: boolean | number | null | undefined;
}>();

</script>
