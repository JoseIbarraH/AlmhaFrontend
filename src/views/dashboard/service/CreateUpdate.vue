<template>
  <section class="p-6 space-y-6">
    <header
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg">

      <!-- Título -->
      <h2 class="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
        {{ editing
          ? $t('Dashboard.Service.CreateUpdate.UpdateTitle')
          : $t('Dashboard.Service.CreateUpdate.CreateTitle')
        }}
      </h2>

      <!-- Botones -->
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <BackButton @click="backToIndex" class="w-full sm:w-auto justify-center" :disabled="loading">
          {{ $t('Dashboard.Service.CreateUpdate.BackButton') }}
        </BackButton>

        <CreateButton @click="saveChanges" class="w-full sm:w-auto flex items-center justify-center"
          :disabled="loading">
          {{ editing
            ? $t('Dashboard.Service.CreateUpdate.UpdateButton')
            : $t('Dashboard.Service.CreateUpdate.CreateButton')
          }}
        </CreateButton>
      </div>
    </header>

    <div class="space-y-6">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-6 lg:grid-cols-10 auto-rows-min">
        <div class="bg-white p-6 rounded-lg shadow-md md:col-span-3 md:row-span-6 md:row-start-1">
          <MainInfoService :model-value="form" />
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md md:col-span-3 lg:col-span-7 md:row-span-3 md:col-start-4">
          <SurgeryPhases :model-value="form" />
        </div>

        <div
          class="bg-white p-6 rounded-lg shadow-md md:col-span-3 lg:col-span-7 md:row-span-3 md:col-start-4 md:row-start-4">
          <SampleImages :model-value="form" />
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md md:col-span-3 lg:col-span-5 md:row-span-3 md:row-start-7">
          <ResultsGallery :model-value="form" />
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md md:col-span-3 lg:col-span-5 md:row-span-3 md:row-start-7">
          <FrequentlyAskedQuestions :model-value="form" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FrequentlyAskedQuestions from './partials/FrequentlyAskedQuestions.vue';
import MainInfoService from './partials/MainInfoService.vue';
import CreateButton from '@/components/ui/CreateButton.vue';
import ResultsGallery from './partials/ResultsGallery.vue';
import SurgeryPhases from './partials/SurgeryPhases.vue';
import BackButton from '@/components/ui/BackButton.vue';
import SampleImages from './partials/SampleImages.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { Service } from './types';
import { api } from '@/plugins/api';

const props = defineProps<{ id?: string }>()

const router = useRouter()

const form = reactive<Service>({
  id: 0,
  status: 'active',
  image: null,

  // Traducción (nivel principal)
  title: '',
  description: '',
  lang: 'es',

  sample_images: {
    technique: '',
    recovery: '',
    postoperative_care: ''
  },

  surgery_phases:
  {
    id: 0,
    lang: '',
    recovery_time: [],
    preoperative_recommendations: [],
    postoperative_recommendations: [],
  },

  // Arrays
  frequently_asked_questions: [],
  result_gallery: []
});

const editing = ref(false)
const ServiceResponse = ref<Service>()
const loading = ref(false)

const editingForm = () => {
  if (ServiceResponse.value)
    Object.assign(form, ServiceResponse.value)
}

const backToIndex = () => {
  router.push({ name: 'dashboard.service' })
}

const saveChanges = () => { }

watch(form, (val) => {
  console.log(val)
})

onMounted(async () => {
  if (props.id) {
    editing.value = true
    const { data } = await api.get(`/api/service/${props.id}`)
    ServiceResponse.value = data.data
    console.log(ServiceResponse.value)
    if (data) {
      editingForm()
    }
  }
})

</script>
