<template>
  <div class="max-w-7xl space-y-6 sm:px-2 lg:px-2 py-5">
    <div class="flex justify-end">
      <CreateButton @click.stop="handleModal">
        {{ $t('Dashboard.Setting.RolePermission.CreateButton') }}
      </CreateButton>
    </div>
    <RoleTable :data="paginate?.data ?? []"
      @status-updated="fetchRoles(route.query.page ? Number(route.query.page) : 1)"
      @refresh-requested="handleRefresh"
      @search="handleSearch"
      @update="OpenEdit" />

    <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
  </div>

  <RoleForm :show="isOpen" :closeable="true" max-width="4xl" @close="handleModal" :permissions="permissions"
    :edit-data="edit" :editing="editing" />
</template>

<script setup lang="ts">
import type { Default, PaginatedResponse, ApiResponse } from '@/types/apiResponse';
import type { Data, PermissionGroup, PermissionData, EditRole } from './types';
import { showNotification } from '@/components/composables/useNotification';
import CreateButton from '@/components/ui/CreateButton.vue';
import Pagination from '@/components/app/Pagination.vue';
import RoleTable from './partials/RoleTable.vue';
import { useRoute, useRouter } from 'vue-router';
import RoleForm from './partials/RoleForm.vue';
import { onMounted, ref, watch } from 'vue';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const {t} = useI18n()
const route = useRoute()
const router = useRouter()

const initialLoading = ref(true)
const loading = ref(true)
const apiResponse = ref<Default<Data> | null>(null)
const permissions = ref<PermissionGroup | null>(null)
const paginate = ref<PaginatedResponse<Data> | null>(null)
const searchQuery = ref('')

const isOpen = ref(false)
const edit = ref<EditRole | null>(null)
const editing = ref(false)

const fetchRoles = async (page = 1, search = '') => {
  try {
    if (initialLoading.value) {
      loading.value = true
    }

    const params = new URLSearchParams()
    params.append('page', page.toString())
    if (search) {
      params.append('search', search)
    }

    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/setting/role?${params.toString()}`);
    apiResponse.value = data.data;
    paginate.value = apiResponse.value?.pagination;
    router.replace({
      query: {
        page,
        ...(search && { search })
      }
    })
  } catch (error: any) {
    console.error(error)
    showNotification('error', t('Dashboard.Setting.RolePermission.Validations.Error.GetRoles'), 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
}

const fetchPermission = async () => {
  try {
    const { data } = await api.get<ApiResponse<PermissionData>>('/api/setting/role/permits');
    permissions.value = data.data.permissions
  } catch (error) {
    console.error(error)
    showNotification('error', t('Dashboard.Setting.RolePermission.Validations.Error.GetPermissions'), 4000);
  }
}

const OpenEdit = (role: Data) => {
  edit.value = {
    id: role.id,
    title: role.title,
    code: role.code,
    description: role.description,
    status: role.status,
    permits: role.permits.map(p => p.code)
  }

  editing.value = true
  isOpen.value = true
}

const handlePageChange = (page: number) => {
  router.push({ query: { ...route.query, page } })
  fetchRoles(page)
}

const handleRefresh = () => {
  const page = Number(route.query.page) || 1
  fetchRoles(page, searchQuery.value)
}

const handleSearch = (search: string) => {
  searchQuery.value = search
  fetchRoles(1, search)
}

const handleModal = () => {
  const page = Number(route.query.page) || 1
  isOpen.value = !isOpen.value
  editing.value = false
  if (isOpen.value) {
    edit.value = {
      id: null,
      title: '',
      code: '',
      description: '',
      status: 'active',
      permits: []
    }
  }
  fetchRoles(page)
}

watch(
  () => route.params.locale,
  () => {
    const page = Number(route.query.page) || 1
    fetchRoles(page)
    fetchPermission()
  }
)

onMounted(() => {
  const page = Number(route.query.page) || 1
  fetchRoles(page)
  fetchPermission()
})
</script>
