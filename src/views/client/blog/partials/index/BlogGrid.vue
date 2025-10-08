<template>
  <div v-if="data.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    <article v-for="(value, index) in data" :key="index"
      class="bg-gray-50 rounded-2xl overflow-hidden hover-lift blog-card shadow-lg">
      <Reveal>
        <div class="relative overflow-hidden">
          <SafeImage :src="value.image_name" :alt="value.title"
            class="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" />
          <div class="absolute top-4 left-4">
            <span class="category-pill px-3 py-1 bg-custom-beige text-custom-dark rounded-full text-xs font-medium">
              {{ getCategoryName(value.category) }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div class="flex items-center space-x-3 mb-3 text-xs text-gray-500">
            <span>{{ $t('Client.Blog.Index.Card.Specialist') }}</span>
            <span>•</span>
            <span>{{ value.created_at }}</span>
            <span>•</span>
            <span>{{ value.created_at }}</span>
          </div>

          <h3
            class="text-xl font-serif font-bold cursor-pointer text-custom-dark mb-3 leading-tight hover:text-custom-beige transition-colors duration-300">
            <a @click="handleBlogSelected(value.slug)">
              {{ value.title }}
            </a>
          </h3>

          <button @click="handleBlogSelected(value.slug)"
            class="inline-flex items-center text-custom-beige font-medium hover:text-custom-dark transition-colors duration-300 group">
            {{ $t('Client.Blog.Index.Card.ReadMore') }}
            <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </Reveal>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Data } from '../../types';
import Reveal from '@/components/Reveal.vue';
import SafeImage from '@/components/SafeImage.vue';

const props = defineProps<{
  data: Data[]
}>()

const getCategoryName = (category?: string): string => {
  const categoryNames: Record<string, string> = {
    facial: 'Facial',
    bodily: 'Corporal',
    'non-surgical': 'No Quirúrgico',
    general: 'General'
  }
  return categoryNames[category || 'general'] || 'General'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function handleBlogSelected(blogSlug: string) {
  
}
</script>
