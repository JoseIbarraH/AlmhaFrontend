<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  text?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const inputValue = ref(props.modelValue)

let timeout: ReturnType<typeof setTimeout>
watch(inputValue, (val) => {
  emit('update:modelValue', val)

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('search', val)
  }, 400)
})
</script>

<template>
  <div class="relative">
    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none"
      stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input v-model="inputValue" type="text" :placeholder="props.text ?? 'Buscar...'"
      class="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
  </div>
</template>
