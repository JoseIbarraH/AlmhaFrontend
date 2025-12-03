<template>
  <div class="max-w-7xl space-y-6 sm:px-2 lg:px-2 py-5">
    <AuditTable
      :data="paginate?.data ?? []"
      @refresh-requested="handleRefresh"
      @search="handleSearch" />

    <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse, Default, PaginatedResponse } from '@/types/apiResponse';
import { showNotification } from '@/components/composables/useNotification';
import Pagination from '@/components/app/Pagination.vue';
import AuditTable from './partials/AuditTable.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import type { Data } from './types';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const initialLoading = ref(true)
const loading = ref(true)
const apiResponse = ref<Default<Data> | null>(null)
const paginate = ref<PaginatedResponse<Data> | null>(null)
const searchQuery = ref('') // ⭐ Estado de búsqueda

const fetchAudit = async (page = 1, search = '') => {
  try {
    if (initialLoading.value) {
      loading.value = true
    }

    const params = new URLSearchParams()
    params.append('page', page.toString())
    if (search) {
      params.append('search', search)
    }

    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/setting/audit?${params.toString()}`)
    apiResponse.value = data.data
    paginate.value = apiResponse.value?.pagination

    // ⭐ Actualizar URL
    router.replace({
      query: {
        page,
        ...(search && { search })
      }
    })

  } catch (error: any) {
    showNotification('error', t('Dashboard.Setting.Audit.Validations.GetData'), 4000)
  } finally {
    loading.value = false
    initialLoading.value = false
  }
}

const handlePageChange = (page: number) => {
  fetchAudit(page, searchQuery.value)
}

const handleSearch = (search: string) => {
  searchQuery.value = search
  fetchAudit(1, search)
}

const handleRefresh = () => {
  const page = Number(route.query.page) || 1
  fetchAudit(page, searchQuery.value)
}

watch(() => route.params.locale, () => {
  const page = Number(route.query.page) || 1
  const search = (route.query.search as string) || ''
  searchQuery.value = search
  fetchAudit(page, search)
})

onMounted(() => {
  const page = Number(route.query.page) || 1
  const search = (route.query.search as string) || ''
  searchQuery.value = search
  fetchAudit(page, search)
})
</script>
