<template>
  <Modal :show="props.show" :max-width="props.maxWidth || 'lg'" :closeable="props.closeable" @close="handleClose">
    <div class="relative bg-white dark:bg-gray-800 rounded-sm overflow-hidden">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {{ editing
            ? $t('Dashboard.Setting.User.CreateUpdateModal.UpdateTitle')
            : $t('Dashboard.Setting.User.CreateUpdateModal.CreateTitle')
          }}
        </h3>

        <button v-if="closeable" type="button" @click="handleClose" :disabled="loading" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                 transition-colors p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <LucideX class="w-5 h-5" />
        </button>
      </div>

      <div class="flex">
        <div class="p-6 space-y-5">
          <!-- Name -->
          <div class="space-y-2">
            <InputLabel for="name" :value="$t('Dashboard.Setting.User.CreateUpdateModal.NamePlaceholder')"
              class="text-sm font-medium text-gray-700 dark:text-gray-300" />
            <TextInput id="name" v-model="form.name" type="text"
              :placeholder="$t('Dashboard.Setting.User.CreateUpdateModal.Name')" />
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <InputLabel for="email" :value="$t('Dashboard.Setting.User.CreateUpdateModal.EmailPlaceholder')"
              class="text-sm font-medium text-gray-700 dark:text-gray-300" />
            <TextInput id="email" v-model="form.email"
              :placeholder="$t('Dashboard.Setting.User.CreateUpdateModal.Email')" />
          </div>

          <!-- Password (solo al crear o si se quiere cambiar) -->
          <div v-if="!editing || showPasswordFields" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Password -->
            <div class="space-y-2">
              <InputLabel for="password" :value="$t('Dashboard.Setting.User.CreateUpdateModal.PasswordPlaceholder')"
                class="text-sm font-medium text-gray-700 dark:text-gray-300" />
              <TextInput id="password" v-model="form.password" type="password"
                :placeholder="$t('Dashboard.Setting.User.CreateUpdateModal.Password')" />
            </div>

            <!-- Password Confirmation -->
            <div class="space-y-2">
              <InputLabel for="password_confirmation"
                :value="$t('Dashboard.Setting.User.CreateUpdateModal.PasswordConfirmationPlaceholder')"
                class="text-sm font-medium text-gray-700 dark:text-gray-300" />
              <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password"
                :placeholder="$t('Dashboard.Setting.User.CreateUpdateModal.PasswordConfirmation')" />
            </div>
          </div>

          <!-- Botón para cambiar contraseña (solo al editar) -->
          <div v-if="editing && !showPasswordFields" class="pt-2">
            <button type="button" @click="showPasswordFields = true" class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300
                     font-medium transition-colors">
              {{ $t('Dashboard.Setting.User.CreateUpdateModal.ChangePassword') }}
            </button>
          </div>

          <!-- Status -->
          <div class="space-y-2 w-full">
            <InputLabel for="status" :value="$t('Dashboard.Setting.User.CreateUpdateModal.Status.Title')"
              class="text-sm font-medium text-gray-700 dark:text-gray-300" />

            <Select class=" block w-full md:w-[400px]" v-model="form.status" :options="status" default="Estados" />
          </div>
        </div>

        <div class="p-6 space-y-5">
          <div class="lg:col-span-1">
            <div
              class="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-5 border border-gray-200 dark:border-gray-700 h-full">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  {{ $t('Dashboard.Setting.User.CreateUpdateModal.Roles') }}
                </h3>
                <span
                  class="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
                  {{ $t('Dashboard.Setting.User.CreateUpdateModal.SelectedRole', form.roles.length) }}
                </span>
              </div>

              <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <label v-for="(role, index) in roles" :key="index"
                  class="flex items-start gap-3 p-3 rounded-md hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                  <input type="checkbox" :value="role.code" v-model="form.roles"
                    class="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-red-600 focus:ring-red-500 focus:ring-offset-0" />
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                    {{ role.title }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-900/50
                  border-t border-gray-200 dark:border-gray-700">

        <SecondaryButton type="button" @click="handleClose" :disabled="loading">
          {{ $t('Dashboard.Setting.User.CreateUpdateModal.Cancel') }}
        </SecondaryButton>

        <PrimaryButton type="button" @click="saveChanges" :disabled="loading">
          <span v-if="loading" class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ editing
              ? $t('Dashboard.Setting.User.CreateUpdateModal.Updating')
              : $t('Dashboard.Setting.User.CreateUpdateModal.Saving') }}
          </span>
          <span v-else>
            {{ editing
              ? $t('Dashboard.Setting.User.CreateUpdateModal.UpdateTitle')
              : $t('Dashboard.Setting.User.CreateUpdateModal.CreateTitle')
            }}
          </span>
        </PrimaryButton>
      </div>

    </div>
  </Modal>
