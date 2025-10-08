<template>
  <Transition enter-active-class="transition-all duration-500 ease-in-out"
    enter-from-class="transform -translate-y-full opacity-0" enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition-all duration-500 ease-in-out" leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-full opacity-0">
    <div v-if="isOpen"
      class="fixed top-0 left-0 w-full h-screen bg-[rgba(10,9,9,0.9)] z-50 flex flex-col overflow-y-auto">
      <div class="flex justify-between align-middle py-4 px-8 bg-[rgba(10,9,9,0.95)]">
        <ApplicationLogo class="block w-auto fill-current text-white" :color="'withe'" />
        <div class="flex items-center justify-between gap-7">
          <LanguageSwitcher color="#DCBE9A" />
          <button
            class="text-[2.5rem] text-white bg-none border-none cursor-pointer w-[44px] h-[44px] flex items-center justify-center"
            @click="handleClose">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Contenido del menú -->
      <div class="h-[calc(100%-80px)]
              overflow-x-auto flex snap-x snap-mandatory
              lg:grid lg:grid-cols-4 lg:overflow-x-hidden lg:snap-none">
        <!-- Slide 1 (móvil = pantalla completa con 2 filas, desktop = col normal) -->
        <div class="min-w-full h-full flex flex-col snap-start lg:min-w-0 lg:h-auto">
          <div class="flex-1 border-r border-white/10">
            <CarouselNavbar />
          </div>
          <!-- este bloque solo visible en móvil/tablet -->
          <div class="flex-1 py-4 px-6 border-r border-white/10 lg:hidden">
            <Navigation @close="handleClose" />
          </div>
        </div>

        <!-- Slide 2 (móvil = pantalla completa con 2 filas, desktop = col normal) -->
        <div class="min-w-full h-full flex flex-col snap-start lg:min-w-0 lg:h-auto lg:hidden">
          <div class="flex-1 py-4 px-6 border-r border-white/10">
            <Navigation @close="handleClose" />
          </div>
          <div class="flex-1 py-4 px-6 border-r border-white/10">
            <SocialMedia />
          </div>
        </div>

        <!-- Desktop: columnas independientes -->
        <div class="hidden lg:block py-4 px-6 border-r border-white/10 h-full">
          <Navigation @close="handleClose" />
        </div>
        <div class="hidden lg:block py-4 px-6 border-r border-white/10 h-full">
          <Navigation @close="handleClose" />
        </div>
        <div class="hidden lg:block py-4 px-6 h-full">
          <SocialMedia />
        </div>
      </div>


    </div>
  </Transition>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import CarouselNavbar from './CarouselNavbar.vue';
import Navigation from './Navigation.vue';
import SocialMedia from './SocialMedia.vue';

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClose = () => {
  emit('close')
}
</script>
