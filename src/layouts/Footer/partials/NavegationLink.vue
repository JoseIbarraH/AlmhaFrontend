<template>
  <div class="w-full sm:w-auto text-center sm:text-left">
    <h4 class="font-semibold mb-6 text-[#DCBE9A] text-center sm:text-left text-lg">Navegación</h4>
    <ul class="space-y-3 inline-block">
      <li>
        <a href="#"
          class="relative inline-block pl-5 text-white font-medium no-underline hover:text-[#DCBE9A] before:content-['•'] before:text-[#DCBE9A] before:absolute before:left-0">
          Servicios
        </a>
      </li>
      <li>
        <a href="#"
          class="relative inline-block pl-5 text-white font-medium no-underline hover:text-[#DCBE9A] before:content-['•'] before:text-[#DCBE9A] before:absolute before:left-0">
          Quiénes somos
        </a>
      </li>
      <li>
        <a href="#"
          class="relative inline-block pl-5 text-white font-medium no-underline hover:text-[#DCBE9A] before:content-['•'] before:text-[#DCBE9A] before:absolute before:left-0">
          Reserva tu cirugía
        </a>
      </li>
      <RouterLink :to="{ name: 'dashboard.home' }"
        class="relative inline-block pl-5 text-white font-medium no-underline hover:text-[#DCBE9A] before:content-['•'] before:text-[#DCBE9A] before:absolute before:left-0"
        active-class="text-[#DCBE9A]" exact-active-class="text-[#DCBE9A]">
        Dashboard
      </RouterLink>
    </ul>
  </div>
</template>
