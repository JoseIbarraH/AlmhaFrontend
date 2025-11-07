<template>
  <div v-if="loading">
    <Skeleton />
  </div>

  <div v-else>
    <section class="p-6 space-y-6">
      <header
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg h-[82px]">
        <h2 class="text-xl font-semibold text-gray-800">
          {{ $t('Dashboard.Service.Title') }}
        </h2>

        <CreateButton @click="createService" class="flex items-center justify-center w-full sm:w-auto">
          {{ $t('Dashboard.Service.CreateButton') }}
        </CreateButton>
      </header>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <Statistics :total-object-title="$t('Dashboard.Service.Statistics.Total')" :total-object="stats?.total"
          :total-activated-title="$t('Dashboard.Service.Statistics.TeamsActives')"
          :total-activated="stats?.totalActivated"
          :total-deactivated-title="$t('Dashboard.Service.Statistics.TeamsInactives')"
          :total-deactivated="stats?.totalDeactivated" :last-object-title="$t('Dashboard.Service.Statistics.Last')"
          :last-object="stats?.lastCreated" />
      </div>

      <div class="bg-white rounded-lg shadow-md">
        <ServiceGrid :data="paginate?.data ?? []"
          @status-updated="fetchServices(route.query.page ? Number(route.query.page) : 1)"
          @refresh-requested="fetchServices(route.query.page ? Number(route.query.page) : 1)" />
      </div>

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
import ServiceGrid from './partials/ServiceGrid.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
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

const fetchServices = async (page = 1) => {
  try {
    if (initialLoading.value) {
      loading.value = true
    }
    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/service?page=${page}`)
    apiResponse.value = data.data
    paginate.value = apiResponse.value?.pagination
    console.log('Paginacion? ', paginate.value)

  } catch (error) {
    showNotification('error', 'Ocurrió un error al obtener los datos de los servicios', 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
}

const createService = () => {
  router.push({ name: 'dashboard.service.create' })
}

const handlePageChange = (page: number) => {
  router.push({ query: { ...route.query, page } })
  fetchServices(page)
}

onMounted(() => {
  const page = Number(route.query.page) || 1
  fetchServices(page)
})
</script>
