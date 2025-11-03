<template>
  <h3 class="text-lg font-semibold leading-tight text-gray-800">{{
    $t('Dashboard.Team.CreateUpdate.PersonalInfo.Result.Title') }}</h3>

  <div class="max-h-[500px] overflow-y-auto space-y-4 mt-4">
    <!-- Iteración de resultados -->
    <div v-for="(value, index) in modelValue.results" :key="index"
      class="relative bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 items-start">
      <input type="text" v-model="value.id" class="hidden">
      <!-- Imagen -->
      <div class="relative w-full sm:w-32 sm:flex-shrink-0">
        <div class="w-full aspect-square overflow-hidden rounded border">
          <ImagesPreview v-model="value.url" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Descripción -->
      <div class="flex-1 w-full">
        <InputLabel :for="`description-${index}`"
          :value="$t('Dashboard.Team.CreateUpdate.PersonalInfo.Result.Description')" />
        <TextInput :id="`description-${index}`" type="text" v-model="value.description" class="w-full mt-1"
          placeholder="Descripción" />
      </div>

      <!-- Botón eliminar registro -->
      <CloseButton @click.stop="removeResult(index)"
        class="absolute top-1 left-1 md:left-auto md:right-1 bg-white rounded-full shadow-md z-20"
        aria-label="Eliminar registro" />

    </div>

    <!-- Botón agregar -->
    <div class="flex justify-center">
      <button type="button" @click="addResult" class="mt-2 border border-blue-500 text-blue-500 px-3 py-1 rounded"
        aria-label="Agregar antes/después">
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import CloseButton from '@/components/ui/CloseButton.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import type { TeamMember } from '../types';

const modelValue = defineModel<TeamMember>({
  required: true
})

function addResult() {
  modelValue.value.results.push({
    id: null,
    url: '',
    description: ''
  })
}

function removeResult(index: number) {
  modelValue.value.results.splice(index, 1)
}

</script>
