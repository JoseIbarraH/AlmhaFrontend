<template>
  <div class="grid grid-cols-1 gap-4 mt-4 border-2 border-dashed rounded-md p-4">

    <span v-if="localValue.length === 0" class="text-gray-500 col-span-full text-center">
      {{ $t('Dashboard.Design.ChooseCarouselImage.DropImage') }}
    </span>

    <!-- Contenedor scrollable -->
    <div class="max-h-[500px] overflow-y-auto space-y-4 pr-2">
      <div v-for="(item, index) in localValue" :key="index"
        class="relative group border rounded-md p-3 bg-white shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          <!-- Imagen / Video -->
          <div class="w-full relative aspect-square">
            <ImagesPreview v-model="item.path" alt="Gallery Image" class="object-cover w-full h-full rounded-md" />
          </div>

          <!-- Inputs -->
          <div class="w-full md:col-span-2 space-y-3">
            <div>
              <InputLabel :for="`design_title_${index}`"
                :value="$t('Dashboard.Design.ChooseCarouselImage.LabelTitle')" />
              <TextInput :id="`design_title_${index}`" v-model="item.title" type="text" class="mt-1 block w-full"
                :placeholder="$t('Dashboard.Design.ChooseCarouselImage.LabelTitlePlaceholder')" />
            </div>

            <div>
              <InputLabel :for="`design_slogan_${index}`"
                :value="$t('Dashboard.Design.ChooseCarouselImage.LabelSlogan')" />
              <TextInput :id="`design_slogan_${index}`" v-model="item.subtitle" type="text" class="mt-1 block w-full"
                :placeholder="$t('Dashboard.Design.ChooseCarouselImage.LabelSloganPlaceholder')" />
            </div>
          </div>

          <CloseButton @click.stop="removeItem(index)" class="absolute top-1 right-1" aria-label="Eliminar archivo" />
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
import ImagesPreview from '@/components/ImagesPreview.vue'
import CloseButton from '@/components/CloseButton.vue'
import InputLabel from '@/components/InputLabel.vue'
import TextInput from '@/components/TextInput.vue'
import type { CarouselItem } from '../types'
import { ref, watch } from 'vue'

const model = defineModel<CarouselItem[]>('carousel', { default: [] })

const localValue = ref<CarouselItem[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

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

/* watch(
  localValue,
  (val) => {
    const current = JSON.stringify(model.value || [])
    const incoming = JSON.stringify(val)
    if (current !== incoming) {
      model.value = JSON.parse(incoming)
    }
    console.log("prueba? ", localValue)
  },
  { deep: true }
) */

watch(
  localValue,
  (val) => {
    // No usar JSON.stringify: eso destruye los File
    const current = model.value || []
    const isDifferent = val.length !== current.length ||
      val.some((item, i) => item.path !== current[i]?.path ||
                            item.title !== current[i]?.title ||
                            item.subtitle !== current[i]?.subtitle)

    if (isDifferent) {
      // Crear copia superficial para evitar referencia directa
      model.value = val.map(item => ({ ...item }))
    }

    console.log("🔥 prueba (preserva File):", val)
  },
  { deep: true }
)

const addItem = () => {
  localValue.value.push({path: '', title: '', subtitle: ''})
  console.log('estoy aqui?', localValue.value)
}

const removeItem = (index: number) => {
  localValue.value.splice(index, 1)
}
</script>
