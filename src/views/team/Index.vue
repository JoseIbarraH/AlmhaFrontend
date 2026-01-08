<template>
  <div v-if="loading">
    <Skeleton />
  </div>

  <div v-else>
    <section class="p-6 space-y-6 dark:bg-gray-950">
      <header
        class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full">
        <!-- Título -->
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {{ $t('Dashboard.Team.Title') }}
        </h2>

        <CreateButton @click="openModal" class="flex items-center justify-center w-full sm:w-auto"
          :disabled="!$can('create_teams')">
          {{ $t('Dashboard.Team.CreateButton') }}
        </CreateButton>
      </header>

      <Statistics :total-object-title="$t('Dashboard.Team.Statistics.Total')" :total-object="stats?.total"
        :total-activated-title="$t('Dashboard.Team.Statistics.TeamsActives')" :total-activated="stats?.totalActivated"
        :total-deactivated-title="$t('Dashboard.Team.Statistics.TeamsInactives')"
        :total-deactivated="stats?.totalDeactivated" :last-object-title="$t('Dashboard.Team.Statistics.Last')"
        :last-object="stats?.lastCreated" />

      <TeamTable :data="paginate?.data ?? []"
        @status-updated="fetchTeamMembers(route.query.page ? Number(route.query.page) : 1)" @search="handleSearch" />

      <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
    </section>
  </div>

  <Modal :show="isOpen" max-width="md" @close="closeModal">
    <div class="bg-white rounded-lg dark:bg-gray-800 overflow-hidden">

      <div class="px-6 py-4 border-gray-200 bg-gray-200 dark:bg-gray-900">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
          {{ $t('Dashboard.Team.Create.Title') }}
        </h2>
        <p class="text-sm text-gray-600 mt-1 dark:text-white">
          {{ $t('Dashboard.Team.Create.Subtitle') }}
        </p>
      </div>

      <div class="px-6 py-6">
        <div class="space-y-2">
          <InputLabel for="title" :value="$t('Dashboard.Team.Create.Name')" class="text-sm font-medium text-gray-700" />
          <TextInput id="title" v-model="form.name" :placeholder="$t('Dashboard.Team.Create.Placeholder')" />
          <p class="text-xs text-gray-500 mt-1 dark:text-white">{{ $t('Dashboard.Team.Create.Optional') }}</p>
        </div>
      </div>

      <div
        class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-950 flex justify-end gap-3">
        <SecondaryButton @click="closeModal"
          class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200">
          {{ $t('Dashboard.Team.Create.Cancel') }}
        </SecondaryButton>

        <PrimaryButton @click="confirmCreate" :disabled="!$can('create_teams')"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md">
          {{ $t('Dashboard.Team.Create.CreateButton') }}
        </PrimaryButton>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { Default, PaginatedResponse, ApiResponse, Stats } from '@/types/apiResponse';
import { showNotification } from '@/components/composables/useNotification';
import CreateButton from '@/components/ui/CreateButton.vue';
import Statistics from '@/components/app/Statistics.vue';
import Pagination from '@/components/app/Pagination.vue';
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import TeamTable from './partials/TeamTable.vue';
import { useRoute, useRouter } from 'vue-router';
import Skeleton from './partials/Skeleton.vue';
import type { Data } from './types';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';
import Modal from '@/components/app/Modal.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const apiResponse = ref<Default<Data> | null>(null)
const initialLoading = ref(true)
const loading = ref(true)
const paginate = ref<PaginatedResponse<Data> | null>(null)
const searchQuery = ref('')
const creating = ref(false)
const stats = computed<Stats | null>(() => apiResponse.value?.stats ?? null)

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const form = reactive({
  name: ''
})

const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('name', form.name)

  return formData
}

const confirmCreate = async () => {
  creating.value = true
  try {
    const formData = buildFormData()
    const page = Number(route.query.page) || 1

    const { data } = await api.post('/api/team_member', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    handlePageChange(page)
    closeModal()
    showNotification('success', t('Dashboard.Team.Validations.Success.Create'), 3000);
    router.push({ name: 'dashboard.team.edit', params: { id: data.data.id } })
  } catch (error) {
    showNotification('error', t('Dashboard.Team.Validations.Error.Create'), 4000);
  } finally {
    creating.value = false
  }
}

async function fetchTeamMembers(page = 1, search = '') {
  if (!auth.can('view_teams')) return
  try {
    if (initialLoading.value) {
      loading.value = true
    }

    const params = new URLSearchParams()
    params.append('page', page.toString())
    if (search) {
      params.append('search', search)
    }

    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/team_member?${params.toString()}`);
    apiResponse.value = data.data;
    paginate.value = apiResponse.value?.pagination;
  } catch (error) {
    console.error("Error en team: ", error)
    showNotification('error', t('Dashboard.Team.Validations.Error.GetData'), 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
}

function handlePageChange(page: number) {
  router.push({ query: { ...route.query, page } })
  fetchTeamMembers(page)
}

const handleSearch = (search: string) => {
  searchQuery.value = search
  fetchTeamMembers(1, search)
}

watch(() => route.params.locale,
  () => {
    const page = Number(route.query.page) || 1
    fetchTeamMembers(page)
  }
)

onMounted(() => {
  const page = Number(route.query.page) || 1
  fetchTeamMembers(page)
})

</script>
