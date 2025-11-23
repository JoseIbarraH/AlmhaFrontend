<template>
  <Modal :show="props.show" :max-width="props.maxWidth || 'lg'" @close="handleClose">
    <div class="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {{ editing
            ? $t('Dashboard.Design.CreateUpdateModal.UpdateTitle')
            : $t('Dashboard.Design.CreateUpdateModal.CreateTitle')
          }}
        </h3>

        <button type="button" @click="handleClose" :disabled="loading" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                 transition-colors p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <LucideX class="w-5 h-5" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">

        <!-- Image Preview -->
        <div>
          <ImagesPreview v-model="form.path" class="aspect-video rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700
                   hover:border-blue-400 dark:hover:border-blue-500 transition-colors" />
        </div>

        <!-- Title Input -->
        <div class="space-y-2">
          <InputLabel for="title" :value="$t('Dashboard.Design.CreateUpdateModal.LabelTitle')"
            class="text-sm font-medium text-gray-700 dark:text-gray-300" />
          <TextInput id="title" v-model="form.title"
            :placeholder="$t('Dashboard.Design.CreateUpdateModal.LabelTitlePlaceholder')" />
        </div>

        <!-- Subtitle Input -->
        <div class="space-y-2">
          <InputLabel for="subtitle" :value="$t('Dashboard.Design.CreateUpdateModal.LabelSubtitle')"
            class="text-sm font-medium text-gray-700 dark:text-gray-300" />
          <TextInput id="subtitle" v-model="form.subtitle"
            :placeholder="$t('Dashboard.Design.CreateUpdateModal.LabelSubtitlePlaceholder')" />
        </div>

      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-900/50
                  border-t border-gray-200 dark:border-gray-700">

        <SecondaryButton type="button" @click="handleClose" :disabled="loading">
          {{ $t('Dashboard.Design.CreateUpdateModal.Cancel') }}
        </SecondaryButton>

        <PrimaryButton type="button" @click="saveChanges" :disabled="loading">
          {{ editing
            ? $t('Dashboard.Design.CreateUpdateModal.UpdateTitle')
            : $t('Dashboard.Design.CreateUpdateModal.CreateTitle')
          }}
        </PrimaryButton>
      </div>

    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/app/Modal.vue'
import type { MediaItem, MediaItemForm } from '../types';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import { watch, reactive, ref } from 'vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { api } from '@/plugins/api';
import { showNotification } from '@/components/composables/useNotification';
import { LucideX } from 'lucide-vue-next';

interface Props {
  show: boolean
  data?: MediaItem
  designId: number
  editing: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'refresh'])

const form = reactive<MediaItemForm>({
  path: null,
  title: '',
  subtitle: ''
})

const loading = ref(false)

const data = () => {
  console.log("EDITING?: ", props.editing)
  console.log("DATA: ", props.data)
  console.log("DESIGN ID: ", props.designId)
}

const buildFormData = (): FormData => {
  const formData = new FormData()

  if (form.path instanceof File) {
    formData.append('path', form.path)
  } else if (typeof form.path === 'string' && form.path.trim() !== '') {
    formData.append('path', form.path)
  }

  formData.append('title', form.title)
  formData.append('subtitle', form.subtitle)
  formData.append('designId', String(props.designId))

  return formData
}

const saveChanges = async () => {
  data()
  loading.value = true
  try {
    const formData = buildFormData()

    for (const [key, val] of formData.entries()) {
      console.log(`${key}:`, val)
    }

    if (props.editing === true) {
      await api.post(`/api/design/${props.data?.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }

    if (props.editing === false) {
      await api.post('/api/design/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      showNotification('success', 'Se creo mi rey', 3000)
    }

    emit('refresh')

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
    handleClose()
  }
}

const handleClose = () => {
  emit('close')
  form.path = null
  form.title = ''
  form.subtitle = ''
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    console.log("¡El modal se acaba de abrir!");

    if (props.editing && props.data) {
      form.path = props.data.full_path
      form.title = props.data.title
      form.subtitle = props.data.subtitle
      console.log(form)
    }
  }
});

watch(form, (val) => {
  console.log(val)
})

</script>
