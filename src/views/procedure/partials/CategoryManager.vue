<template>
  <Modal :show="props.show" :max-width="props.maxWidth || 'lg'" @close="handleClose">
    <div class="p-6 bg-white dark:bg-gray-800">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t('Dashboard.Procedure.Edit.Category.Title') }}</h2>
        <button @click="handleClose"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Formulario de nueva categoría -->
      <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">{{ $t('Dashboard.Procedure.Edit.Category.New.Title') }}</h3>
        <div class="flex gap-2">
          <TextInput type="text" :placeholder="$t('Dashboard.Procedure.Edit.Category.New.Input')" v-model="form.title" />
          <PrimaryButton @click="addCategory"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium dark:bg-blue-500 dark:hover:bg-blue-600">
            {{ $t('Dashboard.Procedure.Edit.Category.New.Add') }}
          </PrimaryButton>
        </div>
      </div>

      <!-- Lista de categorías -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ $t('Dashboard.Procedure.Edit.Category.List.Title') }}</h3>

          <!-- Buscador -->
          <div class="relative w-1/2">
            <input type="text" v-model="searchQuery" :placeholder="$t('Dashboard.Procedure.Edit.Category.List.Search')"
              class="w-full pl-8 pr-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <svg class="w-4 h-4 absolute left-2.5 top-1.5 text-gray-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
          <div v-for="category in filteredCategories" :key="category.id"
            class="flex items-center justify-between p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div class="flex items-center gap-3 flex-1">
              <input v-if="editingId === category.id" v-model="formEdit.titleEdit" type="text"
                class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                @keyup.enter="saveEdit(category.id)" @keyup.esc="cancelEdit" />
              <span v-else class="text-gray-900 dark:text-white font-medium">{{ category.title }}</span>
            </div>

            <div class="flex items-center gap-2">
              <template v-if="editingId === category.id">
                <button @click="saveEdit(category.id)"
                  class="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                  :title="$t('Dashboard.Procedure.Edit.Category.List.TitleSave')">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button @click="cancelEdit"
                  class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                  :title="$t('Dashboard.Procedure.Edit.Category.List.TitleCancel')">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </template>

              <template v-else>
                <button @click="startEdit(category)" :hidden="category.code === 'general'"
                  class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                  :title="$t('Dashboard.Procedure.Edit.Category.List.TitleEdit')">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="deleteCategory(category.id)" :hidden="category.code === 'general'"
                  class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                  :title="$t('Dashboard.Procedure.Edit.Category.List.TitleDelete')">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </template>
            </div>
          </div>

          <div v-if="filteredCategories?.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            {{ searchQuery ? $t('Dashboard.Procedure.Edit.Category.List.NotFound') : $t('Dashboard.Procedure.Edit.Category.List.Empty') }}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <SecondaryButton @click="handleClose">
          {{$t('Dashboard.Procedure.Edit.Category.List.CloseButton')}}
        </SecondaryButton>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { Category } from '../types';
import TextInput from '@/components/ui/TextInput.vue';
import Modal from '@/components/app/Modal.vue';
import { api } from '@/plugins/api';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import { showNotification } from '@/components/composables/useNotification';

interface Props {
  show: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  categories?: Category[]
}

const editingId = ref<number | null>(null)
const searchQuery = ref('')

const props = defineProps<Props>()

const form = reactive({
  title: ''
})

const formEdit = reactive({
  titleEdit: ''
})

const emit = defineEmits(['close', 'update'])

const filteredCategories = computed(() => {
  if (!props.categories) return []
  if (!searchQuery.value.trim()) return props.categories

  const query = searchQuery.value.toLowerCase().trim()
  return props.categories.filter(category =>
    category.title.toLowerCase().includes(query)
  )
})

const handleClose = () => {
  emit('close')
  searchQuery.value = ''
}

const addCategory = async () => {
  const formData = new FormData()

  if (form.title.trim() !== ''){
    formData.append('title', form.title)
  }else{
    showNotification('warning', "El titulo es obligatorio.", 4000)
    return
  }

  try {
    await api.post('/api/procedure-category', formData)
    console.log('Categoria creada con exito')
    emit('update')
  } catch (error) {
    console.log("Error al crear la categoria: ", error)
  } finally {
    form.title = ''
  }
}

const saveEdit = async (id: number) => {
  if (!formEdit.titleEdit.trim()) return

  try {
    await api.put(`/api/procedure-category/${id}`, { title: formEdit.titleEdit })
    emit('update')
    cancelEdit()
  } catch (error) {
    console.log("Error al actualizar la categoria: ", error)
  }
}

const startEdit = (data: Category) => {
  console.log(data)
  editingId.value = data.id
  formEdit.titleEdit = data.title
}

const cancelEdit = () => {
  editingId.value = null
  formEdit.titleEdit = ''
}

const deleteCategory = async (id: number) => {
  try {
    await api.delete(`/api/procedure-category/${id}`)
    emit('update')
  } catch (error) {
    console.log("Error al eliminar la categoria: ", error)
  }
}

</script>
