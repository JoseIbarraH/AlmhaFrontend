<template>
  <div class="carousel-container">
    <div class="carousel-slides">
      <div v-for="(slide, index) in processedSlides" :key="`slide-${index}`" class="carousel-slide"
        :class="getSlideClasses(index)">
        <img v-if="slide.type === 'image'" :src="slide.url" :alt="slide.alt" class="carousel-media"
          @dragstart.prevent />

        <video
          v-else
          :src="slide.url"
          :poster="slide.poster"
          muted
          loop
          class="carousel-media"
          @dragstart.prevent
          :ref="el => setVideoRef(el as HTMLVideoElement | null, index)"
        ></video>


        <div class="carousel-overlay"></div>
      </div>
    </div>

    <transition name="text-fade" mode="out-in">
      <div v-if="currentSlide?.text" :key="currentIndex" class="carousel-text">
        <transition name="slide-up" appear>
          <h1 v-if="currentSlide.title" class="carousel-title">{{ currentSlide.title }}</h1>
        </transition>
        <transition name="slide-up" appear :style="{ transitionDelay: '0.2s' }">
          <p class="carousel-description">{{ currentSlide.text }}</p>
        </transition>
        <transition name="slide-up" appear :style="{ transitionDelay: '0.3s' }">
          <h1>[Aqui Va el boton]</h1>
        </transition>
      </div>
    </transition>

    <div v-if="processedSlides.length > 1" class="carousel-navigation">
      <button @click="prevSlide" class="carousel-button prev-button" aria-label="Anterior"
        :class="{ 'pulse': isNavigating }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button @click="nextSlide" class="carousel-button next-button" aria-label="Siguiente"
        :class="{ 'pulse': isNavigating }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>

    <div v-if="processedSlides.length > 1" class="carousel-indicators">
      <button v-for="(_, index) in processedSlides" :key="`indicator-${index}`" @click="goToSlide(index)"
        :class="['carousel-indicator', { 'active': currentIndex === index }]"
        :aria-label="`Ir a diapositiva ${index + 1}`">
        <div class="indicator-progress" v-if="currentIndex === index && props.autoplay > 0"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { Props, SlideItem } from '../types'

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  defaultText: '',
  defaultTitle: '',
  autoplay: 0,
  autoplayVideos: false
})

// Estado
const currentIndex = ref(0)
const slideDirection = ref<'next' | 'prev'>('next')
const isNavigating = ref(false)
const videoRefs = ref<Map<number, HTMLVideoElement>>(new Map())
let autoplayInterval: ReturnType<typeof setInterval> | null = null
/* let touchStartX = 0
let touchEndX = 0 */

// Procesar slides una sola vez
const processedSlides = computed<SlideItem[]>(() => {
  return props.images.map(item => {
    if (typeof item === 'string') {
      const isVideo = /\.(mp4|webm|ogg)$/i.test(item)
      return {
        url: item,
        alt: '',
        title: props.defaultTitle,
        text: props.defaultText,
        type: isVideo ? 'video' : 'image',
        poster: '',
        controls: true
      }
    }

    const isVideo = item.type === 'video' ||
      /\.(mp4|webm|ogg)$/i.test(item.url || '')

    return {
      url: item.url || '',
      alt: item.alt || '',
      title: item.title || props.defaultTitle,
      text: item.text ?? props.defaultText,
      type: isVideo ? 'video' : 'image',
      poster: item.poster || '',
      controls: item.controls ?? true
    }
  })
})

// Slide actual
const currentSlide = computed(() => processedSlides.value[currentIndex.value])

// Obtener clases para cada slide
const getSlideClasses = (index: number) => {
  const classes = []

  if (index === currentIndex.value) {
    classes.push('active')
  } else if (isNavigating.value) {
    // Determinar si es el slide que está saliendo o entrando
    const total = processedSlides.value.length
    const prevIdx = (currentIndex.value - 1 + total) % total
    const nextIdx = (currentIndex.value + 1) % total

    if (slideDirection.value === 'next') {
      if (index === prevIdx) {
        classes.push('slide-out-left')
      } else if (index === nextIdx) {
        classes.push('slide-in-right')
      }
    } else {
      if (index === nextIdx) {
        classes.push('slide-out-right')
      } else if (index === prevIdx) {
        classes.push('slide-in-left')
      }
    }
  }

  return classes
}

// Navegación con animaciones corregidas
const nextSlide = () => {
  if (isNavigating.value) return

  isNavigating.value = true
  slideDirection.value = 'next'
  currentIndex.value = (currentIndex.value + 1) % processedSlides.value.length
  handleSlideChange()

  setTimeout(() => {
    isNavigating.value = false
  }, 600)
}

