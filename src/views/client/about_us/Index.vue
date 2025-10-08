<template>
  <div class="relative w-full min-h-screen overflow-x-hidden bg-[#202020]">
    <!-- Background image with overlay -->
    <div class="absolute inset-0 md:max-h-screen">
      <img :src="bg1" alt="about us background" class="w-full h-full md:max-h-screen object-cover opacity-30" />
      <div class="absolute inset-0 bg-gradient-to-b from-[#202020]/60 via-[#202020]/80 to-[#202020]"></div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-[#DCBE9A]/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#DCBE9A]/5 rounded-full blur-3xl"></div>

    <!-- Content -->
    <div class="relative py-12 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16 md:mb-24">
          <div class="inline-flex items-center justify-center mb-6 md:mb-8">
            <div class="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-[#DCBE9A]"></div>
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-3 md:mx-4 text-[#DCBE9A] w-5 h-5 md:w-6 md:h-6"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path
                d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
            <div class="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-[#DCBE9A]"></div>
          </div>
          <Reveal>
            <h1
              class="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#DCBE9A] leading-tight tracking-tight">
              Sobre <span
                class="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#DCBE9A] leading-tight tracking-tight">Nosotros</span>
            </h1>

            <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light px-4">
              Transformamos sueños en realidad, combinando el arte de la belleza con destinos extraordinarios
            </p>
          </Reveal>
        </div>

        <!-- Mission Statement -->
        <div class="max-w-4xl mx-auto mb-16 md:mb-24">
          <Reveal>
            <div class="bg-white/5 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-3xl p-8 md:p-12">
              <h2 class="text-2xl md:text-3xl font-light text-[#DCBE9A] mb-6 text-center">Nuestra Misión</h2>
              <p class="text-gray-300 text-base md:text-lg leading-relaxed text-center mb-4">
                Somos pioneros en turismo estético, ofreciendo experiencias personalizadas que combinan tratamientos de
                clase mundial con destinos paradisíacos. Nuestro compromiso es brindarte un viaje transformador donde la
                belleza, el bienestar y el lujo se encuentran.
              </p>
              <p class="text-gray-400 text-sm md:text-base leading-relaxed text-center">
                Con alianzas estratégicas en los mejores centros médicos y clínicas estéticas internacionales,
                garantizamos resultados excepcionales respaldados por profesionales certificados y tecnología de
                vanguardia.
              </p>
            </div>
          </Reveal>
        </div>

        <!-- Main content grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          <!-- Card 1 -->
          <Reveal>
            <div
              class="group bg-white/5 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-[#DCBE9A]/40 transition-all duration-500 hover:-translate-y-2">
              <div class="flex justify-center mb-6">
                <div
                  class="w-14 h-14 md:w-16 md:h-16 bg-[#DCBE9A]/10 rounded-full flex items-center justify-center group-hover:bg-[#DCBE9A]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8 text-[#DCBE9A]"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
              </div>
              <h3 class="text-xl md:text-2xl font-light text-white mb-3 md:mb-4 text-center">Excelencia</h3>
              <p class="text-gray-400 text-sm md:text-base text-center leading-relaxed mb-3">
                Más de 15 años conectando a nuestros clientes con los mejores especialistas y destinos del mundo.
              </p>
              <p class="text-gray-500 text-xs md:text-sm text-center leading-relaxed">
                Cada procedimiento es cuidadosamente seleccionado y monitoreado para garantizar tu seguridad y
                satisfacción.
              </p>
            </div>
          </Reveal>

          <!-- Card 2 -->
          <Reveal>
            <div
              class="group bg-white/5 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-[#DCBE9A]/40 transition-all duration-500 hover:-translate-y-2">
              <div class="flex justify-center mb-6">
                <div
                  class="w-14 h-14 md:w-16 md:h-16 bg-[#DCBE9A]/10 rounded-full flex items-center justify-center group-hover:bg-[#DCBE9A]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8 text-[#DCBE9A]"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
              </div>
              <h3 class="text-xl md:text-2xl font-light text-white mb-3 md:mb-4 text-center">Global</h3>
              <p class="text-gray-400 text-sm md:text-base text-center leading-relaxed mb-3">
                Presencia en los destinos más exclusivos para procedimientos estéticos de clase mundial.
              </p>
              <p class="text-gray-500 text-xs md:text-sm text-center leading-relaxed">
                Acceso directo a clínicas premium en Colombia, México, Turquía, España y más destinos excepcionales.
              </p>
            </div>
          </Reveal>

          <!-- Card 3 -->
          <Reveal>
            <div
              class="group bg-white/5 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-[#DCBE9A]/40 transition-all duration-500 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div class="flex justify-center mb-6">
                <div
                  class="w-14 h-14 md:w-16 md:h-16 bg-[#DCBE9A]/10 rounded-full flex items-center justify-center group-hover:bg-[#DCBE9A]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8 text-[#DCBE9A]"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
              </div>
              <h3 class="text-xl md:text-2xl font-light text-white mb-3 md:mb-4 text-center">Dedicación</h3>
              <p class="text-gray-400 text-sm md:text-base text-center leading-relaxed mb-3">
                Tu bienestar y satisfacción son nuestra prioridad, con seguimiento personalizado en cada paso.
              </p>
              <p class="text-gray-500 text-xs md:text-sm text-center leading-relaxed">
                Asistencia 24/7, coordinación completa de viajes y acompañamiento durante toda tu experiencia.
              </p>
            </div>
          </Reveal>
        </div>

        <!-- Services Section -->
        <div class="mb-16 md:mb-24">
          <Reveal>
            <h2 class="text-3xl md:text-4xl font-light text-white mb-8 md:mb-12 text-center">
              Nuestros <span class="text-[#DCBE9A]">Servicios</span>
            </h2>
          </Reveal>

          <div class="grid md:grid-cols-2 gap-6 md:gap-8">
            <Reveal>
              <div
                class="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-2xl p-6 md:p-8">
                <div class="flex items-start mb-4">
                  <div class="w-2 h-2 bg-[#DCBE9A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 class="text-lg md:text-xl text-white font-light mb-2">Asesoría Personalizada</h4>
                    <p class="text-gray-400 text-sm md:text-base leading-relaxed">
                      Consulta inicial gratuita donde evaluamos tus necesidades, expectativas y te recomendamos los
                      mejores especialistas según tu caso.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div
                class="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-2xl p-6 md:p-8">
                <div class="flex items-start mb-4">
                  <div class="w-2 h-2 bg-[#DCBE9A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 class="text-lg md:text-xl text-white font-light mb-2">Paquetes Todo Incluido</h4>
                    <p class="text-gray-400 text-sm md:text-base leading-relaxed">
                      Procedimiento médico, alojamiento en hoteles 5 estrellas, traslados privados, asistencia médica y
                      turística completa.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div
                class="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-2xl p-6 md:p-8">
                <div class="flex items-start mb-4">
                  <div class="w-2 h-2 bg-[#DCBE9A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 class="text-lg md:text-xl text-white font-light mb-2">Seguimiento Post-Operatorio</h4>
                    <p class="text-gray-400 text-sm md:text-base leading-relaxed">
                      Cuidado continuo después de tu procedimiento con consultas de seguimiento virtuales y presenciales
                      según necesites.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div
                class="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-[#DCBE9A]/20 rounded-2xl p-6 md:p-8">
                <div class="flex items-start mb-4">
                  <div class="w-2 h-2 bg-[#DCBE9A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 class="text-lg md:text-xl text-white font-light mb-2">Experiencias de Recuperación</h4>
                    <p class="text-gray-400 text-sm md:text-base leading-relaxed">
                      Espacios diseñados para tu convalecencia con spas, tratamientos complementarios y actividades
                      relajantes.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <!-- Bottom accent -->
         <Reveal>
           <div class="text-center pb-8">
             <div
               class="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#DCBE9A]/10 to-[#DCBE9A]/5 border border-[#DCBE9A]/30 rounded-full">
               <p class="text-[#DCBE9A] font-light tracking-widest text-xs md:text-sm">
                 EXPERIENCIAS ÚNICAS • RESULTADOS EXCEPCIONALES
               </p>
             </div>
           </div>
         </Reveal>
      </div>
    </div>

    <!-- Decorative corner elements -->
    <div
      class="absolute top-6 left-6 md:top-8 md:left-8 w-16 h-16 md:w-20 md:h-20 border-t-2 border-l-2 border-[#DCBE9A]/30 rounded-tl-3xl">
    </div>
    <div
      class="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-16 h-16 md:w-20 md:h-20 border-b-2 border-r-2 border-[#DCBE9A]/30 rounded-br-3xl">
    </div>
  </div>
</template>

<script setup lang="ts">
import bg1 from "@/assets/images/about_us/bg1.png"
/* import bg2 from "@/assets/images/about_us/bg2.png" */
import Reveal from "@/components/Reveal.vue";
</script>

<style scoped>
/* Opcional: agregar animaciones personalizadas si es necesario */
</style>
