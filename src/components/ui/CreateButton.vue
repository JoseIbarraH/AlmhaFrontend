<script setup lang="ts">
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
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    <slot />
  </button>
</template>
