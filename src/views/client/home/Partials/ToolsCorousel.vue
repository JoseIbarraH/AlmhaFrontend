<!-- 
 const imageUrls = [
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png'
] 

<InfiniteCarousel :images="imageUrls"/>
-->

<template>
  <div class="relative w-[960px] h-[100px] overflow-hidden bg-white shadow-lg mx-auto slider-gradient">
    <div
      class="flex slide-track"
      :style="{ width: `calc(${slideWidth}px * ${duplicatedImages.length})` }"
    >
      <div
        v-for="(image, index) in duplicatedImages"
        :key="index"
        class="flex items-center justify-center w-[250px] h-[100px] slide"
      >
        <img :src="image" alt="carousel image" class="h-[100px] w-[250px] object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const slideWidth = 250
const duplicatedImages = computed(() => [...props.images, ...props.images])
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 7));
  }
}

.slide-track {
  animation: scroll 10s linear infinite;
}

.slider-gradient::before,
.slider-gradient::after {
  content: '';
  position: absolute;
  top: 0;
  width: 200px;
  height: 100px;
  z-index: 2;
  background: linear-gradient(to right, white 0%, transparent 100%);
}

.slider-gradient::after {
  right: 0;
  transform: rotateZ(180deg);
}

.slider-gradient::before {
  left: 0;
}
</style>
