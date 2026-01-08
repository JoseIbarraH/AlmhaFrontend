<template>
  <section class="space-y-6 dark:bg-gray-950 min-h-screen p-6">
    <header
      class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full">
      <h2 class="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left dark:text-gray-100">
        {{ $t('Dashboard.Team.CreateUpdate.UpdateTitle') }}
      </h2>

      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <BackButton @click="backToIndex" class="w-full sm:w-auto justify-center" :disabled="loading">
          {{ $t('Dashboard.Team.Edit.BackButton') }}
        </BackButton>

        <CreateButton @click="saveChanges" class="w-full sm:w-auto flex items-center justify-center"
          :disabled="loading || !$can('update_teams')">
          {{ $t('Dashboard.Team.Edit.UpdateButton') }}
        </CreateButton>
      </div>
    </header>

    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-x">
        <div class="lg:col-span-1">
          <SelectedImage :modelValue="form" @update:modelValue="handleFormUpdate" />
        </div>

        <div class="lg:col-span-2 space-y-6">
          <div>
            <TeamInfo :modelValue="form" @update:modelValue="handleFormUpdate" />
          </div>
          <div>
            <Biography :modelValue="form" @update:modelValue="handleFormUpdate" />
          </div>
          <div>
            <Results :modelValue="form" @update:modelValue="handleFormUpdate" :result="teamMemberResponse?.result" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import CreateButton from '@/components/ui/CreateButton.vue';
import SelectedImage from './partials/SelectedImage.vue';
import BackButton from '@/components/ui/BackButton.vue';
import { useAuthStore } from '@/stores/authStore';
import Biography from './partials/Biography.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import TeamInfo from './partials/TeamInfo.vue';
import Results from './partials/Results.vue';
import type { TeamMemberBackend, TeamMemberFrontend } from './types';
import { useRouter } from 'vue-router';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const auth = useAuthStore()
const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
const teamMemberResponse = ref<TeamMemberBackend>()

const initialResult = ref<any[]>([])

const props = defineProps<{
  id?: string,
  locale?: string
}>()

const getInitialFormState = (): TeamMemberFrontend => ({
  status: 'inactive',
  name: '',
  biography: '',
  specialization: '',
  image: null,
  result: { deleted: [], updated: [], new: [] }
})

const form = reactive<TeamMemberFrontend>(getInitialFormState())

const initialForm = reactive<TeamMemberFrontend>(getInitialFormState())

const handleFormUpdate = (updatedForm: TeamMemberFrontend) => {
  form.name = updatedForm.name
  form.status = updatedForm.status
  form.image = updatedForm.image ?? form.image
  form.biography = updatedForm.biography
  form.specialization = updatedForm.specialization

  if (updatedForm.result) form.result = updatedForm.result
}

const normalize = (normal?: {
  new?: any[]
  updated?: any[]
  deleted?: number[]
}) => ({
  new: Array.isArray(normal?.new) ? normal!.new : [],
  updated: Array.isArray(normal?.updated) ? normal!.updated : [],
  deleted: Array.isArray(normal?.deleted) ? normal!.deleted : [],
})

const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('_method', 'patch')

  if (form.name !== initialForm.name) {
    formData.append('name', form.name)
  }

  if (form.image instanceof File) {
    formData.append('image', form.image)
  }

  if (form.biography !== initialForm.biography) {
    formData.append('biography', form.biography)
  }

  if (form.specialization !== initialForm.specialization) {
    formData.append('specialization', form.specialization)
  }

  if (form.status !== initialForm.status) {
    formData.append('status', form.status)
  }

  if (form.result) {
    const { new: created, updated, deleted } = normalize(form.result)

    created.forEach((item, index) => {
      if (item.path !== undefined) {
        formData.append(`result[new][${index}][path]`, item.path)
      }
      if (item.description !== undefined) {
        formData.append(`result[new][${index}][description]`, item.description)
      }
      formData.append(`result[new][${index}][order]`, String(item.order))
    })

    updated.forEach((item, index) => {
      formData.append(`result[updated][${index}][id]`, String(item.id))

      if (item.path !== undefined) {
        formData.append(`result[updated][${index}][path]`, item.path)
      }
      if (item.description !== undefined) {
        formData.append(`result[updated][${index}][description]`, item.description)
      }
      if (item.order !== undefined) {
        formData.append(`result[updated][${index}][order]`, String(item.order))
      }
    })

    deleted.forEach((id, index) => {
      formData.append(`result[deleted][${index}]`, String(id))
    })
  }

  return formData
}

const saveChanges = async () => {
  if (!auth.can('create_teams')) return
  loading.value = true

  try {
    const formData = buildFormData()

    await api.post(`/api/team_member/${props.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    showNotification('success', t('Dashboard.Team.Validations.Success.Update'), 3000)

    loading.value = false
  } catch (err) {
    console.log(err)
    showNotification('error', t('Dashboard.Team.Validations.Error.Update'), 3000)

  } finally {
    loading.value = false
  }
}

const editingForm = () => {
  if (!teamMemberResponse.value) return

  const p = teamMemberResponse.value

  // Campos simples
  form.name = p.name
  form.status = p.status
  form.image = p.image
  form.biography = p.biography
  form.specialization = p.specialization

  form.result = {
    new: [],
    updated: p.result ?? [],
    deleted: []
  }
  initialResult.value = JSON.parse(JSON.stringify(p.result ?? []))

  // snapshot inicial
  Object.assign(
    initialForm,
    JSON.parse(JSON.stringify(form))
  )
}

const backToIndex = () => {
  router.push({ name: 'dashboard.team' })
}

watch(form, (value) => {
  console.log("Form: ", value)
})

onMounted(async () => {
  const { data } = await api.get(`/api/team_member/${props.id}`)
  teamMemberResponse.value = data.data
  console.log("asd", data.data)
  if (data) {
    editingForm()
  }
})

</script>
