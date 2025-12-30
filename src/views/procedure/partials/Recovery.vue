<template>
  <div class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-10 bg-white mb-6">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-xl font-bold">Pasos de Preparación Prequirúrgica</h1>
      <h2 class="text-gray-600">Agregue los pasos que el paciente debe seguir antes de la cirugía</h2>
    </div>

    <!-- DRAG & DROP -->
    <draggable v-model="localPhase" item-key="tempId" handle=".drag-handle" @end="updateOrder"
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

          <!-- Periodo -->
          <div>
            <InputLabel value="Periodo" />
            <TextInput v-model="element.period" placeholder="Ej: Día 1-3, Semana 1, 2-3 Meses"
              @input="handleEdit(element)" />
          </div>

          <!-- Título -->
          <div>
            <InputLabel value="Título" />
            <TextInput v-model="element.title" placeholder="Ej: Fase Inicial" @input="handleEdit(element)" />
          </div>

          <!-- Descripción -->
          <div>
            <InputLabel value="Descripción" />
            <TextInput v-model="element.description" placeholder="Descripción del paso..."
              @input="handleEdit(element)" />
          </div>

          <!-- Botón Eliminar -->
          <CloseButton class="top-1 right-1" :disabled="localPhase.length === 1" @click="removePhase(index)" />
        </div>
      </template>
    </draggable>

    <!-- Botón Agregar -->
    <button @click="addPhase"
      class="flex justify-center items-center gap-2 p-2 hover:bg-gray-300 border rounded-lg border-gray-300 w-full transition">
      <LucidePlus class="w-4 h-4" />
      Agregar Paso
    </button>
  </div>

  <Section sectionKey="recovery" title="Tu Recuperación - Texto Adicional"
    subtitle="Información complementaria sobre la recuperación" :modelValue="modelValue.section[1]"
    @update:modelValue="updateSection(1, $event)" placeholderTitle="Ej: Tu Recuperación" :allowImage="true" />
</template>

<script setup lang="ts">
import type { PhaseBackend, ProcedureFrontend } from '../types';
import CloseButton from '@/components/ui/CloseButton.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import draggable from 'vuedraggable';
import Section from './Section.vue';
import { ref, watch } from 'vue';
import { LucidePlus } from 'lucide-vue-next';
import { onMounted } from 'vue';

interface Phase extends PhaseBackend {
  tempId?: string
}

interface Props {
  phase?: Phase[]
}

const props = withDefaults(defineProps<Props>(), {
  phase: () => []
})


const localPhase = ref<Phase[]>([])

let tempIdCounter = 0
const generateTempId = () => `temp_${Date.now()}_${tempIdCounter++}`

const modelValue = defineModel<ProcedureFrontend>({
  required: true
})

if (!modelValue.value.phase) {
  modelValue.value.phase = {
    deleted: [],
    updated: [],
    new: []
  }
}

const updateSection = (index: number, section: any) => {
  const newSections = [...modelValue.value.section]
  newSections[index] = section

  modelValue.value = {
    ...modelValue.value,
    section: newSections
  }
}

function handleEdit(rec: Phase) {
  // Asegurar que las estructuras existen
  if (!modelValue.value.phase.updated) {
    modelValue.value.phase.updated = []
  }
  if (!modelValue.value.phase.new) {
    modelValue.value.phase.new = []
  }

  if (rec.id > 0) {
    // ✅ Es existente en BD → actualizar en "updated"
    const index = modelValue.value.phase.updated.findIndex(s => s.id === rec.id)

    if (index !== -1) {
      modelValue.value.phase.updated[index] = {
        id: rec.id,
        period: rec.period,
        title: rec.title,
        description: rec.description,
        order: rec.order
      }
    }
  } else {
    // ✅ Es nuevo → actualizar en "new"
    const index = modelValue.value.phase.new.findIndex(s => s.order === rec.order)

    if (index !== -1) {
      modelValue.value.phase.new[index] = {
        period: rec.period,
        title: rec.title,
        description: rec.description,
        order: rec.order
      }
    }
  }
}

function updateOrder() {
  localPhase.value.forEach((rec, index) => {
    const newOrder = index + 1

    // Solo actualizar si cambió
    if (rec.order !== newOrder) {
      const oldOrder = rec.order
      rec.order = newOrder

      if (rec.id > 0) {
        // ✅ Actualizar orden en "updated"
        const updateItem = modelValue.value.phase.updated.find(s => s.id === rec.id)
        if (updateItem) {
          updateItem.order = newOrder
        }
      } else {
        // ✅ Actualizar orden en "new" - buscar por orden anterior
        const newItem = modelValue.value.phase.new.find(s => s.order === oldOrder)
        if (newItem) {
          newItem.order = newOrder
        }
      }
    }
  })
}

function addPhase() {
  const newPhase: Phase = {
    id: 0, // 0 = nuevo (no existe en BD)
    period: '',
    title: '',
    description: '',
    order: localPhase.value.length + 1,
    tempId: generateTempId()
  }

  localPhase.value.push(newPhase)

  // ✅ Asegurar que el array new existe
  if (!modelValue.value.phase.new) {
    modelValue.value.phase.new = []
  }

  // ✅ Agregar a "new"
  modelValue.value.phase.new.push({
    period: newPhase.period,
    title: newPhase.title,
    description: newPhase.description,
    order: newPhase.order
  })
}

function removePhase(index: number) {
  const rec = localPhase.value[index]
  if (!rec) return

  // Asegurar que las estructuras existen
  if (!modelValue.value.phase.deleted) {
    modelValue.value.phase.deleted = []
  }
  if (!modelValue.value.phase.updated) {
    modelValue.value.phase.updated = []
  }
  if (!modelValue.value.phase.new) {
    modelValue.value.phase.new = []
  }

  if (rec.id > 0) {
    // ✅ Existe en BD → agregar ID a "deleted"
    if (!modelValue.value.phase.deleted.includes(rec.id)) {
      modelValue.value.phase.deleted.push(rec.id)
    }

    // ✅ Remover de "updated"
    modelValue.value.phase.updated = modelValue.value.phase.updated.filter(
      s => s.id !== rec.id
    )
  } else {
    // ✅ Es nuevo → remover de "new"
    modelValue.value.phase.new = modelValue.value.phase.new.filter(
      s => s.order !== rec.order
    )
  }

  // Remover del local
  localPhase.value.splice(index, 1)

  // Recalcular orden
  updateOrder()
}

watch(
  () => props.phase,
  (value) => {
    if (value.length > 0) {
      localPhase.value = value.map(item => ({
        ...item,
        tempId: generateTempId()
      }))

      if (!modelValue.value.phase.updated) {
        modelValue.value.phase.updated = []
      }

      modelValue.value.phase.updated = value.map(item => ({
        id: item.id,
        period: item.period,
        title: item.title,
        description: item.description,
        order: item.order
      }))
    }
  },
  { immediate: true }
)

onMounted(() => {
  console.log('Recovery: ', props.phase)
})
</script>
