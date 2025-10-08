<script setup lang="ts">
import AplicationLogo from './partials/AplicationLogo.vue';
import ServicesLink from './partials/ServicesLink.vue';
import SocialMedia from './partials/SocialMedia.vue';
import Contact from './partials/Contact.vue';
import NavegationLink from './partials/NavegationLink.vue';

</script>

<template>
  <footer class="bg-[#202020]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Grid principal -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pt-12 pb-8">
        <div class="flex flex-col items-center justify-start space-y-6 order-1 mt-8">
          <AplicationLogo />
          <SocialMedia />
        </div>

        <div class="w-full order-2 sm:order-2 lg:order-2">
          <ServicesLink />
        </div>

        <div class="w-full flex justify-center order-3 sm:order-3 lg:order-3">
          <NavegationLink />
        </div>

        <div class="w-full order-4 sm:order-4 lg:order-4">
          <Contact />
        </div>
      </div>
    </div>
  </footer>
</template>
