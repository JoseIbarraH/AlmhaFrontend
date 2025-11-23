<template>
  <!-- Header de la sección (Buscador y Título) -->
  <div class="flex justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
      {{ $t('Dashboard.Blog.List.Blogs') }}
    </h2>

    <Search endpoint="/api/blog" :placeholder="$t('Dashboard.Blog.List.Search')" @update:modelValue="handleSearch"
      @loading="loading = $event" />
  </div>

  <!-- Lista de artículos (Grid) -->
  <div v-if="data.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <article v-for="value in currentData()" :key="value.id"
      class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200
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
              {{ value.status === 'active' ? $t('Dashboard.Blog.List.Active') : $t('Dashboard.Blog.List.Inactive') }}
            </span>
          </div>
        </div>

        <!-- Menú de opciones (tres puntos) -->
        <button class="text-gray-400 hover:text-gray-600 p-1 rounded
                       dark:text-gray-500 dark:hover:text-gray-300">
          <LucideEllipsisVertical class="w-5 h-5" />
        </button>
      </div>

      <!-- Información adicional (ID, fechas) -->
      <div class="mb-6 space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">ID:</span>
          <span class="text-gray-900 font-mono dark:text-gray-100">#{{ value.id }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Blog.List.LastUpdate') }}</span>
          <span class="text-gray-900 dark:text-gray-100">{{ value.updated_at }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Blog.List.CreationDate') }}</span>
          <span class="text-gray-900 dark:text-gray-100">{{ value.created_at }}</span>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex gap-2">
        <!-- Botón Editar -->
        <button @click="handleEdit(value.id)"
          class="flex-1 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200
                 dark:text-blue-300 dark:bg-blue-900/50 dark:border-blue-800 dark:hover:bg-blue-900">
          {{ $t('Dashboard.Blog.List.Edit') }}
        </button>
        <!-- Botón Activar/Desactivar -->
        <button :class="[
            'flex-1 px-4 py-2 text-sm font-medium border rounded-md transition-colors duration-200',
            value.status === 'active'
              ? 'text-red-700 bg-red-50 border-red-200 hover:bg-red-100 dark:text-red-300 dark:bg-red-900/50 dark:border-red-800 dark:hover:bg-red-900'
              : 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100 dark:text-green-300 dark:bg-green-900/50 dark:border-green-800 dark:hover:bg-green-900'
          ]" @click="handleToggleStatus(value)">
          {{ value.status === 'active' ? $t('Dashboard.Blog.List.Deactivate') : $t('Dashboard.Blog.List.Activate') }}
        </button>
        <!-- Botón Eliminar (Icono) -->
        <button @click="openModal(value)"
          class="px-3 py-2 text-gray-400 hover:text-red-600 border border-gray-200 rounded-md hover:border-red-200 transition-colors duration-200
                 dark:text-gray-500 dark:border-gray-700 dark:hover:text-red-400 dark:hover:border-red-900 dark:hover:bg-gray-700">
          <LucideTrash2 class="w-4 h-4" />
        </button>
      </div>
    </article>
  </div>
  <!-- Estado vacío (No hay resultados) -->
  <div v-else class="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-gray-800">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 dark:bg-gray-700">

      <LucideFilePlus class="w-8 h-8 text-gray-500 dark:text-gray-400" />
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2 dark:text-white">{{ $t('Dashboard.Blog.List.NoResults') }}</h3>
    <p class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Blog.List.AdjustingSearch') }}</p>
  </div>

  <!-- Modal de confirmación de eliminación -->
  <ConfirmDeleteModal
    :show="isOpen"
    :title="$t('Dashboard.Blog.Delete.ConfirmTitle')"
    :subtitle="$t('Dashboard.Blog.Delete.ConfirmSubtitle')"
    :message="$t('Dashboard.Blog.Delete.ConfirmDelete')"
    :itemName="blogToDelete?.title"
    :consequences-title="$t('Dashboard.Blog.Delete.Consequences.Title')"
    :consequences="[
      $t('Dashboard.Blog.Delete.Consequences.First'),
      $t('Dashboard.Blog.Delete.Consequences.Second'),
      $t('Dashboard.Blog.Delete.Consequences.Third')
    ]"
    :cancel-text="$t('Dashboard.Blog.Delete.Cancel')"
    :confirm-text="$t('Dashboard.Blog.Delete.Delete')"
    @close="closeModal"
    @confirm="confirmDelete"
  />
</template>


<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import Search from '@/components/ui/Search.vue';
import ConfirmDeleteModal from '@/components/app/ConfirmDeleteModal.vue';
import { useRouter } from 'vue-router';
import type { Data } from '../types';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { LucideEllipsisVertical, LucideFilePlus, LucideTrash2 } from 'lucide-vue-next';

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'status-updated'): void
  (e: 'refresh-requested'): void
}>()

const router = useRouter()

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

const handleEdit = (id: number) => {
  router.push({ name: 'dashboard.blog.edit', params: { id } })
}

const confirmDelete = async () => {
  if (!blogToDelete.value) return

  try {
    await api.delete(`/api/blog/${blogToDelete.value.id}`)
    showNotification('success', t('Dashboard.Blog.Validations.Success.Delete'), 3000)
    emit('status-updated')
    closeModal()
  } catch (error) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.Delete'), 4000)
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
