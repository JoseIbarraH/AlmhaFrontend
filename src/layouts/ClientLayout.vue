<script setup lang="ts">
import TheFooter from './Footer/Index.vue';
import TheNavbar from './Navbar/Index.vue';

defineProps<{
  forceBackground?: boolean
}>()

</script>

<template>
  <TheNavbar :forceBackground="forceBackground" />
  <RouterView />
  <TheFooter />
</template>
