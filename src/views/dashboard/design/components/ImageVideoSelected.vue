<template>
  <div class=" p-4">
    <ImagesPreview v-model="form.imageVideoUrl" />
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ImagesPreview.vue';
import { onMounted, reactive } from 'vue';

const form = reactive({
  imageVideoUrl: null as File | string | null
})

onMounted(() => {

})
</script>
