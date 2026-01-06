<template>
  <section class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900">Mantenimiento</h2>
      <p class="text-sm text-gray-500 mt-1">Activa el modo mantenimiento para mostrar una página de mantenimiento</p>
    </div>
    <div class="px-6 py-6">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <h3 class="text-sm font-medium text-gray-900">Modo mantenimiento</h3>
          <p class="text-sm text-gray-500 mt-1">Los visitantes verán una página de mantenimiento</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" v-model="model.is_maintenance_mode">
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
          </div>
        </label>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { System } from '../types';

  const model = defineModel<System>({ required: true })
</script>
