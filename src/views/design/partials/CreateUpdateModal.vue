<template>
  <Modal :show="props.show" :max-width="props.maxWidth || 'md'" @close="handleClose">
    <div class="relative bg-white dark:bg-gray-800 rounded-lg">
      <div class="p-6 space-y-4">
        <div>
          <ImagesPreview v-model="form.path" class="aspect-video" />
        </div>

        <div>
          <InputLabel for="title" class="mb-1" :value="$t('Dashboard.Design.CreateUpdateModal.LabelTitle')" />
          <TextInput id="title" v-model="form.title"
            :placeholder="$t('Dashboard.Design.CreateUpdateModal.LabelTitlePlaceholder')" />
        </div>
        <div>
          <InputLabel for="subtitle" class="mb-1" :value="$t('Dashboard.Design.CreateUpdateModal.LabelSubtitle')" />
          <TextInput id="subtitle" v-model="form.subtitle"
            :placeholder="$t('Dashboard.Design.CreateUpdateModal.LabelSubtitlePlaceholder')" />
        </div>


        <div class="flex gap-2 justify-end">
          <PrimaryButton type="button" @click="saveChanges" :disabled="loading">
            {{ editing ? $t('Dashboard.Design.CreateUpdateModal.UpdateTitle') : $t('Dashboard.Design.CreateUpdateModal.CreateTitle') }}
          </PrimaryButton>
          <SecondaryButton type="button" @click="handleClose" :disabled="loading">
            {{ $t('Dashboard.Design.CreateUpdateModal.Cancel') }}
          </SecondaryButton>
        </div>
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

interface Props {
  show: boolean
  data?: MediaItem
  designId: number
  editing: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const form = reactive<MediaItemForm>({
  path: null,
  title: '',
  subtitle: ''
})

const loading = ref(false)

const props = defineProps<Props>()
const emit = defineEmits(['close', 'refresh'])

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
