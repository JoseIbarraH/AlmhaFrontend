<template>
  <img
    :src="safeSrc"
    :alt="alt"
    class="object-cover"
    @error="onError"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  src?: string
  alt?: string
}>()

const safeSrc = ref(props.src)

const onError = () => {
  safeSrc.value = '/placeholder.png' // Use a valid fallback image path
}
</script>