</template>

<script setup lang="ts">
import SecondaryButton from '@/components/ui/SecondaryButton.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import InputLabel from '@/components/ui/InputLabel.vue'
import TextInput from '@/components/ui/TextInput.vue'
import Select from '@/components/ui/Select.vue'
import Modal from '@/components/app/Modal.vue'
import type { Data, DataForm, Roles } from '../types'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { showNotification } from '@/components/composables/useNotification'
import { api } from '@/plugins/api'
import { LucideX } from 'lucide-vue-next'

const { t } = useI18n()

interface Props {
  show: boolean
  data?: Data
  roles?: Roles[]
  editing: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  closeable?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'refresh'])

const loading = ref(false)
const showPasswordFields = ref(false)

const status = [
  { value: "active", label: t('Dashboard.Setting.User.CreateUpdateModal.Status.Active') },
  { value: "inactive", label: t('Dashboard.Setting.User.CreateUpdateModal.Status.Inactive') },
]

const form = reactive<DataForm>({
  name: '',
  email: '',
  status: 'inactive',
  password: '',
  password_confirmation: '',
  roles: []
})

watch(() => props.data, (newData) => {
  if (newData && props.editing) {
    form.name = newData.name || ''
    form.email = newData.email || ''
    form.status = newData.status || 'inactive'
    form.roles = newData.roles?.map(r => r.code) || []

    // Limpiar contraseñas al editar
    form.password = ''
    form.password_confirmation = ''
    showPasswordFields.value = false
  }
}, { immediate: true })

watch(() => props.show, (show) => {
  if (!show) {
    resetForm()
  }
})

function resetForm() {
  form.name = ''
  form.email = ''
  form.status = 'inactive'
  form.password = ''
  form.password_confirmation = ''
  form.roles = []
  showPasswordFields.value = false
}

function handleClose() {
  emit('close')
}

const validateBeforeSave = () => {
  const errors: string[] = []

  if (!form.name?.trim()) {
    errors.push(t('Dashboard.Setting.User.Validations.Form.Name'))
  }

  if (!form.email?.trim()) {
    errors.push(t('Dashboard.Setting.User.Validations.Form.Email'))
  }

  if (!props.editing || (form.password?.trim())) {

    // AHORA se requiere que el campo de la contraseña NO esté vacío
    if (!form.password?.trim()) {
      errors.push(t('Dashboard.Setting.User.Validations.Form.Password'))
    }

    // Y si se escribió una contraseña, se requiere la confirmación
    if (!form.password_confirmation?.trim()) {
      errors.push(t('Dashboard.Setting.User.Validations.Form.PasswordConfirmation'))
    }

    // Y si ambas están presentes, deben coincidir
    if (form.password !== form.password_confirmation) {
      errors.push(t('Dashboard.Setting.User.Validations.Form.PasswordComparation'))
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

const buildFormData = (): FormData => {
  const formData = new FormData()

  if (props.editing === true) {
    formData.append('_method', 'PATCH')
  }

  formData.append('name', form.name)
  formData.append('email', form.email)
  formData.append('password', form.password)
  formData.append('password_confirmation', form.password_confirmation)
  formData.append('status', form.status)

  if (form.roles.length > 0) {
    form.roles.filter(r => r !== null && r !== undefined)
      .forEach(r => {
        formData.append('roles[]', String(r))
      })
  }

  return formData
}

async function saveChanges() {
  if (!validateBeforeSave()) return

  loading.value = true

  try {
    const formData = buildFormData()

    if (props.editing === false) {
      await api.post('/api/setting/user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      showNotification('success', 'Usuario creado correctamente', 3000)
    }

    if (props.editing === true) {
      await api.post(`/api/setting/user/${props.data?.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      showNotification('success', 'Usuario actualizado correctamete', 3000)
    }

    emit('refresh')
    handleClose()
  } catch (error: any) {
    console.error('Error al guardar usuario:', error)
    showNotification('error', error?.response?.data?.data?.exception, 4000)
  } finally {
    loading.value = false
  }
}
</script>
