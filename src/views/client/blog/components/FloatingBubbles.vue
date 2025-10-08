<template>
  <div class="absolute top-10 right-10 w-64 h-64 bg-custom-beige opacity-5 rounded-full floating-element"></div>
  <div class="absolute bottom-10 left-10 w-32 h-32 bg-custom-beige  opacity-5 rounded-full floating-element"
    style="animation-delay: -3s;"></div>

  <div class="absolute inset-0 opacity-5">
    <div class="absolute top-10 left-10 w-72 h-72 bg-[#DCBE9A] rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-[#DCBE9A] rounded-full blur-3xl"></div>
  </div>

  <div class="absolute inset-0 opacity-[0.02]">
    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <pattern id="medical-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M45 30h10v15h15v10H55v15H45V55H30V45h15V30z" fill="currentColor" class="text-[#DCBE9A]" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#medical-pattern)" />
    </svg>
  </div>
</template>

<style scoped>
.floating-element {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-15px) rotate(2deg);
  }
}
</style>
