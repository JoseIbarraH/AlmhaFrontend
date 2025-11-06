<template>
  <section class="p-6 space-y-6">
    <!-- Header -->
    <header
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg">

      <!-- Título -->
      <h2 class="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
        {{ editing
          ? $t('Dashboard.Team.CreateUpdate.UpdateTitle')
          : $t('Dashboard.Team.CreateUpdate.CreateTitle')
        }}
      </h2>

      <!-- Botones -->
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <BackButton @click="backToIndex" class="w-full sm:w-auto justify-center" :disabled="loading">
          {{ $t('Dashboard.Team.CreateUpdate.BackButton') }}
        </BackButton>

        <CreateButton @click="saveChanges" class="w-full sm:w-auto flex items-center justify-center"
          :disabled="loading">
          {{ editing
            ? $t('Dashboard.Team.CreateUpdate.UpdateButton')
            : $t('Dashboard.Team.CreateUpdate.CreateButton')
          }}
        </CreateButton>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Imagen -->
      <div class="bg-white p-6 rounded-lg shadow-md h-fit order-1">
        <SelectedImage v-model:model-value="form.image" />
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md h-fit order-2">
        <TeamInfo :model-value="form" />
      </div>

      <div class="md:col-start-3 md:col-end-5 order-3">
        <div class="bg-white p-6 rounded-lg shadow-md order-3 md:col-span-2 lg:col-span-4 h-72">
          <Biography v-model="form" />
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md h-fit order-4 md:col-span-2 lg:col-span-4 mt-4">
          <Results v-bind:model-value="form" />
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
import Biography from './partials/Biography.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import TeamInfo from './partials/TeamInfo.vue';
import Results from './partials/Results.vue';
import type { TeamMember } from './types';
import { useRouter } from 'vue-router';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const router = useRouter()

const props = defineProps<{ id?: string }>()

const form = reactive<TeamMember>({
  id: 0,
  name: '',
  status: '',
  image: '',
  biography: '',
  specialization: '',
  results: [],
})

const backToIndex = () => {
  router.push({ name: 'dashboard.team' })
}

/* Logica Editar */

const editing = ref(false)
const TeamMemberResponse = ref<TeamMember>()
const loading = ref(false)

const editingForm = () => {
  if (TeamMemberResponse.value)
    Object.assign(form, TeamMemberResponse.value)
}

const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('name', form.name)
  formData.append('status', form.status)

  if (form.image instanceof File) {
    formData.append('image', form.image)
  } else if (typeof form.image === 'string' && form.image.trim() !== '') {
    formData.append('image', form.image)
  }

  formData.append('biography', form.biography)
  formData.append('specialization', form.specialization)

  form.results.forEach((item, i) => {
    if (!item) return

    const prefix = `results[${i}]`

    if (item.url instanceof File) {
      formData.append(`${prefix}[url]`, item.url)
    } else if (typeof item.url === 'string' && item.url.trim() !== '') {
      formData.append(`${prefix}[url]`, item.url)
    }

    if (item.id != null) {
      formData.append(`${prefix}[id]`, String(item.id));
    }
    formData.append(`${prefix}[description]`, item.description)
  })

  return formData
}

const validateBeforeSave = (): boolean => {
  const errors: string[] = []

  if (!form.name) {
    errors.push(t('Dashboard.Team.Validations.Name'))
  }

  if (!form.image) {
    errors.push(t('Dashboard.Team.Validations.Image'))
  }

  if (!form.status) {
    errors.push(t('Dashboard.Team.Validations.Status'))
  }

  if (!form.specialization) {
    errors.push(t('Dashboard.Team.Validations.Specialization'))
  }

  if (!form.biography) {
    errors.push(t('Dashboard.Team.Validations.Biography'))
  }

  if (form.results && form.results.length > 0) {
    for (let i = 0; i < form.results.length; i++) {
      const item = form.results[i]
      const hasPath =
        item &&
        (item.url instanceof File ||
          (typeof item.url === 'string' && item.url.trim() !== ''))

      if (!hasPath) {
        errors.push(
          t('Dashboard.Team.Validations.Error.Results', { n: i + 1 })
        )
      }
    }
  }

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
      await api.post('/api/team_member', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      showNotification('success', t('Dashboard.Team.Validations.Success.Create'), 3000)
    }

    if (editing.value === true) {
      await api.post(`/api/team_member/${form.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      showNotification('success', t('Dashboard.Team.Validations.Success.Update'), 3000)
    }

    loading.value = false
    router.push({ name: 'dashboard.team' })
  } catch (err) {
    const message = editing.value
      ? t('Dashboard.Team.Validations.Error.Update')
      : t('Dashboard.Team.Validations.Error.Create');
    showNotification('error', message, 3000)
  }
}

watch(form, () => {
  console.log(form)
})

onMounted(async () => {
  if (props.id) {
    editing.value = true
    const { data } = await api.get(`/api/team_member/${props.id}`)
    TeamMemberResponse.value = data.data
    if (data) {
      editingForm()
    }
  }
})

</script>
