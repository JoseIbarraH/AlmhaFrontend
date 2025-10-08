<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center text-sm text-gray-600 reveal">
      <span class="after:content-['→'] after:mx-2 after:text-[#DCBE9A] last:after:content-none">
        <Link :href="routeWithLocale('home')" class="hover:text-custom-beige transition-colors duration-300">
        {{ $t('Client.Blog.View.Breadcrumb.Home') }}
        </Link>
      </span>

      <span class="after:content-['→'] after:mx-2 after:text-[#DCBE9A] last:after:content-none">
        <Link :href="routeWithLocale('blog')" class="hover:text-custom-beige transition-colors duration-300">
        {{ $t('Client.Blog.View.Breadcrumb.Blog') }}
        </Link>
      </span>

      <span class="after:content-['→'] after:mx-2 after:text-[#DCBE9A] last:after:content-none">
        <a v-if="category === 'facial'" :href="currentUrl"
          class="hover:text-custom-beige transition-colors duration-300">
          {{ $t('Client.Blog.Categories.Facial') }}
        </a>
        <a v-else-if="category === 'bodily'" :href="currentUrl"
          class="hover:text-custom-beige transition-colors duration-300">
          {{ $t('Client.Blog.Categories.Bodily') }}
        </a>
        <a v-else-if="category === 'non-surgical'" :href="currentUrl"
          class="hover:text-custom-beige transition-colors duration-300">
          {{ $t('Client.Blog.Categories.NonSurgical') }}
        </a>
        <a v-else-if="category === 'general'" :href="currentUrl"
          class="hover:text-custom-beige transition-colors duration-300">
          {{ $t('Client.Blog.Categories.General') }}
        </a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routeWithLocale } from '@/Helpers/routeWithLocale'
import { Link } from '@inertiajs/vue3'

const props = defineProps<{
  category: String
}>()

const currentUrl: string = window.location.href

</script>
