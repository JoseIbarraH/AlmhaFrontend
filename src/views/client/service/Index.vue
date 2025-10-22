<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative py-20 md:py-32 flex items-center justify-center bg-gradient-to-br from-[#202020] via-[#2a2a2a] to-[#1a1a1a]">
      <!-- Patrón decorativo -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #DCBE9A 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>

      <div class="absolute top-1/4 left-10 w-32 h-32 bg-[#DCBE9A]/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-10 w-40 h-40 bg-[#DCBE9A]/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#DCBE9A]/10 border border-[#DCBE9A]/30 rounded-full mb-6">
          <Award class="w-4 h-4 text-[#DCBE9A]" />
          <span class="text-sm text-[#DCBE9A] font-medium">Excelencia en Cirugía Estética</span>
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          Transformación con
          <span class="text-[#DCBE9A]"> Elegancia</span>
        </h1>

        <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Procedimientos de cirugía plástica y reconstructiva realizados por especialistas certificados con más de 15 años de experiencia
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button class="w-full sm:w-auto px-8 py-4 bg-[#DCBE9A] text-[#202020] rounded-full font-semibold hover:bg-[#DCBE9A]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#DCBE9A]/20">
            Ver Servicios
            <ArrowRight class="w-5 h-5" />
          </button>
          <button class="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#DCBE9A] text-[#DCBE9A] rounded-full font-semibold hover:bg-[#DCBE9A]/10 transition-all">
            Agendar Consulta
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 pt-8 md:pt-16 border-t border-[#DCBE9A]/20">
          <div>
            <div class="text-2xl md:text-4xl font-bold text-[#DCBE9A] mb-2">15+</div>
            <div class="text-xs md:text-sm text-gray-400">Años de Experiencia</div>
          </div>
          <div>
            <div class="text-2xl md:text-4xl font-bold text-[#DCBE9A] mb-2">2,500+</div>
            <div class="text-xs md:text-sm text-gray-400">Procedimientos Exitosos</div>
          </div>
          <div>
            <div class="text-2xl md:text-4xl font-bold text-[#DCBE9A] mb-2">98%</div>
            <div class="text-xs md:text-sm text-gray-400">Satisfacción</div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown class="w-6 h-6 text-[#DCBE9A]" />
      </div>
    </section>

    <!-- Sección de Servicios -->
    <section id="servicios" class="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header de Servicios -->
        <div class="text-center mb-12 md:mb-16">
          <div class="inline-block px-4 py-2 bg-[#DCBE9A]/10 rounded-full mb-4">
            <span class="text-sm font-semibold text-[#202020]">NUESTROS SERVICIOS</span>
          </div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#202020] mb-4">
            Procedimientos Especializados
          </h2>
          <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de procedimientos estéticos y reconstructivos con tecnología de vanguardia
          </p>
        </div>

        <!-- Grid de Servicios -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="(servicio, index) in servicios"
            :key="index"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
            class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#DCBE9A]/30 hover:-translate-y-1"
          >
            <!-- Barra superior decorativa -->
            <div class="h-1 bg-gradient-to-r from-[#DCBE9A] to-[#c9a97d]"></div>

            <div class="p-6 md:p-8">
              <!-- Icono y Número -->
              <div class="flex items-start justify-between mb-6">
                <div class="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#DCBE9A]/20 to-[#DCBE9A]/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <component :is="servicio.icono" class="w-6 h-6 md:w-7 md:h-7 text-[#DCBE9A]" />
                </div>
                <div class="w-8 h-8 bg-[#DCBE9A]/10 rounded-full flex items-center justify-center border border-[#DCBE9A]/30">
                  <span class="text-[#DCBE9A] font-bold text-xs">{{ String(index + 1).padStart(2, '0') }}</span>
                </div>
              </div>

              <!-- Título -->
              <h3 class="text-xl md:text-2xl font-serif font-bold text-[#202020] mb-3 group-hover:text-[#DCBE9A] transition-colors">
                {{ servicio.titulo }}
              </h3>

              <!-- Descripción -->
              <p class="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                {{ servicio.descripcion }}
              </p>

              <!-- Detalles -->
              <div class="flex items-center gap-4 md:gap-6 mb-6 text-xs md:text-sm">
                <div class="flex items-center gap-2 text-gray-500">
                  <Clock class="w-4 h-4 text-[#DCBE9A] flex-shrink-0" />
                  <span>{{ servicio.duracion }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-500">
                  <Calendar class="w-4 h-4 text-[#DCBE9A] flex-shrink-0" />
                  <span>{{ servicio.recuperacion }}</span>
                </div>
              </div>

              <!-- Características -->
              <ul class="space-y-2 md:space-y-3 mb-6">
                <li
                  v-for="(caracteristica, idx) in servicio.caracteristicas"
                  :key="idx"
                  class="flex items-start gap-2 text-xs md:text-sm text-gray-600"
                >
                  <Check class="w-4 h-4 md:w-5 md:h-5 text-[#DCBE9A] flex-shrink-0 mt-0.5" />
                  <span>{{ caracteristica }}</span>
                </li>
              </ul>

              <!-- Botón -->
              <button
                :class="[
                  'w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2',
                  hoveredIndex === index
                    ? 'bg-[#DCBE9A] text-[#202020] shadow-lg shadow-[#DCBE9A]/30'
                    : 'bg-[#202020] text-white hover:bg-[#DCBE9A] hover:text-[#202020]'
                ]"
              >
                Más Información
                <ArrowRight
                  :class="[
                    'w-4 h-4 transition-transform',
                    hoveredIndex === index ? 'translate-x-1' : ''
                  ]"
                />
              </button>
            </div>

            <!-- Glow Effect -->
            <div
              :class="[
                'absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DCBE9A]/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none',
                hoveredIndex === index ? 'opacity-100' : ''
              ]"
            />
          </div>
        </div>

        <!-- CTA Final -->
        <div class="mt-16 md:mt-20 bg-gradient-to-r from-[#202020] to-[#2a2a2a] rounded-2xl md:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #DCBE9A 1px, transparent 0); background-size: 30px 30px;"></div>
          </div>

          <div class="relative z-10">
            <h3 class="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
              ¿Listo para tu Transformación?
            </h3>
            <p class="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Agenda una consulta personalizada con nuestros especialistas certificados
            </p>
            <button class="w-full sm:w-auto px-8 md:px-10 py-4 bg-[#DCBE9A] text-[#202020] rounded-full font-semibold hover:bg-white transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2">
              <Phone class="w-5 h-5" />
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'
import {
  Sparkles,
  Heart,
  Eye,
  Smile,
  User,
  Zap,
  Clock,
  Calendar,
  Check,
  ArrowRight,
  Phone,
  Award,
  ChevronDown
} from 'lucide-vue-next'

interface Servicio {
  titulo: string
  descripcion: string
  icono: Component
  duracion: string
  recuperacion: string
  caracteristicas: string[]
}

const hoveredIndex = ref<number | null>(null)

const servicios = ref<Servicio[]>([
  {
    titulo: 'Rinoplastia',
    descripcion: 'Remodelación estética y funcional de la nariz para mejorar la armonía facial y la respiración.',
    icono: Sparkles,
    duracion: '2-3 horas',
    recuperacion: '2 semanas',
    caracteristicas: [
      'Corrección de desviaciones',
      'Mejora de proporciones faciales',
      'Técnicas mínimamente invasivas'
    ]
  },
  {
    titulo: 'Mamoplastia',
    descripcion: 'Aumento, reducción o levantamiento mamario para lograr la forma y tamaño deseados.',
    icono: Heart,
    duracion: '2-4 horas',
    recuperacion: '3 semanas',
    caracteristicas: [
      'Implantes de última generación',
      'Resultados naturales',
      'Seguimiento personalizado'
    ]
  },
  {
    titulo: 'Blefaroplastia',
    descripcion: 'Rejuvenecimiento de párpados superiores e inferiores para una mirada más fresca y juvenil.',
    icono: Eye,
    duracion: '1-2 horas',
    recuperacion: '10 días',
    caracteristicas: [
      'Eliminación de bolsas',
      'Corrección de párpados caídos',
      'Cicatrices imperceptibles'
    ]
  },
  {
    titulo: 'Lifting Facial',
    descripcion: 'Rejuvenecimiento facial completo mediante técnicas avanzadas de estiramiento y reposicionamiento.',
    icono: Smile,
    duracion: '3-5 horas',
    recuperacion: '3-4 semanas',
    caracteristicas: [
      'Resultados duraderos',
      'Aspecto natural',
      'Técnicas SMAS avanzadas'
    ]
  },
  {
    titulo: 'Liposucción',
    descripcion: 'Eliminación de depósitos de grasa localizada para esculpir y definir el contorno corporal.',
    icono: Zap,
    duracion: '2-4 horas',
    recuperacion: '2 semanas',
    caracteristicas: [
      'Tecnología VASER',
      'Múltiples áreas tratables',
      'Recuperación rápida'
    ]
  },
  {
    titulo: 'Abdominoplastia',
    descripcion: 'Remodelación del abdomen eliminando exceso de piel y grasa para un vientre firme y tonificado.',
    icono: User,
    duracion: '3-4 horas',
    recuperacion: '4 semanas',
    caracteristicas: [
      'Reparación de músculos abdominales',
      'Eliminación de estrías',
      'Contorno definido'
    ]
  }
])
</script>

<style scoped>
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}
</style>
