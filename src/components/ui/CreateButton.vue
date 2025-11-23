<script setup lang="ts">
import { LucidePlus } from 'lucide-vue-next';

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
  <button :type="type" class="inline-flex gap-2 items-center rounded-md
          border border-transparent bg-gray-800 px-4 py-2 text-xs
          font-semibold uppercase tracking-widest text-white transition
          duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          active:bg-gray-900 disabled:opacity-25 dark:bg-indigo-500 dark:text-white
          dark:hover:bg-indigo-400 dark:focus:bg-indigo-400
          dark:active:bg-indigo-600 dark:focus:ring-offset-gray-800">
    <LucidePlus class="w-5 h-5" />
    <slot />
  </button>
</template>
