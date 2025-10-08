<template>
  <div class="container mx-auto p-4">
    <!-- Contenedor del buscador con dropdown -->
    <div class="relative max-w-xl mx-auto">
      <!-- Input de búsqueda -->
      <div class="relative">
        <input v-model="searchQuery" type="text" placeholder="Escribe para buscar..."
          class="w-full p-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @input="handleSearch" @focus="showDropdown = true" @blur="onInputBlur" @keydown.arrow-down="highlightNext"
          @keydown.arrow-up="highlightPrevious" ref="searchInput" />

        <!-- Loading indicator -->
        <div v-if="loading" class="absolute right-3 top-3">
          <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      </div>

      <!-- Dropdown con resultados -->
      <div v-if="showDropdown && realTimeResults.length > 0"
        class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
        <ul class="py-1">
          <li v-for="(result, index) in realTimeResults" :key="result.id" @click="selectResult(result)"
            @mouseenter="highlightedIndex = index" class="px-4 py-2 cursor-pointer flex transition-colors" :class="{
              'bg-blue-100': index === highlightedIndex,
              'hover:bg-gray-100': index !== highlightedIndex
            }">
            <div>
              <svg class="w-11 h-10 text-gray-800 px-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/>
              </svg>

            </div>
            <div class="flex flex-col">
              <span class="font-medium text-gray-900">{{ result.title }}</span>
              <span class="text-sm text-gray-600">{{ result.slug }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Mensaje de no resultados -->
      <div v-if="showDropdown && searchQuery.length >= 2 && realTimeResults.length === 0 && !loading"
        class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div class="px-4 py-3 text-center text-gray-500">
          No se encontraron resultados
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { debounce } from 'lodash';


// Interfaces TypeScript
interface SearchResult {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
}

// Props de Inertia
const props = defineProps<{
  results?: any;
  searchQuery?: string;
}>();

// Refs
const searchQuery = ref<string>(props.searchQuery || '');
const realTimeResults = ref<SearchResult[]>([]);
const loading = ref<boolean>(false);
const showDropdown = ref<boolean>(false);
const highlightedIndex = ref<number>(-1);
const abortController = ref<AbortController | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);



// Computed
const paginationResults = computed(() => {
  return props.results?.data || [];
});

// Función de búsqueda en tiempo real
const performSearch = debounce(async (query: string) => {

}, 300);

// Manejador de input
const handleSearch = (event: Event) => {
  const query = (event.target as HTMLInputElement).value;
  searchQuery.value = query;
  performSearch(query);
};

// Seleccionar un resultado del dropdown
const selectResult = (result: SearchResult) => {
  searchQuery.value = result.title;
  showDropdown.value = false;

  // Usar routeWithLocale para la redirección

};

// Cerrar dropdown cuando el input pierde el foco
const onInputBlur = () => {
  // Pequeño delay para permitir clicks en los items
  setTimeout(() => {
    showDropdown.value = false;
  }, 150);
};

// Navegación con teclado
const highlightNext = () => {
  if (realTimeResults.value.length === 0) return;

  event?.preventDefault();
  highlightedIndex.value =
    highlightedIndex.value < realTimeResults.value.length - 1
      ? highlightedIndex.value + 1
      : 0;

  scrollToHighlighted();
};

const highlightPrevious = () => {
  if (realTimeResults.value.length === 0) return;

  event?.preventDefault();
  highlightedIndex.value =
    highlightedIndex.value > 0
      ? highlightedIndex.value - 1
      : realTimeResults.value.length - 1;

  scrollToHighlighted();
};

const scrollToHighlighted = async () => {
  await nextTick();
  const highlightedElement = document.querySelector('.bg-blue-100');
  if (highlightedElement) {
    highlightedElement.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth'
    });
  }
};

// Cerrar dropdown al hacer click fuera
const handleClickOutside = (event: MouseEvent) => {
  if (searchInput.value && !searchInput.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};

// Event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  if (props.searchQuery) {
    performSearch(props.searchQuery);
  }
});

// Cleanup
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  if (abortController.value) {
    abortController.value.abort();
  }
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
