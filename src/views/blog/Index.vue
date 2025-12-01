<template>
  <div v-if="loading">
    <Skeleton />
  </div>

  <div v-else>
    <section class="p-6 space-y-6 dark:bg-gray-950">
      <header
        class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {{ $t('Dashboard.Blog.Title') }}
        </h2>

        <CreateButton @click="openModal" class="flex items-center justify-center w-full sm:w-auto mt-4 sm:mt-0"
          :disabled="creating || !$can('create_blogs')">
          {{ $t('Dashboard.Blog.CreateButton') }}
        </CreateButton>
      </header>

      <Statistics :total-object-title="$t('Dashboard.Blog.Statistics.Total')" :total-object="stats?.total"
        :total-object-icon="LucideFileText" :total-activated-title="$t('Dashboard.Blog.Statistics.TeamsActives')"
        :total-activated="stats?.totalActivated"
        :total-deactivated-title="$t('Dashboard.Blog.Statistics.TeamsInactives')"
        :total-deactivated="stats?.totalDeactivated" :last-object-title="$t('Dashboard.Blog.Statistics.Last')"
        :last-object="stats?.lastCreated"
        :last-object-icon="LucideFilePlus"
        />

      <div class="bg-white rounded-lg shadow-md dark:bg-gray-900">
        <BlogGrid :data="paginate?.data ?? []"
          @status-updated="fetchBlogs(route.query.page ? Number(route.query.page) : 1)"
          @refresh-requested="handleRefresh"
          @search="handleSearch"
          />
      </div>
      <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
    </section>
  </div>

  <Modal :show="isOpen" max-width="md" @close="closeModal">
    <div class="bg-white rounded-lg dark:bg-gray-800 overflow-hidden">

      <div class="px-6 py-4 border-gray-200 bg-gray-200 dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
          {{ $t('Dashboard.Blog.Create.Title') }}
        </h2>
        <p class="text-sm text-gray-600 mt-1 dark:text-white">
          {{ $t('Dashboard.Blog.Create.Subtitle') }}
        </p>
      </div>

      <div class="px-6 py-6">
        <div class="space-y-2">
          <InputLabel for="title" :value="$t('Dashboard.Blog.Create.Title')"
            class="text-sm font-medium text-gray-700" />
          <TextInput id="title" v-model="form.title"
            :placeholder="$t('Dashboard.Blog.Create.Placeholder')" />
          <p class="text-xs text-gray-500 mt-1 dark:text-white">{{ $t('Dashboard.Blog.Create.Optional') }}</p>
        </div>
      </div>

      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-950 flex justify-end gap-3">
        <SecondaryButton @click="closeModal"
          class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200">
          {{ $t('Dashboard.Blog.Create.Cancel') }}
        </SecondaryButton>

        <PrimaryButton @click="confirmCreate" :disabled="!$can('create_blogs')"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md">
          {{ $t('Dashboard.Blog.Create.CreateButton') }}
        </PrimaryButton>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { Default, PaginatedResponse, ApiResponse, Stats } from '@/types/apiResponse';
import { showNotification } from '@/components/composables/useNotification';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import { LucideFilePlus, LucideFileText } from 'lucide-vue-next';
import { ref, computed, onMounted, reactive, watch } from 'vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import CreateButton from '@/components/ui/CreateButton.vue';
import Statistics from '@/components/app/Statistics.vue';
import Pagination from '@/components/app/Pagination.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { useRoute, useRouter } from 'vue-router';
import Modal from '@/components/app/Modal.vue';
import BlogGrid from './partials/BlogGrid.vue';
import Skeleton from './partials/Skeleton.vue';
import { api } from '@/plugins/api';
import type { Data } from './types';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/authStore';

const { t } = useI18n()

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const isOpen = ref(false)

const apiResponse = ref<Default<Data> | null>(null)
const loading = ref(true)
const paginate = ref<PaginatedResponse<Data> | null>(null)
const creating = ref(false)
const initialLoading = ref(true)
const searchQuery = ref('')

const stats = computed<Stats | null>(() => apiResponse.value?.stats ?? null)

const form = reactive({
  title: ''
})

const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('title', form.title)

  return formData
}

const confirmCreate = async () => {
  creating.value = true
  try {
    const formData = buildFormData()
    const page = Number(route.query.page) || 1

    await api.post('/api/blog', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    showNotification('success', t('Dashboard.Blog.Validations.Success.Create'), 3000);

    handlePageChange(page)

    closeModal()
  } catch (error) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.Create'), 4000);
  } finally {
    creating.value = false
  }
}

async function fetchBlogs(page = 1, search = '') {
  if(!auth.can('view_blogs')) return
  try {
    if (initialLoading.value) {
      loading.value = true
    }

    const params = new URLSearchParams()
    params.append('page', page.toString())
    if (search) {
      params.append('search', search)
    }

    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/blog?${params.toString()}`);
    apiResponse.value = data.data;
    paginate.value = apiResponse.value?.pagination;

  } catch (error) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.GetData'), 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
}

const handleRefresh = () => {
  const page = Number(route.query.page) || 1
  fetchBlogs(page, searchQuery.value)
}

const handleSearch = (search: string) => {
  searchQuery.value = search
  fetchBlogs(1, search)
}

function handlePageChange(page: number) {
  router.push({ query: { ...route.query, page } })
  fetchBlogs(page)
}

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

let initialized = false;

onMounted(() => {
  if (!initialized) {
    const page = Number(route.query.page) || 1
    fetchBlogs(page);
    initialized = true;
  }
})

watch(
  () => route.params.locale,
  () => {
    const page = Number(route.query.page) || 1
    fetchBlogs(page)
  }
)
</script>
