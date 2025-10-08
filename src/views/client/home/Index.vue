<template>
  <div v-if="carouselImage.carousel">
    <!-- <Carousel :images="responsiveImages" :autoplay="isMobile ? 3000 : 5000" :autoplay-videos="!isMobile" /> -->
    <CarouselTw :data="carouselImage.carouselUrls" />

  </div>

  <div v-if="carouselImage?.imageVideo">
    <h1>hola owo</h1>
  </div>

  <div class="h-[50vh] bg-white text-gray-800 flex items-center justify-center text-2xl p-8" data-aos="fade-right">
    {{ $t('Content') }}
  </div>

  <FullScreenBackground :src="background.background1">
    <h1>Página 1</h1>
  </FullScreenBackground>

  <FullScreenBackground :src="background.background2">
    <h1>Página 2</h1>
  </FullScreenBackground>

  <FullScreenBackground :src="background.background3">
    <h1>Página 3</h1>
  </FullScreenBackground>

  <div class="bg-zinc-900 flex items-center justify-center text-2xl">
    <Team :members="members" />
  </div>
</template>

<script setup lang="ts">
import type { ChooseCarouselStaticForm, Background, ChooseCarouselNavbarForm } from './types';
import FullScreenBackground from '@/components/FullScreenBackground.vue';
import CarouselTw from '@/views/client/home/Partials/CarouselTw.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import Team from './Partials/Team.vue';

/* const props = defineProps<{
  members?: {
    id: string,
    image: string,
    name: string,
    specialization: string,
    status: string
  }[];
  carouselImage: ChooseCarouselStaticForm;
  background: Background;
  carouselNavbar: ChooseCarouselNavbarForm;
}>(); */

const members: any = []
const background: Background = {
  background1: "img1.jpg",
  background2: "img2.jpg",
  background3: "img3.jpg",
};
const carouselImage: ChooseCarouselStaticForm = {
  carousel: true,
  imageVideo: null,
  carouselUrls: [
    {
      url: "img1.jpg",
      title: "Título 1",
      text: "Descripción 1",
      titleen: "Title 1",
      texten: "Description 1"
    },
    {
      url: "img2.jpg",
      title: "Título 2",
      text: "Descripción 2",
      titleen: "Title 2",
      texten: "Description 2"
    },
    {
      url: "img3.jpg",
      title: "Título 3",
      text: "Descripción 3",
      titleen: "Title 3",
      texten: "Description 3"
    }
  ],
  imageVideoUrl: null
};

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

/* const responsiveImages = computed(() => {
  if (Array.isArray(props.carouselImage?.carouselUrls) && props.carouselImage.carouselUrls.length > 0) {
    return props.carouselImage.carouselUrls.map((item: any) => ({
      url: resolveSrc(item.url ?? ''),
      title: locale === 'es' ? item.title : item.titleen,
      text: locale === 'es' ? item.text : item.texten
    }))
  }
  return [{
    url: resolveSrc('images/general/start/1423.jpg'),
    title: 'Titulo Default',
    text: 'Texto Default'
  }]
}) */

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

</script>
