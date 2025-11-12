<template>
  <div v-if="loading">
    <Skeleton />
  </div>

  <div v-else>
    <section class="p-6 space-y-6">
      <header
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg h-[82px]">
        <h2 class="text-xl font-semibold text-gray-800">
          {{ $t('Dashboard.Team.Title') }}
        </h2>

        <CreateButton @click="createTeamMember" class="flex items-center justify-center w-full sm:w-auto">
          {{ $t('Dashboard.Team.CreateButton') }}
        </CreateButton>
      </header>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <Statistics :total-object-title="$t('Dashboard.Team.Statistics.Total')" :total-object="stats?.total"
          :total-activated-title="$t('Dashboard.Team.Statistics.TeamsActives')" :total-activated="stats?.totalActivated"
          :total-deactivated-title="$t('Dashboard.Team.Statistics.TeamsInactives')"
          :total-deactivated="stats?.totalDeactivated" :last-object-title="$t('Dashboard.Team.Statistics.Last')"
          :last-object="stats?.lastCreated" />
      </div>

      <TeamTable :data="paginate?.data ?? []"
        @status-updated="fetchTeamMembers(route.query.page ? Number(route.query.page) : 1)"
        @refresh-requested="fetchTeamMembers(route.query.page ? Number(route.query.page) : 1)" />

      <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Default, PaginatedResponse, ApiResponse, Stats } from '@/types/apiResponse';
import { showNotification } from '@/components/composables/useNotification';
import CreateButton from '@/components/ui/CreateButton.vue';
import Statistics from '@/components/app/Statistics.vue';
import Pagination from '@/components/app/Pagination.vue';
import { ref, computed, onMounted } from 'vue';
import TeamTable from './partials/TeamTable.vue';
import { useRoute, useRouter } from 'vue-router';
import Skeleton from './partials/Skeleton.vue';
import type { Data } from './types';
import { api } from '@/plugins/api';

const route = useRoute()
const router = useRouter()

const apiResponse = ref<Default<Data> | null>(null)
const initialLoading = ref(true)
const loading = ref(true)
const paginate = ref<PaginatedResponse<Data> | null>(null)

const stats = computed<Stats | null>(() => apiResponse.value?.stats ?? null)

const createTeamMember = () => {
  router.push({ name: 'dashboard.team.create' })
}

async function fetchTeamMembers(page = 1) {
  try {
    if (initialLoading.value) {
      loading.value = true
    }
    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/team_member?page=${page}`);
    apiResponse.value = data.data;
    paginate.value = apiResponse.value?.pagination;
    console.log('pa: ', paginate.value)
  } catch (error) {
    showNotification('error', 'Ocurrió un error al obtener los datos del equipo', 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
}

function handlePageChange(page: number) {
  router.push({ query: { ...route.query, page } })
  fetchTeamMembers(page)
}

onMounted(() => {
  const page = Number(route.query.page) || 1
  fetchTeamMembers(page)
})

</script>
