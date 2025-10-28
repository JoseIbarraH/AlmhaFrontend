<template>
  <div
    class="w-full max-w-md mx-auto p-3 bg-white rounded-2xl shadow-md border cursor-pointer flex flex-col items-center gap-3 transition-all duration-300"
    :class="selected ? 'border-blue-500' : 'border-gray-300'">
    <!-- Parte superior: flechas + contenido -->
    <div class="flex items-center justify-between w-full h-auto scale-100 sm:scale-100 md:scale-100 gap-2"
      style="min-height: 6rem;">
      <!-- Flecha izquierda -->
      <div class="p-1 sm:p-2 rounded-full bg-gray-100 shadow-sm flex-shrink-0">
        <svg viewBox="0 0 1024 1024" class="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor">
          <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"></path>
        </svg>
      </div>

      <!-- Contenido central -->
      <div class="flex flex-col items-center gap-2 flex-1 text-center">
        <!-- Icono principal -->
        <svg fill="#000000" class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M128,234.667c35.355,0,64-28.645,64-64s-28.645-64-64-64s-64,28.645-64,64S92.645,234.667,128,234.667z M128,149.333 c11.791,0,21.333,9.542,21.333,21.333S139.791,192,128,192s-21.333-9.542-21.333-21.333S116.209,149.333,128,149.333z" />
          <path
            d="M490.667,42.667H21.333C9.551,42.667,0,52.218,0,64v384c0,11.782,9.551,21.333,21.333,21.333h469.333 c11.782,0,21.333-9.551,21.333-21.333V64C512,52.218,502.449,42.667,490.667,42.667z M469.333,426.667H42.667V85.333h426.667 V426.667z" />
          <path
            d="M91.582,377.752c8.331,8.331,21.839,8.331,30.17,0l91.582-91.582l48.915,48.915c8.331,8.331,21.839,8.331,30.17,0 s8.331-21.839,0-30.17l-9.555-9.555l41.373-68.954l66.013,66.013c8.331,8.331,21.839,8.331,30.17,0 c8.331-8.331,8.331-21.839,0-30.17l-85.333-85.333c-9.814-9.814-26.238-7.792-33.378,4.109l-49.942,83.237l-23.346-23.346 c-8.331-8.331-21.839-8.331-30.17,0L91.582,347.582C83.251,355.913,83.251,369.42,91.582,377.752z" />
        </svg>

        <!-- Tres puntitos -->
        <div class="flex gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span class="w-3 h-1.5 rounded-full bg-green-500"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
        </div>
      </div>

      <!-- Flecha derecha -->
      <div class="p-1 sm:p-2 rounded-full bg-gray-100 shadow-sm flex-shrink-0">
        <svg viewBox="0 0 1024 1024" class="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor">
          <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  selected: boolean | number | null | undefined;
}>();

</script>
