<template>
  <div class="rounded-lg p-2 flex flex-col">
    <h3 class="block text-sm font-medium text-gray-700 dark:text-white text-center my-2">
      {{ title }}
    </h3>

    <div class="overflow-y-auto overflow-x-hidden max-h-[300px] pt-2 px-1">
      <div v-for="(item, index) in modelValue" :key="index"
        class="grid grid-cols-1 group gap-4 mb-3 rounded-lg bg-white dark:bg-gray-900 border border-white dark:border-gray-900">
        <div class="flex gap-2 items-center">
          <TextInput :modelValue="item" :placeholder="placeholder" @update:modelValue="(val) => update(index, val)"
            class="border rounded-md py-2 px-4 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white w-full
                    text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-600 dark:focus:ring-indigo-600" />

          <button type="button" @click="remove(index)"
            class="w-8 h-7 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
            <LucideX class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <div class="w-full flex items-center justify-center mt-3">
      <button type="button" @click="add"
        class="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition">
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextInput from '@/components/ui/TextInput.vue'
import { LucideX } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string[]
  title: string
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

function add() {
  emit('update:modelValue', [...props.modelValue, ''])
}

function remove(index: number) {
  const items = [...props.modelValue]
  items.splice(index, 1)
  emit('update:modelValue', items)
}

function update(index: number, value: string) {
  const items = [...props.modelValue]
  items[index] = value
  emit('update:modelValue', items)
}
</script>
