<template>
  <button
    @click="toggleDark()"
    class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  >
    <LucideSun v-if="!isDark" class="h-5 w-5 transition-transform duration-300" />
    <LucideMoon v-else class="h-5 w-5 transition-transform duration-300" />
  </button>
</template>

<script setup lang="ts">
import { LucideMoon, LucideSun } from 'lucide-vue-next';
import { useDarkMode } from '../composables/useDarkMode';

const { isDark, toggleDark } = useDarkMode()

</script>
