<template>
  <section
    class="relative font-light text-center py-10 sm:py-16 lg:py-20 xl:py-24 w-full max-w-[90rem] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 overflow-hidden">
    <!-- Encabezado -->
    <span class="block text-sm sm:text-base lg:text-lg uppercase text-neutral-400 tracking-wider mb-2">
      {{ $t('Client.Home.Team.MeetOur') }}
    </span>

    <h2
      class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-white -mt-1 sm:-mt-2 lg:-mt-2.5 mb-4 sm:mb-6 tracking-wider">
      {{ $t('Client.Home.Team.Title') }}
    </h2>

    <p
      class="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-neutral-400 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto mb-5 sm:mb-10 lg:mb-10 tracking-wider ">
      {{ $t('Client.Home.Team.Description') }}
    </p>

    <!-- Grid estático si hay 4 o menos -->
    <div v-if="activeMembers.length > 0 && activeMembers.length <= 4"
      class="flex flex-wrap justify-center items-start gap-4 sm:gap-6 lg:gap-8 pb-10" :class="staticGridClasses">
      <div v-for="(member, idx) in activeMembers" :key="member.id || idx"
        class="relative cursor-pointer group flex-shrink-0 transition-transform duration-300" :class="[
          staticCardSizeClasses,
          shouldApplyStaticOffset(idx) ? staticOffsetClasses : ''
        ]" @mouseenter="handleCardHover(idx, true)" @mouseleave="handleCardHover(idx, false)">
        <!-- Elemento decorativo -->
        <div class="absolute bg-[#DCBE9A] transition-transform duration-300 ease-in-out group-hover:scale-105 z-0"
          :class="[
            staticDecorativeElementClasses,
            {
              '-top-1 -left-1 sm:-top-1.5 sm:-left-1.5': !shouldApplyStaticOffset(idx),
              '-bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5': shouldApplyStaticOffset(idx)
            }
          ]"></div>
        <!-- Overlay -->
        <div class="absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-600/20 to-black/90 z-10"></div>
        <!-- Imagen -->
        <img :src="member.image" :alt="member.name"
          class="w-full h-full object-cover transition-all duration-500 ease-in-out grayscale-0"
          :class="hoveredCard === idx ? 'grayscale-0' : 'grayscale'" loading="lazy">
        <!-- Contenido -->
        <div class="absolute bottom-0 left-0 w-full text-white text-center z-20" :class="staticContentPaddingClasses">
          <h3 class="font-normal capitalize text-gray-100 mb-1 tracking-wider" :class="staticTitleClasses">
            {{ member.name }}
          </h3>
          <p class="text-neutral-400 capitalize tracking-[0.08rem] sm:tracking-[0.12rem] font-light"
            :class="staticSubtitleClasses">
            {{ member.specialization || 'Team Member' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Carrusel infinito si hay más de 4 -->
    <div v-else-if="activeMembers.length > 4"
      class="relative w-full overflow-hidden pt-2 sm:pt-3 lg:pt-5 pb-10 sm:pb-16 lg:pb-20">
      <div class="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 animate-scroll-infinite" :style="{
        height: containerHeight,
        animationDuration: animationDuration
      }">
        <div v-for="(member, idx) in infiniteMembers" :key="idx"
          class="relative cursor-pointer group flex-shrink-0 transition-transform duration-300" :class="[
            cardSizeClasses,
            shouldApplyOffset(idx) ? offsetClasses : ''
          ]" @mouseenter="handleCardHover(idx, true)" @mouseleave="handleCardHover(idx, false)">
          <!-- Elemento decorativo -->
          <div class="absolute bg-[#DCBE9A] transition-transform duration-300 ease-in-out group-hover:scale-105 z-0"
            :class="[
              decorativeElementClasses,
              {
                '-top-1 -left-1 sm:-top-1.5 sm:-left-1.5': !shouldApplyOffset(idx),
                '-bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5': shouldApplyOffset(idx)
              }
            ]"></div>
          <!-- Overlay -->
          <div class="absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-600/20 to-black/90 z-10"></div>
          <!-- Imagen -->
          <img :src="member.image" :alt="member.name"
            class="w-full h-full object-cover transition-all duration-500 ease-in-out grayscale-0"
            :class="hoveredCard === idx ? 'grayscale-0' : 'grayscale'" loading="lazy">
          <!-- Contenido -->
          <div class="absolute bottom-0 left-0 w-full text-white text-center z-20" :class="contentPaddingClasses">
            <h3 class="font-normal capitalize text-gray-100 mb-1 tracking-wider" :class="titleClasses">
              {{ member.name }}
            </h3>
            <p class="text-neutral-400 capitalize tracking-[0.08rem] sm:tracking-[0.12rem] font-light"
              :class="subtitleClasses">
              {{ member.specialization || 'Team Member' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-else class="w-full">
      <div class="grid items-center justify-center text-center py-20">
        <div class="text-neutral-500 text-6xl mb-4">👥</div>
        <h3 class="text-xl text-neutral-400 mb-2">
          {{ $t('Client.Home.Team.NoTeamMember') }}
        </h3>
        <p class="text-neutral-500">
          {{ $t('Client.Home.Team.AddMember') }}
        </p>
      </div>
    </div>

    <div>
      <button class="group relative bg-[#DCBE9A] cursor-pointer px-8 py-3 rounded-lg font-medium text-gray-900
           overflow-hidden transition-all duration-300
           hover:bg-[#c9ab85] hover:shadow-lg hover:shadow-[#DCBE9A]/20
           hover:-translate-y-0.5 active:translate-y-0
           before:absolute before:inset-0 before:bg-gradient-to-r
           before:from-transparent before:via-white/20 before:to-transparent
           before:-translate-x-full hover:before:translate-x-full
           before:transition-transform before:duration-700">
        <span class="relative z-10 flex items-center gap-2">
          {{ $t('Client.Home.Team.TeamButton') }}
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>
    </div>
  </section>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  members?: {
    id: string,
    image: string,
    name: string,
    specialization: string,
    status: string
  }[];
}>();

const hoveredCard = ref<number | null>(null);
const screenWidth = ref(0);

// Solo miembros activos
const activeMembers = computed(() =>
  (props.members || []).filter(m => m.status !== 'inactive')
);

// Clases para grid estático (4 o menos elementos)
const staticGridClasses = computed(() => {
  const count = activeMembers.value.length;
  if (count === 1) return 'max-w-xs mx-auto';
  if (count === 2) return 'max-w-2xl mx-auto';
  if (count === 3) return 'max-w-4xl mx-auto';
  return 'max-w-6xl mx-auto';
});

const staticCardSizeClasses = computed(() => {
  const count = activeMembers.value.length;

  // Ajustar tamaño según cantidad de elementos y pantalla
  if (count === 1) {
    return 'w-[200px] h-[300px] sm:w-[240px] sm:h-[360px] md:w-[280px] md:h-[420px] lg:w-[320px] lg:h-[480px]';
  }
  if (count === 2) {
    return 'w-[180px] h-[270px] sm:w-[220px] sm:h-[330px] md:w-[260px] md:h-[390px] lg:w-[300px] lg:h-[450px]';
  }
  if (count === 3) {
    return 'w-[160px] h-[240px] sm:w-[180px] sm:h-[270px] md:w-[200px] md:h-[300px] lg:w-[240px] lg:h-[360px]';
  }
  // 4 elementos
  return 'w-[140px] h-[210px] sm:w-[160px] sm:h-[240px] md:w-[180px] md:h-[270px] lg:w-[200px] lg:h-[300px] xl:w-[220px] xl:h-[330px]';
});

const staticDecorativeElementClasses = computed(() => {
  const count = activeMembers.value.length;
  if (count <= 2) return 'w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28';
  return 'w-12 h-16 sm:w-14 sm:h-18 lg:w-16 lg:h-20';
});

const staticContentPaddingClasses = computed(() => {
  return 'p-3 sm:p-4 lg:p-5';
});

const staticTitleClasses = computed(() => {
  const count = activeMembers.value.length;
  if (count <= 2) return 'text-base sm:text-lg md:text-xl lg:text-2xl';
  return 'text-sm sm:text-base md:text-lg lg:text-xl';
});

const staticSubtitleClasses = computed(() => {
  const count = activeMembers.value.length;
  if (count <= 2) return 'text-sm sm:text-base md:text-lg';
  return 'text-xs sm:text-sm md:text-base';
});

const staticOffsetClasses = computed(() => {
  return 'sm:translate-y-[8%] md:translate-y-[10%] lg:translate-y-[12%]';
});

// Clases para carrusel (más de 4 elementos)
const cardSizeClasses = computed(() => {
  return 'w-[160px] h-[240px] sm:w-[180px] sm:h-[280px] md:w-[200px] md:h-[320px] lg:w-[220px] lg:h-[360px] xl:w-[260px] xl:h-[400px]';
});

const decorativeElementClasses = computed(() => {
  return 'w-12 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-25';
});

const contentPaddingClasses = computed(() => {
  return 'p-2 sm:p-3 lg:p-4';
});

const titleClasses = computed(() => {
  return 'text-sm sm:text-base lg:text-lg xl:text-xl';
});

const subtitleClasses = computed(() => {
  return 'text-xs sm:text-sm lg:text-base';
});

const offsetClasses = computed(() => {
  return 'md:translate-y-[10%] lg:translate-y-[15%]';
});

const containerHeight = computed(() => {
  if (screenWidth.value < 640) return '280px';
  if (screenWidth.value < 768) return '340px';
  if (screenWidth.value < 1024) return '400px';
  if (screenWidth.value < 1280) return '460px';
  return '500px';
});

const animationDuration = computed(() => {
  const memberCount = activeMembers.value.length || 0;
  if (memberCount === 0) return '40s';
  let baseDuration = 30;
  if (screenWidth.value < 640) baseDuration = 25;
  else if (screenWidth.value < 1024) baseDuration = 35;
  const adjustedDuration = baseDuration + (memberCount * 2);
  return `${adjustedDuration}s`;
});

// Repetir miembros para carrusel infinito
const infiniteMembers = computed(() => {
  const members = activeMembers.value;
  if (members.length === 0) return [];
  const repetitions = screenWidth.value < 768 ? 3 : 2;
  const result = [];
  for (let i = 0; i < repetitions; i++) {
    result.push(...members);
  }
  return result;
});

// Determinar si aplicar offset en grid estático
const shouldApplyStaticOffset = (index: number) => {
  const totalMembers = activeMembers.value.length;
  if (totalMembers <= 1) return false;

  // Para 2 elementos: offset al segundo
  if (totalMembers === 2) return index === 1;

  // Para 3 elementos: offset al del medio
  if (totalMembers === 3) return index === 1;

  // Para 4 elementos: offset a los elementos 1 y 3 (índices 1 y 3)
  if (totalMembers === 4) return index === 1 || index === 3;

  return false;
};

// Determinar si aplicar offset en carrusel
const shouldApplyOffset = (index: number) => {
  const totalMembers = activeMembers.value.length;
  if (totalMembers === 0) return false;
  const isEvenTotal = totalMembers % 2 === 0;
  if (isEvenTotal) {
    return index % 2 === 0;
  } else {
    return index % 2 === 1;
  }
};

const handleCardHover = (cardIndex: number, isHovering: boolean) => {
  hoveredCard.value = isHovering ? cardIndex : null;
};

function getAbsoluteUrl(url: string) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/storage')) return window.location.origin + url
  return window.location.origin + '/storage/' + url
}

// Manejar cambios de tamaño de pantalla
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  updateScreenWidth();
  window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;800&display=swap");

section {
  font-family: "Poppins", sans-serif;
}

.h-25 {
  height: 6.25rem;
}

/* Animación para carrusel infinito */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll-infinite {
  display: flex;
  width: max-content;
  animation: scroll linear infinite;
  animation-play-state: running;
}

/* Pausar animación en hover para mejor UX */
.animate-scroll-infinite:hover {
  animation-play-state: paused;
}

/* Optimizaciones para dispositivos móviles */
@media (max-width: 640px) {
  .animate-scroll-infinite {
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .animate-scroll-infinite {
    gap: 0.5rem;
  }
}

/* Suavizar transiciones en dispositivos táctiles */
@media (hover: none) {
  .group:hover .group-hover\:scale-105 {
    transform: scale(1);
  }

  .transition-all {
    transition: none;
  }
}

/* Mejorar rendimiento en dispositivos de baja potencia */
@media (prefers-reduced-motion: reduce) {
  .animate-scroll-infinite {
    animation-duration: 60s;
  }

  .transition-transform,
  .transition-all {
    transition-duration: 0.1s;
  }
}

/* Estilos adicionales para centrado perfecto */
.flex.justify-center {
  align-items: flex-start;
}

/* Ajustes responsivos para diferentes cantidades de elementos */
@media (max-width: 640px) {
  .flex.flex-wrap {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .flex.flex-wrap {
    gap: 0.75rem;
  }
}
</style>
