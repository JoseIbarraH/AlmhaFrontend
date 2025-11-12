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
import { showNotification } from '@/components/composables/useNotification';
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps<{ id?: string }>()

const router = useRouter()

const form = reactive<Service>({
  id: 0,
  status: 'active',
  image: null,
  slug: '',

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
  results_gallery: []
});

const editing = ref(false)
const ServiceResponse = ref<Service>()
const loading = ref(false)

const editingForm = () => {
  if (ServiceResponse.value)
    Object.assign(form, ServiceResponse.value)
}

const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('title', form.title)
  formData.append('description', form.description)
  formData.append('status', form.status)
  formData.append('slug', form.slug)

  if (form.image instanceof File) {
    formData.append('image', form.image)
  } else if (typeof form.image === 'string' && form.image.trim() !== '') {
    formData.append('image', form.image)
  }

  form.surgery_phases.recovery_time.forEach((item, i) => {
    if (!item) return
    formData.append(`surgery_phases[recovery_time][${i}]`, item)
  })

  form.surgery_phases.preoperative_recommendations.forEach((item, i) => {
    if (!item) return
    formData.append(`surgery_phases[preoperative_recommendations][${i}]`, item)
  })

  form.surgery_phases.postoperative_recommendations.forEach((item, i) => {
    if (!item) return
    formData.append(`surgery_phases[postoperative_recommendations][${i}]`, item)
  })

  const appendIfExists = (key: string, value: File | string | null | undefined) => {
    if (value instanceof File) formData.append(key, value)
    else if (typeof value === 'string' && value.trim() !== '') formData.append(key, value)
  }

  appendIfExists('sample_images[recovery]', form.sample_images.recovery)
  appendIfExists('sample_images[postoperative_care]', form.sample_images.postoperative_care)
  appendIfExists('sample_images[technique]', form.sample_images.technique)

  form.results_gallery.forEach((item, i) => {
    if (!item) return

    if (item.path instanceof File) {
      formData.append(`results_gallery[${i}]`, item.path)
    } else if (typeof item.path === 'string' && item.path.trim() !== '') {
      formData.append(`results_gallery[${i}]`, item.path)
    }
  })

  form.frequently_asked_questions.forEach((item, i) => {
    if (!item) return

    const prefix = `frequently_asked_questions[${i}]`
    formData.append(`${prefix}[question]`, item.question)
    formData.append(`${prefix}[answer]`, item.answer)
  })

  return formData
}

const validateBeforeSave = (): boolean => {
  const errors: string[] = []

  // Campos básicos
  if (!form.title?.trim()) {
    errors.push(t('Dashboard.Service.Validations.Form.Title'))
  }

  if (!form.description?.trim()) {
    errors.push(t('Dashboard.Service.Validations.Form.Description'))
  }

  if (!form.status?.trim()) {
    errors.push(t('Dashboard.Service.Validations.Form.Status'))
  }

  if (!form.image) {
    errors.push(t('Dashboard.Service.Validations.Form.Image'))
  }

  // Validaciones de surgery_phases
  const validateArray = (array: string[], key: string) => {
    if (!array || array.length === 0) {
      errors.push(t(`Dashboard.Service.Validations.Form.${key}.Empty`))
      return
    }

    array.forEach((item, i) => {
      if (!item || (typeof item === 'string' && item.trim() === '')) {
        errors.push(t(`Dashboard.Service.Validations.Form.${key}.Item`, { n: i + 1 }))
      }
    })
  }

  validateArray(form.surgery_phases.recovery_time, 'RecoveryTime')
  validateArray(form.surgery_phases.preoperative_recommendations, 'PreoperativeRecommendations')
  validateArray(form.surgery_phases.postoperative_recommendations, 'PostoperativeRecommendations')

  // Validaciones de sample_images
  const checkImage = (value: File | string | null | undefined, key: string) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors.push(t(`Dashboard.Service.Validations.Form.SampleImages.${key}`))
    }
  }

  checkImage(form.sample_images.recovery, 'Recovery')
  checkImage(form.sample_images.postoperative_care, 'PostoperativeCare')
  checkImage(form.sample_images.technique, 'Technique')

  // Validación de results_gallery
  form.results_gallery.forEach((item, i) => {
    if (!item?.path || (typeof item.path === 'string' && item.path.trim() === '')) {
      errors.push(t('Dashboard.Service.Validations.Form.ResultsGallery.Item', { n: i + 1 }))
    }
  })

  // Validación de FAQ
  form.frequently_asked_questions.forEach((item, i) => {
    if (!item.question?.trim()) {
      errors.push(t('Dashboard.Service.Validations.Form.FAQ.Question', { n: i + 1 }))
    }
    if (!item.answer?.trim()) {
      errors.push(t('Dashboard.Service.Validations.Form.FAQ.Answer', { n: i + 1 }))
    }
  })

  // Mostrar errores si hay
  if (errors.length > 0) {
    errors.forEach((err, index) => {
      setTimeout(() => {
        showNotification('warning', err, 4000)
      }, index * 300)
    })
    return false
  }

  return true
}

const saveChanges = async () => {
  if (!validateBeforeSave()) return

  loading.value = true
  try {
    const formData = buildFormData()

    for (const [key, val] of formData.entries()) {
      console.log(`${key}:`, val)
    }

    if (editing.value === false) {
      await api.post('/api/service', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      showNotification('success', t('Dashboard.Service.Validations.Success.Create'), 3000)
    }

    if (editing.value === true) {
      await api.post(`/api/service/${form.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      showNotification('success', t('Dashboard.Service.Validations.Success.Update'), 3000)
    }

    loading.value = false
    /* router.push({ name: 'dashboard.service' }) */
  } catch (err: any) {
    const message = editing.value
      ? t('Dashboard.Service.Validations.Error.Update')
      : t('Dashboard.Service.Validations.Error.Create');
    showNotification('error', message, 3000)
    if (err.response?.status === 422) {
      console.error("Errores de validación:", err.response.data.errors)
    } else {
      console.error("Error inesperado:", err)
    }
  } finally {
    loading.value = false
  }
}

const backToIndex = () => {
  router.push({ name: 'dashboard.service' })
}

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
