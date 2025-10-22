<template>
  <div class="grid grid-cols-3 md:grid-cols-3 gap-4 mb-4 ">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 col-span-2">
      {{$t('Dashboard.Design.ChooseCarouselImage.Title')}}
    </h3>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div class="bg-white rounded-2xl shadow-md">
      <Gallery :selected="form.carousel" @click="handleGallery" />
    </div>
    <div class="bg-white rounded-2xl shadow-md">
      <ImageVideo :selected="form.imageVideo" @click="handleImageVideo" />
    </div>
  </div>

  <div class="w-full pt-4">
    <GalleryImageSelected v-if="form.carousel" :form="form" />
    <ImageVideoSelected v-if="form.imageVideo" :form="form" />
  </div>
</template>

<script setup lang="ts">
import Gallery from '../components/Carousel.vue';
import ImageVideo from '../components/ImageVideo.vue';
import GalleryImageSelected from '../components/CarouselImageSelected.vue';
import ImageVideoSelected from '../components/ImageVideoSelected.vue';
import { reactive } from 'vue';

interface ChooseCarouselStaticForm {
  carousel: boolean|null;
  imageVideo: boolean|null;
  carouselUrls: carouselUrlsInt[];
  imageVideoUrl: File | string | null;
}

interface carouselUrlsInt {
  url: string | File
  title: string
  text: string
}

const form = reactive({
  carousel: false,
  imageVideo: false,
  carouselUrls: [] as carouselUrlsInt[],
  imageVideoUrl: null as File | string | null
})

function handleGallery() {
  form.carousel = true;
  form.imageVideo = false;
}

function handleImageVideo() {
  form.imageVideo = true;
  form.carousel = false;
}

</script>
