<script setup lang="ts">
import { LucideArrowLeft } from 'lucide-vue-next';

  withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    type: 'button',
  },
);
</script>

<template>
  <button
  :type="type"
    class="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 gap-2">
    <LucideArrowLeft class="w-4 h-4" />
    <slot />
  </button>
</template>
