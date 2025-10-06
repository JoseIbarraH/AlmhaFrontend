<template>

  <Head title="Not Found 404" />
  <ClientLayout>
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden"
      style="background-color: #0A0909;">
      <!-- Elementos decorativos de fondo -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-20 w-32 h-32 rounded-full border-2 animate-pulse"
          style="border-color: #DCBE9A;">
        </div>
        <div class="absolute bottom-32 right-32 w-24 h-24 rounded-full border-2 animate-pulse delay-1000"
          style="border-color: #DCBE9A;"></div>
        <div class="absolute top-1/2 left-10 w-16 h-16 rounded-full border-2 animate-pulse delay-500"
          style="border-color: #DCBE9A;"></div>
      </div>

      <div class="text-center z-10 px-4 max-w-2xl mx-auto">
        <!-- Número 404 grande -->
        <div class="relative mb-8">
          <h1 class="text-8xl md:text-9xl font-bold tracking-wider opacity-20 select-none" style="color: #DCBE9A;">
            404
          </h1>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-4xl md:text-5xl font-light tracking-wide" style="color: #DCBE9A;">
              ¡Ups!
            </div>
          </div>
        </div>

        <!-- Mensaje principal -->
        <div class="mb-8 space-y-4">
          <h2 class="text-2xl md:text-3xl font-semibold" style="color: #DCBE9A;">
            Página no encontrada
          </h2>
          <p class="text-lg opacity-80 leading-relaxed max-w-md mx-auto" style="color: #DCBE9A;">
            La página que buscas parece haber desaparecido en el espacio digital.
            No te preocupes, te ayudamos a encontrar el camino de vuelta.
          </p>
        </div>

        <!-- Botones de acción -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/"
            class="group px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 flex items-center gap-2"
            style="background-color: #DCBE9A; color: #0A0909; border-color: #DCBE9A;">
          <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
            </path>
          </svg>
          Volver al inicio
          </Link>

          <button @click="goBack"
            class="group px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 border-2 flex items-center gap-2"
            style="color: #DCBE9A; border-color: #DCBE9A; background-color: transparent;">
            <svg class="w-5 h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
              </path>
            </svg>
            Página anterior
          </button>
        </div>

        <!-- Mensaje adicional -->
        <div class="mt-12 pt-8 border-t border-opacity-20" style="border-color: #DCBE9A;">
          <p class="text-sm opacity-60" style="color: #DCBE9A;">
            ¿Necesitas ayuda?
            <Link href="/contacto" class="underline hover:no-underline transition-all duration-200"
              style="color: #DCBE9A;">
            Contáctanos
            </Link>
          </p>
        </div>
      </div>

      <!-- Efecto de partículas flotantes -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-bounce"
          style="background-color: #DCBE9A; animation-delay: 0s;"></div>
        <div class="absolute top-3/4 left-3/4 w-1 h-1 rounded-full animate-bounce"
          style="background-color: #DCBE9A; animation-delay: 1s;"></div>
        <div class="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full animate-bounce"
          style="background-color: #DCBE9A; animation-delay: 2s;"></div>
      </div>
    </div>
  </ClientLayout>
</template>

<script setup lang="ts">

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Animación personalizada para el pulso */
@keyframes pulse-custom {

  0%,
  100% {
    opacity: 0.1;
    transform: scale(1);
  }

  50% {
    opacity: 0.3;
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse-custom 2s ease-in-out infinite;
}
</style>
