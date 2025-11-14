<template>
  <div class="grid grid-cols-1 gap-4 mt-4 border-2 border-dashed border-gray-300 rounded-md p-4">
    <span v-if="localValue.length === 0" class="text-gray-500 col-span-full text-center">
      {{ $t('Dashboard.Design.ChooseCarouselImage.NewImage') }}
    </span>

    <!-- Contenedor scrollable -->
    <div class="max-h-[500px] overflow-y-auto space-y-4 pr-2">
      <div v-for="(item, index) in localValue" :key="index"
        class="relative group rounded-md p-3 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:shadow-xl">
        <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          <!-- Imagen / Video -->
          <div class="w-full relative aspect-square">
            <ImagesPreview v-model="item.path" alt="Gallery Image" class="object-cover w-full h-full rounded-md" />
          </div>

          <!-- Inputs -->
          <div class="w-full md:col-span-2 space-y-3">
            <div>
              <InputLabel :for="`design_title_${index}`" class="mb-1"
                :value="$t('Dashboard.Design.ChooseCarouselNavbar.LabelTitle')" />
              <TextInput :id="`design_title_${index}`" v-model="item.title" type="text"
                :placeholder="$t('Dashboard.Design.ChooseCarouselNavbar.InputTitlePlaceholder')" />
            </div>

            <div>
              <InputLabel :for="`design_slogan_${index}`" class="mb-1"
                :value="$t('Dashboard.Design.ChooseCarouselNavbar.LabelSubtitle')" />
              <TextInput :id="`design_slogan_${index}`" v-model="item.subtitle" type="text"
                :placeholder="$t('Dashboard.Design.ChooseCarouselNavbar.InputSubtitlePlaceholder')" />
            </div>
          </div>

          <CloseButton @click.stop="removeItem(index)" class="absolute top-1 left-1 md:right-1 md:left-auto" aria-label="Eliminar archivo" />
        </div>
      </div>
    </div>

    <!-- Botón agregar -->
    <div class="flex items-center justify-center">
      <button type="button" class="mt-2 border border-blue-500 text-blue-500 px-3 py-1 rounded cursor-pointer" @click.stop="addItem"
        aria-label="Agregar archivo">
        +
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue'
import CloseButton from '@/components/ui/CloseButton.vue'
import InputLabel from '@/components/ui/InputLabel.vue'
import TextInput from '@/components/ui/TextInput.vue'
import type { CarouselItem } from '../types'
import { ref, watch } from 'vue'

const model = defineModel<CarouselItem[]>('carouselNavbar', { default: [] })

const localValue = ref<CarouselItem[]>([])

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
      val.some((item, i) => item.path !== current[i]?.path ||
                            item.title !== current[i]?.title ||
                            item.subtitle !== current[i]?.subtitle)

    if (isDifferent) {
      model.value = val.map(item => ({ ...item }))
    }
  },
  { deep: true }
)

const addItem = () => {
  localValue.value.push({ path: '', title: '', subtitle: '' })
}

const removeItem = (index: number) => {
  localValue.value.splice(index, 1)
}
</script>
