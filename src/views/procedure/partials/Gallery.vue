<template>
  <section class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-10 bg-white mb-6">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-xl font-bold">Galeria de resultados</h1>
      <h2 class="text-gray-600">Agregue los resultados mas destacados</h2>
    </div>

    <!-- DRAG & DROP -->
    <draggable v-model="localGallery" item-key="tempId" handle=".drag-handle" @end="updateOrder"
      class="flex flex-wrap gap-4 max-h-[500px] overflow-y-auto">
      <template #item="{ element, index }">
        <div class="relative p-4 border rounded-xl border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white w-fit">
          <div class="w-40">
            <!-- Drag Handle -->
            <div class="drag-handle cursor-move text-sm text-gray-600 flex items-center gap-2 pb-2 border-b border-gray-100">
              <span class="text-gray-400">☰</span>
              <span class="font-semibold">Imagen {{ element.order }}</span>
            </div>

            <div class="relative rounded-lg overflow-hidden w-40 h-40 mt-3">
              <ImagesPreview v-model="element.displayPath" :close-button="false" class="w-full h-full object-cover" @update:modelValue="handleImageChange(element, $event)"/>
              <span v-if="element.id === 0" class="absolute top-2 left-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium shadow-sm">
                Nuevo
              </span>
            </div>

            <CloseButton class="absolute top-2 right-2" @click="removeGallery(index)" />
          </div>
        </div>
      </template>
    </draggable>

    <!-- Botón Agregar -->
    <button @click="addGallery"
      class="flex justify-center items-center gap-2 p-2 hover:bg-gray-300 border rounded-lg border-gray-300 w-full transition">
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
import type { ProcedureFrontend, GalleryBackend } from '../types'
import ImagesPreview from '@/components/ui/ImagesPreview.vue'

interface Gallery extends Omit<GalleryBackend, 'path'> {
  displayPath: string | File
  tempId?: string
}

interface Props {
  gallery?: GalleryBackend[]
}

const props = withDefaults(defineProps<Props>(), {
  gallery: () => []
})

const modelValue = defineModel<ProcedureFrontend>({
  required: true
})

const localGallery = ref<Gallery[]>([])
let tempIdCounter = 0

const generateTempId = () => `temp_${Date.now()}_${tempIdCounter++}`

if (!modelValue.value.gallery) {
  modelValue.value.gallery = {
    deleted: [],
    updated: [],
    new: []
  }
}

watch(
  () => props.gallery,
  (value) => {
    if (value.length > 0) {
      localGallery.value = value.map(item => ({
        id: item.id,
        displayPath: item.path,
        order: item.order,
        tempId: generateTempId()
      }))

      if (!modelValue.value.gallery.updated) {
        modelValue.value.gallery.updated = []
      }

      // Inicializar updated sin path (solo cuando haya cambio)
      modelValue.value.gallery.updated = value.map(item => ({
        id: item.id,
        path: item.path as any,
        order: item.order
      }))
    }
  },
  { immediate: true }
)

function addGallery() {
  const newGallery: Gallery = {
    id: 0,
    displayPath: '',
    order: localGallery.value.length + 1,
    tempId: generateTempId()
  }

  localGallery.value.push(newGallery)

  if (!modelValue.value.gallery.new) {
    modelValue.value.gallery.new = []
  }

  modelValue.value.gallery.new.push({
    path: undefined as any,
    order: newGallery.order
  })
}

function handleImageChange(element: Gallery, newPath: string | File) {
  // Solo procesar si es un File (imagen nueva)
  if (!(newPath instanceof File)) {
    return
  }

  element.displayPath = newPath

  if (!modelValue.value.gallery.updated) {
    modelValue.value.gallery.updated = []
  }
  if (!modelValue.value.gallery.new) {
    modelValue.value.gallery.new = []
  }

  if (element.id > 0) {
    // Es existente en BD → actualizar en "updated"
    const index = modelValue.value.gallery.updated.findIndex(s => s.id === element.id)

    const updatedItem = {
      id: element.id,
      path: newPath as any,
      order: element.order
    }

    if (index !== -1) {
      modelValue.value.gallery.updated[index] = updatedItem
    } else {
      modelValue.value.gallery.updated.push(updatedItem)
    }
  } else {
    // Es nuevo → actualizar en "new"
    const index = modelValue.value.gallery.new.findIndex(s => s.order === element.order)

    const newItem = {
      path: newPath as any,
      order: element.order
    }

    if (index !== -1) {
      modelValue.value.gallery.new[index] = newItem
    }
  }
}

function removeGallery(index: number) {
  const value = localGallery.value[index]
  if (!value) return

  if (!modelValue.value.gallery.deleted) {
    modelValue.value.gallery.deleted = []
  }
  if (!modelValue.value.gallery.updated) {
    modelValue.value.gallery.updated = []
  }
  if (!modelValue.value.gallery.new) {
    modelValue.value.gallery.new = []
  }

  if (value.id > 0) {
    if (!modelValue.value.gallery.deleted.includes(value.id)) {
      modelValue.value.gallery.deleted.push(value.id)
    }

    modelValue.value.gallery.updated = modelValue.value.gallery.updated.filter(
      s => s.id !== value.id
    )
  } else {
    modelValue.value.gallery.new = modelValue.value.gallery.new.filter(
      s => s.order !== value.order
    )
  }

  localGallery.value.splice(index, 1)
  updateOrder()
}

function updateOrder() {
  localGallery.value.forEach((value, index) => {
    const newOrder = index + 1

    if (value.order !== newOrder) {
      const oldOrder = value.order
      value.order = newOrder

      if (value.id > 0) {
        const updateItem = modelValue.value.gallery.updated.find(s => s.id === value.id)
        if (updateItem) {
          updateItem.order = newOrder
        }
      } else {
        const newItem = modelValue.value.gallery.new.find(s => s.order === oldOrder)
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
