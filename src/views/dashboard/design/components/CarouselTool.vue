<template>
  <div class="grid grid-cols-1 gap-4 mt-4 border-2 border-dashed border-gray-300 rounded-md p-4">

    <span v-if="localValue.length === 0" class="text-gray-500 col-span-full text-center">
      Agrega una imagen al carrusel
    </span>

    <div class="max-h-[500px] overflow-y-auto">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-2">
        <div v-for="(item, index) in localValue" :key="index"
          class="relative group rounded-md p-1 bg-white shadow-sm flex flex-col items-center">
          <div class="relative w-full aspect-square overflow-hidden rounded-md">
            <ImagesPreview v-model="item.path" :close-button="false" alt="Gallery Image"
              class="object-cover w-full h-full rounded-md" />
          </div>

          <CloseButton @click.stop="removeItem(index)" class="absolute top-1 left-1 md:right-1 md:left-auto"
            aria-label="Eliminar archivo" />
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center">
      <button type="button" class="mt-2 border border-blue-500 text-blue-500 px-3 py-1 rounded cursor-pointer"
        @click.stop="addItem" aria-label="Agregar archivo">
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import CloseButton from '@/components/ui/CloseButton.vue';
import type { CarouselToolInt } from '../types';
import { ref, watch } from 'vue'

const model = defineModel<CarouselToolInt[]>('carouselTool', { default: [] })

const localValue = ref<CarouselToolInt[]>([])

watch(
  model,
  (val) => {
    const current = JSON.stringify(localValue.value)
    const incoming = JSON.stringify(val || [])
    if (current !== incoming) {
      localValue.value = JSON.parse(incoming)
    }
  },
  { immediate: true, deep: true }
)

watch(
  localValue,
  (val) => {
    const current = model.value || []
    const isDifferent = val.length !== current.length ||
      val.some((item, i) => item.path !== current[i]?.path)

    if (isDifferent) {
      model.value = val.map(item => ({ ...item }))
    }
  },
  { deep: true }
)

const addItem = () => {
  localValue.value.push({ path: '' })
}

const removeItem = (index: number) => {
  localValue.value.splice(index, 1)
}
</script>
