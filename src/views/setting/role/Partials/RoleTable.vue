<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b
            border-gray-200 bg-white/70 backdrop-blur
            dark:border-gray-700 dark:bg-gray-800/50">

      <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {{ $t('Dashboard.Setting.RolePermission.List.Title') }}
      </h2>

      <Search endpoint="/api/setting/role" :placeholder="$t('Dashboard.Team.List.Search')"
        @update:modelValue="handleSearch" @loading="loading = $event" />
    </div>


    <!-- Tabla responsive -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <!-- Table Header (Thead) -->
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.RolePermission.List.Role') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.RolePermission.List.Description') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.RolePermission.List.Status') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.RolePermission.List.Created') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.RolePermission.List.Updated') }}
            </th>
            <th class="text-right px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.RolePermission.List.Actions') }}
            </th>
          </tr>
        </thead>

        <!-- Table Body (Tbody) -->
        <tbody v-if="data.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(value, index) in currentData()" :key="index"
            class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <!-- Role -->
            <td class="px-6 py-4">
              <p class="font-medium text-gray-900 dark:text-white line-clamp-1">{{ value.title }}</p>
              <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.code }}</p>
            </td>
            <td class="px-6 py-4">
              <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.description }}</p>
            </td>

            <!-- Estado -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <ToggleButton :model-value="value.status === 'active'" @update:model-value="handleToggleStatus(value)"
                  color="green" />
                <span :class="[
                  'text-sm font-medium',
                  value.status === 'active' ? 'text-green-600' : 'text-red-600',
                ]">
                  {{ value.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
            </td>

            <!-- Fechas -->
            <td class="px-6 py-4">
              <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.created_at }}</p>
            </td>
            <td class="px-6 py-4">
              <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.updated_at }}</p>
            </td>

            <!-- Acciones -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-end gap-2">
                <!-- Botón Editar -->
                <button @click="handleEdit(value)" title="Editar" class="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors
                         dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-gray-700">
                  <LucideSquarePen class="w-4 h-4" />
                </button>

                <!-- Botón Eliminar -->
                <button @click="openModal(value)" title="Eliminar" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors
                         dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-700">
                  <LucideTrash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="6" class="py-10 text-center text-gray-500 dark:text-gray-400">
              {{ $t('Dashboard.Setting.RolePermission.List.NoMembers') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <ConfirmDeleteModal :show="isOpen" :title="$t('Dashboard.Setting.RolePermission.Delete.ConfirmTitle')"
    :subtitle="$t('Dashboard.Setting.RolePermission.Delete.ConfirmSubtitle')"
    :message="$t('Dashboard.Setting.RolePermission.Delete.ConfirmDelete')" :itemName="roleToDelete?.title"
    :consequences-title="$t('Dashboard.Setting.RolePermission.Delete.Consequences.Title')" :consequences="[
      $t('Dashboard.Setting.RolePermission.Delete.Consequences.First'),
      $t('Dashboard.Setting.RolePermission.Delete.Consequences.Second')
    ]" :cancel-text="$t('Dashboard.Setting.RolePermission.Delete.Cancel')"
    :confirm-text="$t('Dashboard.Setting.RolePermission.Delete.Delete')" @close="closeModal" @confirm="confirmDelete" />
</template>

<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import ConfirmDeleteModal from '@/components/app/ConfirmDeleteModal.vue';
import ToggleButton from '@/components/ui/ToggleButton.vue';
import Search from '@/components/ui/Search.vue';
import type { Data } from '../types'
import { api } from '@/plugins/api'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue';
import { LucideTrash2, LucideSquarePen } from 'lucide-vue-next';

const { t } = useI18n()

const props = defineProps<{
  data: Data[]
}>()

const isOpen = ref(false)
const roleToDelete = ref<Data | null>(null)
const localData = ref<Data[]>([])
const loading = ref(false)

const openModal = (blog: Data) => {
  roleToDelete.value = blog
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  roleToDelete.value = null
}

const emit = defineEmits<{
  (e: 'status-updated'): void
  (e: 'refresh-requested'): void
  (e: 'update', payload: Data): void
}>()

/* const confirmDelete = () => {} */

const handleEdit = (data: Data) => {
  emit('update', data)
}

const handleToggleStatus = async (data: Data) => {
  const newStatus = data.status === 'active' ? 'inactive' : 'active';
  const original = data.status
  try {
    await api.post(`api/setting/role/update_status/${data.id}`, { status: newStatus });
    // Actualizamos el valor localmente si la API responde bien
    data.status = newStatus;
    showNotification('success', t('Dashboard.Team.Validations.Success.Status'), 3000)
    emit('status-updated')
  } catch (error: any) {
    showNotification('error', error?.response?.data?.message || t('Dashboard.Team.Validations.Error.Status'), 4000)
    data.status = original
  }
};

const confirmDelete = async () => {
  if (!roleToDelete.value) return

  try {
    console.log("Eliminar", roleToDelete.value)
    await api.delete(`/api/setting/role/${roleToDelete.value.id}`)
    emit('status-updated')
    closeModal()
  } catch (error: any) {
    closeModal()
    showNotification('error', error?.response?.data?.message, 4000)
  }
}

const handleSearch = (results: any[]) => {
  localData.value = results ?? []
}

function currentData(): Data[] {
  return localData.value.length > 0 ? localData.value : props.data
}
</script>
