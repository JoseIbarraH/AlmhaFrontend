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
              @delete_item="deleteItem"
            />
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md mt-4 dark:bg-gray-900">
            <!-- <ChooseCarouselNavbar :carousel-navbar="form.items" /> -->
          </div>
        </div>
        <div class="h-fit">
          <div class="bg-white p-6 rounded-lg shadow-md dark:bg-gray-900">
            <!-- <ChooseBackground :background1="form.items" :background2="form.items"
              :background3="form.items" /> -->
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md mt-4 dark:bg-gray-900">
            <!-- <ChooseCarouselTool :carousel-tool="form.items" /> -->
          </div>
        </div>
      </div>
    </section>
  </div>

  <CreateUpdateModal :show="isOpen" :design-id="design_Id" :data="editingData" :editing="editing"
    @close="closeModal" @refresh="loadDesigns" />
</template>

<script setup lang="ts">
import ChooseCarouselStatic from './partials/ChooseCarouselStatic.vue';
/* import ChooseCarouselNavbar from './partials/ChooseCarouselNavbar.vue';
import ChooseCarouselTool from './partials/ChooseCarouselTool.vue';
import ChooseBackground from './partials/ChooseBackground.vue'; */
import Skeleton from './partials/Skeleton.vue';
import { onMounted, ref } from 'vue';
import { api } from '@/plugins/api';
import type { ApiResponse } from '@/types/apiResponse';
import type { DesignSettingsResponse, MediaItem } from './types';
import CreateUpdateModal from './partials/CreateUpdateModal.vue';
import { showNotification } from '@/components/composables/useNotification';

const loading = ref(true)
const isOpen = ref(false)

const apiResponse = ref<DesignSettingsResponse | null>(null)
const editingData = ref<MediaItem>()
const editing = ref(false)
const design_Id = ref<number>(0)

async function loadDesigns() {
  loading.value = true

  try {
    const response = await api.get<ApiResponse<DesignSettingsResponse>>('api/design')
    apiResponse.value = response.data.data
    console.log("Design llego: ", apiResponse.value)
  } catch (error) {
    console.error('❌ Error al cargar diseños:', error)
  } finally {
    loading.value = false
  }
}

const handleCreateModal = (designId: number) => {
  isOpen.value = !isOpen.value
  design_Id.value = designId
}

const handleUpdateModal = (data: MediaItem) => {
  isOpen.value = !isOpen.value
  editing.value = true
  editingData.value = data
}

const closeModal = () => {
  isOpen.value = !isOpen.value
  editing.value = false
  editingData.value = undefined
  design_Id.value = 0
}

const deleteItem = async (id: number | undefined) => {
  try {
    console.log("toy eleminando owo", id)
    await api.delete(`/api/design/${id}`)
    loadDesigns()
    showNotification('success', 'Item eliminado correctamente', 3000)
  } catch (error) {
    showNotification('error', 'Error al eliminar el item', 4000)
  }
}

onMounted(() => {
  loadDesigns()
})
</script>
