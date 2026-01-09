<template>
  <div
    class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-10 bg-white mb-6 dark:bg-gray-800 dark:border-gray-900">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-xl font-bold dark:text-gray-100">{{ $t('Dashboard.Procedure.Edit.Postoperative.Do.Title') }}</h1>
      <h2 class="text-gray-600 dark:text-gray-400">{{ $t('Dashboard.Procedure.Edit.Postoperative.Do.Subtitle') }}</h2>
    </div>

    <!-- DRAG & DROP -->
    <draggable v-model="localDo" item-key="tempId" handle=".drag-handle" @end="updateOrder"
      class="space-y-4 max-h-[500px] overflow-y-scroll">
      <template #item="{ element, index }">
        <div
          class="relative flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-4 bg-white dark:bg-gray-800 dark:border-gray-900">

          <!-- Drag Handle -->
          <div class="drag-handle cursor-move text-sm text-gray-500 flex items-center gap-2 dark:text-gray-100">
            <span>☰</span>
            <span class="font-semibold">{{ $t('Dashboard.Procedure.Edit.Postoperative.Do.DragTitle') }} {{ element.order
              }}</span>
            <span v-if="element.id === 0" class="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
              {{ $t('Dashboard.Procedure.Edit.Postoperative.Do.New') }}
            </span>
          </div>

          <!-- Título -->
          <div>
            <InputLabel :value="$t('Dashboard.Procedure.Edit.Postoperative.Do.InputContent')" />
            <TextInput v-model="element.content"
              :placeholder="$t('Dashboard.Procedure.Edit.Postoperative.Do.InputContentPlaceholder')"
              @input="handleEdit(element)" />
          </div>

          <!-- Botón Eliminar -->
          <CloseButton class="top-1 right-1" @click="removeDo(index)" />
        </div>
      </template>
    </draggable>

    <!-- Botón Agregar -->
    <button @click="addDo"
      class="flex justify-center items-center gap-2 p-2 hover:bg-gray-300 border rounded-lg border-gray-300 w-full transition dark:text-gray-100 dark:hover:text-gray-800">
      <LucidePlus class="w-4 h-4" />
      {{ $t('Dashboard.Procedure.Edit.Postoperative.Do.AddStep') }}
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
import type { ProcedureFrontend, DoBackend } from '../types'

interface Do extends DoBackend {
  tempId?: string
}

interface Props {
  do?: Do[]
}

const props = withDefaults(defineProps<Props>(), {
  do: () => []
})

const modelValue = defineModel<ProcedureFrontend>({
  required: true
})

const localDo = ref<Do[]>([])
let tempIdCounter = 0

// Generar ID temporal único
const generateTempId = () => `temp_${Date.now()}_${tempIdCounter++}`

// ============================================
// INICIALIZACIÓN
// ============================================

// Asegurar que la estructura do existe
if (!modelValue.value.do) {
  modelValue.value.do = {
    deleted: [],
    updated: [],
    new: []
  }
}

watch(
  () => props.do,
  (value) => {
    if (value.length > 0) {
      localDo.value = value.map(item => ({
        ...item,
        tempId: generateTempId()
      }))

      if (!modelValue.value.do.updated) {
        modelValue.value.do.updated = []
      }

      modelValue.value.do.updated = value.map(item => ({
        id: item.id,
        content: item.content,
        order: item.order
      }))
    }
  },
  { immediate: true }
)

function addDo() {
  const newDo: Do = {
    id: 0, // 0 = nuevo (no existe en BD)
    content: '',
    order: localDo.value.length + 1,
    tempId: generateTempId()
  }

  localDo.value.push(newDo)

  // ✅ Asegurar que el array new existe
  if (!modelValue.value.do.new) {
    modelValue.value.do.new = []
  }

  // ✅ Agregar a "new"
  modelValue.value.do.new.push({
    content: newDo.content,
    order: newDo.order
  })
}

function handleEdit(doValue: Do) {
  // Asegurar que las estructuras existen
  if (!modelValue.value.do.updated) {
    modelValue.value.do.updated = []
  }
  if (!modelValue.value.do.new) {
    modelValue.value.do.new = []
  }

  if (doValue.id > 0) {
    // ✅ Es existente en BD → actualizar en "updated"
    const index = modelValue.value.do.updated.findIndex(s => s.id === doValue.id)

    if (index !== -1) {
      modelValue.value.do.updated[index] = {
        id: doValue.id,
        content: doValue.content,
        order: doValue.order
      }
    }
  } else {
    // ✅ Es nuevo → actualizar en "new"
    const index = modelValue.value.do.new.findIndex(s => s.order === doValue.order)

    if (index !== -1) {
      modelValue.value.do.new[index] = {
        content: doValue.content,
        order: doValue.order
      }
    }
  }
}

function removeDo(index: number) {
  const doValue = localDo.value[index]
  if (!doValue) return

  // Asegurar que las estructuras existen
  if (!modelValue.value.do.deleted) {
    modelValue.value.do.deleted = []
  }
  if (!modelValue.value.do.updated) {
    modelValue.value.do.updated = []
  }
  if (!modelValue.value.do.new) {
    modelValue.value.do.new = []
  }

  if (doValue.id > 0) {
    // ✅ Existe en BD → agregar ID a "deleted"
    if (!modelValue.value.do.deleted.includes(doValue.id)) {
      modelValue.value.do.deleted.push(doValue.id)
    }

    // ✅ Remover de "updated"
    modelValue.value.do.updated = modelValue.value.do.updated.filter(
      s => s.id !== doValue.id
    )
  } else {
    // ✅ Es nuevo → remover de "new"
    modelValue.value.do.new = modelValue.value.do.new.filter(
      s => s.order !== doValue.order
    )
  }

  // Remover del local
  localDo.value.splice(index, 1)

  // Recalcular orden
  updateOrder()
}

// ============================================
// ACTUALIZAR ORDEN (después de drag)
// ============================================

function updateOrder() {
  localDo.value.forEach((doValue, index) => {
    const newOrder = index + 1

    // Solo actualizar si cambió
    if (doValue.order !== newOrder) {
      const oldOrder = doValue.order
      doValue.order = newOrder

      if (doValue.id > 0) {
        // ✅ Actualizar orden en "updated"
        const updateItem = modelValue.value.do.updated.find(s => s.id === doValue.id)
        if (updateItem) {
          updateItem.order = newOrder
        }
      } else {
        // ✅ Actualizar orden en "new" - buscar por orden anterior
        const newItem = modelValue.value.do.new.find(s => s.order === oldOrder)
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
