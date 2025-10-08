<template>
  <div class="card">
    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <div
          class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4"
        >
          <!-- Imagen -->
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="slotProps.data.imagen"
                :alt="slotProps.data.description"
                class="w-full h-48 object-cover rounded"
              />
            </div>
          </div>

          <!-- Nombre o descripción -->
          <div class="text-center text-sm font-medium text-gray-800">
            {{ slotProps.data.description }}
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import Carousel from "primevue/carousel";
import type { TeamMemberImages } from "../type";

// 🔹 Props: array de imágenes que viene del backend
const props = defineProps<{
  images: TeamMemberImages[];
}>();

// 🔹 Mapeo: adaptamos el array a lo que usa el Carousel
const products = computed(() =>
  props.images.map((img) => ({
    description: img.description || '',
    imagen: img.url,
  }))
);

// 🔹 Configuración responsive
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

onMounted(() => {
  console.log("props.images", props.images);
  console.log("products", products.value);
});
</script>
