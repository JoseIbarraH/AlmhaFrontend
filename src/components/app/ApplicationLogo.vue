<script setup lang="ts">
const props = defineProps<{
  color?: string
}>()
</script>

<template>
  <div class="nav-logo">
    <a :style="{ color: props.color ?? '#11184F' }">
      ALMHA
    </a>
  </div>
</template>

<style scoped>
.nav-logo {
  font-size: 1.5rem;
  font-family: 'Bodoni Moda', serif;
}

/* hover fijo */
.nav-logo a:hover {
  color: #DCBE9A;
  text-decoration: none;
}
</style>
