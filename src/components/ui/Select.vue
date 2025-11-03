<template>
  <div>
    <label
      v-if="label"
      class="block mb-1 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <select
      v-model="model"
      class="w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
    >
      <option disabled value="">{{ default }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
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
