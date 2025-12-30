<template>
  <div class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-10 bg-white mb-6">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-xl font-bold">Pasos de Preparación Prequirúrgica</h1>
      <h2 class="text-gray-600">Agregue los pasos que el paciente debe seguir antes de la cirugía</h2>
    </div>

    <!-- DRAG & DROP -->
    <draggable v-model="localPreStep" item-key="tempId" handle=".drag-handle" @end="updateOrder"
      class="space-y-4 max-h-[500px] overflow-y-scroll">
      <template #item="{ element, index }">
        <div class="relative flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-4 bg-white">

          <!-- Drag Handle -->
          <div class="drag-handle cursor-move text-sm text-gray-500 flex items-center gap-2">
            <span>☰</span>
            <span class="font-semibold">Paso {{ element.order }}</span>
            <span v-if="element.id === 0" class="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
              Nuevo
            </span>
          </div>

          <!-- Título -->
          <div>
            <InputLabel value="Título" />
            <TextInput v-model="element.title" placeholder="Ej: Consulta Médica" @input="handleEdit(element)" />
          </div>

          <!-- Descripción -->
          <div>
            <InputLabel value="Descripción" />
            <TextInput v-model="element.description" placeholder="Descripción del paso..."
              @input="handleEdit(element)" />
          </div>

          <!-- Botón Eliminar -->
          <CloseButton class="top-1 right-1" :disabled="localPreStep.length === 1" @click="removePreStep(index)" />
        </div>
      </template>
    </draggable>

    <!-- Botón Agregar -->
    <button @click="addPreStep"
      class="flex justify-center items-center gap-2 p-2 hover:bg-gray-300 border rounded-lg border-gray-300 w-full transition">
      <LucidePlus class="w-4 h-4" />
      Agregar Paso
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
import type { ProcedureFrontend, PreStepBackend } from '../types'

interface PreStep extends PreStepBackend {
  tempId?: string
}

interface Props {
  preStep?: PreStep[]
}

const props = withDefaults(defineProps<Props>(), {
  preStep: () => []
})

const modelValue = defineModel<ProcedureFrontend>({
  required: true
})

const localPreStep = ref<PreStep[]>([])
let tempIdCounter = 0

// Generar ID temporal único
const generateTempId = () => `temp_${Date.now()}_${tempIdCounter++}`

// ============================================
// INICIALIZACIÓN
// ============================================

// Asegurar que la estructura preStep existe
if (!modelValue.value.preStep) {
  modelValue.value.preStep = {
    deleted: [],
    updated: [],
    new: []
  }
}

watch(
  () => props.preStep,
  (value) => {
    if (value.length > 0) {
      localPreStep.value = value.map(item => ({
        ...item,
        tempId: generateTempId()
      }))

      if (!modelValue.value.preStep.updated) {
        modelValue.value.preStep.updated = []
      }

      modelValue.value.preStep.updated = value.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        order: item.order
      }))
    }
  },
  { immediate: true }
)

function addPreStep() {
  const newStep: PreStep = {
    id: 0, // 0 = nuevo (no existe en BD)
    title: '',
    description: '',
    order: localPreStep.value.length + 1,
    tempId: generateTempId()
  }

  localPreStep.value.push(newStep)

  // ✅ Asegurar que el array new existe
  if (!modelValue.value.preStep.new) {
    modelValue.value.preStep.new = []
  }

  // ✅ Agregar a "new"
  modelValue.value.preStep.new.push({
    title: newStep.title,
    description: newStep.description,
    order: newStep.order
  })
}

function handleEdit(step: PreStep) {
  // Asegurar que las estructuras existen
  if (!modelValue.value.preStep.updated) {
    modelValue.value.preStep.updated = []
  }
  if (!modelValue.value.preStep.new) {
    modelValue.value.preStep.new = []
  }

  if (step.id > 0) {
    // ✅ Es existente en BD → actualizar en "updated"
    const index = modelValue.value.preStep.updated.findIndex(s => s.id === step.id)

    if (index !== -1) {
      modelValue.value.preStep.updated[index] = {
        id: step.id,
        title: step.title,
        description: step.description,
        order: step.order
      }
    }
  } else {
    // ✅ Es nuevo → actualizar en "new"
    const index = modelValue.value.preStep.new.findIndex(s => s.order === step.order)

    if (index !== -1) {
      modelValue.value.preStep.new[index] = {
        title: step.title,
        description: step.description,
        order: step.order
      }
    }
  }
}

function removePreStep(index: number) {
  const step = localPreStep.value[index]
  if (!step) return

  // Asegurar que las estructuras existen
  if (!modelValue.value.preStep.deleted) {
    modelValue.value.preStep.deleted = []
  }
  if (!modelValue.value.preStep.updated) {
    modelValue.value.preStep.updated = []
  }
  if (!modelValue.value.preStep.new) {
    modelValue.value.preStep.new = []
  }

  if (step.id > 0) {
    // ✅ Existe en BD → agregar ID a "deleted"
    if (!modelValue.value.preStep.deleted.includes(step.id)) {
      modelValue.value.preStep.deleted.push(step.id)
    }

    // ✅ Remover de "updated"
    modelValue.value.preStep.updated = modelValue.value.preStep.updated.filter(
      s => s.id !== step.id
    )
  } else {
    // ✅ Es nuevo → remover de "new"
    modelValue.value.preStep.new = modelValue.value.preStep.new.filter(
      s => s.order !== step.order
    )
  }

  // Remover del local
  localPreStep.value.splice(index, 1)

  // Recalcular orden
  updateOrder()
}

// ============================================
// ACTUALIZAR ORDEN (después de drag)
// ============================================

function updateOrder() {
  localPreStep.value.forEach((step, index) => {
    const newOrder = index + 1

    // Solo actualizar si cambió
    if (step.order !== newOrder) {
      const oldOrder = step.order
      step.order = newOrder

      if (step.id > 0) {
        // ✅ Actualizar orden en "updated"
        const updateItem = modelValue.value.preStep.updated.find(s => s.id === step.id)
        if (updateItem) {
          updateItem.order = newOrder
        }
      } else {
        // ✅ Actualizar orden en "new" - buscar por orden anterior
        const newItem = modelValue.value.preStep.new.find(s => s.order === oldOrder)
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
