<template>
  <!-- Contenedor principal, que podría estar dentro de un fondo global oscuro -->
  <section class="p-6 space-y-6">

    <!-- Header skeleton -->
    <div class="rounded-lg h-[82px] dark:bg-gray-900/50">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 sm:p-6 shadow-sm rounded-lg h-[82px]
               bg-white dark:bg-gray-800 dark:shadow-xl">
        <!-- Título (barra gris donde iría el texto) -->
        <div class="h-6 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>

    <!-- Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Columna izquierda -->
      <div class="space-y-4">

        <!-- Bloque 1 (Gráfico o Contenido con doble elemento) -->
        <div class="p-6 rounded-lg shadow-md space-y-4
                    bg-white dark:bg-gray-800">
          <div class="w-3/4 h-5 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div class="flex gap-6">
            <div class="h-40 rounded w-full bg-gray-200 dark:bg-gray-700/50"></div>
            <div class="h-40 rounded w-full bg-gray-200 dark:bg-gray-700/50"></div>
          </div>
        </div>

        <!-- Bloque 2 (Formulario o lista) -->
        <div class="p-6 rounded-lg shadow-md space-y-4
                    bg-white dark:bg-gray-800">
          <div class="w-1/2 h-5 rounded bg-gray-300 dark:bg-gray-700"></div>
          <!-- Área de contenido con color de fondo más suave (para diferenciar) -->
          <div class="h-32 rounded bg-gray-100 dark:bg-gray-700/30"></div>
        </div>
      </div>

      <!-- Columna derecha -->
      <div class="space-y-4">

        <!-- Bloque 3 (Gráfico grande) -->
        <div class="p-6 rounded-lg shadow-md space-y-4
                    bg-white dark:bg-gray-800">
          <div class="w-3/4 h-5 rounded bg-gray-300 dark:bg-gray-700"></div>
          <!-- Área de contenido con color de fondo más suave -->
          <div class="h-48 rounded bg-gray-100 dark:bg-gray-700/30"></div>
        </div>

        <!-- Bloque 4 (Contenido más pequeño) -->
        <div class="p-6 rounded-lg shadow-md space-y-4
                    bg-white dark:bg-gray-800">
          <div class="w-2/3 h-5 rounded bg-gray-300 dark:bg-gray-700"></div>
          <!-- Área de contenido con color de fondo más suave -->
          <div class="h-32 rounded bg-gray-100 dark:bg-gray-700/30"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Efecto de brillo solo para elementos grises (skeleton) */
/* Aplicamos el efecto a todos los grises usados como placeholders */
.bg-gray-200,
.bg-gray-300,
.bg-gray-100 {
  position: relative;
  overflow: hidden;
  /* Modo Claro: Gradiente suave de gris a gris claro */
  background: linear-gradient(90deg,
      #e5e7eb 0%,
      #f3f4f6 50%,
      #e5e7eb 100%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}

/* Sobrescribir el gradiente solo para Dark Mode */
/* Apuntamos a los placeholders que están dentro de un contexto oscuro */
.dark .bg-gray-300,
.dark .bg-gray-200,
.dark .bg-gray-100,
.dark .dark\:bg-gray-700,
.dark .dark\:bg-gray-700\/50,
.dark .dark\:bg-gray-700\/30 {
  /* Modo Oscuro: El gradiente se mueve entre dos tonos de gris oscuro para dar contraste */
  background: linear-gradient(90deg,
      #374151 0%,
      /* dark:bg-gray-700 */
      #4b5563 50%,
      /* Tono más claro para el brillo */
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
