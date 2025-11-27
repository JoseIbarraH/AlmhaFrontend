<template>
  <div class="space-y-4">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <LucideImage class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold leading-tight text-gray-800 dark:text-white">
            {{ $t('Dashboard.Service.CreateUpdate.ResultsGallery.Title') }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {{ modelValue.results_gallery?.length || 0 }}
            {{ modelValue.results_gallery?.length === 1 ? 'imagen' : 'imagenes' }}
          </p>
        </div>
      </div>

      <button type="button" @click="addBeforeAfterGallery"
        class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
        <LucidePlus class="w-4 h-4" />
        <span class="hidden sm:inline">Agregar imagen</span>
      </button>
    </div>

    <div
      class="max-h-[500px] overflow-y-auto p-1 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
      <div class="p-3 space-y-4">
        <div v-if="!modelValue.results_gallery || modelValue.results_gallery.length === 0"
          class="text-center py-16 px-4">
          <div class="inline-flex p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <LucideImage class="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            No hay imágenes en la galería
          </h4>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            Agrega imagenes de resultados para aportar fiabilidad a tus clientes
          </p>
          <button type="button" @click="addBeforeAfterGallery"
            class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
            <LucidePlus class="w-4 h-4" />
            <span class="hidden sm:inline">Agregar primera imagen</span>
          </button>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(value, index) in modelValue.results_gallery" :key="index">
            <div class="relative">
              <ImagesPreview v-model="value.path" :close-button="false" />
              <button type="button" @click="removeAfterBefore(index)"
                class="absolute top-1 right-1 border-2 rounded-full dark:bg-transparent border-red-500 text-red-500 text-sm w-7 h-7 flex items-center justify-center bg-white shadow-lg hover:bg-red-500 hover:text-white hover:scale-110 transform transition-all duration-200"
                :title="'Eliminar imagen ' + (index + 1)">
                <LucideX class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Info Footer -->
    <div
      class="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mt-4">
      <LucideInfo class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
      <div class="text-sm text-blue-800 dark:text-blue-300">
        <p class="font-medium mb-1">Consejos para una mejor galería:</p>
        <ul class="space-y-1 text-blue-700 dark:text-blue-400">
          <li>• Haz clic en cualquier imagen para cambiarla o editarla</li>
          <li>• Usa imágenes de alta calidad y buena iluminación</li>
          <li>• Mantén un formato consistente para mejor visualización</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import { LucideImage, LucideX, LucidePlus, LucideInfo } from 'lucide-vue-next';
import type { Service } from '../types';

const modelValue = defineModel<Service>({
  required: true
})

const removeAfterBefore = (index: number) => {
  modelValue.value.results_gallery.splice(index, 1)
}

const addBeforeAfterGallery = () => {
  modelValue.value.results_gallery.push({
    path: null
  })
}
</script>
