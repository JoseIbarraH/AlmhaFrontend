<template>
    <div v-if="loading">
        <Skeleton />
    </div>

    <div v-else>
        <section class="p-6 space-y-6 dark:bg-gray-950">
            <header
                class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {{ $t('Dashboard.Procedure.Title') }}
                </h2>

                <CreateButton @click="createProcedure"
                    class="flex items-center justify-center w-full sm:w-auto mt-4 sm:mt-0">
                    {{ $t('Dashboard.Procedure.CreateButton') }}
                </CreateButton>
            </header>

            <Statistics :total-object-title="$t('Dashboard.Procedure.Statistics.Total')" :total-object="stats?.total"
                :total-object-icon="LucideClipboardList"
                :total-activated-title="$t('Dashboard.Procedure.Statistics.TeamsActives')"
                :total-activated="stats?.totalActivated"
                :total-deactivated-title="$t('Dashboard.Procedure.Statistics.TeamsInactives')"
                :total-deactivated="stats?.totalDeactivated"
                :last-object-title="$t('Dashboard.Procedure.Statistics.Last')" :last-object="stats?.lastCreated"
                :last-object-icon="LucideClipboardPlus" />

            <div class="bg-white rounded-lg shadow-md dark:bg-gray-900">
                <ProcedureGrid :data="paginate?.data ?? []"
                    @status-updated="fetchProcedures(route.query.page ? Number(route.query.page) : 1)"
                    @search="handleSearch" />
            </div>

            <Pagination v-if="paginate" :pagination="paginate" @page-change="handlePageChange" />
        </section>
    </div>
</template>

<script setup lang="ts">
import type { Default, PaginatedResponse, ApiResponse, Stats } from '@/types/apiResponse';
import type { Data } from './types';
import { computed, onMounted, ref } from "vue";
import Skeleton from "./partials/Skeleton.vue";
import { useRoute, useRouter } from "vue-router";
import { api } from '@/plugins/api';
import CreateButton from '@/components/ui/CreateButton.vue';
import Statistics from '@/components/app/Statistics.vue';
import { LucideClipboardList, LucideClipboardPlus } from 'lucide-vue-next';
import ProcedureGrid from './partials/ProcedureGrid.vue';
import Pagination from '@/components/app/Pagination.vue';

const route = useRoute()
const router = useRouter()

const loading = ref(true);
const initialLoading = ref(true)

const apiResponse = ref<Default<Data> | null>(null)
const stats = computed<Stats | null>(() => apiResponse.value?.stats ?? null)

const paginate = ref<PaginatedResponse<Data> | null>(null)
const searchQuery = ref('')

const fetchProcedures = async (page = 1, search = '') => {
    try {
        if (initialLoading.value) {
            loading.value = true
        }

        const params = new URLSearchParams()
        params.append('page', page.toString())
        if (search) {
            params.append('filter[title]', search)
        }

        const { data } = await api.get<ApiResponse<Default<Data>>>(`/api/procedure?${params.toString()}`)
        apiResponse.value = data.data
        paginate.value = apiResponse.value?.pagination
        console.log(apiResponse.value)
        router.replace({ query: { page } })
    } catch (error: any) {

    } finally {
        loading.value = false;
        initialLoading.value = false
    }
}

const createProcedure = () => {
    router.push({ name: 'dashboard.procedure.create' })
}

const handleSearch = (search: string) => {
  searchQuery.value = search
  fetchProcedures(1, search)
}

const handlePageChange = (page: number) => {
  router.push({ query: { ...route.query, page } })
  fetchProcedures(page)
}

onMounted(() => {
    const page = Number(route.query.page) || 1
    fetchProcedures(page)
})

</script>