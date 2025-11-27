<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
        <LucideClipboardList class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 class="text-lg font-semibold leading-tight text-gray-800 dark:text-white mb-3">
        {{ $t('Dashboard.Service.CreateUpdate.Phases.Title') }}
      </h3>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3">
    <!-- 🩹 Recuperación -->
    <div class="rounded-lg p-2 flex flex-col">
      <h3 class="block text-sm font-medium text-gray-700 dark:text-white text-center my-2">
        {{ $t('Dashboard.Service.CreateUpdate.Phases.RecoveryTime') }}
      </h3>

      <!-- Contenedor con scroll -->
      <div class="overflow-y-auto overflow-x-hidden max-h-[300px] pt-2 px-1">
        <div v-for="(item, index) in modelValue.surgery_phases.recovery_time" :key="index"
          class="grid grid-cols-1 group gap-4 mb-3 rounded-lg bg-white dark:bg-gray-900 border border-white dark:border-gray-900">
          <div class="flex gap-2 items-center">
            <TextInput :modelValue="item" @update:modelValue="(val) => updateRecoveryTime(index, val)"
              class="border rounded-md py-2 px-4 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white w-full
                  text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-600 dark:focus:ring-indigo-600" />
            <button type="button" @click="removeRecoveryTime(index)"
              class="w-8 h-7 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
              <LucideX class="w-4 h-4" />
            </button>
          </div>
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
      <h3 class="block text-sm font-medium text-gray-700 dark:text-white text-center my-2">
        {{ $t('Dashboard.Service.CreateUpdate.Phases.PreOperative') }}
      </h3>

      <div class="overflow-y-auto overflow-x-hidden max-h-[300px] pt-2 px-1">
        <div v-for="(item, index) in modelValue.surgery_phases.preoperative_recommendations" :key="index"
          class="grid grid-cols-1 group gap-4 mb-3 rounded-lg bg-white dark:bg-gray-900 border border-white dark:border-gray-900">
          <div class="flex gap-2 items-center">
            <TextInput :modelValue="item" @update:modelValue="(val) => updatePreoperativeRecommendation(index, val)"
              class="border rounded-md py-2 px-4 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white w-full
                  text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-600 dark:focus:ring-indigo-600" />

            <button type="button" @click="removePreoperativeRecommendation(index)"
              class="w-8 h-7 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
              <LucideX class="w-4 h-4" />
            </button>
          </div>
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
      <h3 class="block text-sm font-medium text-gray-700 dark:text-white text-center my-2">
        {{ $t('Dashboard.Service.CreateUpdate.Phases.PostOperative') }}
      </h3>

      <div class="overflow-y-auto overflow-x-hidden max-h-[300px] pt-2 px-1">
        <div v-for="(item, index) in modelValue.surgery_phases.postoperative_recommendations" :key="index"
          class="grid grid-cols-1 group gap-4 mb-3 rounded-lg bg-white dark:bg-gray-900 border border-white dark:border-gray-900">
          <div class="flex gap-2 items-center">
            <TextInput :modelValue="item" @update:modelValue="(val) => updatePostoperativeRecommendation(index, val)"
              class="border rounded-md py-2 px-4 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white w-full
                  text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-600 dark:focus:ring-indigo-600" />

            <button type="button" @click="removePostoperativeRecommendation(index)"
              class="w-8 h-7 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
              <LucideX class="w-4 h-4" />
            </button>
          </div>
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
import { LucideClipboardList, LucideX } from 'lucide-vue-next'

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
