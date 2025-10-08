<template>
  <div class="relative min-h-screen py-6 px-6 overflow-hidden">
    <!-- Elegant gradient background -->
    <!-- <div class="absolute inset-0 bg-gradient-to-br from-[#F8F7F4] via-[#FFFFFF] to-[#F5F1EA]"></div> -->

    <!-- Sophisticated pattern overlay -->
    <div class="absolute inset-0 opacity-[0.03]">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="luxury-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1" height="60" fill="#DCBE9A" />
            <rect x="0" y="0" width="60" height="1" fill="#DCBE9A" />
          </pattern>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="#DCBE9A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#luxury-grid)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>

    <div
      class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#DCBE9A]/10 to-transparent rounded-full blur-3xl animate-float-slow">
    </div>
    <div
      class="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#DCBE9A]/8 to-transparent rounded-full blur-3xl animate-float-slower">
    </div>
    <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-[#DCBE9A]/5 rounded-full blur-2xl animate-float"></div>

    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DCBE9A] to-transparent">
    </div>

    <div class="relative z-9 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-full px-6 py-2.5 mb-6 shadow-sm">
          <div class="w-2 h-2 bg-[#DCBE9A] rounded-full"></div>
          <span class="text-sm font-medium text-[#18181B] tracking-wider uppercase">Nuestros Especialistas</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-[#18181B] mb-4">
          Conoce a nuestro <span class="text-[#DCBE9A]">Equipo</span>
        </h2>
        <div class="flex items-center justify-center gap-3 mt-6">
          <div class="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#DCBE9A]"></div>
          <div class="w-2 h-2 border border-[#DCBE9A] rotate-45"></div>
          <div class="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#DCBE9A]"></div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div v-for="(value, index) in data" :key="index" :class="[
          'group rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer',
          'bg-white/80 backdrop-blur-sm border border-[#DCBE9A]/10',
          'hover:shadow-2xl hover:shadow-[#DCBE9A]/20 hover:-translate-y-2',
          'hover:border-[#DCBE9A]/30 hover:bg-white',
          styleGrid(index)
        ]">
          <div
            class="absolute top-0 right-0 w-20 h-20 overflow-hidden z-9 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              class="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#DCBE9A]/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8">
            </div>
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20">
          </div>

          <!-- <TeamCard :image="value.image" :specialty="value.team_member_translations[0].specialization"
            @showMore="openDialog(value)" :name="value.name" class="w-full h-full relative z-0" /> -->
        </div>
      </div>

      <!-- <div class="flex items-center justify-center gap-4 mt-20">
        <div class="w-24 h-[1px] bg-gradient-to-r from-transparent to-[#DCBE9A]/50"></div>
        <div class="w-3 h-3 border-2 border-[#DCBE9A]/50 rounded-full"></div>
        <div class="w-24 h-[1px] bg-gradient-to-l from-transparent to-[#DCBE9A]/50"></div>
      </div> -->
    </div>

    <TeamDialog v-model:visible="visible" :miembro="teamSelected" @closed="teamSelected = null" />

    <!-- <div
      class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DCBE9A]/30 to-transparent">
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { Data } from '../type';
import TeamDialog from './TeamDialog.vue';
import TeamCard from './TeamCard.vue';
import { ref } from 'vue';

const props = defineProps<{
  data: Data[];
}>();


const gridStyles: Record<number, string> = {
  0: "md:col-span-1 md:row-span-1",
  1: "md:col-span-1 md:row-span-1",
  2: "md:col-span-1 md:row-span-1",
  3: "md:col-span-1 md:row-span-1",
  4: "md:col-span-1 md:row-span-1",
  5: "md:col-span-1 md:row-span-1",
};

function styleGrid(index: number): string {
  return gridStyles[index] || "md:col-span-1";
}

const visible = ref(false)
const teamSelected = ref<Data | null>(null)

function openDialog(data: Data) {
  teamSelected.value = data
  visible.value = true
}
</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-slow {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(-30px) translateX(20px);
  }
}

@keyframes float-slower {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(-40px) translateX(-30px);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 15s ease-in-out infinite;
}
</style>
