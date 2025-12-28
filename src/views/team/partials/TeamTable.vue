<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <!-- Header -->
    <div class="flex justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        {{ $t('Dashboard.Team.List.TeamMembers') }}
      </h2>

      <Search :placeholder="$t('Dashboard.Team.List.Search')" @search="handleSearch" v-model="localSearch" />
    </div>

    <!-- Tabla responsive -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <!-- Table Header (Thead) -->
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Team.List.Doctor') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Team.List.Status.Title') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Team.List.Created') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Team.List.Updated') }}
            </th>
            <th class="text-right px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Team.List.Actions') }}
            </th>
          </tr>
        </thead>

        <!-- Table Body (Tbody) -->
        <tbody v-if="data.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(value, index) in currentData()" :key="index"
            class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">

            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <!-- Avatar -->
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center
                            dark:bg-blue-900">
                  <span class="text-sm font-medium text-blue-600 dark:text-blue-300">
                    {{ getInitials(value.name) }}
                  </span>
                </div>
                <!-- Name -->
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ value.name }}</p>
                </div>
              </div>
            </td>

            <!-- Estado -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <ToggleButton :model-value="value.status === 'active'" @update:model-value="handleToggleStatus(value)"
                  color="green" />
                <span :class="[
                  'text-sm font-medium',
                  value.status === 'active' ? 'text-green-600' : 'text-red-600',
                  // Aseguramos que los colores se mantengan para el dark mode, son vibrantes.
                ]">
                  {{ value.status === 'active'
                    ? $t('Dashboard.Team.List.Status.Active')
                    : $t('Dashboard.Team.List.Status.Inactive') }}
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
                <button @click="handleEdit(value.id)" title="Editar" class="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors
                         dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-gray-700"
                  :disabled="!$can('update_teams')">
                  <LucideSquarePen class="w-4 h-4" />
                </button>

                <!-- Botón Eliminar -->
                <button @click="openModal(value)" title="Eliminar" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors
                         dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-700"
                  :disabled="!$can('delete_teams')">
                  <LucideTrash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>

        <!-- Empty State -->
        <tbody v-else>
          <tr>
            <td colspan="5" class="py-10 text-center text-gray-500 dark:text-gray-400">
              <div class="w-full flex flex-col items-center justify-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 dark:bg-gray-700">
                  <LucideUsers class="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                {{ $t('Dashboard.Team.List.NoMembers') }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <ConfirmDeleteModal :show="isOpen" :title="$t('Dashboard.Team.Delete.ConfirmTitle')"
    :subtitle="$t('Dashboard.Team.Delete.ConfirmSubtitle')" :message="$t('Dashboard.Team.Delete.ConfirmDelete')"
    :itemName="memberToDelete?.name" :cancel-text="$t('Dashboard.Team.Delete.Cancel')"
    :confirm-text="$t('Dashboard.Team.Delete.Delete')" @close="closeModal" @confirm="confirmDelete" />
</template>

<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import ConfirmDeleteModal from '@/components/app/ConfirmDeleteModal.vue';
import ToggleButton from '@/components/ui/ToggleButton.vue';
import { useAuthStore } from '@/stores/authStore';
import Search from '@/components/ui/Search.vue';
import { useRouter } from 'vue-router';
import type { Data } from '../types';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue'
import { LucideSquarePen, LucideTrash2, LucideUsers } from 'lucide-vue-next';

const auth = useAuthStore()

const { t } = useI18n()

const router = useRouter()

const isOpen = ref(false)
const memberToDelete = ref<Data | null>(null)
const localSearch = ref('')
const localData = ref<Data[]>([])


const emit = defineEmits<{
  'status-updated': []
  'refresh-requested': []
  'search': [search: string]
}>()

const props = defineProps<{
  data: Data[]
}>()

const openModal = (blog: Data) => {
  memberToDelete.value = blog
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  memberToDelete.value = null
}
function handleEdit(id: number) {
  if (!auth.can('update_teams')) return
  router.push({ name: 'dashboard.team.edit', params: { id } })
}

const confirmDelete = async () => {
  if (!auth.can('delete_teams')) return
  if (!memberToDelete.value) return

  try {
    await api.delete(`/api/team_member/${memberToDelete.value.id}`)
    showNotification('success', t('Dashboard.Team.Validations.Success.Delete'), 3000)
    emit('status-updated')
    closeModal()
  } catch (error) {
    showNotification('error', t('Dashboard.Team.Validations.Error.Delete'), 4000)
  }
}

const handleToggleStatus = async (data: Data) => {
  if (!auth.can('update_teams_status')) return
  const newStatus = data.status === 'active' ? 'inactive' : 'active';
  const original = data.status
  try {
    await api.post(`/api/team_member/update_status/${data.id}`, { status: newStatus });
    // Actualizamos el valor localmente si la API responde bien
    data.status = newStatus;
    showNotification('success', t('Dashboard.Team.Validations.Success.Status'), 3000)
    emit('status-updated')
  } catch (error) {
    showNotification('error', t('Dashboard.Team.Validations.Error.Status'), 4000)
    data.status = original
  }
};

function currentData() {
  return localData.value.length > 0 ? localData.value : props.data
}

const handleSearch = (search: string) => {
  emit('search', search)
}

function getInitials(text: string): string {
  const cleanText = text.trim().replace(/\s+/g, " ");
  const words = cleanText.split(" ");
  const firstTwo = words.slice(0, 2);
  const initials = firstTwo.map(word => word.charAt(0).toUpperCase()).join("");
  return initials;
}
</script>
