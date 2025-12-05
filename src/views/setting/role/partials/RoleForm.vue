<template>
  <Modal :show="props.show" :max-width="props.maxWidth || '4xl'" @close="handleClose" :closeable="closeable">
    <div class="relative bg-white dark:bg-gray-800 rounded-lg">
      <!-- Header -->
      <div
        class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-t-lg dark:from-gray-900/30 dark:to-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">
          {{ editing
            ? $t('Dashboard.Setting.RolePermission.CreateUpdate.UpdateTitle')
            : $t('Dashboard.Setting.RolePermission.CreateUpdate.CreateTitle') }}
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {{ editing ? $t('Dashboard.Setting.RolePermission.CreateUpdate.UpdateSubtitle') :
            $t('Dashboard.Setting.RolePermission.CreateUpdate.CreateSubtitle')
          }}
        </p>
      </div>

      <!-- Form -->
      <form class="p-6" @submit.prevent="submit">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div class="lg:col-span-2 space-y-5">
            <div class="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4">
                {{ $t('Dashboard.Setting.RolePermission.CreateUpdate.BasicInfoTitle') }}
              </h3>

              <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <InputLabel for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      :value="$t('Dashboard.Setting.RolePermission.CreateUpdate.Title')" />
                    <TextInput id="title" v-model="form.title" required
                      :placeholder="$t('Dashboard.Setting.RolePermission.CreateUpdate.TitlePlaceholder')" />
                  </div>

                  <div>
                    <InputLabel for="code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      :value="$t('Dashboard.Setting.RolePermission.CreateUpdate.Code')" />
                    <TextInput id="code" v-model="form.code"
                      :placeholder="$t('Dashboard.Setting.RolePermission.CreateUpdate.CodePlaceholder')"
                      :disabled="editing" />
                  </div>
                </div>

                <div>
                  <InputLabel for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    :value="$t('Dashboard.Setting.RolePermission.CreateUpdate.Description')" />
                  <TextArea id="description" v-model="form.description" class="dark:bg-gray-900 w-full" rows="3"
                    :placeholder="$t('Dashboard.Setting.RolePermission.CreateUpdate.DescriptionPlaceholder')" />
                </div>

                <div>
                  <InputLabel for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    value="Estado" />
                  <Select class="w-full" id="status"
                    :default="$t('Dashboard.Setting.RolePermission.CreateUpdate.Status.Default')" v-model="form.status"
                    :options="status" />
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-1">
            <div
              class="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-5 border border-gray-200 dark:border-gray-700 h-full">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  {{ $t('Dashboard.Setting.RolePermission.CreateUpdate.Permits') }}
                </h3>

                <span
                  class="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
                  {{ $t('Dashboard.Setting.RolePermission.CreateUpdate.SelectedPermissions', form.permits.length) }}
                </span>
              </div>

              <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">

                <!-- RECORRER GRUPOS -->
                <div v-for="(items, group) in permissions" :key="group"
                  class="border-b border-gray-200 dark:border-gray-700 pb-3">
                  <!-- Título del grupo -->
                  <h4 class="text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-2">
                    {{ group }}
                  </h4>

                  <!-- Lista de permisos del grupo -->
                  <label v-for="permission in items" :key="permission.id"
                    class="flex items-start gap-3 p-2 rounded-md hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                    <input type="checkbox" :value="permission.code" v-model="form.permits" class="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-red-600
                   focus:ring-red-500 focus:ring-offset-0" />
                    <span
                      class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {{ permission.title }}
                    </span>
                  </label>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div class="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
          <button type="button" @click="handleClose"
            class="px-5 py-2.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            Cancelar
          </button>
          <PrimaryButton type="submit">
            {{ editing ? $t('Dashboard.Setting.RolePermission.CreateUpdate.UpdateTitle') :
              $t('Dashboard.Setting.RolePermission.CreateUpdate.CreateTitle') }}
          </PrimaryButton>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import type { EditData, PermissionGroup } from '../types'
import InputLabel from '@/components/ui/InputLabel.vue'
import TextInput from '@/components/ui/TextInput.vue'
import TextArea from '@/components/ui/TextArea.vue'
import { useAuthStore } from '@/stores/authStore'
import Select from '@/components/ui/Select.vue'
import Modal from '@/components/app/Modal.vue'
import { reactive, watch } from 'vue'
import { api } from '@/plugins/api'
import { useI18n } from 'vue-i18n'

const auth = useAuthStore()
const { t } = useI18n()

interface Props {
  show: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  closeable?: boolean
  permissions: PermissionGroup | null
  editData?: EditData | null
  editing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeable: true,
  maxWidth: '2xl'
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const form = reactive({
  id: props.editData?.id || 0,
  title: props.editData?.title || '',
  code: props.editData?.code || '',
  description: props.editData?.description || '',
  status: props.editData?.status || 'active',
  permits: props.editData?.permits || [] as (number | string)[]
})

const status = [
  { value: "active", label: t('Dashboard.Setting.RolePermission.CreateUpdate.Status.Active') },
  { value: "inactive", label: t('Dashboard.Setting.RolePermission.CreateUpdate.Status.Inactive') },
]

function handleClose() {
  emit('close')
}

const buildFormData = (): FormData => {
  const formData = new FormData()

  if (props.editing === true) {
    formData.append('_method', 'PATCH')
  }

  if (props.editing === false) {
    formData.append('code', form.code)
  }

  const fields: Record<string, any> = {
    title: form.title,
    description: form.description,
    status: form.status
  }

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value ?? '')
  })

  form.permits
    .filter(p => p !== null && p !== undefined)
    .forEach(p => {
      formData.append('permits[]', String(p))
    })

  return formData
}

const submit = async () => {
  try {
    const formData = buildFormData()

    if (props.editing === false) {
      await api.post('/api/setting/role', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      showNotification('success', t('Dashboard.Setting.RolePermission.Validations.Success.Create'), 3000)
      handleClose()
    }

    if (props.editing === true) {
      await api.post(`/api/setting/role/${props.editData?.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      showNotification('success', t('Dashboard.Setting.RolePermission.Validations.Success.Update'), 3000)
      handleClose()
    }
  } catch (error: any) {
    const defaultMsg = props.editing
      ? t('Dashboard.Setting.RolePermission.Validations.Error.Update')
      : t('Dashboard.Setting.RolePermission.Validations.Error.Create')

    showNotification('error', error?.response?.data?.message ?? defaultMsg, 4000)
  } finally {
    auth.fetchUser()
  }
}

watch(
  () => props.editData,
  (newValue) => {
    if (newValue) {
      form.title = newValue.title || ''
      form.code = newValue.code || ''
      form.description = newValue.description || ''
      form.status = newValue.status || 'active'
      form.permits = newValue.permits || []
    } else {
      // Si es crear un nuevo rol
      form.title = ''
      form.code = ''
      form.description = ''
      form.status = 'active'
      form.permits = []
    }

  },
  { immediate: true }
)
</script>

<style scoped>
/* Scrollbar personalizado */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
