<template>
  <div
    class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-10 bg-white mb-6 dark:bg-gray-800 dark:border-gray-900">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-xl font-bold dark:text-gray-100">{{ $t('Dashboard.Procedure.Edit.Recovery.Title') }}</h1>
      <h2 class="text-gray-600 dark:text-gray-400">{{ $t('Dashboard.Procedure.Edit.Recovery.Subtitle') }}</h2>
    </div>

    <!-- DRAG & DROP -->
    <draggable v-model="localPhase" item-key="tempId" handle=".drag-handle" @end="updateOrder"
      class="space-y-4 max-h-[500px] overflow-y-scroll">
      <template #item="{ element, index }">
        <div
          class="relative flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-4 bg-white dark:bg-gray-800 dark:border-gray-900">

          <!-- Drag Handle -->
          <div class="drag-handle cursor-move text-sm text-gray-500 flex items-center gap-2 dark:text-gray-100">
            <span>☰</span>
            <span class="font-semibold">{{ $t('Dashboard.Procedure.Edit.Recovery.Step') }} {{ element.order }}</span>
            <span v-if="element.id === 0" class="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
              {{ $t('Dashboard.Procedure.Edit.Recovery.New') }}
            </span>
          </div>

          <!-- Periodo -->
          <div>
            <InputLabel :value="$t('Dashboard.Procedure.Edit.Recovery.InputPeriod')" />
            <TextInput v-model="element.period"
              :placeholder="$t('Dashboard.Procedure.Edit.Recovery.InputPeriodPlaceholder')"
              @input="handleEdit(element)" />
          </div>

          <!-- Título -->
          <div>
            <InputLabel :value="$t('Dashboard.Procedure.Edit.Recovery.InputTitle')" />
            <TextInput v-model="element.title"
              :placeholder="$t('Dashboard.Procedure.Edit.Recovery.InputTitlePlaceholder')"
              @input="handleEdit(element)" />
          </div>

          <!-- Descripción -->
          <div>
            <InputLabel :value="$t('Dashboard.Procedure.Edit.Recovery.InputDescription')" />
            <TextInput v-model="element.description"
              :placeholder="$t('Dashboard.Procedure.Edit.Recovery.InputDescriptionPlaceholder')"
              @input="handleEdit(element)" />
          </div>

          <!-- Botón Eliminar -->
          <CloseButton class="top-1 right-1" :disabled="localPhase.length === 1" @click="removePhase(index)" />
        </div>
      </template>
    </draggable>

    <!-- Botón Agregar -->
    <button @click="addPhase"
      class="flex justify-center items-center gap-2 p-2 hover:bg-gray-300 border rounded-lg border-gray-300 w-full transition dark:text-gray-100 dark:hover:text-gray-800">
      <LucidePlus class="w-4 h-4" />
      {{ $t('Dashboard.Procedure.Edit.Recovery.AddStep') }}
    </button>
  </div>

  <Section sectionKey="recovery" :title="$t('Dashboard.Procedure.Edit.Recovery.Title')"
    :subtitle="$t('Dashboard.Procedure.Edit.Recovery.Subtitle')" :modelValue="modelValue.section[2]"
    @update:modelValue="updateSection(2, $event)"
    :placeholderTitle="$t('Dashboard.Procedure.Edit.Recovery.InputTitlePlaceholder')" :allowImage="true" />
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
    if (!modelValue.value.phase.deleted.includes(rec.id)) {
      modelValue.value.phase.deleted.push(rec.id)
    }

    modelValue.value.phase.updated = modelValue.value.phase.updated.filter(
      s => s.id !== rec.id
    )
  } else {
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
