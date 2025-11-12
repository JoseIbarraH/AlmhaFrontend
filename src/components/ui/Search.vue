<template>
  <div class="flex items-center gap-2 w-full md:w-72">
    <input
      v-model="query"
      type="text"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-600 dark:text-gray-400
             focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
    />

    <button
      v-if="query"
      @click="clearSearch"
      class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
      title="Limpiar"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { api } from '@/plugins/api'

interface Props {
  /** Endpoint completo o relativo, ej: "/api/team-members" */
  endpoint: string
  /** Nombre del parámetro de búsqueda (por defecto: "search") */
  paramName?: string
  /** Placeholder del input */
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  paramName: 'search',
  placeholder: 'Buscar...',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void
  (e: 'loading', value: boolean): void
}>()

const query = ref('')
let debounceTimer: number | undefined

watch(query, (newValue) => {
  clearTimeout(debounceTimer)
  debounceTimer = window.setTimeout(() => {
    fetchResults(newValue)
  }, 500)
})

async function fetchResults(searchTerm: string) {
  emit('loading', true)
  try {
    const { data } = await api.get(props.endpoint, {
      params: { [props.paramName]: searchTerm || undefined },
    })
    // Intenta detectar si la respuesta tiene paginación
    const results = data.data?.pagination?.data || data.data || []
    emit('update:modelValue', results)
  } catch (error) {
    console.error('Error en SearchInput:', error)
    emit('update:modelValue', [])
  } finally {
    emit('loading', false)
  }
}

function clearSearch() {
  query.value = ''
  fetchResults('')
}
</script>
