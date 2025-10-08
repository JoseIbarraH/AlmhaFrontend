<template>
  <div class="w-full h-full relative overflow-hidden bg-gray-900">
    <!-- Slides -->
    <div class="relative w-full h-full">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 transition-all duration-1000 ease-in-out"
        :class="{
          'opacity-100 scale-100': currentSlide === index,
          'opacity-0 scale-110': currentSlide !== index
        }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <img
          :src="slide.image"
          :alt="slide.title"
          class="w-full h-full object-cover"
        />

        <!-- Overlay oscuro -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <!-- Contenido del slide -->
        <div class="absolute bottom-20 left-0 right-0 px-6 md:px-12 lg:px-20 text-white">
          <div class="max-w-4xl">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              {{ slide.title }}
            </h2>
            <p class="text-lg md:text-xl text-gray-200">
              {{ slide.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Controles -->
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
      <div class="flex justify-between items-center px-4 py-6 max-w-7xl mx-auto">
        <!-- Botón anterior -->
        <button
          @click="prevSlide"
          class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 text-white group"
          aria-label="Slide anterior"
        >
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Indicadores -->
        <div class="flex gap-3">
          <button
            v-for="(__slide, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            class="transition-all duration-300 rounded-full"
            :class="{
              'w-10 h-3 bg-white': currentSlide === index,
              'w-3 h-3 bg-white/50 hover:bg-white/70': currentSlide !== index
            }"
            :aria-label="`Ir al slide ${index + 1}`"
          />
        </div>

        <!-- Botón siguiente -->
        <button
          @click="nextSlide"
          class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 text-white group"
          aria-label="Siguiente slide"
        >
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Contador de slides -->
    <!-- <div class="absolute top-6 right-6 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20">
      {{ currentSlide + 1 }} / {{ slides.length }}
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Slide {
  image: string;
  title?: string;
  description?: string;
}

const urls: string[] = [
  "https://9to5google.com/wp-content/uploads/sites/4/2024/08/Gemini-Advanced-Imagen-3-1.jpg",
  "https://4.img-dpreview.com/files/p/E~TS500x0~articles/1562025276/m_Poincenot_24-4-2014_3.jpeg"
];

const slides = ref<Slide[]>(
  urls.map((url) => ({
    image: url,
    title: "",
    description: "",
  }))
);

const currentSlide = ref(0);

let touchStartX = 0;
let touchEndX = 0;
let autoSlideInterval: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

const handleTouchStart = (e: TouchEvent) => {
  const touch = e.changedTouches?.[0];
  if (touch) {
    touchStartX = touch.screenX;
  }
};

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault();
  const touch = e.changedTouches?.[0];
  if (touch) {
    touchEndX = touch.screenX;
  }
};

const handleTouchEnd = () => {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    nextSlide();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    prevSlide();
  }
  touchStartX = 0;
  touchEndX = 0;
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 5000);
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<style scoped>
.scale-110 {
  transform: scale(1.1);
}

.scale-100 {
  transform: scale(1);
}

.bg-gradient-to-t {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}
</style>
