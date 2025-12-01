<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <!-- Header -->
    <div class="flex justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        {{ $t('Dashboard.Setting.User.List.Title') }}
      </h2>
      <Search
        v-model="localSearch"
        :placeholder="$t('Dashboard.Setting.User.List.Search')"
        @search="handleSearch" />
    </div>

    <!-- Tabla responsive -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <!-- Table Header (Thead) -->
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.User.List.User') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.User.List.Roles') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.User.List.Status') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.User.List.Created') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.User.List.Updated') }}
            </th>
            <th class="text-right px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.User.List.Actions') }}
            </th>
          </tr>
        </thead>

        <!-- Table Body (Tbody) -->
        <tbody v-if="data.length > 0" @mousemove="updateMousePos" class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(value, index) in filteredData" :key="index"
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

            <td class="px-6 py-4 relative">
              <div class="flex items-center gap-2 flex-wrap">

                <!-- Primeros 3 roles -->
                <template v-for="(role, __index) in value.roles.slice(0, 2)" :key="index">
                  <span class="px-2.5 py-1 text-xs font-medium rounded-md border bg-muted text-muted-foreground">
                    {{ role.title }}
                  </span>
                </template>

                <div v-if="value.roles.length > 3" class="relative group">
                  <span
                    class="px-2.5 py-1 text-xs font-medium rounded-md border bg-muted text-muted-foreground cursor-pointer">
                    ...
                  </span>
                  <div class="fixed p-3 bg-black text-white text-xs rounded-lg shadow-lg opacity-0 pointer-events-none
                          group-hover:opacity-100 transition duration-150 z-50" :style="{
                            top: `${mouseY + 12}px`,
                            left: `${mouseX}px`
                          }">
                    <div class="font-semibold mb-1">Roles:</div>
                    <ul class="space-y-1">
                      <li v-for="r in value.roles" :key="r.code">• {{ r.title }}</li>
                    </ul>
                  </div>

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

        <!-- Empty State -->
        <tbody v-else>
          <tr>
            <td colspan="5" class="py-10 text-center text-gray-500 dark:text-gray-400">
              {{ $t('Dashboard.Setting.User.List.NoUsers') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <ConfirmDeleteModal
    :show="isOpen"
    :title="$t('Dashboard.Setting.User.Delete.ConfirmTitle')"
    :subtitle="$t('Dashboard.Setting.User.Delete.ConfirmSubtitle')"
    :message="$t('Dashboard.Setting.User.Delete.ConfirmDelete')"
    :itemName="userToDelete?.name"
    :consequences-title="$t('Dashboard.Setting.User.Delete.Consequences.Title')"
    :consequences="[
      $t('Dashboard.Setting.User.Delete.Consequences.First'),
      $t('Dashboard.Setting.User.Delete.Consequences.Second')
    ]"
    :cancel-text="$t('Dashboard.Setting.User.Delete.Cancel')"
    :confirm-text="$t('Dashboard.Setting.User.Delete.Delete')"
    @close="closeModal"
    @confirm="confirmDelete" />
</template>

<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import { LucideSquarePen, LucideTrash2 } from 'lucide-vue-next';
import ConfirmDeleteModal from '@/components/app/ConfirmDeleteModal.vue';
import ToggleButton from '@/components/ui/ToggleButton.vue';
import { useAuthStore } from '@/stores/authStore';
import Search from '@/components/ui/Search.vue';
import type { Data } from '../types';
import { ref, computed } from 'vue';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const auth = useAuthStore();

const { t } = useI18n()

const mouseX = ref(0);
const mouseY = ref(0);

const filteredData = computed(() =>
  currentData().filter(u => u.id !== auth.user?.id)
);

const updateMousePos = (e: any) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

const isOpen = ref(false)
const userToDelete = ref<Data | null>(null)
const localSearch = ref('')
const localData = ref<Data[]>([])

const emit = defineEmits<{
  'status-updated': []
  'refresh-requested': []
  'update': [payload: Data]
  'search': [search: string]
}>()

const props = defineProps<{
  data: Data[]
}>()

const handleEdit = (data: Data) => {
  emit('update', data)
}

const openModal = (blog: Data) => {
  userToDelete.value = blog
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  userToDelete.value = null
}

const handleToggleStatus = async (data: Data) => {
  const newStatus = data.status === 'active' ? 'inactive' : 'active';
  const original = data.status
  try {
    await api.post(`/api/setting/user/update_status/${data.id}`, { status: newStatus });
    data.status = newStatus;
    showNotification('success', t('Dashboard.Team.Validations.Success.Status'), 3000)
    emit('status-updated')
  } catch (error) {
    showNotification('error', t('Dashboard.Team.Validations.Error.Status'), 4000)
    data.status = original
  }
};

const confirmDelete = async () => {
  if (!userToDelete.value) return

  try {
    await api.delete(`/api/setting/user/${userToDelete.value.id}`)
    showNotification('success', 'Usuario eliminado correctamente: ' + userToDelete.value.name, 3000)
    emit('status-updated')
    closeModal()
  } catch (error: any) {
    closeModal()
    showNotification('error', error?.response?.data?.message, 4000)
  }
}

function currentData(): Data[] {
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
