<template>
  <div class="mx-auto max-w-7xl space-y-6 sm:px-4 lg:px-6 py-5">
    <div>
      <RoleTable :data="paginate?.data ?? []"
        @status-updated="fetchRoles(route.query.page ? Number(route.query.page) : 1)"
        @refresh-requested="fetchRoles(route.query.page ? Number(route.query.page) : 1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Default, PaginatedResponse, ApiResponse, Stats } from '@/types/apiResponse';
import { showNotification } from '@/components/composables/useNotification';
import RoleTable from './Partials/RoleTable.vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/plugins/api';
import type { Data } from './types'
import { ref } from 'vue';

const route = useRoute()
const router = useRouter()

const initialLoading = ref(true)
const loading = ref(true)
const apiResponse = ref<Default<Data> | null>(null)
const paginate = ref<PaginatedResponse<Data> | null>(null)

async function fetchRoles(page = 1) {
  try {
    if (initialLoading.value) {
      loading.value = true
    }
    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/team_member?page=${page}`);
    apiResponse.value = data.data;
    paginate.value = apiResponse.value?.pagination;
  } catch (error) {
    showNotification('error', 'Ocurrió un error al obtener los datos del equipo', 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
}
</script>
