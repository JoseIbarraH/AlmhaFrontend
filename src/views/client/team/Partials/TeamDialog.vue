<template>
  <Dialog v-model:visible="isVisible" modal :style="{
    width: isMobile ? '95vw' : isTablet ? '85vw' : '90vw',
    maxWidth: '1200px',
    height: isMobile ? '95vh' : '90vh'
  }" :contentStyle="{ padding: '0', background: 'transparent', overflow: 'hidden', height: '100%' }"
    :showHeader="false" :dismissableMask="true" :blockScroll="true">
    <div v-if="miembro"
      class="relative bg-white rounded-xl md:rounded-2xl shadow-2xl h-full overflow-y-auto custom-scrollbar-main">

      <!-- Sección superior con diseño geométrico elegante -->
      <div
        class="relative min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:h-[420px] flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#F8F7F4] to-[#FFFFFF]">

        <!-- Formas geométricas decorativas -->
        <div class="absolute inset-0 opacity-20 md:opacity-30">
          <div
            class="absolute top-[-60px] md:top-[-100px] right-[-60px] md:right-[-100px] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#DCBE9A] rounded-full blur-3xl animate-float-slow">
          </div>
          <div
            class="absolute bottom-[-50px] md:bottom-[-80px] left-[-50px] md:left-[-80px] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#202020] rounded-full blur-2xl animate-float">
          </div>
        </div>

        <!-- Patrón decorativo sutil -->
        <div class="absolute inset-0 opacity-[0.02] md:opacity-[0.03]">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="modal-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="#202020" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#modal-pattern)" />
          </svg>
        </div>

        <!-- Forma geométrica diagonal moderna -->
        <div class="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-full">
          <div
            class="absolute inset-0 bg-[#DCBE9A] transform skew-x-[-15deg] translate-x-20 sm:translate-x-24 md:translate-x-32 shadow-2xl">
          </div>
          <div
            class="absolute inset-0 bg-[#202020] transform skew-x-[-15deg] translate-x-12 sm:translate-x-16 md:translate-x-20 shadow-xl opacity-90">
          </div>
        </div>

        <!-- Onda decorativa inferior -->
        <div class="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-[0]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" class="w-full h-auto"
            preserveAspectRatio="none">
            <path fill="#ffffff" fill-opacity="1"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z">
            </path>
          </svg>
        </div>

        <!-- Contenido superior: Biografía e Imagen -->
        <div
          class="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-8 lg:p-10 h-full">

          <!-- Sección de texto (Izquierda) -->
          <div
            class="w-full md:max-w-[45%] lg:max-w-[500px] space-y-2 sm:space-y-3 md:space-y-4 pt-0 md:pt-4 order-2 md:order-1">
            <div
              class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#DCBE9A]/30 rounded-full px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 shadow-sm">
              <div class="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#DCBE9A] rounded-full animate-pulse"></div>
              <span
                class="text-[10px] sm:text-xs md:text-sm font-semibold text-[#202020] tracking-wide uppercase">Biografía</span>
            </div>

            <div
              class="bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div class="relative">
                <p class="text-gray-700 leading-relaxed text-[11px] sm:text-xs md:text-sm max-h-[120px] sm:max-h-[140px] md:max-h-[180px] lg:max-h-[240px] overflow-y-auto pr-2 sm:pr-3 custom-scrollbar"
                  ><!-- Aqui va la biografia --></p>
                <!-- Gradiente de fade -->
                <div
                  class="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-white/95 to-transparent pointer-events-none">
                </div>
              </div>
            </div>
          </div>

          <!-- Imagen del doctor (Derecha) -->
          <div class="relative group mx-auto md:mx-0 order-1 md:order-2 flex-shrink-0">
            <!-- Marco decorativo con glow -->
            <div
              class="absolute -inset-2 sm:-inset-2.5 md:-inset-3 bg-[#DCBE9A] rounded-xl md:rounded-2xl blur-lg md:blur-xl opacity-40 sm:opacity-50 group-hover:opacity-75 transition-opacity duration-500">
            </div>

            <div
              class="relative w-[140px] h-[180px] sm:w-[160px] sm:h-[200px] md:w-[200px] md:h-[250px] lg:w-[240px] lg:h-[300px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border-2 sm:border-3 md:border-4 border-white shadow-xl md:shadow-2xl">
              <img :src="miembro.image" :alt="miembro.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />

              <!-- Overlay con gradiente -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300">
              </div>

              <!-- Nombre sobre la imagen en hover -->
              <div
                class="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/90 to-transparent">
                <h3 class="text-white font-bold text-sm sm:text-base md:text-lg">{{ miembro.name }}</h3>
              </div>
            </div>

            <!-- Badge de especialidad -->
            <div
              class="absolute -bottom-1.5 sm:-bottom-2 md:-bottom-5 -left-1.5 sm:-left-2 md:-left-3 bg-[#202020] text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <span class="font-bold text-[9px] sm:text-[10px] md:text-xs tracking-wider line-clamp-1">
                aqui va la especializacion
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección inferior: Carrusel de resultados -->
      <div class="bg-white p-3 sm:p-4 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6 w-full pb-6 sm:pb-8">
        <!-- Header del carrusel -->
        <div class="text-center mb-3 sm:mb-4 md:mb-6">
          <h3 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#202020] mb-1 sm:mb-2 px-2">
            Resultados y <span class="text-[#DCBE9A]">Casos de Éxito</span>
          </h3>
          <div class="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3 md:mt-4">
            <div class="w-6 sm:w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#DCBE9A]"></div>
            <div class="w-1.5 sm:w-2 h-1.5 sm:h-2 border border-[#DCBE9A] rotate-45"></div>
            <div class="w-6 sm:w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#DCBE9A]"></div>
          </div>
        </div>

        <!-- Carrusel -->
        <ResultCarousel :images="miembro.team_member_images" />

        <!-- Espaciado inferior -->
        <div class="h-2 sm:h-4"></div>
      </div>

      <!-- Botón cerrar mejorado -->
      <button @click="isVisible = false"
        class="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 z-50 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110 group"
        aria-label="Cerrar modal">
        <svg
          class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-[#DCBE9A] transition-colors duration-300"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Decoración de esquina inferior -->
      <div
        class="hidden sm:block absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 pointer-events-none">
        <div
          class="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[#DCBE9A]/5 to-transparent rounded-tl-full">
        </div>
      </div>

    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from "vue"
import type { Data } from "../type"
import Dialog from "primevue/dialog"
import ResultCarousel from "./ResultCarousel.vue"

const props = defineProps<{
  visible: boolean
  miembro: Data | null
}>()

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void
  (e: "closed"): void
}>()

