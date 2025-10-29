<template>
  <section class="p-6 space-y-6">
    <!-- Header -->
    <header
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg">
      <h2 class="text-xl font-semibold text-gray-800">
        {{ $t('Dashboard.Team.Title') }}
      </h2>

      <CreateButton @click="createTeamMember" class="flex items-center justify-center w-full sm:w-auto">
        {{ $t('Dashboard.Team.Form.Create') }}
      </CreateButton>
    </header>

    <!-- Statistics -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <Statistics :total-object-title="$t('Dashboard.Team.TotalTeams')" :total-object="stats?.total"
        :total-activated-title="$t('Dashboard.Team.TeamsActives')" :total-activated="stats?.totalActivated"
        :total-deactivated-title="$t('Dashboard.Team.TeamsInactives')" :total-deactivated="stats?.totalDeactivated"
        :last-object-title="$t('Dashboard.Team.LastTeams')" :last-object="stats?.lastCreated" />
    </div>

    <!-- Content -->
    <h1 class="text-lg font-semibold text-gray-800">Team</h1>
    <TeamTable :data="paginate?.data ?? []" @status-updated="fetchTeamMembers"/>

  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CreateButton from '@/components/ui/CreateButton.vue'
import Statistics from '@/components/app/Statistics.vue'
import { api } from '@/plugins/api'
import type { ApiResponse, Default, PaginatedResponse, Stats, Data } from './types'
import { showNotification } from '@/components/composables/useNotification'
import TeamTable from './partials/TeamTable.vue'

// --- State ---
const apiResponse = ref<Default | null>(null)
const loading = ref(true)

// --- Methods ---
const createTeamMember = () => {
  // abrir modal o redirigir
}

const paginate = ref<PaginatedResponse<Data> | null>(null)
const stats = computed<Stats | null>(() => apiResponse.value?.stats ?? null)


// --- Fetch Data ---
async function fetchTeamMembers() {
  try {
    loading.value = true
    const { data } = await api.get<ApiResponse<Default>>('/api/team_member')
    apiResponse.value = data.data
    paginate.value = apiResponse.value?.pagination
    console.log("respuesta: ", data.data)
  } catch (error) {
    console.error('Error al obtener miembros del equipo:', error)
    showNotification('error', 'Ocurrio un error al obtener los datos del equipo', 4000)
  } finally {
    loading.value = false
    console.log("coas", stats.value)

  }
}

// --- Lifecycle ---
onMounted(() => {
  fetchTeamMembers()
})
</script>
