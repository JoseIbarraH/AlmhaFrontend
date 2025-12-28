<script setup lang="ts">
import Modal from '@/components/app/Modal.vue'
import { showNotification } from '@/components/composables/useNotification';
import InputLabel from '@/components/ui/InputLabel.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { api } from '@/plugins/api';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

interface Props {
  show: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'refresh'])

const form = reactive({
  title: ''
})

const handleClose = () => {
  emit('close')
}

const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('title', form.title)

  return formData
}

const handleConfirm = async () => {
  try {
    const formData = buildFormData()

    await api.post('/api/procedure', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    })

    showNotification('success', t('Dashboard.Procedure.Validations.Success.Create'), 3000)
    emit('refresh')
    emit('close')
  }catch (error: any) {
    showNotification('error', error?.response?.message, 4000)
  }
}
</script>

<template>
  <Modal :show="props.show" :max-width="props.maxWidth || 'md'" @close="handleClose">
    <div class="bg-white rounded-lg dark:bg-gray-800 overflow-hidden">

      <div class="px-6 py-4 border-gray-200 bg-gray-200 dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
          {{ $t('Dashboard.Procedure.Create.Title') }}
        </h2>
        <p class="text-sm text-gray-600 mt-1 dark:text-white">
          {{ $t('Dashboard.Procedure.Create.Subtitle') }}
        </p>
      </div>

      <div class="px-6 py-6">
        <div class="space-y-2">
          <InputLabel for="title" :value="$t('Dashboard.Procedure.Create.LabelTitle')"
            class="text-sm font-medium text-gray-700" />
          <TextInput id="title" v-model="form.title" :placeholder="$t('Dashboard.Procedure.Create.Placeholder')" />
          <p class="text-xs text-gray-500 mt-1 dark:text-white">{{ $t('Dashboard.Procedure.Create.Optional') }}</p>
        </div>
      </div>

      <div
        class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-950 flex justify-end gap-3">
        <SecondaryButton @click="handleClose"
          class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200">
          {{ $t('Dashboard.Procedure.Create.Cancel') }}
        </SecondaryButton>

        <PrimaryButton @click="handleConfirm" :disabled="!$can('create_blogs')"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md">
          {{ $t('Dashboard.Procedure.Create.CreateButton') }}
        </PrimaryButton>
      </div>
    </div>
  </Modal>
</template>
