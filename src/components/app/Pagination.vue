<template>
  <nav
    v-if="pagination.last_page > 1"
    class="flex flex-wrap justify-center items-center gap-2 mt-6"
    aria-label="Navegación de páginas"
  >
    <!-- Botón Anterior -->
    <button
      class="px-3 py-1 rounded-md border text-sm transition-colors"
      :class="[
        !pagination.prev_page_url
          ? 'opacity-50 cursor-not-allowed text-gray-400 border-gray-300'
          : 'text-gray-700 hover:bg-gray-100 border-gray-300'
      ]"
      :disabled="!pagination.prev_page_url"
      :aria-disabled="!pagination.prev_page_url"
      @click="changePage(pagination.current_page - 1)"
    >
      Anterior
    </button>

    <!-- Primera página si no está visible -->
    <template v-if="showFirstPage">
      <button
        class="px-3 py-1 rounded-md border text-sm text-gray-700 hover:bg-gray-100 border-gray-300 transition-colors"
        @click="changePage(1)"
      >
        1
      </button>
      <span v-if="showStartEllipsis" class="px-2 text-gray-500">...</span>
    </template>

    <!-- Páginas visibles -->
    <button
      v-for="link in visiblePages"
      :key="link.label"
      :class="[
        'px-3 py-1 rounded-md border text-sm transition-colors',
        link.active
          ? 'bg-blue-600 text-white border-blue-600 font-semibold cursor-default'
          : 'text-gray-700 hover:bg-gray-100 border-gray-300'
      ]"
      :aria-current="link.active ? 'page' : undefined"
      :disabled="link.active"
      @click="changePage(Number(link.label))"
    >
      {{ link.label }}
    </button>

    <!-- Última página si no está visible -->
    <template v-if="showLastPage">
      <span v-if="showEndEllipsis" class="px-2 text-gray-500">...</span>
      <button
        class="px-3 py-1 rounded-md border text-sm text-gray-700 hover:bg-gray-100 border-gray-300 transition-colors"
        @click="changePage(pagination.last_page)"
      >
        {{ pagination.last_page }}
      </button>
    </template>

    <!-- Botón Siguiente -->
    <button
      class="px-3 py-1 rounded-md border text-sm transition-colors"
      :class="[
        !pagination.next_page_url
          ? 'opacity-50 cursor-not-allowed text-gray-400 border-gray-300'
          : 'text-gray-700 hover:bg-gray-100 border-gray-300'
      ]"
      :disabled="!pagination.next_page_url"
      :aria-disabled="!pagination.next_page_url"
      @click="changePage(pagination.current_page + 1)"
    >
      Siguiente
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PaginatedResponse, Data } from '@/views/dashboard/team/types';

interface Props {
  pagination: PaginatedResponse<Data>;
  maxVisible?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisible: 5
});

const emit = defineEmits<{
  'page-change': [page: number];
}>();

// Páginas numéricas visibles
const visiblePages = computed(() => {
  const pages = props.pagination.links.filter(link => !isNaN(Number(link.label)));

  const currentPage = props.pagination.current_page;
  const lastPage = props.pagination.last_page;
  const maxVisible = props.maxVisible;

  // Si hay pocas páginas, mostrar todas
  if (lastPage <= maxVisible) {
    return pages;
  }

  // Calcular rango visible
  let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
  let end = start + maxVisible - 1;

  if (end > lastPage) {
    end = lastPage;
    start = Math.max(end - maxVisible + 1, 1);
  }

  return pages.filter(link => {
    const pageNum = Number(link.label);
    return pageNum >= start && pageNum <= end;
  });
});

const showFirstPage = computed(() => {
  if (visiblePages.value.length === 0) return false;
  const firstPage = visiblePages.value[0];
  if (!firstPage) return false;
  const firstVisible = Number(firstPage.label);
  return firstVisible > 1;
});

// Mostrar última página
const showLastPage = computed(() => {
  if (visiblePages.value.length === 0) return false;
  const lastPage = visiblePages.value[visiblePages.value.length - 1];
  if (!lastPage) return false;
  const lastVisible = Number(lastPage.label);
  return lastVisible < props.pagination.last_page;
});

// Mostrar puntos suspensivos al inicio
const showStartEllipsis = computed(() => {
  if (visiblePages.value.length === 0) return false;
  const firstPage = visiblePages.value[0];
  if (!firstPage) return false;
  const firstVisible = Number(firstPage.label);
  return firstVisible > 2;
});

// Mostrar puntos suspensivos al final
const showEndEllipsis = computed(() => {
  if (visiblePages.value.length === 0) return false;
  const lastPage = visiblePages.value[visiblePages.value.length - 1];
  if (!lastPage) return false;
  const lastVisible = Number(lastPage.label);
  return lastVisible < props.pagination.last_page - 1;
});

function changePage(page: number) {
  if (
    page !== props.pagination.current_page &&
    page >= 1 &&
    page <= props.pagination.last_page
  ) {
    emit('page-change', page);
  }
}
</script>
