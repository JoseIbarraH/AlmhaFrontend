<template>
  <div class="max-w-7xl space-y-6 sm:px-2 lg:px-2 py-5">
    <TrashTable :data="paginate?.data ?? []" @refresh-requested="handleRefresh" @search="handleSearch" />

    <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse, Default, PaginatedResponse } from '@/types/apiResponse';
import Pagination from '@/components/app/Pagination.vue';
import TrashTable from './partials/TrashTable.vue';
import { useAuthStore } from '@/stores/authStore';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import type { Data } from './types';
import { api } from '@/plugins/api';
import { showNotification } from '@/components/composables/useNotification';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const initialLoading = ref(true)
const loading = ref(true)
const paginate = ref<PaginatedResponse<Data> | null>(null)
const apiResponse = ref<Default<Data> | null>(null)
const searchQuery = ref('')

const fetchTrash = async (page = 1, search = '') => {
  if (!auth.can('view_trash')) return
  try {
    if (initialLoading.value) {
      loading.value = true
    }

    const params = new URLSearchParams()
    params.append('page', page.toString())
    if (search) {
      params.append('search', search)
    }

    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/settings/trash?${params.toString()}`)
    apiResponse.value = data.data
    paginate.value = apiResponse.value?.pagination

    router.replace({
      query: {
        page,
        ...(search && { search })
      }
    })
  } catch (error) {
    showNotification('error', t('Dashboard.Setting.Trash.Validations.Error.GetData'), 4000)
  }
}

const handlePageChange = (page: number) => {
  fetchTrash(page, searchQuery.value)
}

const handleSearch = (search: string) => {
  searchQuery.value = search
  fetchTrash(1, search)
}

const handleRefresh = () => {
  const page = Number(route.query.page) || 1
  fetchTrash(page, searchQuery.value)
}

watch(() => route.params.locale, () => {
  const page = Number(route.query.page) || 1
  const search = (route.query.search as string) || ''
  searchQuery.value = search
  fetchTrash(page, search)
})

onMounted(() => {
  const page = Number(route.query.page) || 1
  const search = (route.query.search as string) || ''
  searchQuery.value = search
  fetchTrash(page, search)
})
</script>
