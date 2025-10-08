<template>
  <div class="max-h-[calc(100vh-1rem)] overflow-y-auto space-y-3">
    <div class="bg-white rounded-2xl py-6 px-5 shadow-lg transition delay-[0.4s]">
      <h3 class="text-xl font-serif font-bold text-custom-dark mb-6">
        Artículos De Interes
      </h3>
      <div class="space-y-6">
        <article v-for="(item, index) in blog" :key="index"
          class="transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] rounded-[0.5rem] cursor-pointer flex items-center space-x-4"
          @click="navigateToPost(item.slug)">
          <SafeImage :src="item.image_name"
            alt="Imagen Blog"
            class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            @error="onImageError"
          />
          <div class="flex-1 min-w-0">
            <h4
              class="font-semibold text-custom-dark group-hover:text-custom-beige transition-colors duration-300 line-clamp-2 leading-tight">
              {{ item.title }}
            </h4>
            <p class="text-sm text-gray-500 mt-1">{{ formatDate(item.created_at) }}</p>
          </div>
        </article>
      </div>
    </div>

    <div class="bg-custom-dark rounded-2xl p-6 text-white transition delay-[0.4s]">
      <Consultation />
    </div>
  </div>
</template>

<script setup lang="ts">
import Consultation from './Consultation.vue';
import type { Blog } from '../types';

const props = defineProps<{
  blog?: Blog[]
}>()

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = "/da"
}

function navigateToPost(slug: string) {

}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
