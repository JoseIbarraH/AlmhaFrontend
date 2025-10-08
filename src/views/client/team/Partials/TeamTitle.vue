<template>
  <header
    class="relative bg-gradient-to-br from-[#18181B] via-[#1F1F23] to-[#18181B] text-white pt-32 pb-20 h-screen overflow-hidden">

    <div class="absolute inset-0">
      <img
        :src="bg3"
        alt="Medical background"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-[#18181B]/70 backdrop-blur-xs"></div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-10 left-10 w-72 h-72 bg-[#DCBE9A] rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-[#DCBE9A] rounded-full blur-3xl"></div>
    </div>

    <div class="absolute top-10 right-10 w-64 h-64 bg-custom-beige opacity-5 rounded-full floating-element"></div>
  <div class="absolute bottom-10 left-10 w-32 h-32 bg-custom-beige  opacity-5 rounded-full floating-element"
    style="animation-delay: -3s;"></div>

    <!-- Animated medical cross pattern -->
    <div class="absolute inset-0 opacity-[0.02]">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="medical-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M45 30h10v15h15v10H55v15H45V55H30V45h15V30z" fill="currentColor" class="text-[#DCBE9A]" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#medical-pattern)" />
      </svg>
    </div>
    <Reveal>
    <div class="max-w-7xl mx-auto px-6 md:px-8 text-center relative">
      <!-- Badge decorativo -->
      <div
        class="inline-flex items-center gap-2 bg-[#DCBE9A]/10 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
        <div class="w-2 h-2 bg-[#DCBE9A] rounded-full animate-pulse"></div>
        <span class="text-sm font-medium text-[#DCBE9A] tracking-wide">Excelencia Médica</span>
      </div>

      <!-- Main heading with enhanced styling -->
      <h1
        class="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#DCBE9A] leading-tight tracking-tight">
        Nuestro Equipo
        <span
          class="block mt-2 bg-gradient-to-r from-[#DCBE9A] via-[#E8D4B8] to-[#DCBE9A] bg-clip-text text-transparent">
          Médico
        </span>
      </h1>

      <!-- Subtitle with improved readability -->
      <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
        Profesionales altamente calificados dedicados a su
        <span class="text-[#DCBE9A] font-medium">bienestar</span> y
        <span class="text-[#DCBE9A] font-medium">salud integral</span>
      </p>

      <!-- Decorative line -->
      <div class="flex items-center justify-center gap-3 mt-10">
        <div class="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#DCBE9A]"></div>
        <div class="w-3 h-3 border-2 border-[#DCBE9A] rotate-45"></div>
        <div class="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#DCBE9A]"></div>
      </div>
    </div>
    </Reveal>

    <!-- Bottom wave decoration -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 48h1440V24c-157.5 24-315 24-472.5 0S652 0 494.5 24C337 48 178.5 48 0 24v24z" fill="currentColor"
          class="text-[#DCBE9A] opacity-5" />
      </svg>
    </div>
  </header>
</template>

<script setup lang="ts">
import Reveal from '@/components/Reveal.vue';
import bg3 from '@/assets/images/about_us/bg3.jpeg'

</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
