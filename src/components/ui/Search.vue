<template>
  <div class="flex items-center gap-2 w-full md:w-72">
    <div class="relative w-full">
      <input
        v-model="query"
        type="text"
        :placeholder="placeholder"
        class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
               text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700
               focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm
               transition-colors"
      />
      <LucideSearch class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>

    <button
      v-if="query"
      @click="clearSearch"
      class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
             transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      title="Limpiar búsqueda"
    >
      <LucideX class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { LucideX, LucideSearch } from 'lucide-vue-next'

interface Props {
  /** Placeholder del input */
  placeholder?: string
  /** Valor inicial (para sincronizar con URL) */
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar...',
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [value: string]
}>()

const query = ref(props.modelValue)
let debounceTimer: ReturnType<typeof setTimeout>

// Watch para cambios en el input
watch(query, (newValue) => {
  // Emitir inmediatamente el valor para v-model
  emit('update:modelValue', newValue)

  // Debounce para la búsqueda real
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', newValue)
  }, 500)
})

// Watch para cambios externos (ej: limpiar desde el padre)
watch(() => props.modelValue, (newValue) => {
  if (query.value !== newValue) {
    query.value = newValue
  }
})

function clearSearch() {
  query.value = ''
  emit('search', '')
}
</script>
