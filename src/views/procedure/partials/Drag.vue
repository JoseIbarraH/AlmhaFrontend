<template>
  <draggable
    v-model="local"
    item-key="tempId"
    handle=".drag-handle"
    @end="updateOrder"
    class="space-y-4 max-h-[500px] overflow-y-scroll"
  >
    <template #item="{ element, index }">
      <div class="relative flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-4 bg-white">

        <!-- Drag handle -->
        <div class="drag-handle cursor-move text-sm text-gray-500 flex items-center gap-2">
          <span>☰</span>
          <span class="font-semibold">Orden {{ element.order }}</span>
          <span
            v-if="element.id === 0"
            class="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full"
          >
            Nuevo
          </span>
        </div>

        <!-- Contenido dinámico -->
        <slot
          name="item"
          :item="element"
          :index="index"
          :onEdit="() => handleEdit(element)"
        />

        <!-- Eliminar -->
        <CloseButton
          class="top-1 right-1"
          :disabled="local.length === 1"
          @click="removeItem(index)"
        />
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts" generic="T extends { id?: number; order: number }">
import CloseButton from '@/components/ui/CloseButton.vue'
import draggable from 'vuedraggable'
import { ref, watch } from 'vue'

/* ───────────────── TYPES ───────────────── */

type WithTempId<T> = T & {
  tempId: string
}

/**
 * Tipo mínimo que las funciones internas necesitan
 * NO depende del genérico
 */
type LocalItem = {
  id?: number
  order: number
  tempId: string
}

type Tracker<T> = {
  new?: Omit<T, 'id'>[]
  updated?: T[]
  deleted?: number[]
}

/* ───────────────── PROPS ───────────────── */

const props = defineProps<{
  items: WithTempId<T>[]
  tracker: Tracker<T>
}>()

/* ───────────────── STATE ───────────────── */

const local = ref<WithTempId<T>[]>([])

/* ───────────────── LOGIC ───────────────── */

const updateOrder = () => {
  local.value.forEach((item, index) => {
    const newOrder = index + 1
    if (item.order !== newOrder) {
      item.order = newOrder
      handleEdit(item)
    }
  })
}

const handleEdit = (item: LocalItem) => {
  // aquí ya no hay error de TS
  console.log('Edit:', item)
}

const removeItem = (index: number) => {
  console.log('Remove:', local.value[index])
}

/* ───────────────── WATCH ───────────────── */

watch(
  () => props.items,
  (value) => {
    local.value = value.map(item => ({
      ...item,
      tempId: item.tempId ?? crypto.randomUUID()
    }))
  },
  { immediate: true }
)
</script>
