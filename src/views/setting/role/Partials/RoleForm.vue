<template>
  <Modal :show="props.show" :max-width="props.maxWidth || '4xl'" @close="handleClose" :closeable="closeable">
    <div class="relative bg-white dark:bg-gray-800 rounded-lg">
      <!-- Header -->
      <div
        class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-t-lg dark:from-gray-900/30 dark:to-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">
          {{ isEdit ? 'Editar Rol' : 'Crear Rol' }}
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {{ isEdit ? 'Modifica la información del rol existente' : 'Completa la información para crear un nuevo rol' }}
        </p>
      </div>

      <!-- Form -->
      <form class="p-6" @submit.prevent="submit">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Columna Izquierda: Información Básica -->
          <div class="lg:col-span-2 space-y-5">
            <div class="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4">
                Información Básica
              </h3>

              <div class="space-y-4">
                <!-- Título y Code en grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <InputLabel for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      value="Título" />
                    <TextInput id="title" v-model="form.title" required placeholder="Ej: Administrador"
                      class="w-full" />
                  </div>

                  <div>
                    <InputLabel for="code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      value="Código" />
                    <TextInput id="code" v-model="form.code" required placeholder="Ej: ADMIN" class="w-full" />
                  </div>
                </div>

                <!-- Descripción -->
                <div>
                  <InputLabel for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    value="Descripción" />
                  <TextArea id="description" v-model="form.description" class="dark:bg-gray-900 w-full" rows="3"
                    placeholder="Describe las responsabilidades de este rol..." />
                </div>

                <!-- Status -->
                <div>
                  <InputLabel for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    value="Estado" />
                  <Select class="w-full" id="status" :default="'Seleccione un estado'" v-model="form.status"
                    :options="status" />
                </div>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Permisos -->
          <div class="lg:col-span-1">
            <div
              class="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-5 border border-gray-200 dark:border-gray-700 h-full">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Permisos
                </h3>
                <span
                  class="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
                  {{ form.permits.length }} seleccionados
                </span>
              </div>

              <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <label v-for="permission in permissions" :key="permission.id"
                  class="flex items-start gap-3 p-3 rounded-md hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                  <input type="checkbox" :value="permission.code" v-model="form.permits"
                    class="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-red-600 focus:ring-red-500 focus:ring-offset-0" />
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                    {{ permission.title }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
          <button type="button" @click="handleClose"
            class="px-5 py-2.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            Cancelar
          </button>
          <PrimaryButton type="submit">
            {{ isEdit ? 'Actualizar Rol' : 'Crear Rol' }}
          </PrimaryButton>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import InputLabel from '@/components/ui/InputLabel.vue'
import TextInput from '@/components/ui/TextInput.vue'
import TextArea from '@/components/ui/TextArea.vue'
import Select from '@/components/ui/Select.vue'
import Modal from '@/components/app/Modal.vue'
import { reactive, computed } from 'vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

interface Permission {
  id: number | string
  title: string,
  code: string
}

interface EditData {
  title?: string
  code?: string
  description?: string
  status?: string
  permits?: (number | string)[]
}

interface Props {
  show: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  closeable?: boolean
  permissions: Permission[]
  editData?: EditData
}

const props = withDefaults(defineProps<Props>(), {
  closeable: true,
  maxWidth: '2xl'
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isEdit = computed(() => !!props.editData)

const form = reactive({
  title: props.editData?.title || '',
  code: props.editData?.code || '',
  description: props.editData?.description || '',
  status: props.editData?.status || 'active',
  permits: props.editData?.permits || [] as (number | string)[]
})

const status = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
]

function handleClose() {
  emit('close')
}

const submit = () => {
  // Lógica de submit
}
</script>

<style scoped>
/* Scrollbar personalizado */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
