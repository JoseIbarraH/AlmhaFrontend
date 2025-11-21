<script setup lang="ts">
import Modal from '@/components/app/Modal.vue'

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
      <!-- Header -->
      <div class="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-t-lg dark:from-red-900/30 dark:to-red-900/50">
        <div class="flex items-start gap-4">
          <!-- Icono de advertencia -->
          <div class="flex-shrink-0">
            <div
              class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center ring-8 ring-red-50 dark:bg-red-900 dark:ring-red-950">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <!-- Título y subtítulo -->
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-900 mb-1 dark:text-white">
              {{ props.title }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ props.subtitle }}
            </p>
          </div>

          <!-- Botón cerrar -->
          <button @click="handleClose"
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Contenido -->
      <div class="p-6 bg-white dark:bg-gray-800">
        <p class="text-gray-700 leading-relaxed dark:text-gray-300">
          {{ props.message }}
          <span
            v-if="props.itemName"
            class="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-gray-100 text-gray-900 font-semibold text-sm border border-gray-200 dark:bg-gray-700 dark:text-white dark:border-gray-600">
            "{{ props.itemName }}"
          </span>?
        </p>

        <!-- Lista de consecuencias -->
        <div v-if="props.consequences?.length"
          class="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg dark:bg-red-900/30 dark:border-red-900/50">
          <p class="text-sm font-medium text-red-800 mb-2 dark:text-red-400">
            {{ props.consequencesTitle }}
          </p>
          <ul class="text-sm text-red-700 space-y-1.5 dark:text-red-300">
            <li v-for="(consequence, index) in props.consequences" :key="index" class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd" />
              </svg>
              <span>{{ consequence }}</span>
            </li>
          </ul>
        </div>

        <!-- Botones -->
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <button
            type="button"
            @click="handleClose"
            class="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200
                   dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-800">
            {{ props.cancelText }}
          </button>

          <button
            type="button"
            @click="handleConfirm"
            class="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-200 flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {{ props.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>