const prevSlide = () => {
  if (isNavigating.value) return

  isNavigating.value = true
  slideDirection.value = 'prev'
  currentIndex.value = (currentIndex.value - 1 + processedSlides.value.length) % processedSlides.value.length
  handleSlideChange()

  setTimeout(() => {
    isNavigating.value = false
  }, 600)
}

const goToSlide = (index: number) => {
  if (index !== currentIndex.value && !isNavigating.value) {
    isNavigating.value = true
    slideDirection.value = index > currentIndex.value ? 'next' : 'prev'
    currentIndex.value = index
    handleSlideChange()

    setTimeout(() => {
      isNavigating.value = false
    }, 600)
  }
}

// Manejo de videos optimizado
const setVideoRef = (el: HTMLVideoElement | null, index: number) => {
  if (el) {
    videoRefs.value.set(index, el)
  } else {
    videoRefs.value.delete(index)
  }
}

const handleSlideChange = async () => {
  await nextTick()

  // Pausar todos los videos
  videoRefs.value.forEach(video => {
    video.pause()
  })

  // Reproducir video actual si existe
  const currentVideo = videoRefs.value.get(currentIndex.value)
  if (currentVideo && props.autoplayVideos) {
    try {
      currentVideo.currentTime = 0
      await currentVideo.play()
    } catch (error) {
      console.warn('No se pudo reproducir el video:', error)
    }
  }

  // Reiniciar autoplay
  startAutoplay()
}

// Autoplay
const startAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }

  if (props.autoplay > 0 && processedSlides.value.length > 1) {
    autoplayInterval = setInterval(nextSlide, props.autoplay)
  }
}

/* const handleSwipe = () => {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
} */

// Lifecycle
onMounted(() => {
  startAutoplay()
  handleSlideChange()
})

onUnmounted(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
})
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;
  background: #000;
}

.carousel-slides {
  height: 100%;
  position: relative;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(100%) scale(0.95);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform, opacity;
}

.carousel-slide.active {
  opacity: 1;
  transform: translateX(0) scale(1);
  z-index: 2;
}

/* Animaciones hacia la derecha (siguiente) */
.carousel-slide.slide-out-left {
  opacity: 0;
  transform: translateX(-100%) scale(0.95);
  z-index: 1;
}

.carousel-slide.slide-in-right {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
  z-index: 1;
}

/* Animaciones hacia la izquierda (anterior) */
.carousel-slide.slide-out-right {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
  z-index: 1;
}

.carousel-slide.slide-in-left {
  opacity: 0;
  transform: translateX(-100%) scale(0.95);
  z-index: 1;
}

.carousel-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  transition: transform 0.8s ease;
  filter: brightness(0.6);
}

.carousel-media[controls] {
  pointer-events: auto;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
}

/* .carousel-text {
  position: absolute;
  bottom: 120px;
  left: 32px;
  z-index: 10;
  max-width: 600px;
  color: white;
  padding: 24px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
} */

.carousel-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  max-width: 600px;
  color: white;
  padding: 24px;
  border-radius: 12px;
  /* background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1); */
  text-align: center;
  /* opcional, para centrar texto */
}


.carousel-title {
  font-size: 2.5rem;
  margin: 0 0 12px 0;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.carousel-description {
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.carousel-navigation {
  position: absolute;
  bottom: 32px;
  right: 32px;
  z-index: 9;
  display: flex;

  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.carousel-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.carousel-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.carousel-button:hover::before {
  left: 100%;
}

.carousel-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.carousel-button:active {
  transform: translateY(0);
}

.carousel-button.pulse {
  animation: pulse 0.6s ease-out;
}

.prev-button {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.carousel-indicators {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.carousel-indicator {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}

.carousel-indicator:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.2);
}

.carousel-indicator.active {
  background: white;
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.indicator-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(from 0deg, transparent 0deg, #3b82f6 360deg);
  border-radius: 50%;
  animation: progress linear;
  animation-duration: var(--autoplay-duration, 5s);
}

/* Animaciones */
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes progress {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* Transiciones de texto */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.text-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.text-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-up-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-text {
    bottom: 140px;
    left: 20px;
    right: 20px;
    max-width: none;
    padding: 20px;
  }

  .carousel-title {
    font-size: 1.8rem;
  }

  .carousel-description {
    font-size: 1rem;
  }

  .carousel-navigation {
    bottom: 20px;
    right: 20px;
  }

  .carousel-indicators {
    bottom: 20px;
    padding: 8px 16px;
  }

  .carousel-button {
    width: 48px;
    height: 48px;
  }

  .carousel-indicator {
    width: 10px;
    height: 10px;
  }
}

/* Mejoras de rendimiento */
.carousel-slide,
.carousel-media,
.carousel-button,
.carousel-indicator {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
