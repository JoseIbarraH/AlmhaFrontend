<template>
  <div class="max-w-7xl mx-auto text-center mb-16">

    <div class="absolute inset-0">
      <img
      :src="bg3"
      alt="Medical background"
      class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-[#18181B]/70 backdrop-blur-xs"></div>
    </div>
    <FloatingBubbles />

    <Reveal>
      <div
        class="inline-flex items-center gap-2 bg-[#DCBE9A]/10 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
        <div class="w-2 h-2 bg-[#DCBE9A] rounded-full animate-pulse"></div>
        <span class="text-sm font-medium text-[#DCBE9A] tracking-wide">
          {{ $t('Client.Blog.Index.Presentation.Text1') }}
        </span>
      </div>
    </Reveal>
    <Reveal>
      <h1
        class="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#DCBE9A] leading-tight tracking-tight">
        {{ $t('Client.Blog.Index.Presentation.Text2') }}
        <span
          class="block mt-2 bg-gradient-to-r from-[#DCBE9A] via-[#E8D4B8] to-[#DCBE9A] bg-clip-text text-transparent">
          {{ $t('Client.Blog.Index.Presentation.Text3') }}
        </span>
      </h1>
    </Reveal>
    <Reveal>
      <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
        {{ $t('Client.Blog.Index.Presentation.Text4') }}
      </p>
    </Reveal>
    <Reveal>
      <div class="flex items-center justify-center gap-3 mt-10">
        <div class="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#DCBE9A]"></div>
        <div class="w-3 h-3 border-2 border-[#DCBE9A] rotate-45"></div>
        <div class="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#DCBE9A]"></div>
      </div>
    </Reveal>
  </div>
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <path d="M0 48h1440V24c-157.5 24-315 24-472.5 0S652 0 494.5 24C337 48 178.5 48 0 24v24z" fill="currentColor"
        class="text-[#DCBE9A] opacity-5" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import Reveal from '@/components/Reveal.vue';
import FloatingBubbles from '../../components/Decoratives.vue';
import bg3 from '@/assets/images/about_us/bg2.png'
</script>
