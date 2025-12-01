<template>
  <div v-if="loading">
    <Skeleton />
  </div>

  <div v-else>
    <section class="p-6 space-y-6 dark:bg-gray-950">
      <header
        class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {{ $t('Dashboard.Service.Title') }}
        </h2>

        <CreateButton @click="createService" :disabled="!$can('create_services')"
          class="flex items-center justify-center w-full sm:w-auto mt-4 sm:mt-0">
          {{ $t('Dashboard.Service.CreateButton') }}
        </CreateButton>
      </header>

      <Statistics :total-object-title="$t('Dashboard.Service.Statistics.Total')" :total-object="stats?.total"
        :total-object-icon="LucideClipboardList"
        :total-activated-title="$t('Dashboard.Service.Statistics.TeamsActives')"
        :total-activated="stats?.totalActivated"
        :total-deactivated-title="$t('Dashboard.Service.Statistics.TeamsInactives')"
        :total-deactivated="stats?.totalDeactivated" :last-object-title="$t('Dashboard.Service.Statistics.Last')"
        :last-object="stats?.lastCreated" :last-object-icon="LucideClipboardPlus" />

      <div class="bg-white rounded-lg shadow-md dark:bg-gray-900">
        <ServiceGrid :data="paginate?.data ?? []"
          @status-updated="fetchServices(route.query.page ? Number(route.query.page) : 1)"
          @search="handleSearch"/>
      </div>

      <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Default, PaginatedResponse, ApiResponse, Stats } from '@/types/apiResponse';
import { showNotification } from '@/components/composables/useNotification';
import { LucideClipboardList, LucideClipboardPlus } from 'lucide-vue-next';
import CreateButton from '@/components/ui/CreateButton.vue';
import Statistics from '@/components/app/Statistics.vue';
import Pagination from '@/components/app/Pagination.vue';
import { ref, computed, onMounted, watch } from 'vue';
import ServiceGrid from './partials/ServiceGrid.vue';
import { useRoute, useRouter } from 'vue-router';
import Skeleton from './partials/Skeleton.vue';
import type { Data } from './types';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const apiResponse = ref<Default<Data> | null>(null)
const initialLoading = ref(true)
const loading = ref(true)
const paginate = ref<PaginatedResponse<Data> | null>(null)
const searchQuery = ref('')

const stats = computed<Stats | null>(() => apiResponse.value?.stats ?? null)

const fetchServices = async (page = 1, search = '') => {
  try {
    if (initialLoading.value) {
      loading.value = true
    }

    const params = new URLSearchParams()
    params.append('page', page.toString())
    if (search) {
      params.append('search', search)
    }

    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/service?${params.toString()}`)
    apiResponse.value = data.data
    paginate.value = apiResponse.value?.pagination

    router.replace({ query: { page } });
  } catch (error) {
    showNotification('error', t('Dashboard.Service.Validations.Error.GetData'), 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
}

const createService = () => {
  router.push({ name: 'dashboard.service.create' })
}

const handleSearch = (search: string) => {
  searchQuery.value = search
  fetchServices(1, search)
}

const handlePageChange = (page: number) => {
  router.push({ query: { ...route.query, page } })
  fetchServices(page)
}

watch(() => route.params.locale,
  () => {
    const page = Number(route.query.page) || 1
    fetchServices(page)
  }
)

onMounted(() => {
  const page = Number(route.query.page) || 1
  fetchServices(page)
})
</script>
