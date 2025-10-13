<script setup lang="ts">
import Reveal from './Reveal.vue';
</script>

<template>
    <section class="bg-[#DCBE9A] py-20 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <Reveal>
        <h2 class="heading-font text-4xl md:text-5xl font-light text-[#202020] mb-6">
          {{ $t('Client.Global.Consultation.Text1') }}
        </h2>
      </Reveal>
      <Reveal>
        <p class="text-lg text-[#202020] mb-8 leading-relaxed opacity-90">
          {{ $t('Client.Global.Consultation.Text2') }}
        </p>
      </Reveal>
      <Reveal>
        <button
          class="bg-[#202020] text-white px-10 py-4 text-lg font-medium hover:bg-[#303030] transition-colors duration-300">
          {{ $t('Client.Global.Consultation.Button') }}
        </button>
      </Reveal>
    </div>
  </section>

  <!-- <section class="py-24 px-6 relative overflow-hidden ">
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DCBE9A] rounded-full blur-3xl">
      </div>
    </div>

    <div class="max-w-4xl mx-auto text-center relative z-10 reveal">
      <h2 class="font-serif text-5xl md:text-6xl font-light text-white mb-6">
        ¿Listo para tu <span class="text-[#DCBE9A]">Transformación?</span>
      </h2>
      <p class="text-white/70 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
        Agenda una consulta personalizada con nuestros especialistas y descubre cómo podemos ayudarte a alcanzar tus
        objetivos
      </p>
      <button
        class="group relative px-10 py-4 bg-[#DCBE9A] text-[#202020] font-semibold rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-[#DCBE9A]/30 hover:scale-105">
        <span class="relative z-10">Solicitar Consulta</span>
        <div
          class="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left">
        </div>
      </button>
    </div>
  </section> -->
</template>
