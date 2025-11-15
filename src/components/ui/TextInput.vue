<script setup lang="ts">
import { onMounted, ref, useAttrs, computed } from 'vue';

const model = defineModel<string>({ required: true });
const attrs = useAttrs();

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (input.value?.hasAttribute('autofocus')) {
    input.value?.focus();
  }
});

defineExpose({ focus: () => input.value?.focus() });

const inputClasses = computed(() => {
  if (attrs.class) {
    return attrs.class;
  }

  return `
    rounded-md py-2 px-4 shadow-sm w-full border
    border-gray-300 focus:border-indigo-500 focus:ring-indigo-500
    bg-white text-gray-900
    dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300
    dark:focus:border-indigo-600 dark:focus:ring-indigo-600
  `;
});
</script>

<template>
  <input
    ref="input"
    v-model="model"
    v-bind="attrs"
    :class="inputClasses"
  />
</template>
