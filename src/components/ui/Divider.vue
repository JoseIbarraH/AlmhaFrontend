<template>
  <hr
    :class="[
      'w-full border-t transition-colors duration-300',
      thicknessClass,
      colorClass,
      marginClass
    ]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  thickness: {
    type: String,
    default: '1', // opciones: '1', '2', '4'
  },
  color: {
    type: String,
    default: 'gray', // opciones: 'gray', 'light', 'dark', 'primary'
  },
  margin: {
    type: String,
    default: 'my-4', // control de margen superior e inferior
  },
})

const thicknessClass = computed(() => {
  switch (props.thickness) {
    case '2':
      return 'border-t-2'
    case '4':
      return 'border-t-4'
    default:
      return 'border-t'
  }
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'light':
      return 'border-gray-200 dark:border-gray-700'
    case 'dark':
      return 'border-gray-700 dark:border-gray-300'
    case 'primary':
      return 'border-blue-500'
    default:
      return 'border-gray-300 dark:border-gray-600'
  }
})

const marginClass = computed(() => props.margin)
</script>
