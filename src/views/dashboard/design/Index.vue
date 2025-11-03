<template>
  <section class="p-6 space-y-6">
    <header
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg h-[82px]">
      <h2 class="text-xl font-semibold text-gray-800">
        {{ $t('Dashboard.Design.Title') }}
      </h2>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="h-fit">
        <div class="bg-white p-6 rounded-lg shadow-md h-fit">
          <ChooseCarouselStatic :carousel-static="form.carouselStatic" />
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md mt-4">
          <ChooseCarouselNavbar :carousel-navbar="form.carouselNavbar" />
        </div>
      </div>
      <div class="h-fit">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <ChooseBackground :background1="form.background1" :background2="form.background2"
            :background3="form.background3" />
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md mt-4">
          <ChooseCarouselTool :carousel-tool="form.carouselTool" />
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import ChooseCarouselStatic from './partials/ChooseCarouselStatic.vue';
import ChooseCarouselNavbar from './partials/ChooseCarouselNavbar.vue';
import ChooseCarouselTool from './partials/ChooseCarouselTool.vue';
import ChooseBackground from './partials/ChooseBackground.vue';
import type { DesignResponse } from './types';
import { onMounted, reactive } from 'vue';
import { api } from '@/plugins/api';

const form = reactive<DesignResponse>({
  background1: { path: null, title: '', subtitle: '' },
  background2: { path: null, title: '', subtitle: '' },
  background3: { path: null, title: '', subtitle: '' },
  carouselStatic: {
    carouselSetting: null,
    imageVideoSetting: null,
    carousel: [],
    imageVideo: { path: null, title: '', subtitle: '' }
  },
  carouselNavbar: [],
  carouselTool: [],
})

onMounted(async () => {

  try {
    const response = await api.get('api/design')
    const data = response.data.data

    Object.assign(form, data)
  } catch (error) {
    console.log('Error al obtener los diseños: ', error)
  }

})

</script>
