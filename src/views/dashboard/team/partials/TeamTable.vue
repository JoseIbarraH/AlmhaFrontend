<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800">Equipo Médico</h2>
    </div>

    <!-- Tabla responsive -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700">
              {{ $t('Dashboard.Team.List.Doctor') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700">
              {{ $t('Dashboard.Team.List.Status') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700">
              {{ $t('Dashboard.Team.List.Created') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700">
              {{ $t('Dashboard.Team.List.Updated') }}
            </th>
            <th class="text-right px-6 py-3 text-sm font-medium text-gray-700">
              {{ $t('Dashboard.Team.List.Actions') }}
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(value, index) in data"
            :key="index"
            class="hover:bg-gray-50 transition-colors"
          >
            <!-- Doctor -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-blue-600">
                    {{ getInitials(value.name) }}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ value.name }}</p>
                </div>
              </div>
            </td>

            <!-- Estado -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <ToggleButton
                  :model-value="value.status === 'active'"
                  @update:model-value="handleToggleStatus(value)"
                  color="green"
                />
                <span
                  :class="[
                    'text-sm font-medium',
                    value.status === 'active' ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  {{ value.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
            </td>

            <!-- Fechas -->
            <td class="px-6 py-4">
              <p class="text-sm text-gray-700">{{ value.created_at }}</p>
            </td>
            <td class="px-6 py-4">
              <p class="text-sm text-gray-700">{{ value.updated_at }}</p>
            </td>

            <!-- Acciones -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="handleEdit(value)"
                  class="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                  title="Editar"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>

                <button
                  @click="deleteTeam(value)"
                  class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup lang="ts">
import ToggleButton from '@/components/ui/ToggleButton.vue';
import type { Data } from '../types'
import { ref, watch } from 'vue';
import { api } from '@/plugins/api';
import { showNotification } from '@/components/composables/useNotification';

const statusToggle = ref(false)

defineProps<{
  data: Data[]
}>()

function handleEdit(data: Data) {
  window.alert('vamos a editar rey')
}

function deleteTeam(data: Data) {
  window.alert('vamos a eliminar')
}

const emit = defineEmits<{
  (e: 'status-updated'): void
}>()

const handleToggleStatus = async (data: Data) => {
  const newStatus = data.status === 'active' ? 'inactive' : 'active';
  const original = data.status
  try {
    const response = await api.post(`/api/team_member/update_status/${data.id}`, { status: newStatus });
    // Actualizamos el valor localmente si la API responde bien
    data.status = newStatus;
    showNotification('success', 'Estado actualizado correctamente', 3000)
    emit('status-updated')
    console.log('Estado actualizado correctamente:', response.data);
  } catch (error) {
    console.error('Error al actualizar el estado del miembro:', error);
    data.status = original
  }
};

function getInitials(text: string): string {
  const cleanText = text.trim().replace(/\s+/g, " ");
  const words = cleanText.split(" ");
  const firstTwo = words.slice(0, 2);
  const initials = firstTwo.map(word => word.charAt(0).toUpperCase()).join("");
  return initials;
}

watch(statusToggle, (val) => {
  console.log(val)
})

</script>
