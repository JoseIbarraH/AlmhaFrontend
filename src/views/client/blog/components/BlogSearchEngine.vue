<template>
  <div class="search-container relative">
    <div class="relative">
      <input ref="inputRef" v-model="inputValue" @input="handleInput" type="text"
        :placeholder="$t('Client.Blog.Index.SearchEngine.Placeholder')"
        class="w-full px-6 py-4 pl-14 text-lg bg-white text-custom-dark caret-custom-dark rounded-2xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-custom-beige focus:border-transparent transition-all duration-300">
      <svg class="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none"
        stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <button v-if="inputValue" @click="clearInput"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors duration-200">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Resultados de búsqueda -->
    <Teleport to="body">
      <div v-if="showSearchResults && searchResults.length > 0" class="absolute top-full left-0 right-0 bg-white rounded-[12px]
         shadow-xl max-h-[400px] overflow-y-auto z-[9999]" :style="dropdownStyles">
        <div v-for="(result, index) in searchResults" :key="index" @click="$emit('select-result', result)"
          class="search-result-item p-4 border-b border-gray-100 cursor-pointer hover:bg-[#DCBE9A]/20 transition-colors duration-200 last:border-b-0">
          <h4 class="font-semibold text-custom-dark">{{ result.title }}</h4>
          <p class="text-sm text-gray-500 mt-1">{{ getCategoryName(result.category) }}</p>
        </div>
      </div>

      <div v-else-if="showSearchResults && searchValue && searchResults.length === 0"
        class="search-results absolute top-full left-0 right-0 bg-white rounded-xl shadow-2xl mt-2">
        <div class="p-6 text-center text-gray-500">
          {{ $t('Client.Blog.Index.SearchEngine.NotFound') }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from '../types'
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps<{
  searchResults: Blog[]
  showSearchResults: boolean
}>()

const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (e: 'search', term: string): void
  (e: 'clear-search'): void
  (e: 'select-result', blog: Blog): void
}>()

const getCategoryName = (category?: string): string => {
  const categoryNames: Record<string, string> = {
    'facial': t('Client.Blog.View.Breadcrumb.Facial'),
    'bodily': t('Client.Blog.View.Breadcrumb.Bodily'),
    'non-surgical': t('Client.Blog.View.Breadcrumb.NonSurgical')
  }
  return categoryNames[category || ''] || t('Client.Blog.View.Breadcrumb.General')
}

const searchValue = computed(() => {
  return props.searchResults.length > 0 ? '' : ''
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('search', inputValue.value)
}

const clearInput = () => {
  inputValue.value = ''
  emit('clear-search')
}

const dropdownStyles = ref<{ left: string; top: string; width: string }>({
  left: '0px',
  top: '0px',
  width: '0px'
})

const updateDropdownPosition = () => {
  if (inputRef.value) {
    const rect = inputRef.value.getBoundingClientRect()
    dropdownStyles.value = {
      left: `${rect.left + window.scrollX}px`,
      top: `${rect.bottom + window.scrollY}px`,
      width: `${rect.width}px`
    }
  }
}

watch(() => props.showSearchResults, (val) => {
  if (val) nextTick(updateDropdownPosition)
})

onMounted(() => {
  window.addEventListener('resize', updateDropdownPosition)
})
</script>
