<template>
  <div v-if="pagination" class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">

    <!-- Texto de rango (izquierda) -->
    <div
      class="flex justify-center sm:justify-start items-center text-sm text-gray-600 dark:text-gray-400 w-full sm:w-auto">
      <span
        class="text-gray-700 dark:text-gray-200 px-3 py-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
        {{ $t('Helper.Pagination.Showing', {
          from: pagination.from,
          to: pagination.to,
          total: pagination.total
        }) }}
      </span>
    </div>

    <!-- Navegación de páginas (centrada) -->
    <nav class="flex flex-wrap justify-center items-center gap-2 w-full sm:w-auto" aria-label="Navegación de páginas">

      <!-- Botón Anterior -->
      <button class="px-3 py-1 rounded-md border text-sm transition-colors whitespace-nowrap" :class="[
        !pagination.prev_page_url
          ? 'opacity-50 cursor-not-allowed text-gray-400 border-gray-300 dark:text-gray-500 dark:border-gray-700'
          : 'text-gray-700 hover:bg-gray-100 border-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600'
      ]" :disabled="!pagination.prev_page_url" :aria-disabled="!pagination.prev_page_url"
        @click="changePage(pagination.current_page - 1)">
        {{ $t('Helper.Pagination.Previous') }}
      </button>

      <!-- Primera página -->
      <template v-if="showFirstPage">
        <button
          class="hidden xs:inline-flex px-3 py-1 rounded-md border text-sm transition-colors text-gray-700 hover:bg-gray-100 border-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600"
          @click="changePage(1)">
          1
        </button>
        <span v-if="showStartEllipsis" class="hidden xs:inline px-2 text-gray-500 dark:text-gray-400">...</span>
      </template>

      <!-- Páginas visibles -->
      <button v-for="link in visiblePages" :key="link.label" :class="[
        'px-3 py-1 rounded-md border text-sm transition-colors',
        link.active
          ? 'bg-blue-600 text-white border-blue-600 font-semibold cursor-default'
          : 'text-gray-700 hover:bg-gray-100 border-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600'
      ]" :aria-current="link.active ? 'page' : undefined" :disabled="link.active"
        @click="changePage(Number(link.label))">
        {{ link.label }}
      </button>

      <!-- Última página -->
      <template v-if="showLastPage">
        <span v-if="showEndEllipsis" class="hidden xs:inline px-2 text-gray-500 dark:text-gray-400">...</span>
        <button
          class="hidden xs:inline-flex px-3 py-1 rounded-md border text-sm transition-colors text-gray-700 hover:bg-gray-100 border-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600"
          @click="changePage(pagination.last_page)">
          {{ pagination.last_page }}
        </button>
      </template>

      <!-- Botón Siguiente -->
      <button class="px-3 py-1 rounded-md border text-sm transition-colors whitespace-nowrap" :class="[
        !pagination.next_page_url
          ? 'opacity-50 cursor-not-allowed text-gray-400 border-gray-300 dark:text-gray-500 dark:border-gray-700'
          : 'text-gray-700 hover:bg-gray-100 border-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600'
      ]" :disabled="!pagination.next_page_url" :aria-disabled="!pagination.next_page_url"
        @click="changePage(pagination.current_page + 1)">
        {{ $t('Helper.Pagination.Next') }}
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PaginatedResponse } from '@/types/apiResponse'

interface Props<T> {
  pagination: PaginatedResponse<T>
  maxVisible?: number
}

const props = withDefaults(defineProps<Props<any>>(), {
  maxVisible: 5
})

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

// Computed: páginas visibles
const visiblePages = computed(() => {
  const pages = props.pagination.links.filter(link => !isNaN(Number(link.label)))
  const { current_page, last_page } = props.pagination
  const { maxVisible } = props

  if (last_page <= maxVisible) return pages

  let start = Math.max(current_page - Math.floor(maxVisible / 2), 1)
  let end = start + maxVisible - 1

  if (end > last_page) {
    end = last_page
    start = Math.max(end - maxVisible + 1, 1)
  }

  return pages.filter(link => {
    const pageNum = Number(link.label)
    return pageNum >= start && pageNum <= end
  })
})

const showFirstPage = computed(() => {
  const first = visiblePages.value[0]
  return first && Number(first.label) > 1
})

const showLastPage = computed(() => {
  const last = visiblePages.value[visiblePages.value.length - 1]
  return last && Number(last.label) < props.pagination.last_page
})

const showStartEllipsis = computed(() => {
  const first = visiblePages.value[0]
  return first && Number(first.label) > 2
})

const showEndEllipsis = computed(() => {
  const last = visiblePages.value[visiblePages.value.length - 1]
  return last && Number(last.label) < props.pagination.last_page - 1
})

function changePage(page: number) {
  if (
    page !== props.pagination.current_page &&
    page >= 1 &&
    page <= props.pagination.last_page
  ) {
    emit('page-change', page)
  }
}
</script>
