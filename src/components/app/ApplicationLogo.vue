<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  color?: string
  size?: string | number   // acepta "2rem", "24px", 1.8, etc.
}>()

const logo = import.meta.env.VITE_APP_NAME;

</script>

<template>
  <div class="nav-logo" :style="{
    fontSize: props.size ? (typeof props.size === 'number' ? props.size + 'rem' : props.size) : '1.5rem',
  }">
    <a :style="{ color: props.color ?? '#11184F' }">
      {{ logo }}
    </a>
  </div>
</template>

<style scoped>
.nav-logo {
  font-family: 'Bodoni Moda', serif;
}

/* hover fijo */
.nav-logo a:hover {
  color: #DCBE9A;
  text-decoration: none;
}
</style>
