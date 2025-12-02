<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b
            border-gray-200 bg-white/70 backdrop-blur
            dark:border-gray-700 dark:bg-gray-800/50">

      <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {{ $t('Dashboard.Setting.RolePermission.List.Title') }}
      </h2>

      <Search :placeholder="$t('Dashboard.Setting.Trash.List.Search')" v-model="localSearch" @search="handleSearch" />
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Trash.List.ModelType') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Trash.List.ModelId') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Trash.List.Name') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Trash.List.DeletedAt') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Trash.List.Actions') }}
            </th>
          </tr>
        </thead>

        <tbody v-if="data.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
          <template v-for="(value, index) in data" :key="index">
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.model_type || 'N/A' }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.model_id || 'N/A' }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.name || 'N/A' }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.deleted_at || 'N/A' }}</p>
              </td>
              <td class="flex gap-2 px-6 py-4">
                <button @click="toggleRow(index)" class="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors
                         dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-gray-700">
                  <LucideChevronDown v-if="openRow !== index" class="h-5 w-5" />
                  <LucideChevronUp v-else class="h-5 w-5" />
                </button>
                <button @click="openRestoreModal(value)" title="Restaurar" class="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors
                         dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-gray-700">
                  <LucideArchiveRestore class="w-4 h-4" />
                </button>

                <button @click="openModal(value)" title="Eliminar" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors
                         dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-700"
                  :disabled="!$can('delete_teams')">
                  <LucideTrash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>

            <tr v-if="openRow === index" class="bg-gray-50 dark:bg-gray-800/50">
              <td colspan="5" class="px-6 py-6">
                <div class="text-xs text-gray-700 dark:text-gray-300 p-3 bg-white dark:bg-gray-900/50
                        rounded border border-gray-200 dark:border-gray-700
                        whitespace-pre-wrap break-words space-y-2
                        max-h-40 overflow-y-auto min-w-fit">

                  <div v-for="(val, key) in value.model" :key="key">
                    <p class="font-semibold">{{ key }}:</p>
                    <p class="ml-2">{{ val }}</p>
                  </div>

                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>

  <ConfirmDeleteModal :show="isOpen" :title="$t('Dashboard.Setting.Trash.Delete.ConfirmTitle')"
    :subtitle="$t('Dashboard.Setting.Trash.Delete.ConfirmSubtitle')"
    :message="$t('Dashboard.Setting.Trash.Delete.ConfirmDelete')" :itemName="itemToDelete?.name"
    :consequences-title="$t('Dashboard.Setting.Trash.Delete.Consequences.Title')" :consequences="[
      $t('Dashboard.Setting.Trash.Delete.Consequences.First'),
      $t('Dashboard.Setting.Trash.Delete.Consequences.Second')
    ]" :cancel-text="$t('Dashboard.Setting.Trash.Delete.Cancel')"
    :confirm-text="$t('Dashboard.Setting.Trash.Delete.Delete')" @close="closeModal"
    @confirm="() => {
      if (itemToDelete) {
        forceDelete(itemToDelete.model_type, itemToDelete.model_id)
      }
    }" />

  <ConfirmRestore :show="isOpenRestore" :title="$t('Dashboard.Setting.Trash.Restore.ConfirmTitle')"
    :subtitle="$t('Dashboard.Setting.Trash.Restore.ConfirmSubtitle')"
    :message="$t('Dashboard.Setting.Trash.Restore.ConfirmRestore', { model: itemToRestore?.model_type })"
    :item-name="itemToRestore?.name" :details-title="$t('Dashboard.Setting.Trash.Restore.Details.Title')" :details="[
      $t('Dashboard.Setting.Trash.Restore.Details.First')
    ]" confirm-text="Restaurar" cancel-text="Cancelar" @close="closeRestoreModal"
    @confirm="() => {
      if (itemToRestore) {
        restoreData(itemToRestore?.model_type, itemToRestore?.model_id)
      }
    }" />
</template>

<script setup lang="ts">
import { LucideArchiveRestore, LucideChevronDown, LucideChevronUp, LucideTrash2 } from 'lucide-vue-next';
import Search from '@/components/ui/Search.vue';
import type { Data } from '../types';
import { ref } from 'vue';
import { api } from '@/plugins/api';
import { showNotification } from '@/components/composables/useNotification';
import ConfirmDeleteModal from '@/components/app/ConfirmDeleteModal.vue';
import ConfirmRestore from './ConfirmRestore.vue';
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore()

const isOpen = ref(false)
const isOpenRestore = ref(false)
const itemToDelete = ref<Data | null>(null)
const itemToRestore = ref<Data | null>(null)

defineProps<{
  data: Data[]
}>()

const emit = defineEmits<{
  'refresh-requested': []
  'search': [search: string]
}>()

const localSearch = ref('')
const openRow = ref<number | null>(null)

const toggleRow = (i: number) => {
  openRow.value = openRow.value === i ? null : i
}

const stripHtml = (value: any): any => {
  if (typeof value === "string") {
    const temp = document.createElement("div")
    temp.innerHTML = value
    return temp.textContent || temp.innerText || ""
  }

  if (Array.isArray(value)) {
    return value.map(v => stripHtml(v))
  }

  if (typeof value === "object" && value !== null) {
    const cleaned: any = {}
    for (const key in value) {
      cleaned[key] = stripHtml(value[key])
    }
    return cleaned
  }

  return value
}

const restoreData = async (modelType: string, modelId: number) => {
  if(!auth.can('restore_trash')) return
  try {
    await api.post(`/api/setting/trash/${modelType}/${modelId}/restore`)
    emit('refresh-requested')
    showNotification('success', 'Dato restaurado.', 3000)
  } catch (error) {
    showNotification('success', 'Error al restaurar dato.', 3000)
  } finally {
    closeRestoreModal()
  }
}

const forceDelete = async (modelType: string, modelId: number) => {
  if(!auth.can('delete_trash')) return
  try {
    await api.delete(`/api/setting/trash/${modelType}/${modelId}/force`)
    closeModal()
    emit('refresh-requested')
    showNotification('success', 'Dato eliminado permanentemente.', 3000)
  } catch (error) {
    showNotification('success', 'Error al eliminar el dato.', 3000)
  } finally {
    closeModal()
  }
}

const openModal = (item: Data) => {
  itemToDelete.value = item
  isOpen.value = true
}

const openRestoreModal = (item: Data) => {
  itemToRestore.value = item
  isOpenRestore.value = true
}

const closeModal = () => {
  isOpen.value = false
  itemToDelete.value = null
}

const closeRestoreModal = () => {
  isOpenRestore.value = false
  itemToRestore.value = null
}

const handleSearch = (search: string) => {
  emit('search', search)
}

</script>
