<template>
  <section
    class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-10 bg-white mb-6 dark:bg-gray-800 dark:border-gray-900">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-xl font-bold dark:text-gray-100">{{ $t('Dashboard.Procedure.Edit.Faq.Title') }}</h1>
      <h2 class="text-gray-600 dark:text-gray-400">{{ $t('Dashboard.Procedure.Edit.Faq.Subtitle') }}</h2>
    </div>

    <!-- DRAG & DROP -->
    <draggable v-model="localFaq" item-key="tempId" handle=".drag-handle" @end="updateOrder"
      class="space-y-4 max-h-[500px] overflow-y-scroll">
      <template #item="{ element, index }">
        <div
          class="relative flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-4 bg-white dark:bg-gray-800 dark:border-gray-900">

          <!-- Drag Handle -->
          <div class="drag-handle cursor-move text-sm text-gray-500 flex items-center gap-2 dark:text-gray-100">
            <span>☰</span>
            <span class="font-semibold">{{ $t('Dashboard.Procedure.Edit.Faq.DragTitle') }} {{ element.order }}</span>
            <span v-if="element.id === 0" class="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
              {{ $t('Dashboard.Procedure.Edit.Faq.New') }}
            </span>
          </div>

          <!-- Título -->
          <div>
            <InputLabel for="question" :value="$t('Dashboard.Procedure.Edit.Faq.InputQuestion')" />
            <TextInput id="question" v-model="element.question"
              :placeholder="$t('Dashboard.Procedure.Edit.Faq.InputQuestionPlaceholder')" @input="handleEdit(element)" />
          </div>

          <!-- Descripción -->
          <div>
            <InputLabel for="answer" :value="$t('Dashboard.Procedure.Edit.Faq.InputAnswer')" />
            <TextInput id="answer" v-model="element.answer"
              :placeholder="$t('Dashboard.Procedure.Edit.Faq.InputAnswerPlaceholder')" @input="handleEdit(element)" />
          </div>

          <!-- Botón Eliminar -->
          <CloseButton class="top-1 right-1" @click="removeFaq(index)" />
        </div>
      </template>
    </draggable>

    <!-- Botón Agregar -->
    <button @click="addFaq"
      class="flex justify-center items-center gap-2 p-2 hover:bg-gray-300 border rounded-lg border-gray-300 w-full transition dark:text-gray-100 dark:hover:text-gray-800">
      <LucidePlus class="w-4 h-4" />
      {{ $t('Dashboard.Procedure.Edit.Faq.AddStep') }}
    </button>
  </section>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, watch } from 'vue'
import TextInput from '@/components/ui/TextInput.vue'
import InputLabel from '@/components/ui/InputLabel.vue'
import CloseButton from '@/components/ui/CloseButton.vue'
import { LucidePlus } from 'lucide-vue-next'
import type { ProcedureFrontend, FaqBackend } from '../types'

interface Faq extends FaqBackend {
  tempId?: string
}

interface Props {
  faq?: Faq[]
}

const props = withDefaults(defineProps<Props>(), {
  faq: () => []
})

const modelValue = defineModel<ProcedureFrontend>({
  required: true
})

const localFaq = ref<Faq[]>([])
let tempIdCounter = 0

const generateTempId = () => `temp_${Date.now()}_${tempIdCounter++}`

if (!modelValue.value.faq) {
  modelValue.value.faq = {
    deleted: [],
    updated: [],
    new: []
  }
}

watch(
  () => props.faq,
  (value) => {
    if (value.length > 0) {
      localFaq.value = value.map(item => ({
        ...item,
        tempId: generateTempId()
      }))

      if (!modelValue.value.faq.updated) {
        modelValue.value.faq.updated = []
      }

      modelValue.value.faq.updated = value.map(item => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
        order: item.order
      }))
    }
  },
  { immediate: true }
)

function addFaq() {
  const newFaq: Faq = {
    id: 0, // 0 = nuevo (no existe en BD)
    question: '',
    answer: '',
    order: localFaq.value.length + 1,
    tempId: generateTempId()
  }

  localFaq.value.push(newFaq)

  // ✅ Asegurar que el array new existe
  if (!modelValue.value.faq.new) {
    modelValue.value.faq.new = []
  }

  // ✅ Agregar a "new"
  modelValue.value.faq.new.push({
    question: newFaq.question,
    answer: newFaq.answer,
    order: newFaq.order
  })
}

function handleEdit(value: Faq) {
  // Asegurar que las estructuras existen
  if (!modelValue.value.faq.updated) {
    modelValue.value.faq.updated = []
  }
  if (!modelValue.value.faq.new) {
    modelValue.value.faq.new = []
  }

  if (value.id > 0) {
    // ✅ Es existente en BD → actualizar en "updated"
    const index = modelValue.value.faq.updated.findIndex(s => s.id === value.id)

    if (index !== -1) {
      modelValue.value.faq.updated[index] = {
        id: value.id,
        question: value.question,
        answer: value.answer,
        order: value.order
      }
    }
  } else {
    // ✅ Es nuevo → actualizar en "new"
    const index = modelValue.value.faq.new.findIndex(s => s.order === value.order)

    if (index !== -1) {
      modelValue.value.faq.new[index] = {
        question: value.question,
        answer: value.answer,
        order: value.order
      }
    }
  }
}

function removeFaq(index: number) {
  const value = localFaq.value[index]
  if (!value) return

  // Asegurar que las estructuras existen
  if (!modelValue.value.faq.deleted) {
    modelValue.value.faq.deleted = []
  }
  if (!modelValue.value.faq.updated) {
    modelValue.value.faq.updated = []
  }
  if (!modelValue.value.faq.new) {
    modelValue.value.faq.new = []
  }

  if (value.id > 0) {
    // ✅ Existe en BD → agregar ID a "deleted"
    if (!modelValue.value.faq.deleted.includes(value.id)) {
      modelValue.value.faq.deleted.push(value.id)
    }

    // ✅ Remover de "updated"
    modelValue.value.faq.updated = modelValue.value.faq.updated.filter(
      s => s.id !== value.id
    )
  } else {
    // ✅ Es nuevo → remover de "new"
    modelValue.value.faq.new = modelValue.value.faq.new.filter(
      s => s.order !== value.order
    )
  }

  // Remover del local
  localFaq.value.splice(index, 1)

  // Recalcular orden
  updateOrder()
}

// ============================================
// ACTUALIZAR ORDEN (después de drag)
// ============================================

function updateOrder() {
  localFaq.value.forEach((value, index) => {
    const newOrder = index + 1

    // Solo actualizar si cambió
    if (value.order !== newOrder) {
      const oldOrder = value.order
      value.order = newOrder

      if (value.id > 0) {
        // ✅ Actualizar orden en "updated"
        const updateItem = modelValue.value.faq.updated.find(s => s.id === value.id)
        if (updateItem) {
          updateItem.order = newOrder
        }
      } else {
        // ✅ Actualizar orden en "new" - buscar por orden anterior
        const newItem = modelValue.value.faq.new.find(s => s.order === oldOrder)
        if (newItem) {
          newItem.order = newOrder
        }
      }
    }
  })
}
</script>

<style scoped>
.drag-handle {
  user-select: none;
}

.drag-handle:hover {
  color: #374151;
}
</style>
