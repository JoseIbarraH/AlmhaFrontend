<template>
  <div v-if="loading">
    <Skeleton />
  </div>

  <div v-else>
    <section class="p-6 space-y-6 dark:bg-gray-950">
      <header
        class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {{ $t('Dashboard.Design.Title') }}
        </h2>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="h-fit">
          <div class="bg-white p-6 rounded-lg shadow-md h-fit dark:bg-gray-900">
            <ChooseCarouselStatic :carousel-static="form.carouselStatic" />
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md mt-4 dark:bg-gray-900">
            <ChooseCarouselNavbar :carousel-navbar="form.carouselNavbar" />
          </div>
        </div>
        <div class="h-fit">
          <div class="bg-white p-6 rounded-lg shadow-md dark:bg-gray-900">
            <ChooseBackground :background1="form.background1" :background2="form.background2"
              :background3="form.background3" />
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md mt-4 dark:bg-gray-900">
            <ChooseCarouselTool :carousel-tool="form.carouselTool" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ChooseCarouselStatic from './partials/ChooseCarouselStatic.vue';
import ChooseCarouselNavbar from './partials/ChooseCarouselNavbar.vue';
import ChooseCarouselTool from './partials/ChooseCarouselTool.vue';
import ChooseBackground from './partials/ChooseBackground.vue';
import Skeleton from './partials/Skeleton.vue';
import { onMounted, reactive, ref } from 'vue';
import type { DesignResponse } from './types';
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

const loading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get('api/design')
    const data = response.data.data

    Object.assign(form, data)
  } catch (error) {
    console.log('Error al obtener los diseños: ', error)
  } finally {
    loading.value = false
  }
})

</script>
