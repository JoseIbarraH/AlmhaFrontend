<template>
  <div class="max-w-7xl space-y-6 sm:px-2 lg:px-2 py-5">
    <div class="flex justify-between">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        Roles
      </h2>
      <CreateButton @click.stop="handleModal">
        Crear rol
      </CreateButton>
    </div>
    <RoleTable :data="paginate?.data ?? []"
      @status-updated="fetchRoles(route.query.page ? Number(route.query.page) : 1)"
      @refresh-requested="fetchRoles(route.query.page ? Number(route.query.page) : 1)" @update="OpenEdit" />

    <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
  </div>

  <RoleForm :show="isOpen" :closeable="true" max-width="4xl" @close="handleModal" :permissions="permissions"
    :edit-data="edit" :editing="editing" />
</template>

<script setup lang="ts">
import type { Default, PaginatedResponse, ApiResponse } from '@/types/apiResponse';
import { showNotification } from '@/components/composables/useNotification';
import CreateButton from '@/components/ui/CreateButton.vue';
import Pagination from '@/components/app/Pagination.vue';
import RoleTable from './Partials/RoleTable.vue';
import { useRoute, useRouter } from 'vue-router';
import type { Data, Permission, PermissionData, EditRole } from './types';
import RoleForm from './Partials/RoleForm.vue';
import { onMounted, ref } from 'vue';
import { api } from '@/plugins/api';

const route = useRoute()
const router = useRouter()

const page = Number(route.query.page) || 1

const isOpen = ref(false)

const initialLoading = ref(true)
const loading = ref(true)
const apiResponse = ref<Default<Data> | null>(null)
const permissions = ref<Permission[]>([])
const paginate = ref<PaginatedResponse<Data> | null>(null)

const edit = ref<EditRole | null>(null)
const editing = ref(false)

const fetchRoles = async (page = 1) => {
  try {
    if (initialLoading.value) {
      loading.value = true
    }
    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/setting/role?page=${page}`);
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

const fetchPermission = async () => {
  try {
    const { data } = await api.get<ApiResponse<PermissionData>>('/api/setting/role/permits');
    permissions.value = data.data.permissions
  } catch (error) {
    showNotification('error', 'Ocurrió un error al obtener los permisos', 4000);
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

const handleModal = () => {
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


onMounted(() => {
  const page = Number(route.query.page) || 1
  fetchRoles(page)
  fetchPermission()
})
</script>
