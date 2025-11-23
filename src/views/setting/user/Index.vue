<template>
  <div class="max-w-7xl space-y-6 sm:px-2 lg:px-2 py-5">
    <div class="flex justify-between">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        Usuarios
      </h2>
      <CreateButton @click.stop="handleCreateModal">
        Crear usuario
      </CreateButton>
    </div>
    <UserTable
      :data="paginate?.data ?? []"
      @status-updated="fetchUsers(route.query.page ? Number(route.query.page) : 1)"
      @refresh-requested="fetchUsers(route.query.page ? Number(route.query.page) : 1)"
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
import UserTable from './partials/UserTable.vue';
import { useRoute, useRouter } from 'vue-router';
import type { Data, Roles, RoleData } from './types';
import { onMounted, ref } from 'vue';
import { api } from '@/plugins/api';

const route = useRoute()
const router = useRouter()

const page = Number(route.query.page) || 1

/* const isOpen = ref(false) */

const initialLoading = ref(true)
const loading = ref(true)
const apiResponse = ref<Default<Data> | null>(null)
const paginate = ref<PaginatedResponse<Data> | null>(null)

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

/* const edit = ref<EditUser | null>(null)
const editing = ref(false) */

const handleCreateModal = () => {
  isOpen.value = !isOpen.value
}

const handleEditModal = (user: Data) => {
  console.log(user)
  isOpen.value = !isOpen.value
  editing.value = true
  dataUpdate.value = user
}

const handlePageChange = (page: number) => {
  router.push({ query: { ...route.query, page } })
  fetchUsers(page)
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

const fetchUsers = async (page = 1) => {
  try {
    if (initialLoading.value) {
      loading.value = true
    }
    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/setting/user?page=${page}`);
    apiResponse.value = data.data;
    paginate.value = apiResponse.value?.pagination;
    console.log(apiResponse.value)
  } catch (error: any) {
    showNotification('error', 'Ocurrió un error al obtener los datos del equipo', 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
}

const fetchRoles = async () => {
  try {
    const { data } = await api.get<ApiResponse<RoleData>>('/api/setting/user/roles');
    roles.value = data.data?.roles
    console.log("roles: ", data)
  } catch (error) {
    console.error(error)
    showNotification('error', 'Ocurrió un error al obtener los roles', 4000);
  }
}

onMounted(() => {
  fetchUsers(page)
  fetchRoles()
})

</script>
