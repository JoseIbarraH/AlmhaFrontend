<template>
  <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left">
    {{ $t('Dashboard.Design.ChooselCarouselNavbar.Title') }}
  </h3>

  <div>
    <CarouselNavbar />
  </div>

</template>

<script setup lang="ts">
import CarouselNavbar from '../components/CarouselNavbar.vue';

</script>
