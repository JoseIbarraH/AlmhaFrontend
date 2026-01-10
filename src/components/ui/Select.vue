<template>
  <div>
    <!-- Etiqueta: Se adapta a dark:text-gray-300 -->
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>

    <select v-model="model" :class="[
      // Estilos base y transiciones
      'w-full rounded-lg px-3 py-2 transition duration-150 ease-in-out',
      'focus:outline-none focus:ring-2',

      // Modo Claro (Light Mode)
      'border border-gray-300 text-gray-900 bg-white',
      'focus:ring-blue-500 focus:border-blue-500',

      // Modo Oscuro (Dark Mode)
      'dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100',
      'dark:focus:ring-blue-400 dark:focus:border-blue-400',

      // Clases adicionales pasadas
      $attrs.class
    ]">
      <!-- Opción deshabilitada/placeholder. Uso 'placeholder' en lugar de 'default'. -->
      <option disabled value="">{{ default }}</option>

      <!-- Opciones dinámicas -->
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Definimos el tipo de las opciones
interface Option {
  value: string | number
  label: string
}

const props = defineProps<{
  default: string
  modelValue: string | number
  options: Option[]
  label?: string
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

// v-model con tipado
const model = computed({
  get: () => props.modelValue,
  set: (val: string | number) => emit("update:modelValue", val)
})
</script>
