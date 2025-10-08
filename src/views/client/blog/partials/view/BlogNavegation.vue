<template>
  <div class="flex flex-col md:flex-row justify-between items-center gap-6">
    <div v-if="previousBlog" class="flex-1 text-left">
      <p class="text-sm text-gray-500 mb-2">{{ $t('Client.Blog.View.Navigation.PreviousArticle') }}</p>
      <button @click="navigateToPost(previousBlog.slug)"
        class="text-lg font-semibold text-custom-dark hover:text-custom-beige transition-colors duration-300">
        {{ previousBlog.title }}
      </button>
    </div>
    <div v-else class="flex-1 text-left"></div>

    <div class="flex-shrink-0">
      <button @click="navigateToBlogs()"
        class="px-6 py-3 bg-custom-beige text-custom-dark rounded-full font-medium hover:shadow-lg transition-all duration-300">
        {{ $t('Client.Blog.View.Navigation.AllArticle') }}
      </button>
    </div>

    <div v-if="nextBlog" class="flex-1 text-right">
      <p class="text-sm text-gray-500 mb-2">{{ $t('Client.Blog.View.Navigation.NextArticle') }}</p>
      <button @click="navigateToPost(nextBlog.slug)"
        class="text-lg font-semibold text-custom-dark hover:text-custom-beige transition-colors duration-300 underline">
        {{ nextBlog.title }}
      </button>

    </div>
    <div v-else class="flex-1 text-left"></div>
  </div>
</template>

<script setup lang="ts">
import { NextPreviewBlogs } from '../../types'
import { routeWithLocale } from '@/Helpers/routeWithLocale';

const props = defineProps<{
  previousBlog?: NextPreviewBlogs
  nextBlog?: NextPreviewBlogs
}>()

function navigateToBlogs() {
  window.location.href = routeWithLocale('blog');
}

function navigateToPost(slug: string) {
  window.location.href = routeWithLocale('blog.detail', { blog: slug });
}

</script>
