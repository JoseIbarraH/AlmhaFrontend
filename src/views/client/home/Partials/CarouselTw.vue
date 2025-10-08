<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Slides -->
    <div class="relative w-full h-full">
      <TransitionGroup name="slide">
        <div v-for="(slide, index) in slides" :key="index" v-show="index === currentSlide"
          class="absolute inset-0 w-full h-full">
          <!-- Imagen de fondo -->
          <img :src="slide.src" :alt="slide.alt" class="absolute inset-0 w-full h-full object-cover object-center" />

          <!-- Overlay oscuro -->
          <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>

          <!-- Contenido -->
          <div class="relative z-9 flex items-center justify-center h-full px-4">
            <div class="text-center text-white max-w-3xl">
              <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
                {{ slide.title }}
              </h1>
              <p class="text-lg sm:text-xl md:text-2xl font-light mb-6 drop-shadow-md">
                {{ slide.subtitle }}
              </p>
              <button
                class="mt-4 px-8 py-3 border-2 border-white text-white font-medium uppercase tracking-wider rounded transition-all duration-300 hover:bg-white hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-lg">
                [Aquí va el botón]
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <div class="absolute flex right-8 bottom-8">
      <!-- Botón Anterior -->
      <button @click="prevSlide"
        class=" z-9 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:bg-white/25 hover:scale-105"
        aria-label="Anterior">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Botón Siguiente -->
      <button @click="nextSlide"
        class=" z-9 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:bg-white/25 hover:scale-105"
        aria-label="Siguiente">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Indicadores -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-9 flex gap-3">
      <button v-for="(__slide, index) in slides" :key="index" @click="goToSlide(index)" :class="[
        'rounded-full transition-all duration-300',
        index === currentSlide
          ? 'w-4 h-4 bg-white'
          : 'w-3 h-3 bg-white/40 hover:bg-white/70'
      ]" :aria-label="`Ir al slide ${index + 1}`"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import type { carouselUrlsInt } from "../types.ts";

const props = defineProps<{
  data: carouselUrlsInt[];
}>();

const currentSlide = ref(0);
let autoplayInterval: number | null = null;

// Transformamos la data en slides para el carrusel
const slides = computed(() =>
  props.data?.map((item) => ({
    src: item.url,
    alt: item.title,
    title: item.title,
    subtitle: item.text,
  }))
);

// Navegar al siguiente slide
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

// Navegar al slide anterior
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

// Ir a un slide específico
const goToSlide = (index: number) => {
  currentSlide.value = index;
};

// Autoplay
const startAutoplay = () => {
  autoplayInterval = window.setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
/* Transiciones suaves entre slides */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
}

.slide-leave-to {
  opacity: 0;
}
</style>
