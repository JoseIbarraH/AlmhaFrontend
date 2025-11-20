<template>
  <div class="grid grid-cols-1 gap-4 mt-4 border-2 border-dashed border-gray-300 rounded-md p-4">
    <span v-if="carouselImage?.length === 0" class="text-gray-500 col-span-full text-center">
      {{ $t('Dashboard.Design.ChooseCarouselImage.NewImage') }}
    </span>

    <div class="max-h-[500px] overflow-y-auto space-y-4 pr-2 grid grid-cols-2 md:grid-cols-3 w-full gap-4">
      <div v-for="(value, index) in carouselImage" :key="index"
        class="relative group rounded-md bg-white shadow-sm dark:bg-gray-800 aspect-square">
        <div class="">
          <!-- Preview de imagen -->
          <div class="w-full rounded-md relative aspect-square">
            <img :src="value.full_path" class="h-full rounded-md" />
          </div>

          <div class="absolute flex items-center justify-end gap-2 bottom-1 right-1 ">
            <!-- Botón Editar -->
            <button @click="emit('edit_item', value)" title="Editar" class="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors
                         dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-gray-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            <!-- Botón Eliminar -->
            <button @click.prevent="emit('delete_item', value.id)" title="Eliminar" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors
                         dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón agregar -->
    <div class="flex justify-center">
      <button type="button" @click="emit('create_item')"
        class="mt-2 border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition-colors">
        + Agregar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MediaItem, Setting } from '../types'

defineProps<{
  carouselSetting: Setting
  carouselImage: MediaItem[]
}>()

const emit = defineEmits<{
  (e: 'create_item'): void
  (e: 'edit_item', data: MediaItem): void;
  (e: 'delete_item', id: number): void;
}>();

</script>
