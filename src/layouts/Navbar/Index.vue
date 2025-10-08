<template>
  <nav class="fixed top-0 left-0 w-full z-10 px-8 py-4 transition-all duration-300" :class="[
    {
      'bg-[#171717] shadow-sm': (!atTop && !scrollingDown),
      'navbar-hidden': scrollingDown,
      'bg-[#171717]': forceBackground
    }
  ]">
    <div class="flex justify-between bg-transparent">
      <div class="flex shrink-0 items-center">
        <router-link :to="{ name: 'client.home' }">
          <ApplicationLogo class="block w-auto fill-current text-white" :color="'withe'" />
        </router-link>
      </div>

      <!-- Navegación normal (visible en escritorio, oculta en móvil) -->
      <div class="hidden lg:flex gap-8 items-center">
        <NavLink :href="{ name: 'client.service' }">
          Servicios
        </NavLink>
        <NavLink :href="{ name: 'client.team' }">
          Equipo
        </NavLink>
        <NavLink :href="{ name: 'client.about_us' }">
          Quiénes Somos
        </NavLink>
        <NavLink :href="{ name: 'client.blog' }">
          Blog
        </NavLink>
      </div>

      <!-- Botón de menú (siempre visible) -->
      <div class="flex items-center gap-4">
        <LanguageSwitcher color="#DCBE9A" />
        <button
          class="block text-[2rem] text-white bg-none border-none cursor-pointer w-11 h-11 align-middle justify-center"
          @click="toggleFullscreenMenu">
          ☰
        </button>
      </div>
    </div>
  </nav>

  <!-- Overlay del menú fullscreen -->
  <FullscreenMenu :is-open="isFullscreenMenuOpen" @close="closeFullscreenMenu" />
</template>

<script setup lang="ts">
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import FullscreenMenu from './partials/FullscreenMenu.vue';
import NavLink from './Components/NavLink.vue';
import { ref, onMounted, watch, onUnmounted } from 'vue';

defineProps<{
  forceBackground?: boolean
}>();

const atTop = ref(true)
const isFullscreenMenuOpen = ref(false)
const scrollingDown = ref(false)

let lastScroll = 0

const handleScroll = () => {
  const currentScroll = window.scrollY

  // Detectar si estamos arriba del todo
  atTop.value = currentScroll <= 0

  // Si bajamos, ocultar navbar
  if (currentScroll > lastScroll && currentScroll > 50) {
    scrollingDown.value = true
  }
  // Si subimos, mostrar navbar
  else if (currentScroll < lastScroll - 10) {
    scrollingDown.value = false
  }

  lastScroll = currentScroll
}


const toggleFullscreenMenu = () => {
  isFullscreenMenuOpen.value = !isFullscreenMenuOpen.value
}

const closeFullscreenMenu = () => {
  isFullscreenMenuOpen.value = false
}

watch(isFullscreenMenuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

/* const closeMenu = () => {
  isFullscreenMenuOpen.value = false
  document.body.style.overflow = ''
} */

onMounted(() => {
  lastScroll = window.scrollY
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar-hidden {
  /* stylelint-disable-next-line unknownAtRules */
  @apply -translate-y-full opacity-0 pointer-events-none;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>
