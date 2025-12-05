<template>
  <!-- Header de la sección (Buscador y Título) -->
  <div class="flex justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
      {{ $t('Dashboard.Service.List.Services') }}
    </h2>

    <Search
      :placeholder="$t('Dashboard.Service.List.Search')"
      @search="handleSearch"
      v-model="localSearch" />
  </div>

  <!-- Lista de artículos (Grid) -->
  <div v-if="data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <article v-for="value in currentData()" :key="value.id" class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200
             dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-black/20">

      <!-- Header con título y estado -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight min-h-[3rem] flex items-start
                     dark:text-white">
            {{ value.title }}
          </h3>
          <!-- Indicador de estado -->
          <div class="flex items-center gap-2">
            <div :class="[
              'w-2 h-2 rounded-full',
              value.status === 'active' ? 'bg-green-500' : 'bg-red-500'
            ]"></div>
            <span :class="[
              'text-sm font-medium',
              value.status === 'active' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
            ]">
              {{ value.status === 'active' ? $t('Dashboard.Service.List.Active') : $t('Dashboard.Service.List.Inactive')}}
            </span>
          </div>
        </div>

        <!-- Menú de opciones (tres puntos) -->
        <button class="text-gray-400 hover:text-gray-600 p-1 rounded
                       dark:text-gray-500 dark:hover:text-gray-300">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <!-- Información adicional (ID, fechas) -->
      <div class="mb-6 space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">ID:</span>
          <span class="text-gray-900 font-mono dark:text-gray-100">#{{ value.id }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Service.List.LastUpdate') }}</span>
          <span class="text-gray-900 dark:text-gray-100">{{ value.updated_at }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Service.List.CreationDate') }}</span>
          <span class="text-gray-900 dark:text-gray-100">{{ value.created_at }}</span>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex gap-2">
        <!-- Botón Editar -->
        <button @click="handleEdit(value.id)" class="flex-1 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200
                 dark:text-blue-300 dark:bg-blue-900/50 dark:border-blue-800 dark:hover:bg-blue-900">
          {{ $t('Dashboard.Service.List.Edit') }}
        </button>
        <!-- Botón Activar/Desactivar -->
        <button :class="[
          'flex-1 px-4 py-2 text-sm font-medium border rounded-md transition-colors duration-200',
          value.status === 'active'
            ? 'text-red-700 bg-red-50 border-red-200 hover:bg-red-100 dark:text-red-300 dark:bg-red-900/50 dark:border-red-800 dark:hover:bg-red-900'
            : 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100 dark:text-green-300 dark:bg-green-900/50 dark:border-green-800 dark:hover:bg-green-900'
        ]" @click="handleToggleStatus(value)">
          {{ value.status === 'active'
            ? $t('Dashboard.Service.List.Deactivate')
            : $t('Dashboard.Service.List.Activate')}}
        </button>
        <!-- Botón Eliminar (Icono) -->
        <button @click="openModal(value)"
          class="px-3 py-2 text-gray-400 hover:text-red-600 border border-gray-200 rounded-md hover:border-red-200 transition-colors duration-200
                 dark:text-gray-500 dark:border-gray-700 dark:hover:text-red-400 dark:hover:border-red-900 dark:hover:bg-gray-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </article>
  </div>
  <!-- Estado vacío (No hay resultados) -->
  <div v-else class="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-gray-800">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 dark:bg-gray-700">
      <!-- Usaremos un SVG de fallback simple -->
      <svg class="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2 dark:text-white">{{ $t('Dashboard.Service.List.NoResults') }}
    </h3>
    <p class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Service.List.Try') }}</p>
  </div>

  <!-- Modal de confirmación de eliminación -->
  <ConfirmDeleteModal
    :show="isOpen"
    :title="$t('Dashboard.Service.Delete.ConfirmTitle')"
    :subtitle="$t('Dashboard.Service.Delete.ConfirmSubtitle')"
    :message="$t('Dashboard.Service.Delete.ConfirmDelete')"
    :itemName="serviceToDelete?.title"
    :cancel-text="$t('Dashboard.Service.Delete.Cancel')"
    :confirm-text="$t('Dashboard.Service.Delete.Delete')"
    @close="closeModal" @confirm="confirmDelete" />
</template>

<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import ConfirmDeleteModal from '@/components/app/ConfirmDeleteModal.vue';
import Search from '@/components/ui/Search.vue';
import { useRouter } from 'vue-router';
import type { Data } from '../types';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n()

const emit = defineEmits<{
  'status-updated': []
  'refresh-requested': []
  'search': [search: string]
}>()

const router = useRouter()

const isOpen = ref(false)
const serviceToDelete = ref<Data | null>(null)

const localData = ref<Data[]>([])
const localSearch = ref('')

const props = defineProps<{
  data: Data[]
}>()

const openModal = (blog: Data) => {
  serviceToDelete.value = blog
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  serviceToDelete.value = null
}

const handleEdit = (id: number) => {
  router.push({ name: 'dashboard.service.edit', params: { id } })
}

const confirmDelete = async () => {
  if (!serviceToDelete.value) return

  try {
    await api.delete(`/api/service/${serviceToDelete.value.id}`)
    showNotification('success', t('Dashboard.Service.Validations.Success.Delete'), 3000)
    emit('status-updated')
    closeModal()
  } catch (error) {
    showNotification('error', t('Dashboard.Service.Validations.Error.Delete'), 4000)
  }
}

function currentData() {
  return localData.value.length > 0 ? localData.value : props.data
}

const handleSearch = (search: string) => {
  emit('search', search)
}

const handleToggleStatus = async (data: Data) => {
  const newStatus = data.status === 'active' ? 'inactive' : 'active';
  const original = data.status
  try {
    await api.post(`/api/service/update_status/${data.id}`, { status: newStatus });
    // Actualizamos el valor localmente si la API responde bien
    data.status = newStatus;
    showNotification('success', t('Dashboard.Service.Validations.Success.Status'), 3000)
    emit('status-updated')
  } catch (error) {
    showNotification('error', t('Dashboard.Service.Validations.Error.Status'), 4000)
    data.status = original
  }
};

</script>
