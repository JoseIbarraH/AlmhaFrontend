<template>
  <div class="space-y-4">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <LucideCircleHelp class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold leading-tight text-gray-800 dark:text-white">
            {{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Title') }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {{ $t('Dashboard.Service.CreateUpdate.ResultsGallery.TextCount', {
              count:
                modelValue.frequently_asked_questions?.length
            }) }}
          </p>
        </div>
      </div>

      <button type="button" @click="addFrequentlyAskedQuestion"
        class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
        <LucidePlus class="w-4 h-4" />
        <span class="hidden sm:inline">{{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.AddQuestion')
        }}</span>
      </button>
    </div>

    <!-- FAQ Cards Container -->
    <div
      class="overflow-visible max-h-[500px] overflow-y-auto p-1 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
      <div class="p-3 space-y-4">
        <div v-for="(item, index) in modelValue.frequently_asked_questions" :key="index"
          class="relative group p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600">

          <button type="button" @click="removeFrequentlyAskedQuestion(index)"
            class="absolute -top-3 -right-3 border-2 rounded-full border-red-500 text-red-500 text-sm w-7 h-7 flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg hover:bg-red-500 hover:text-white hover:scale-110 transform"
            :title="'Eliminar pregunta ' + (index + 1)">
            <LucideX class="w-4 h-4" />
          </button>

          <div
            class="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-lg">
            {{ index + 1 }}
          </div>

          <div class="grid grid-cols-1 gap-5 pt-2">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <LucideCircleHelp class="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <InputLabel class="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Question') }}
                </InputLabel>
              </div>
              <TextInput type="text" v-model="item.question"
                :placeholder="$t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Question')"
                class="border-2 rounded-lg py-2.5 px-4 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 bg-white w-full text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-500 transition-all duration-200" />
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <LucideMessageSquareText class="h-4 w-4 text-green-600 dark:text-green-500 flex-shrink-0" />
                <InputLabel class="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Answer') }}
                </InputLabel>
              </div>
              <TextArea v-model="item.answer"
                :placeholder="$t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Answer')" rows="3"
                class="border-2 rounded-lg py-2.5 px-4 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 bg-white w-full text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-500 transition-all duration-200 resize-none" />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!modelValue.frequently_asked_questions || modelValue.frequently_asked_questions.length === 0"
          class="text-center py-16 px-4">
          <div class="inline-flex p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <LucideCircleHelp class="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.NoQuestion') }}
          </h4>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            {{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.AddQuestionText') }}
          </p>
          <button type="button" @click="addFrequentlyAskedQuestion"
            class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
            <LucidePlus class="w-4 h-4" />
            {{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.ButtonFirst') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Info Footer -->
    <div
      class="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <LucideInfo class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
      <div class="text-sm text-blue-800 dark:text-blue-300">
        <p class="font-medium mb-1">
          {{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Advices.Title') }}
        </p>
        <ul class="space-y-1 text-blue-700 dark:text-blue-400">
          <li>{{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Advices.First') }}</li>
          <li>{{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Advices.Second') }}</li>
          <li>{{ $t('Dashboard.Service.CreateUpdate.FrequentlyAskedQuestions.Advices.Third') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { LucideCircleHelp, LucideInfo, LucideMessageSquareText, LucidePlus, LucideX } from 'lucide-vue-next';
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
