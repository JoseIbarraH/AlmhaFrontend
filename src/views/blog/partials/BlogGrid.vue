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
  <div v-if="data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
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
      <!-- Se asume que FileX es un componente SVG o icono -->
      <!-- Usaremos un SVG de fallback simple para el ejemplo -->
      <svg class="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2 dark:text-white">{{ $t('Dashboard.Blog.List.NoResults') }}</h3>
    <p class="text-gray-500 dark:text-gray-400">Intenta ajustar tu búsqueda.</p>
  </div>

  <!-- Modal de confirmación de eliminación -->
  <Modal :show="isOpen" max-width="md" @close="closeModal">
    <div class="relative bg-white dark:bg-gray-800 rounded-lg">
      <!-- Header con icono de advertencia -->
      <div class="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-t-lg
                  dark:from-red-900/30 dark:to-red-900/50">
        <div class="flex items-start gap-4">
          <!-- Icono de advertencia -->
          <div class="flex-shrink-0">
            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center ring-8 ring-red-50
                        dark:bg-red-900 dark:ring-red-950">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <!-- Contenido del header -->
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-900 mb-1 dark:text-white">
              {{ $t('Dashboard.Blog.Delete.ConfirmTitle') }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t('Dashboard.Blog.Delete.ConfirmSubtitle') }}
            </p>
          </div>

          <!-- Botón cerrar -->
          <button @click="closeModal" class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors
                                             dark:text-gray-500 dark:hover:text-gray-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Contenido del modal -->
      <div class="p-6 bg-white dark:bg-gray-800">
        <div class="mb-6">
          <p class="text-gray-700 leading-relaxed dark:text-gray-300">
            {{ $t('Dashboard.Blog.Delete.Confirm_delete') }}
            <span
              class="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-gray-100 text-gray-900 font-semibold text-sm border border-gray-200
                     dark:bg-gray-700 dark:text-white dark:border-gray-600">
              "{{ blogToDelete?.title }}"
            </span>?
          </p>

          <!-- Zona de consecuencias (Advertencia) -->
          <div class="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg
                      dark:bg-red-900/30 dark:border-red-900/50">
            <p class="text-sm font-medium text-red-800 mb-2 dark:text-red-400">
              {{ $t('Dashboard.Blog.Delete.Consequences.Title') }}
            </p>
            <ul class="text-sm text-red-700 space-y-1.5 dark:text-red-300">
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 mt-0.5 flex-shrink-0 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd" />
                </svg>
                <span>{{ $t('Dashboard.Blog.Delete.Consequences.First') }}</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 mt-0.5 flex-shrink-0 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd" />
                </svg>
                <span>{{ $t('Dashboard.Blog.Delete.Consequences.Second') }}</span>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-4 h-4 mt-0.5 flex-shrink-0 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd" />
                </svg>
                <span>{{ $t('Dashboard.Blog.Delete.Consequences.Third') }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Botones de acción del modal -->
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button @click="closeModal"
            class="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200
                   dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-800">
            {{ $t('Dashboard.Blog.Delete.Cancel') }}
          </button>

          <button @click="confirmDelete"
            class="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-200 flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {{ $t('Dashboard.Blog.Delete.Delete') }}
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>


<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import Search from '@/components/ui/Search.vue';
import Modal from '@/components/app/Modal.vue';
import { FileX } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import type { Data } from '../types';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

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
