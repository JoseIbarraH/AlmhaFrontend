<template>
  <div class="p-6 space-y-6 dark:bg-gray-950">
    <!-- Header skeleton -->
    <div class="rounded-lg h-[82px] dark:bg-gray-900/50"> <!-- Fondo de placeholder más oscuro -->
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 sm:p-6 shadow-sm rounded-lg h-[82px]
               bg-white dark:bg-gray-800 dark:shadow-xl"> <!-- Contenedor de la tarjeta del header -->

        <!-- Título (barra gris donde iría el texto) -->
        <div class="h-6 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>

        <!-- Botón (rectángulo gris del ancho aproximado del botón real) -->
        <div class="h-10 w-32 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>

    <!-- Statistics skeleton -->
    <div class="rounded-lg dark:bg-gray-900/50">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white dark:bg-gray-900">

        <div v-for="n in 4" :key="n"
          class="rounded-lg p-6 shadow-md animate-pulse
                 bg-white border-2 border-gray-200
                 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="space-y-2">
              <div class="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div class="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div class="w-8 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table skeleton -->
    <div class="overflow-hidden
                bg-white border border-gray-200 rounded-lg
                dark:bg-gray-800 dark:border-gray-700">

      <!-- Header de la tabla -->
      <div class="">
        <div class="flex justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="h-6 w-40 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
          <div class="h-10 w-64 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <!-- Grid de tarjetas simuladas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          <div v-for="n in 3" :key="n"
               class="rounded-lg p-6 shadow-sm
                      bg-white border border-gray-200
                      dark:bg-gray-900 dark:border-gray-700">
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1 space-y-2">
                <div class="h-5 w-3/4 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full animate-pulse bg-gray-400 dark:bg-gray-600"></div>
                  <div class="h-3 w-16 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
              <div class="w-5 h-5 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
            </div>

            <!-- Info -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <div class="h-3 w-1/4 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
                <div class="h-3 w-12 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-3 w-1/2 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
                <div class="h-3 w-24 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-3 w-1/3 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
                <div class="h-3 w-20 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex gap-2">
              <div class="flex-1 h-8 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700"></div>
              <div class="flex-1 h-8 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700"></div>
              <div class="w-8 h-8 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination skeleton -->
    <div class="rounded-lg h-[40px] w-1/3 mx-auto
                bg-gray-300 dark:bg-gray-700"></div>
  </div>
</template>

<style scoped>
/* Efecto de brillo solo para elementos grises (skeleton) */
/* Se ajustan los colores para que el brillo sea visible sobre fondos oscuros */
.bg-gray-200,
.bg-gray-300,
.dark\:bg-gray-700,
.dark\:bg-gray-600 {
  position: relative;
  overflow: hidden;
  /* El color del gradiente se define en el CSS para ser constante */
  background: linear-gradient(90deg,
      /* Modo Claro */
      #e5e7eb 0%,
      #f3f4f6 50%,
      #e5e7eb 100%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}

/* Sobrescribir el gradiente solo para Dark Mode */
.dark .bg-gray-300,
.dark .bg-gray-200,
.dark .dark\:bg-gray-700,
.dark .dark\:bg-gray-600 {
  /* Modo Oscuro: El gradiente debe moverse entre dos tonos de gris oscuro/negro */
  background: linear-gradient(90deg,
      #374151 0%, /* dark:bg-gray-700 */
      #4b5563 50%, /* dark:bg-gray-600 */
      #374151 100%);
  background-size: 200% 100%;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
