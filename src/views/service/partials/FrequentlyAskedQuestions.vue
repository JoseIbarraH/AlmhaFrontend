<template>
  <h3 class="text-lg font-semibold leading-tight text-gray-800">
    {{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Title') }}
  </h3>

  <!-- Contenedor scrollable -->
  <div class="max-h-[400px] overflow-y-auto mt-4 p-2 rounded-lg bg-gray-50">
    <div v-for="(item, index) in modelValue.frequently_asked_questions" :key="index"
      class="relative group grid grid-cols-1 gap-4 mb-2 p-3 border border-gray-300 rounded-lg bg-white">
      <!-- Botón eliminar -->
      <button type="button" @click="removeFrequentlyAskedQuestion(index)"
        class="absolute -top-2 -right-2 border rounded-full border-red-500 text-red-500 text-xs w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white">
        ✕
      </button>

      <!-- Campo Pregunta -->
      <div>
        <InputLabel class="block text-sm font-medium">{{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Question') }}</InputLabel>
        <TextInput type="text" v-model="item.question" class="w-full border rounded px-2 py-1" />
      </div>

      <!-- Campo Respuesta -->
      <div>
        <InputLabel class="block text-sm font-medium">{{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Answer') }}</InputLabel>
        <TextArea type="text" v-model="item.answer" class="w-full h-auto border rounded px-2 py-1" />
      </div>
    </div>
  </div>

  <!-- Botón fuera del scroll -->
  <div class="w-full flex items-center justify-center mt-3">
    <button type="button" @click="addFrequentlyAskedQuestion"
      class="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition">
      +
    </button>
  </div>
</template>


<script setup lang="ts">
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import type { Service } from '../types';

const modelValue = defineModel<Service>({
  required: true
})

function addFrequentlyAskedQuestion() {
  modelValue.value.frequently_asked_questions.push({ question: '', answer: '' })
}

function removeFrequentlyAskedQuestion(index: number) {
  modelValue.value.frequently_asked_questions.splice(index, 1)
}

</script>
