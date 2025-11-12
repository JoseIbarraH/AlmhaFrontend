<template>
  <div class="p-6 space-y-6 dark:bg-gray-950">
    <!-- Header skeleton -->
    <div class="rounded-lg h-[82px] dark:bg-gray-900/50"> <!-- Contenedor de fondo oscuro -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 sm:p-6 shadow-sm rounded-lg h-[82px]
               bg-white dark:bg-gray-800 dark:shadow-xl"> <!-- Contenedor de la tarjeta del header -->

        <!-- Título (barra gris donde iría el texto) -->
        <div class="h-6 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>

        <!-- Botón (rectángulo gris del ancho aproximado del botón real) -->
        <div class="h-10 w-32 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>

    <!-- Statistics skeleton -->
    <div class="rounded-lg dark:bg-gray-900/50"> <!-- Contenedor de fondo oscuro -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white dark:bg-gray-900">
        <!-- Tarjetas de Estadísticas (Ajustadas para Dark Mode) -->
        <div v-for="n in 4" :key="n" class="rounded-lg p-6 shadow-md animate-pulse
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
      <div class="flex justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="h-6 w-40 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
        <div class="h-10 w-64 rounded animate-pulse bg-gray-300 dark:bg-gray-700"></div>
      </div>

      <!-- Tabla responsive -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th v-for="i in 5" :key="i" class="px-6 py-3">
                <div class="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 dark:divide-gray-700/50">
            <tr v-for="n in 5" :key="n">
              <!-- Doctor -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div class="w-32 h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </td>

              <!-- Estado -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div class="w-16 h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </td>

              <!-- Fechas -->
              <td class="px-6 py-4">
                <div class="w-20 h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
              </td>
              <td class="px-6 py-4">
                <div class="w-20 h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
              </td>

              <!-- Acciones -->
              <td class="px-6 py-4">
                <div class="flex justify-end gap-3">
                  <div class="w-8 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                  <div class="w-8 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination skeleton -->
    <div class="rounded-lg h-[40px] w-1/3 mx-auto
                bg-gray-300 dark:bg-gray-700"></div>
  </div>
</template>

<style scoped>
/* Efecto de brillo solo para elementos grises (skeleton) */
.bg-gray-200,
.bg-gray-300 {
  position: relative;
  overflow: hidden;
  /* Modo Claro */
  background: linear-gradient(90deg,
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
      #374151 0%,
      /* dark:bg-gray-700 */
      #4b5563 50%,
      /* dark:bg-gray-600 */
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
