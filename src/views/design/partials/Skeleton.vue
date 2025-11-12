<template>
  <section class="p-6 space-y-6">
    <!-- Header -->
    <div class="bg-gray-200 rounded-lg h-[82px]">
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg h-[82px]">
        <!-- Título (barra gris donde iría el texto) -->
        <div class="h-6 bg-gray-300 rounded w-48"></div>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Columna izquierda -->
      <div class="space-y-4">
        <!-- Bloque 1 -->
        <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div class="w-3/4 h-5 bg-gray-200 rounded"></div>
          <div class="flex gap-6">
            <div class="h-40 bg-gray-200 rounded w-full"></div>
            <div class="h-40 bg-gray-200 rounded w-full"></div>
          </div>
        </div>

        <!-- Bloque 2 -->
        <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div class="w-1/2 h-5 bg-gray-200 rounded"></div>
          <div class="h-32 bg-gray-100 rounded"></div>
        </div>
      </div>

      <!-- Columna derecha -->
      <div class="space-y-4">
        <!-- Bloque 3 -->
        <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div class="w-3/4 h-5 bg-gray-200 rounded"></div>
          <div class="h-48 bg-gray-100 rounded"></div>
        </div>

        <!-- Bloque 4 -->
        <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div class="w-2/3 h-5 bg-gray-200 rounded"></div>
          <div class="h-32 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  </section>
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
