<template>
  <div v-if="loading">
    <Skeleton />
  </div>

  <div v-else>
    <section class="p-6 space-y-6 dark:bg-gray-950">
      <header
        class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {{ $t('Dashboard.Design.Title') }}
        </h2>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="h-fit">
          <div class="bg-white p-6 rounded-lg shadow-md h-fit dark:bg-gray-900">
            <ChooseCarouselStatic
              :image-video-setting="apiResponse?.imageVideo?.imageVideoSetting"
              :image-video="apiResponse?.imageVideo?.imageVideo"
              :carousel-setting="apiResponse?.carousel?.carouselSetting"
              :carousel="apiResponse?.carousel?.carousel"
              @refresh="loadDesigns"
              @create_item="handleCreateModal"
              @edit_item="handleUpdateModal"
              @delete_item="handleDeleteModal"
            />
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md mt-4 dark:bg-gray-900">
            <ChooseCarouselTool
              :carousel-tool-setting="apiResponse?.carouselTool.carouselToolSetting"
              :carousel-tool="apiResponse?.carouselTool.carouselTool"
              @refresh="loadDesigns"
              @create_item="handleCreateModal"
              @edit_item="handleUpdateModal"
              @delete_item="handleDeleteModal"
            />
          </div>
        </div>
        <div class="h-fit">
          <div class="bg-white p-6 rounded-lg shadow-md dark:bg-gray-900">
            <ChooseBackground
              :backgrounds="apiResponse?.backgrounds"
              @create_item="handleCreateModal"
              @edit_item="handleUpdateModal"
            />
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md mt-4 dark:bg-gray-900">
            <ChooseCarouselNavbar
              :carousel-navbar-setting="apiResponse?.carouselNavbar?.carouselNavbarSetting"
              :carousel-navbar="apiResponse?.carouselNavbar?.carouselNavbar"
              @refresh="loadDesigns"
              @create_item="handleCreateModal"
              @edit_item="handleUpdateModal"
              @delete_item="handleDeleteModal"
            />
          </div>
        </div>
      </div>
    </section>
  </div>

  <CreateUpdateModal
    :show="isOpen"
    :design-id="design_Id"
    :data="editingData"
    :editing="editing"
    @refresh="loadDesigns"
    @close="closeModal"
  />

  <ConfirmDeleteModal
    :show="isOpenDelete"
    :title="$t('Dashboard.Design.Delete.ConfirmTitle')"
    :subtitle="$t('Dashboard.Design.Delete.ConfirmSubtitle')"
    :message="$t('Dashboard.Design.Delete.ConfirmDelete')"
    :consequences-title="$t('Dashboard.Design.Delete.Consequences.Title')"
    :consequences="[
      $t('Dashboard.Design.Delete.Consequences.First'),
      $t('Dashboard.Design.Delete.Consequences.Second')
    ]"
    :cancel-text="$t('Dashboard.Design.Delete.Cancel')"
    :confirm-text="$t('Dashboard.Design.Delete.Delete')"
    @close="isOpenDelete = false"
    @confirm="deleteItem(idItemDelete)"
  />
</template>

<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import ConfirmDeleteModal from '@/components/app/ConfirmDeleteModal.vue';
import ChooseCarouselStatic from './partials/ChooseCarouselStatic.vue';
import ChooseCarouselNavbar from './partials/ChooseCarouselNavbar.vue';
import ChooseCarouselTool from './partials/ChooseCarouselTool.vue';
import type { DesignSettingsResponse, MediaItem } from './types';
import CreateUpdateModal from './partials/CreateUpdateModal.vue';
import ChooseBackground from './partials/ChooseBackground.vue';
import type { ApiResponse } from '@/types/apiResponse';
import Skeleton from './partials/Skeleton.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const route = useRoute()
const {t} = useI18n()
const loading = ref(true)
const isOpen = ref(false)
const isOpenDelete = ref(false)
const idItemDelete = ref<number | undefined>(0)

const apiResponse = ref<DesignSettingsResponse | null>(null)
const editingData = ref<MediaItem>()
const editing = ref(false)
const design_Id = ref<number>(0)
const initialLoading = ref(true)

let initialized = false;

const loadDesigns = async () => {
  try {
    if (initialLoading.value) {
      loading.value = true
    }
    const response = await api.get<ApiResponse<DesignSettingsResponse>>('api/design')
    apiResponse.value = response.data.data
  } catch (error) {
    showNotification('error', t('Dashboard.Design.Validations.Error.LoadDesign'), 4000)
  } finally {
    loading.value = false
    initialLoading.value = false
  }
}

const handleCreateModal = (designId: number) => {
  isOpen.value = !isOpen.value
  design_Id.value = designId
}

const handleUpdateModal = (data: MediaItem, designId: number) => {
  isOpen.value = !isOpen.value
  editing.value = true
  editingData.value = data
  design_Id.value = designId
}

const closeModal = () => {
  isOpen.value = !isOpen.value
  editing.value = false
  editingData.value = undefined
  design_Id.value = 0
}

const handleDeleteModal = (id: number | undefined) => {
  isOpenDelete.value = !isOpenDelete.value
  idItemDelete.value = id
}

const deleteItem = async (id: number | undefined) => {
  try {
    console.log("toy eleminando owo", id)
    await api.delete(`/api/design/${id}`)
    loadDesigns()
    isOpenDelete.value = false
    showNotification('success', t('Dashboard.Design.Validations.Success.Delete'), 3000)
  } catch (error) {
    showNotification('error', t('Dashboard.Design.Validations.Error.Delete'), 4000)
  }
}

onMounted(() => {
  if (!initialized) {
    loadDesigns()
    initialized = true
  }
})

watch(
  () => route.params.locale,
  () => {
    loadDesigns()
  }
)
</script>
