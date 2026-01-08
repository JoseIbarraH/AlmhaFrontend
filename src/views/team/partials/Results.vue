<template>
  <section class="flex flex-col p-6 rounded-2xl shadow-lg space-y-10 bg-white mb-6 dark:bg-gray-900">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left mb-4 dark:text-gray-100">
        Galeria de resultados</h1>
      <h2 class="text-gray-600">Agregue los resultados mas destacados</h2>
    </div>

    <!-- DRAG & DROP -->
    <draggable v-model="localResult" item-key="tempId" handle=".drag-handle" @end="updateOrder"
      class="flex flex-wrap gap-4 max-h-[500px] overflow-y-auto">
      <template #item="{ element, index }">
        <div
          class="relative p-4 border rounded-xl border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-900 w-fit">
          <div class="w-40">
            <!-- Drag Handle -->
            <div
              class="drag-handle cursor-move text-sm text-gray-600 flex items-center gap-2 pb-2 border-b border-gray-100">
              <span class="text-gray-400">☰</span>
              <span class="font-semibold dark:text-gray-100">Imagen {{ element.order }}</span>
            </div>

            <div class="relative rounded-lg overflow-hidden w-40 h-40 mt-3">
              <ImagesPreview v-model="element.displayPath" :close-button="true" class="w-full h-full object-cover"
                @update:modelValue="handleImageChange(element, $event)" />
              <span v-if="element.id === 0"
                class="absolute top-2 left-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium shadow-sm">
                Nuevo
              </span>
            </div>

            <div class="mt-1">
              <TextInput v-model="element.description" @update:modelValue="handleDescriptionChange(element)"
                placeholder="Descripcion" />
            </div>

            <CloseButton class="absolute top-2 right-2" @click="removeResult(index)" />
          </div>
        </div>
      </template>
    </draggable>

    <!-- Botón Agregar -->
    <button @click="addResult"
      class="flex justify-center items-center gap-2 p-2 hover:bg-gray-300 border rounded-lg border-gray-300 w-full transition dark:text-gray-100 dark:hover:text-gray-800">
      <LucidePlus class="w-4 h-4" />
      Agregar Resultado
    </button>
  </section>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, watch } from 'vue'
import CloseButton from '@/components/ui/CloseButton.vue'
import { LucidePlus } from 'lucide-vue-next'
import type { TeamMemberFrontend, ImageBackend } from '../types'
import ImagesPreview from '@/components/ui/ImagesPreview.vue'
import TextInput from '@/components/ui/TextInput.vue'

interface Image extends Omit<ImageBackend, 'path'> {
  displayPath: string | File
  tempId?: string
}

interface Props {
  result?: ImageBackend[]
}

const props = withDefaults(defineProps<Props>(), {
  result: () => []
})

const model = defineModel<TeamMemberFrontend>({
  required: true
})

const localResult = ref<Image[]>([])
let tempIdCounter = 0

const generateTempId = () => `temp_${Date.now()}_${tempIdCounter++}`

// Inicializar estructura de result
if (!model.value.result) {
  model.value.result = {
    deleted: [],
    updated: [],
    new: []
  }
}

watch(
  () => props.result,
  (value) => {
    if (value.length > 0) {
      localResult.value = value.map(item => ({
        id: item.id,
        displayPath: item.path,
        description: item.description,
        order: item.order,
        tempId: generateTempId()
      }))

      // Inicializar updated vacío
      model.value.result.updated = []
    }
  },
  { immediate: true }
)

function addResult() {
  const newResult: Image = {
    id: 0,
    displayPath: '',
    description: '',
    order: localResult.value.length + 1,
    tempId: generateTempId()
  }

  localResult.value.push(newResult)

  if (!model.value.result.new) {
    model.value.result.new = []
  }

  model.value.result.new.push({
    path: undefined as any,
    description: newResult.description,
    order: newResult.order
  })
}

function handleImageChange(element: Image, newPath: string | File) {
  // Solo procesar si es un File (imagen nueva)
  if (!(newPath instanceof File)) {
    return
  }

  element.displayPath = newPath

  if (!model.value.result.updated) {
    model.value.result.updated = []
  }
  if (!model.value.result.new) {
    model.value.result.new = []
  }

  if (element.id > 0) {
    // Es existente en BD → actualizar en "updated"
    const item = model.value.result.updated.find(s => s.id === element.id)

    if (item) {
      // Ya existe en updated, solo agregar/actualizar path
      item.path = newPath as any
    } else {
      // No existe en updated, crear solo con id y path
      model.value.result.updated.push({
        id: element.id,
        path: newPath as any
      } as any)
    }
  } else {
    // Es nuevo → actualizar en "new"
    const item = model.value.result.new.find(s => s.order === element.order)

    if (item) {
      item.path = newPath as any
    }
  }
}

function handleDescriptionChange(element: Image) {
  if (!model.value.result.updated) {
    model.value.result.updated = []
  }
  if (!model.value.result.new) {
    model.value.result.new = []
  }

  if (element.id > 0) {
    // Es existente en BD → actualizar descripción en "updated"
    const item = model.value.result.updated.find(s => s.id === element.id)
    if (item) {
      // Ya existe en updated, solo agregar/actualizar description
      item.description = element.description
    } else {
      // No existe en updated, crear solo con id y description
      model.value.result.updated.push({
        id: element.id,
        description: element.description
      } as any)
    }
  } else {
    // Es nuevo → actualizar descripción en "new"
    const item = model.value.result.new.find(s => s.order === element.order)
    if (item) {
      item.description = element.description
    }
  }
}

function removeResult(index: number) {
  const value = localResult.value[index]
  if (!value) return

  if (!model.value.result.deleted) {
    model.value.result.deleted = []
  }
  if (!model.value.result.updated) {
    model.value.result.updated = []
  }
  if (!model.value.result.new) {
    model.value.result.new = []
  }

  if (value.id > 0) {
    // Es existente → agregar a deleted
    if (!model.value.result.deleted.includes(value.id)) {
      model.value.result.deleted.push(value.id)
    }

    // Remover de updated
    model.value.result.updated = model.value.result.updated.filter(
      s => s.id !== value.id
    )
  } else {
    // Es nuevo → remover de new
    model.value.result.new = model.value.result.new.filter(
      s => s.order !== value.order
    )
  }

  localResult.value.splice(index, 1)
  updateOrder()
}

function updateOrder() {
  localResult.value.forEach((value, index) => {
    const newOrder = index + 1

    if (value.order !== newOrder) {
      const oldOrder = value.order
      value.order = newOrder

      if (value.id > 0) {
        // Actualizar order en updated
        const updateItem = model.value.result.updated.find(s => s.id === value.id)
        if (updateItem) {
          // Ya existe en updated, solo actualizar order
          updateItem.order = newOrder
        } else {
          // No existe en updated, crear solo con id y order
          model.value.result.updated.push({
            id: value.id,
            order: newOrder
          } as any)
        }
      } else {
        // Actualizar order en new
        const newItem = model.value.result.new.find(s => s.order === oldOrder)
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
