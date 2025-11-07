<template>
  <h3 class="text-lg font-semibold leading-tight text-gray-800 mb-3">
    Fases del Procedimiento
  </h3>

  <div class="grid grid-cols-1 md:grid-cols-3">
    <!-- 🩹 Recuperación -->
    <div class="rounded-lg p-2 flex flex-col">
      <h3 class="block text-sm font-medium text-gray-700 text-center my-2">
        Tiempo de recuperación
      </h3>

      <!-- Contenedor con scroll -->
      <div class="overflow-y-auto overflow-x-hidden max-h-[300px] pt-2 px-1">
        <div v-for="(item, index) in modelValue.surgery_phases.recovery_time" :key="index"
          class="relative group grid grid-cols-1 gap-4 mb-3 rounded-lg bg-gray-50 border border-gray-200">
          <button type="button" @click="removeRecoveryTime(index)"
            class="absolute -top-1 -right-1 border rounded-full border-red-500 text-red-500 text-xs w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white">
            ✕
          </button>

          <TextInput :modelValue="item" @update:modelValue="(val) => updateRecoveryTime(index, val)"
            class="w-full border rounded px-2 py-1" />
        </div>
      </div>

      <!-- Botón fuera del scroll -->
      <div class="w-full flex items-center justify-center mt-3">
        <button type="button" @click="addRecoveryTime"
          class="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition">
          +
        </button>
      </div>
    </div>

    <!-- 🧠 Sugerencias Pre -->
    <div class="rounded-lg p-2 flex flex-col">
      <h3 class="block text-sm font-medium text-gray-700 text-center my-2">
        Sugerencias Prequirúrgicas
      </h3>

      <div class="overflow-y-auto overflow-x-hidden max-h-[300px] pt-2 px-1">
        <div v-for="(item, index) in modelValue.surgery_phases.preoperative_recommendations" :key="index"
          class="relative group grid grid-cols-1 gap-4 mb-3 rounded-lg bg-gray-50 border border-gray-200">
          <button type="button" @click="removePreoperativeRecommendation(index)"
            class="absolute -top-1 -right-1 border rounded-full border-red-500 text-red-500 text-xs w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white">
            ✕
          </button>

          <TextInput :modelValue="item" @update:modelValue="(val) => updatePreoperativeRecommendation(index, val)"
            class="w-full border rounded px-2 py-1" />
        </div>
      </div>

      <div class="w-full flex items-center justify-center mt-3">
        <button type="button" @click="addPreoperativeRecommendation"
          class="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition">
          +
        </button>
      </div>
    </div>

    <!-- 💊 Sugerencias Post -->
    <div class="rounded-lg p-2 flex flex-col">
      <h3 class="block text-sm font-medium text-gray-700 text-center my-2">
        Sugerencias Postquirúrgicas
      </h3>

      <div class="overflow-y-auto overflow-x-hidden max-h-[300px] pt-2 px-1">
        <div v-for="(item, index) in modelValue.surgery_phases.postoperative_recommendations" :key="index"
          class="relative group grid grid-cols-1 gap-4 mb-3 rounded-lg bg-gray-50 border border-gray-200">
          <button type="button" @click="removePostoperativeRecommendation(index)"
            class="absolute -top-1 -right-1 border rounded-full border-red-500 text-red-500 text-xs w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white">
            ✕
          </button>

          <TextInput :modelValue="item" @update:modelValue="(val) => updatePostoperativeRecommendation(index, val)"
            class="w-full border rounded px-2 py-1" />
        </div>
      </div>

      <div class="w-full flex items-center justify-center mt-3">
        <button type="button" @click="addPostoperativeRecommendation"
          class="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition">
          +
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import TextInput from '@/components/ui/TextInput.vue'
import type { Service } from '../types'

const modelValue = defineModel<Service>({ required: true })

// Evita errores si surgery_phases no existe aún (por ejemplo antes del fetch)
if (!modelValue.value.surgery_phases) {
  modelValue.value.surgery_phases = {
    id: 0,
    lang: '',
    recovery_time: [],
    preoperative_recommendations: [],
    postoperative_recommendations: []
  }
}

// 🧩 Métodos seguros
function addRecoveryTime() {
  modelValue.value.surgery_phases.recovery_time.push('')
}
function removeRecoveryTime(i: number) {
  modelValue.value.surgery_phases.recovery_time.splice(i, 1)
}

function updateRecoveryTime(i: number, value: string) {
  modelValue.value.surgery_phases.recovery_time[i] = value
}

function addPreoperativeRecommendation() {
  modelValue.value.surgery_phases.preoperative_recommendations.push('')
}
function removePreoperativeRecommendation(i: number) {
  modelValue.value.surgery_phases.preoperative_recommendations.splice(i, 1)
}
function updatePreoperativeRecommendation(i: number, value: string) {
  modelValue.value.surgery_phases.preoperative_recommendations[i] = value
}

function addPostoperativeRecommendation() {
  modelValue.value.surgery_phases.postoperative_recommendations.push('')
}
function removePostoperativeRecommendation(i: number) {
  modelValue.value.surgery_phases.postoperative_recommendations.splice(i, 1)
}
function updatePostoperativeRecommendation(i: number, value: string) {
  modelValue.value.surgery_phases.postoperative_recommendations[i] = value
}
</script>
