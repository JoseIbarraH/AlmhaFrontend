<template>
  <template>
    <h2 class="text-xl font-semibold leading-tight text-gray-800 flex justify-between">
      {{ $t('Dashboard.Design.Title') }}
    </h2>
  </template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded-lg shadow-md ">
        <ChooseCarouselStatic />
      </div>
      <div class="h-fit">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <ChooseBackground
            :background1="form.background1"
            :background2="form.background2"
            :background3="form.background3"
          />
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md mt-4">
          <ChooseCarouselNavbar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChooseCarouselStatic from './partials/ChooseCarouselStatic.vue';
import ChooseBackground from './partials/ChooseBackground.vue';
import ChooseCarouselNavbar from './partials/ChooseCarouselNavbar.vue';
import { onMounted } from 'vue';
import { api } from '@/plugins/api';

import { reactive } from 'vue'
import type { DesignResponse } from './types' // ajusta la ruta

const form = reactive<DesignResponse>({
  background1: { path: null, title: '', subtitle: '' },
  background2: { path: null, title: '', subtitle: '' },
  background3: { path: null, title: '', subtitle: '' },
  carousel: [],
  carouselNavbar: [],
  carouselTool: [],
  imageVideo: { path: null, title: '', subtitle: '' }
})

onMounted(async () => {

  try {
    const response = await api.get('api/design')
    const data = response.data.data

    Object.assign(form, data)
    console.log('respuesta', form)
  } catch (error) {
    console.log('Error al obtener los diseños: ', error)
  }

})

</script>
