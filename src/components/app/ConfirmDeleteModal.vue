<script setup lang="ts">
import Modal from '@/components/app/Modal.vue'
import { LucideCircleX, LucideTrash2, LucideTriangleAlert, LucideX } from 'lucide-vue-next'

interface Props {
  show: boolean
  title?: string
  subtitle?: string
  message?: String
  itemName?: string
  consequencesTitle?: String
  consequences?: string[]
  confirmText?: string
  cancelText?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'confirm'])

function handleClose() {
  emit('close')
}

function handleConfirm() {
  emit('confirm')
}
</script>

<template>
  <Modal :show="props.show" :max-width="props.maxWidth || 'md'" @close="handleClose">
    <div class="relative bg-white dark:bg-gray-800 rounded-lg">
      <div class="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-t-lg dark:from-red-900/30 dark:to-red-900/50">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <div
              class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center ring-8 ring-red-50 dark:bg-red-900 dark:ring-red-950">
              <LucideTriangleAlert class="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-900 mb-1 dark:text-white">
              {{ props.title }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ props.subtitle }}
            </p>
          </div>

          <button @click="handleClose"
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
            <LucideX class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="p-6 bg-white dark:bg-gray-800">
        <p class="text-gray-700 leading-relaxed dark:text-gray-300">
          {{ props.message }}
          <span v-if="props.itemName"
            class="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-gray-100 text-gray-900 font-semibold text-sm border border-gray-200 dark:bg-gray-700 dark:text-white dark:border-gray-600">
            "{{ props.itemName }}"
          </span>?
        </p>

        <div v-if="props.consequences?.length"
          class="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg dark:bg-red-900/30 dark:border-red-900/50">
          <p class="text-sm font-medium text-red-800 mb-2 dark:text-red-400">
            {{ props.consequencesTitle }}
          </p>
          <ul class="text-sm text-red-700 space-y-1.5 dark:text-red-300">
            <li v-for="(consequence, index) in props.consequences" :key="index" class="flex items-start gap-2">
              <LucideCircleX class="w-4 h-4 mt-0.5 flex-shrink-0 dark:text-red-400" />
              <span>{{ consequence }}</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <button type="button" @click="handleClose"
            class="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200
                   dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-800">
            {{ props.cancelText }}
          </button>

          <button type="button" @click="handleConfirm"
            class="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-200 flex items-center justify-center gap-2">
            <LucideTrash2 class="w-5 h-5" />
            {{ props.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>
