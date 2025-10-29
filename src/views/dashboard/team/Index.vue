<template>
  <section class="p-6 space-y-6">
    <!-- Header -->
    <header
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg"
    >
      <h2 class="text-xl font-semibold text-gray-800">
        {{ $t('Dashboard.Team.Title') }}
      </h2>

      <CreateButton
        @click="createTeamMember"
        class="flex items-center justify-center w-full sm:w-auto"
      >
        {{ $t('Dashboard.Team.Form.Create') }}
      </CreateButton>
    </header>

    <!-- Statistics -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <Statistics
        :total-object-title="$t('Dashboard.Team.TotalTeams')"
        :total-object="stats?.total"
        :total-activated-title="$t('Dashboard.Team.TeamsActives')"
        :total-activated="stats?.totalActivated"
        :total-deactivated-title="$t('Dashboard.Team.TeamsInactives')"
        :total-deactivated="stats?.totalDeactivated"
        :last-object-title="$t('Dashboard.Team.LastTeams')"
        :last-object="stats?.lastCreated"
      />
    </div>

    <!-- Content -->
    <TeamTable :data="paginate?.data ?? []"
    @status-updated="fetchTeamMembers(route.query.page ? Number(route.query.page) : 1)" />

    <!-- Pagination -->
    <Pagination
      v-if="paginate"
      :pagination="paginate"
      @page-change="handlePageChange"
    />
  </section>
</template>

<script setup lang="ts">
import type { ApiResponse, Default, PaginatedResponse, Stats, Data } from './types'
import { showNotification } from '@/components/composables/useNotification'
import CreateButton from '@/components/ui/CreateButton.vue'
import Statistics from '@/components/app/Statistics.vue'
import TeamTable from './partials/TeamTable.vue'
import Pagination from '@/components/app/Pagination.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { api } from '@/plugins/api'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// --- State ---
const apiResponse = ref<Default | null>(null)
const loading = ref(true)
const paginate = ref<PaginatedResponse<Data> | null>(null)

const stats = computed<Stats | null>(() => apiResponse.value?.stats ?? null)

// --- Methods ---
const createTeamMember = () => {
  // abrir modal o redirigir
}

// --- Fetch Data ---
async function fetchTeamMembers(page = 1) {
  try {
    loading.value = true;
    const { data } = await api.get<ApiResponse<Default>>(`/api/team_member?page=${page}`);
    apiResponse.value = data.data;
    paginate.value = apiResponse.value?.pagination;

    // Actualiza la URL sin recargar la página
    router.replace({ query: { page } });
  } catch (error) {
    console.error('Error al obtener miembros del equipo:', error);
    showNotification('error', 'Ocurrió un error al obtener los datos del equipo', 4000);
  } finally {
    loading.value = false;
  }
}

// --- Navegación entre páginas ---
function handlePageChange(page: number) {
  // Actualizamos la URL sin recargar la página
  router.push({ query: { ...route.query, page } })
  // Llamamos al fetch con la página seleccionada
  fetchTeamMembers(page)
}

// --- Lifecycle ---
onMounted(() => {
  const page = Number(route.query.page) || 1
  fetchTeamMembers(page)
})

// Si cambia el parámetro ?page= en la URL (por navegación manual)
watch(
  () => route.query.page,
  (newPage) => {
    if (newPage) fetchTeamMembers(Number(newPage))
  }
)
</script>
