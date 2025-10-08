<template>
  <div
    id="reading-progress"
    class="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#DCBE9A] to-[#202020] z-10 transform origin-left"
    :style="{ transform: `scaleX(${progress})` }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progress = ref(0)

function updateReadingProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? scrollTop / docHeight : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateReadingProgress, { passive: true })
  updateReadingProgress()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateReadingProgress)
})
</script>

<style scoped>
#reading-progress {
  transition: transform 0.1s linear; /* suaviza sin que se atrase */
}
</style>
