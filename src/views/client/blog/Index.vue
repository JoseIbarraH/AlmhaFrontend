<template>

  <Head title="Blog" />

  <ClientLayout>
    <!-- Hero -->
    <section class="pb-16 pt-32 px-6 h-screen relative bg-gradient-to-br from-[#18181B] via-[#1F1F23] to-[#18181B]">

          <Presentation />

    </section>

      <div class="max-w-7xl mx-auto text-center mb-16">
        <Reveal>
          <BlogSearchEngine />
        </Reveal>
      </div>

    <!-- Contenido -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto p-4 md:p-0">
        <!-- <BlogFilterHeader :categories="categories" :current-filter="currentFilter" :is-visible="true"
          @filter-change="setCurrentFilter" /> -->

        <div class="grid grid-cols-1 lg:grid-cols-3 p-4 md:p-0 gap-8">
          <div class="lg:col-span-2">
            <!-- <BlogGrid :data="paginate.data" @blog-selected="handleBlogSelected" /> -->

            <div class="w-full flex items-center justify-center">
              <!-- <Pagination :links="paginate.links" :last_page="paginate.last_page" :current_page="paginate.current_page"
                :filters="props.filters" /> -->
            </div>
          </div>

          <div class="lg:col-span-1 order-3">
            <div class="sticky top-8 max-h-[calc(100vh-4rem)]">
              <Reveal>
                <!-- <SidebarRight :blog="popularBlogs" class="overflow-y-auto" /> -->
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Consultation />
  </ClientLayout>
</template>

<script setup lang="ts">
import BlogFilterHeader from './partials/index/BlogFilterHeader.vue'
import BlogSearchEngine from './partials/index/BlogSearchEngine.vue'
import Consultation from '@/components/Consultation.vue'
import FloatingBubbles from './components/FloatingBubbles.vue'
import Presentation from './partials/index/Presentation.vue'
import type { Blog, Data, PaginatedResponse } from './types'
import SidebarRight from './partials/SidebarRight.vue'
import BlogGrid from './partials/index/BlogGrid.vue'
import Pagination from '@/components/Pagination.vue'
import Reveal from '@/components/Reveal.vue'
import { useI18n } from 'vue-i18n';
import { ref } from 'vue'

const { t } = useI18n();

/* const props = defineProps<{
  paginate: PaginatedResponse<Data>
  popularBlogs: Blog[]
  filters: { category?: string }
}>() */

/* const currentFilter = ref(props.filters.category || 'general') */

/* const categories = [
  { slug: 'general', label: t('Client.Blog.Categories.General') },
  { slug: 'facial', label: t('Client.Blog.Categories.Facial') },
  { slug: 'bodily', label: t('Client.Blog.Categories.Bodily') },
  { slug: 'non-surgical', label: t('Client.Blog.Categories.NonSurgical') },
] */

const setCurrentFilter = (filter: string) => {

}

function handleBlogSelected(blogSlug: string) {

}
</script>
