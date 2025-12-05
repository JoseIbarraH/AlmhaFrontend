<template>
  <div class="max-w-7xl space-y-6 sm:px-2 lg:px-2 py-5">
    <div class="flex justify-end">
      <CreateButton @click.stop="handleCreateModal" :disabled="!$can('manage_users')">
        {{ $t('Dashboard.Setting.User.CreateButton') }}
      </CreateButton>
    </div>
    <UserTable
      :data="paginate?.data ?? []"
      @status-updated="fetchUsers(route.query.page ? Number(route.query.page) : 1)"
      @refresh-requested="handleRefresh"
      @search="handleSearch"
      @update="handleEditModal"
    />

    <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
  </div>

  <CreateUpdateModal
    :data="dataUpdate"
    :show="isOpen"
    :editing="editing"
    :closeable="true"
    :roles="roles"
    max-width="3xl"
    @refresh="fetchUsers(route.query.page ? Number(route.query.page) : 1)"
    @close="handleClose"
  />
</template>

<script setup lang="ts">
import type { Default, PaginatedResponse, ApiResponse } from '@/types/apiResponse';
import { showNotification } from '@/components/composables/useNotification';
import CreateUpdateModal from './partials/CreateUpdateModal.vue';
import CreateButton from '@/components/ui/CreateButton.vue';
import Pagination from '@/components/app/Pagination.vue';
import type { Data, Roles, RoleData } from './types';
import UserTable from './partials/UserTable.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const initialLoading = ref(true)
const loading = ref(true)
const apiResponse = ref<Default<Data> | null>(null)
const paginate = ref<PaginatedResponse<Data> | null>(null)
const searchQuery = ref('')

const isOpen = ref(false)
const editing = ref(false)
const roles = ref<Roles[]>()

const dataUpdate = ref<Data>({
  id: 0,
  name: '',
  email: '',
  password: '',
  roles: [],
  status: 'inactive',
  created_at: '',
  updated_at: ''
})

const handleCreateModal = () => {
  isOpen.value = !isOpen.value
}

const handleEditModal = (user: Data) => {
  isOpen.value = !isOpen.value
  editing.value = true
  dataUpdate.value = user
}

const handlePageChange = (page: number) => {
  router.push({ query: { ...route.query, page } })
  fetchUsers(page)
}

const handleRefresh = () => {
  const page = Number(route.query.page) || 1
  fetchUsers(page, searchQuery.value)
}

const handleSearch = (search: string) => {
  searchQuery.value = search
  fetchUsers(1, search)
}

const handleClose = () => {
  isOpen.value = !isOpen.value
  editing.value = false
  dataUpdate.value = {
    id: 0,
    name: '',
    email: '',
    password: '',
    roles: [],
    status: 'inactive',
    created_at: '',
    updated_at: ''
  }
}

const fetchUsers = async (page = 1, search = '') => {
  try {
    if (initialLoading.value) {
      loading.value = true
    }

    const params = new URLSearchParams()
    params.append('page', page.toString())
    if (search) {
      params.append('search', search)
    }

    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/setting/user?${params.toString()}`);
    apiResponse.value = data.data;
    paginate.value = apiResponse.value?.pagination;
  } catch (error: any) {
    showNotification('error', t('Dashboard.Setting.User.Validations.Error.GetData'), 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
}

const fetchRoles = async () => {
  try {
    const { data } = await api.get<ApiResponse<RoleData>>('/api/setting/user/roles');
    roles.value = data.data?.roles
  } catch (error) {
    console.error(error)
    showNotification('error', t('Dashboard.Setting.User.Validations.Error.GetRoles'), 4000);
  }
}

watch(
  () => route.params.locale,
  () => {
    const page = Number(route.query.page) || 1
    fetchUsers(page)
    fetchRoles()
  }
)

onMounted(() => {
  const page = Number(route.query.page) || 1
  fetchUsers(page)
  fetchRoles()
})

</script>
