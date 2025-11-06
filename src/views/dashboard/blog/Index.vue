<template>
  <div v-if="loading">
    <Skeleton />
  </div>

  <div v-else>
    <section class="p-6 space-y-6">
      <header
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg h-[82px]">
        <h2 class="text-xl font-semibold text-gray-800">
          {{ $t('Dashboard.Blog.Title') }}
        </h2>

        <CreateButton @click="openModal" class="flex items-center justify-center w-full sm:w-auto" :disabled="creating">
          {{ $t('Dashboard.Blog.CreateButton') }}
        </CreateButton>
      </header>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <Statistics :total-object-title="$t('Dashboard.Blog.Statistics.Total')" :total-object="stats?.total"
          :total-activated-title="$t('Dashboard.Blog.Statistics.TeamsActives')" :total-activated="stats?.totalActivated"
          :total-deactivated-title="$t('Dashboard.Blog.Statistics.TeamsInactives')"
          :total-deactivated="stats?.totalDeactivated" :last-object-title="$t('Dashboard.Blog.Statistics.Last')"
          :last-object="stats?.lastCreated" />
      </div>
      <div class="bg-white rounded-lg shadow-md">
        <BlogGrid :data="paginate?.data ?? []"
          @status-updated="fetchBlogs(route.query.page ? Number(route.query.page) : 1)"
          @refresh-requested="fetchBlogs(route.query.page ? Number(route.query.page) : 1)" />
      </div>
      <div class="w-full flex items-center justify-center">
        <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
      </div>
    </section>
  </div>

  <Modal :show="isOpen" max-width="md" @close="closeModal">
    <div class="bg-white rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 class="text-xl font-semibold text-gray-800">
          {{ $t('Dashboard.Blog.Create.Title') }}
        </h2>
        <p class="text-sm text-gray-600 mt-1">
          {{ $t('Dashboard.Blog.Create.Subtitle') }}
        </p>
      </div>

      <!-- Content -->
      <div class="px-6 py-6">
        <div class="space-y-2">
          <InputLabel for="title" :value="$t('Dashboard.Blog.Create.Title')"
            class="text-sm font-medium text-gray-700" />
          <TextInput id="title" v-model="form.title"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            :placeholder="$t('Dashboard.Blog.Create.Placeholder')" />
          <p class="text-xs text-gray-500 mt-1">{{ $t('Dashboard.Blog.Create.Optional') }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
        <SecondaryButton @click="closeModal"
          class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200">
          {{ $t('Dashboard.Blog.Create.Cancel') }}
        </SecondaryButton>

        <PrimaryButton @click="confirmCreate"
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
import CreateButton from '@/components/ui/CreateButton.vue';
import Statistics from '@/components/app/Statistics.vue';
import Pagination from '@/components/app/Pagination.vue';
import { ref, computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Modal from '@/components/app/Modal.vue';
import BlogGrid from './partials/BlogGrid.vue';
import { api } from '@/plugins/api';
import type { Data } from './types';
import { useI18n } from 'vue-i18n';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import Skeleton from './partials/Skeleton.vue';

const { t } = useI18n()

const router = useRouter()
const route = useRoute()

const page = Number(route.query.page) || 1

const isOpen = ref(false)

const apiResponse = ref<Default<Data> | null>(null)
const loading = ref(true)
const paginate = ref<PaginatedResponse<Data> | null>(null)
const creating = ref(false)
const initialLoading = ref(true)

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

async function fetchBlogs(page = 1) {
  try {
    if (initialLoading.value) {
      loading.value = true
    }
    const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/blog?page=${page}`);
    apiResponse.value = data.data;
    paginate.value = apiResponse.value?.pagination;

    /* router.replace({ query: { page } }); */
  } catch (error) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.GetData'), 4000);
  } finally {
    loading.value = false;
    initialLoading.value = false
  }
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
    fetchBlogs(page);
    initialized = true;
  }
})

/* watch(
  () => route.query.page,
  (newPage) => {
    if (newPage) fetchBlogs(Number(newPage))
  }
) */
</script>
