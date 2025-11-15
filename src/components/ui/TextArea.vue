<script setup lang="ts">
import { onMounted, ref } from 'vue';

const model = defineModel<string>({ required: true });
const props = defineProps<{ autofocus?: boolean }>();

const input = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  if (props.autofocus) {
    input.value?.focus();
  }
});

defineExpose({
  focus: () => input.value?.focus()
});
</script>

<template>
  <textarea :class="[
    // Estilos base y transición
    'w-full rounded-lg shadow-sm p-3 transition duration-150 ease-in-out',

    // Modo Claro (Light Mode)
    'border text-gray-900 bg-white',
    'focus:ring-blue-500 focus:border-blue-500',

    // Modo Oscuro (Dark Mode)
    'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100',
    'dark:focus:ring-blue-400 dark:focus:border-blue-400',

    // Clases adicionales pasadas
    $attrs.class
  ]" v-model="model" ref="input" :autofocus="autofocus"></textarea>
</template>
