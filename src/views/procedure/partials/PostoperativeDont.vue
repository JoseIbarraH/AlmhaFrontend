<template>
  <div
    class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-10 bg-white mb-6 dark:bg-gray-800 dark:border-gray-900">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-xl font-bold dark:text-gray-100">{{ $t('Dashboard.Procedure.Edit.Postoperative.Dont.Title') }}
      </h1>
      <h2 class="text-gray-600 dark:text-gray-400">{{ $t('Dashboard.Procedure.Edit.Postoperative.Dont.Subtitle') }}</h2>
    </div>

    <!-- DRAG & DROP -->
    <draggable v-model="localDont" item-key="tempId" handle=".drag-handle" @end="updateOrder"
      class="space-y-4 max-h-[500px] overflow-y-scroll">
      <template #item="{ element, index }">
        <div
          class="relative flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-4 bg-white dark:bg-gray-800 dark:border-gray-900">

          <!-- Drag Handle -->
          <div class="drag-handle cursor-move text-sm text-gray-500 flex items-center gap-2 dark:text-gray-100">
            <span>☰</span>
            <span class="font-semibold">{{ $t('Dashboard.Procedure.Edit.Postoperative.Dont.DragTitle') }} {{
              element.order }}</span>
            <span v-if="element.id === 0" class="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
              {{ $t('Dashboard.Procedure.Edit.Postoperative.Dont.New') }}
            </span>
          </div>

          <!-- Título -->
          <div>
            <InputLabel :value="$t('Dashboard.Procedure.Edit.Postoperative.Dont.InputContent')" />
            <TextInput v-model="element.content"
              :placeholder="$t('Dashboard.Procedure.Edit.Postoperative.Dont.InputContentPlaceholder')"
              @input="handleEdit(element)" />
          </div>

          <!-- Botón Eliminar -->
          <CloseButton class="top-1 right-1" @click="removeDont(index)" />
        </div>
      </template>
    </draggable>

    <!-- Botón Agregar -->
    <button @click="addDont"
      class="flex justify-center items-center gap-2 p-2 hover:bg-gray-300 border rounded-lg border-gray-300 w-full transition dark:text-gray-100 dark:hover:text-gray-800">
      <LucidePlus class="w-4 h-4" />
      {{ $t('Dashboard.Procedure.Edit.Postoperative.Dont.AddStep') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, watch } from 'vue'
import TextInput from '@/components/ui/TextInput.vue'
import InputLabel from '@/components/ui/InputLabel.vue'
import CloseButton from '@/components/ui/CloseButton.vue'
import { LucidePlus } from 'lucide-vue-next'
import type { ProcedureFrontend, DontBackend } from '../types'

interface Dont extends DontBackend {
  tempId?: string
}

interface Props {
  dont?: Dont[]
}

const props = withDefaults(defineProps<Props>(), {
  dont: () => []
})

const modelValue = defineModel<ProcedureFrontend>({
  required: true
})

const localDont = ref<Dont[]>([])
let tempIdCounter = 0

// Generar ID temporal único
const generateTempId = () => `temp_${Date.now()}_${tempIdCounter++}`

// Asegurar que la estructura do existe
if (!modelValue.value.dont) {
  modelValue.value.dont = {
    deleted: [],
    updated: [],
    new: []
  }
}

watch(
  () => props.dont,
  (value) => {
    if (value.length > 0) {
      localDont.value = value.map(item => ({
        ...item,
        tempId: generateTempId()
      }))

      if (!modelValue.value.dont.updated) {
        modelValue.value.dont.updated = []
      }

      modelValue.value.dont.updated = value.map(item => ({
        id: item.id,
        content: item.content,
        order: item.order
      }))
    }
  },
  { immediate: true }
)

function addDont() {
  const newDont: Dont = {
    id: 0, // 0 = nuevo (no existe en BD)
    content: '',
    order: localDont.value.length + 1,
    tempId: generateTempId()
  }

  localDont.value.push(newDont)

  // ✅ Asegurar que el array new existe
  if (!modelValue.value.dont.new) {
    modelValue.value.dont.new = []
  }

  // ✅ Agregar a "new"
  modelValue.value.dont.new.push({
    content: newDont.content,
    order: newDont.order
  })
}

function handleEdit(dontValue: Dont) {
  // Asegurar que las estructuras existen
  if (!modelValue.value.dont.updated) {
    modelValue.value.dont.updated = []
  }
  if (!modelValue.value.dont.new) {
    modelValue.value.dont.new = []
  }

  if (dontValue.id > 0) {
    // ✅ Es existente en BD → actualizar en "updated"
    const index = modelValue.value.dont.updated.findIndex(s => s.id === dontValue.id)

    if (index !== -1) {
      modelValue.value.dont.updated[index] = {
        id: dontValue.id,
        content: dontValue.content,
        order: dontValue.order
      }
    }
  } else {
    // ✅ Es nuevo → actualizar en "new"
    const index = modelValue.value.dont.new.findIndex(s => s.order === dontValue.order)

    if (index !== -1) {
      modelValue.value.dont.new[index] = {
        content: dontValue.content,
        order: dontValue.order
      }
    }
  }
}

function removeDont(index: number) {
  const dontValue = localDont.value[index]
  if (!dontValue) return

  // Asegurar que las estructuras existen
  if (!modelValue.value.dont.deleted) {
    modelValue.value.dont.deleted = []
  }
  if (!modelValue.value.dont.updated) {
    modelValue.value.dont.updated = []
  }
  if (!modelValue.value.dont.new) {
    modelValue.value.dont.new = []
  }

  if (dontValue.id > 0) {
    // ✅ Existe en BD → agregar ID a "deleted"
    if (!modelValue.value.dont.deleted.includes(dontValue.id)) {
      modelValue.value.dont.deleted.push(dontValue.id)
    }

    // ✅ Remover de "updated"
    modelValue.value.dont.updated = modelValue.value.dont.updated.filter(
      s => s.id !== dontValue.id
    )
  } else {
    // ✅ Es nuevo → remover de "new"
    modelValue.value.dont.new = modelValue.value.dont.new.filter(
      s => s.order !== dontValue.order
    )
  }

  // Remover del local
  localDont.value.splice(index, 1)

  // Recalcular orden
  updateOrder()
}

function updateOrder() {
  localDont.value.forEach((dontValue, index) => {
    const newOrder = index + 1

    // Solo actualizar si cambió
    if (dontValue.order !== newOrder) {
      const oldOrder = dontValue.order
      dontValue.order = newOrder

      if (dontValue.id > 0) {
        // ✅ Actualizar orden en "updated"
        const updateItem = modelValue.value.dont.updated.find(s => s.id === dontValue.id)
        if (updateItem) {
          updateItem.order = newOrder
        }
      } else {
        // ✅ Actualizar orden en "new" - buscar por orden anterior
        const newItem = modelValue.value.dont.new.find(s => s.order === oldOrder)
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
