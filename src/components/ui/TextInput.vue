<script setup lang="ts">
import { onMounted, ref } from 'vue';

const model = defineModel<string>({ required: true });

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (input.value?.hasAttribute('autofocus')) {
    input.value?.focus();
  }
});

defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
  <input
    class="rounded-md py-2 px-4 shadow-sm

           border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900

           dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300
           dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
    v-model="model"
    ref="input"
  />
</template>
