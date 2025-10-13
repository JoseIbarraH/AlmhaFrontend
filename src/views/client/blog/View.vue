<template>

  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet">
  </head>

  <ProgressBar />

  <div class="py-6 px-6 bg-custom-white font-sans mt-20">

    <Breadcrumb :category="blog.category" />

    <section class="pb-5 pt-16 px- relative overflow-hidden">
      <FloatingBubbles />

      <div class="max-w-4xl mx-auto">
        <Reveal>
          <BlogInfo :title="blog.title" :category="blog.category" :created_at="blog.created_at" />
        </Reveal>

        <Reveal>
          <BlogImage :url="blog.image_name" />
        </Reveal>

        <Reveal>
          <BlogAutorInfo :writer="blog.writer" />
        </Reveal>
      </div>
    </section>

    <section class="py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div class="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto"></div>

          <div class="lg:col-span-2 order-1 lg:order-2">
            <Reveal>
              <div v-html="blog.content" class="prose"></div>
            </Reveal>
          </div>

          <div class="lg:col-span-1 order-3">
            <div class="sticky top-8 max-h-[calc(100vh-4rem)]">
              <Reveal>
                <SidebarRight :blog="randomBlogs" class="overflow-y-auto" />
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="py-12 bg-white">
      <div class="max-w-4xl mx-auto">
        <Reveal>
          <BlogNavegation :previous-blog="previousBlog" :next-blog="nextBlog" />
        </Reveal>
      </div>
    </section>
  </div>
  <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up"
    :buttonProps="{ severity: 'contrast', raised: true, rounded: true }" />

</template>

<script setup lang="ts">
import BlogNavegation from './partials/view/BlogNavegation.vue';
import FloatingBubbles from './components/Decoratives.vue';
import BlogAutorInfo from './partials/view/BlogAutorInfo.vue';
import Breadcrumb from './partials/view/Breadcrumb.vue';
import ProgressBar from './components/ProgressBar.vue';
import SidebarRight from './partials/SidebarRight.vue';
import BlogImage from './partials/view/BlogImage.vue';
import BlogInfo from './partials/view/BlogInfo.vue';
import Reveal from '@/components/Reveal.vue';
import type { Blog, NextPreviewBlogs } from './types'
import ScrollTop from 'primevue/scrolltop';

const props = defineProps<{
  blog: Blog
  randomBlogs: Blog[]
  previousBlog?: NextPreviewBlogs
  nextBlog?: NextPreviewBlogs
}>()

</script>

<style scoped>
.prose :where(blockquote):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: #6b7280;
  border-inline-start-width: 0.25rem;
  border-inline-start-color: #6b7280;
  quotes: "\201C" "\201D" "\2018" "\2019";
  padding-inline-start: 1em;
}

.prose :where(h3):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 0em;
  margin-bottom: 0em;
  line-height: 1.6;
}

.prose :where(p):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  margin-top: 0em;
  margin-bottom: 0em;
}

.prose :where(ul > li):not(:where([class~="not-prose"], [class~="not-prose"] *))::marker {
  color: #202020;
}
</style>