// Control local del estado del dialog
const isVisible = ref(props.visible)

// Responsive breakpoints
const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 640)
const isTablet = computed(() => windowWidth.value >= 640 && windowWidth.value < 1024)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

watch(
  () => props.visible,
  (val) => (isVisible.value = val)
)

watch(isVisible, (val) => {
  emit("update:visible", val)
  if (!val) {
    emit("closed")
  }
})
</script>

<style scoped>
/* Scrollbar principal - responsive */
.custom-scrollbar-main {
  scrollbar-width: thin;
  scrollbar-color: #DCBE9A #f8f7f4;
  scroll-behavior: smooth;
}

.custom-scrollbar-main::-webkit-scrollbar {
  width: 8px;
}

@media (max-width: 768px) {
  .custom-scrollbar-main::-webkit-scrollbar {
    width: 5px;
  }
}

@media (max-width: 640px) {
  .custom-scrollbar-main::-webkit-scrollbar {
    width: 4px;
  }
}

.custom-scrollbar-main::-webkit-scrollbar-track {
  background: #f8f7f4;
  border-radius: 0 10px 10px 0;
  margin: 4px 0;
}

.custom-scrollbar-main::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #DCBE9A 0%, #C9AB87 100%);
  border-radius: 10px;
  border: 2px solid #f8f7f4;
  transition: all 0.3s ease;
}

@media (max-width: 640px) {
  .custom-scrollbar-main::-webkit-scrollbar-thumb {
    border: 1px solid #f8f7f4;
  }
}

.custom-scrollbar-main::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #C9AB87 0%, #B8956F 100%);
  border: 2px solid #e8e5df;
}

/* Scrollbar de biografía - responsive */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #DCBE9A transparent;
  scroll-behavior: smooth;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

@media (max-width: 640px) {
  .custom-scrollbar::-webkit-scrollbar {
    width: 3px;
  }
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #DCBE9A 0%, #C9AB87 100%);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #C9AB87 0%, #B8956F 100%);
}

/* Animaciones */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(-15px) translateX(8px);
  }
}

@keyframes float-slow {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(-20px) translateX(-10px);
  }
}

@media (min-width: 768px) {
  @keyframes float {

    0%,
    100% {
      transform: translateY(0px) translateX(0px);
    }

    50% {
      transform: translateY(-20px) translateX(10px);
    }
  }

  @keyframes float-slow {

    0%,
    100% {
      transform: translateY(0px) translateX(0px);
    }

    50% {
      transform: translateY(-30px) translateX(-15px);
    }
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Accesibilidad */
button:focus-visible {
  outline: 2px solid #DCBE9A;
  outline-offset: 2px;
}

/* Transiciones del modal */
:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.5);
}

:deep(.p-dialog-enter-active),
:deep(.p-dialog-leave-active) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.p-dialog-enter-from),
:deep(.p-dialog-leave-to) {
  opacity: 0;
  transform: scale(0.95);
}

/* Line clamp utility */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Touch optimization para móviles */
@media (hover: none) and (pointer: coarse) {
  .custom-scrollbar-main::-webkit-scrollbar {
    width: 3px;
  }

  button {
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
