<template>
  <div class="flex justify-center items-center h-screen text-white text-5xl bg-fixed bg-cover bg-center brightness-90"
    :style="{ backgroundImage: `url(${src})` }">
    <slot>
      <h1>Welcome to My Site</h1>
    </slot>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  src?: string
}>()
</script>
