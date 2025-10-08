<template>
  <div ref="el" class="reveal">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const el = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.value?.classList.add('active')
          observer?.unobserve(el.value!)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  observer.observe(el.value)
})

onBeforeUnmount(() => {
  if (el.value) observer?.unobserve(el.value)
})
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
