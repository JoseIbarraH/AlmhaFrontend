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
      <div class="">
        <!-- Header skeleton -->
        <div class="flex justify-between px-6 py-4 border-b border-gray-200">
          <div class="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <!-- Grid de tarjetas simuladas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          <div v-for="n in 3" :key="n" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1 space-y-2">
                <div class="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                  <div class="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div class="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <!-- Info -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <div class="h-3 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex gap-2">
              <div class="flex-1 h-8 bg-gray-200 rounded-md animate-pulse"></div>
              <div class="flex-1 h-8 bg-gray-200 rounded-md animate-pulse"></div>
              <div class="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
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
