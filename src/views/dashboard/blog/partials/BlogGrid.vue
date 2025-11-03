<template>
  <div class="flex justify-between px-6 py-4 border-b border-gray-200">
    <h2 class="text-lg font-semibold text-gray-800">
      {{ $t('Dashboard.Blog.List.Blogs') }}
    </h2>

    <Search endpoint="/api/blog" :placeholder="$t('Dashboard.Blog.List.Search')"
      @update:modelValue="handleSearch" @loading="loading = $event" />
  </div>

  <div v-if="data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <article v-for="value in currentData()" :key="value.id"
      class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">

      <!-- Header con título y estado -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight min-h-[3rem] flex items-start">
            {{ value.title }}
          </h3>
          <div class="flex items-center gap-2">
            <div :class="[
              'w-2 h-2 rounded-full',
              value.status === 'active' ? 'bg-green-500' : 'bg-red-500'
            ]"></div>
            <span :class="[
              'text-sm font-medium',
              value.status === 'active' ? 'text-green-700' : 'text-red-700'
            ]">
              {{ value.status === 'active' ? $t('Dashboard.Blog.List.Active') : $t('Dashboard.Blog.List.Inactive') }}
            </span>
          </div>
        </div>

        <!-- Menú de opciones -->
        <button class="text-gray-400 hover:text-gray-600 p-1 rounded">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <!-- Información adicional -->
      <div class="mb-6 space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">ID:</span>
          <span class="text-gray-900 font-mono">#{{ value.id }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">{{ $t('Dashboard.Blog.List.LastUpdate') }}</span>
          <span class="text-gray-900">{{ value.updated_at }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">{{ $t('Dashboard.Blog.List.CreationDate') }}</span>
          <span class="text-gray-900">{{ value.created_at }}</span>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex gap-2">
        <button @click="handleEdit(value)"
          class="flex-1 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200">
          {{ $t('Dashboard.Blog.List.Edit') }}
        </button>
        <button :class="[
          'flex-1 px-4 py-2 text-sm font-medium border rounded-md transition-colors duration-200',
          value.status === 'active'
            ? 'text-red-700 bg-red-50 border-red-200 hover:bg-red-100'
            : 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100'
        ]" @click="handleToggleStatus(value)">
          {{ value.status === 'active' ? $t('Dashboard.Blog.List.Deactivate') : $t('Dashboard.Blog.List.Activate') }}
        </button>
        <button @click="openModal(value)"
          class="px-3 py-2 text-gray-400 hover:text-red-600 border border-gray-200 rounded-md hover:border-red-200 transition-colors duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </article>
  </div>
  <div v-else class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
      <FileX class="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 class="text-lg font-semibold text-foreground mb-2">{{ $t('Dashboard.Blog.List.NoResults') }}</h3>
  </div>

  <Modal :show="isOpen" max-width="md" @close="closeModal">
    <div class="p-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-2">
        {{ t('Dashboard.Blog.Delete.ConfirmTitle') }}
      </h2>
      <p class="text-gray-600 mb-6">
        ¿Estás seguro de que quieres eliminar el blog
        <span class="font-semibold text-gray-900">
          “{{ blogToDelete?.title }}”
        </span>?
        Esta acción no se puede deshacer.
      </p>

      <div class="flex justify-end gap-3">
        <button class="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200" @click="closeModal">
          Cancelar
        </button>

        <button class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700" @click="confirmDelete">
          Eliminar
        </button>
      </div>
    </div>
  </Modal>
</template>


<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import Search from '@/components/ui/Search.vue';
import Modal from '@/components/app/Modal.vue';
import { FileX } from 'lucide-vue-next';
import type { Data } from '../type';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'status-updated'): void
  (e: 'refresh-requested'): void
}>()

const isOpen = ref(false)
const blogToDelete = ref<Data | null>(null)

const localData = ref<Data[]>([])
const loading = ref(false)

const props = defineProps<{
  data: Data[]
}>()

const openModal = (blog: Data) => {
  blogToDelete.value = blog
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  blogToDelete.value = null
}

const handleEdit = (data: Data) => {
  return data
}

const confirmDelete = async () => {
  if (!blogToDelete.value) return

  try {
    await api.delete(`/api/blog/${blogToDelete.value.id}`)
    showNotification('success', 'Blog eliminado correctamente', 3000)
    emit('status-updated')
    closeModal()
  } catch (error) {
    showNotification('error', 'Error al eliminar el blog', 4000)
  }
}

function currentData() {
  return localData.value.length > 0 ? localData.value : props.data
}

async function handleSearch(results: any[]) {
  localData.value = results ?? []
}

const handleToggleStatus = async (data: Data) => {
  const newStatus = data.status === 'active' ? 'inactive' : 'active';
  const original = data.status
  try {
    await api.post(`/api/blog/update_status/${data.id}`, { status: newStatus });
    // Actualizamos el valor localmente si la API responde bien
    data.status = newStatus;
    showNotification('success', t('Dashboard.Blog.Validations.Success.Status'), 3000)
    emit('status-updated')
  } catch (error) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.Status'), 4000)
    data.status = original
  }
};

</script>
