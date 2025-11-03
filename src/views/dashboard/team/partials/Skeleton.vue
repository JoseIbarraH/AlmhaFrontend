<template>
  <div class="p-6 space-y-6">
    <!-- Header skeleton -->
    <div class="bg-gray-200 rounded-lg h-[82px]">
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg h-[82px]">
        <!-- Título (barra gris donde iría el texto) -->
        <div class="h-6 bg-gray-300 rounded w-48"></div>

        <!-- Botón (rectángulo gris del ancho aproximado del botón real) -->
        <div class="h-10 bg-gray-300 rounded w-32"></div>
      </div>
    </div>

    <!-- Statistics skeleton -->
    <div class="bg-gray-200 rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white ">
        <!-- Tarjeta 1 -->
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md animate-pulse">
          <div class="flex items-center justify-between">
            <div class="space-y-2">
              <div class="h-4 w-20 bg-gray-200 rounded"></div>
              <div class="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
            <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <!-- Tarjeta 2 -->
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md animate-pulse">
          <div class="flex items-center justify-between">
            <div class="space-y-2">
              <div class="h-4 w-24 bg-gray-200 rounded"></div>
              <div class="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
            <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <!-- Tarjeta 3 -->
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md animate-pulse">
          <div class="flex items-center justify-between">
            <div class="space-y-2">
              <div class="h-4 w-16 bg-gray-200 rounded"></div>
              <div class="h-6 w-14 bg-gray-200 rounded"></div>
            </div>
            <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <!-- Tarjeta 4 -->
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md animate-pulse">
          <div class="flex items-center justify-between">
            <div class="space-y-2">
              <div class="h-4 w-28 bg-gray-200 rounded"></div>
              <div class="h-6 w-18 bg-gray-200 rounded"></div>
            </div>
            <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table skeleton -->
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between px-6 py-4 border-b border-gray-200">
        <div class="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <!-- Tabla responsive -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th v-for="i in 5" :key="i" class="px-6 py-3">
                <div class="h-4 w-24 bg-gray-200 rounded"></div>
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr v-for="n in 5" :key="n">
              <!-- Doctor -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div class="w-32 h-4 bg-gray-200 rounded"></div>
                </div>
              </td>

              <!-- Estado -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-5 bg-gray-200 rounded-full"></div>
                  <div class="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
              </td>

              <!-- Fechas -->
              <td class="px-6 py-4">
                <div class="w-20 h-4 bg-gray-200 rounded"></div>
              </td>
              <td class="px-6 py-4">
                <div class="w-20 h-4 bg-gray-200 rounded"></div>
              </td>

              <!-- Acciones -->
              <td class="px-6 py-4">
                <div class="flex justify-end gap-3">
                  <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination skeleton -->
    <div class="bg-gray-200 rounded-lg h-[40px] w-1/3 mx-auto"></div>
  </div>
</template>

<style scoped>
/* Efecto de brillo solo para elementos grises (skeleton) */
.bg-gray-200,
.bg-gray-300 {
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg,
      #e5e7eb 0%,
      #f3f4f6 50%,
      #e5e7eb 100%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
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
