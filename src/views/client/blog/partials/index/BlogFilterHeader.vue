<template>
  <div
    class="flex flex-col lg:flex-row lg:items-center justify-between mb-12 reveal"
    :class="{ active: isVisible }"
  >
    <h2 class="text-3xl md:text-4xl font-serif font-bold text-custom-dark mb-6 lg:mb-0">
      {{ $t('Client.Blog.Index.FilterHeader.Title') }}
    </h2>

    <div class="flex flex-wrap gap-3">
      <button
        v-for="(value, index) in categories"
        :key="index"
        @click="$emit('filter-change', value.slug)"
        :class="[
          'px-4 py-2 rounded-full font-medium transition-all duration-300 capitalize',
          currentFilter === value.slug
            ? 'bg-custom-beige text-custom-dark'
            : 'bg-white text-custom-dark hover:bg-custom-beige'
        ]"
      >
        {{ value.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories?: { slug: string; label: string }[]
  currentFilter?: string
  isVisible?: boolean
}>()

defineEmits<{
  (e: 'filter-change', filter: string): void
}>()
</script>
