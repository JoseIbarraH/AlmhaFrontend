<script setup lang="ts">
import { computed, defineEmits } from 'vue'

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

const props = defineProps<{
  current_page: number
  last_page: number
  links: PaginationLink[]
  color?: boolean
}>()

const emit = defineEmits<{
  (e: 'page-change', pageUrl: string): void
}>()

const windowSize = 5

// Calcular las páginas visibles
const pageLinks = computed(() => {
  if (!props.links?.length) return []

  const half = Math.floor(windowSize / 2)
  let start = Math.max(1, props.current_page - half)
  let end = Math.min(props.last_page, start + windowSize - 1)

  if (end - start < windowSize - 1) {
    start = Math.max(1, end - windowSize + 1)
  }

  return props.links.filter((link) => {
    const num = Number(link.label)
    return !isNaN(num) && num >= start && num <= end
  })
})

// Referencias seguras al primer y último link
const firstLink = computed(() => props.links?.[0])
const lastLink = computed(() =>
  props.links?.length ? props.links[props.links.length - 1] : undefined
)

// Función para manejar el clic en una página
const goToPage = (url: string | null) => {
  if (!url) return
  emit('page-change', url)
}
</script>

<template>
  <nav v-if="links?.length" class="flex gap-1 mt-6">
    <!-- Botón "Anterior" -->
    <button
      v-if="firstLink?.url"
      @click="goToPage(firstLink.url)"
      v-html="firstLink.label"
      class="px-3 py-1 border rounded hover:bg-gray-100"
    />
    <span
      v-else
      v-html="firstLink?.label"
      class="px-3 py-1 border rounded text-gray-400 cursor-not-allowed select-none"
    />

    <!-- Números de página -->
    <button
      v-for="(link, index) in pageLinks"
      :key="index"
      @click="goToPage(link.url)"
      v-html="link.label"
      class="px-3 py-1 border rounded hover:bg-gray-100"
      :class="{
        'border-[#1F2937] border-2 text-[#1F2937] font-bold': link.active && color,
        'border-[#DCBE9A] border-2 text-[#DCBE9A] font-bold': link.active && !color,
        'text-gray-500': !link.active
      }"
    />

    <!-- Botón "Siguiente" -->
    <button
      v-if="lastLink?.url"
      @click="goToPage(lastLink.url)"
      v-html="lastLink.label"
      class="px-3 py-1 border rounded hover:bg-gray-100"
    />
    <span
      v-else
      v-html="lastLink?.label"
      class="px-3 py-1 border rounded text-gray-400 cursor-not-allowed select-none"
    />
  </nav>

  <div v-else class="text-gray-400 text-sm mt-6 text-center">
    No hay páginas disponibles
  </div>
</template>
