<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import InputLabel from '@/components/ui/InputLabel.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { api } from '@/plugins/api';
import { useAuthStore } from '@/stores/authStore';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const auth = useAuthStore()

const loading = ref(false)
const changed = ref(false)

defineProps<{
  mustVerifyEmail?: Boolean;
  status?: String;
}>()

const form = ref({
  name: auth.user?.name ?? '',
  email: auth.user?.email ?? '',
})

// 🔹 formOriginal debe ser una copia real del objeto original
const formOriginal = ref({ name: '', email: '' })

const SaveChanges = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', form.value.name ?? '')
    formData.append('email', form.value.email ?? '')

    const { data } = await api.post('/api/profile/info', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    showNotification('success', t('Auth.Validations.Success.ProfileUpdate'), 3000)
    auth.user = data.data

    // 🔹 Actualizamos el original y marcamos como sin cambios
    formOriginal.value = { ...form.value }
    changed.value = false

  } catch (error) {
    showNotification('error', t('Auth.Validations.Error.ProfileUpdate'), 4000)
  } finally {
    loading.value = false
  }
}

// 🔹 Se hace deep watch al objeto form
watch(form, (value) => {
  changed.value =
    value.name !== formOriginal.value.name ||
    value.email !== formOriginal.value.email
}, { deep: true })

onMounted(() => {
  formOriginal.value = { ...form.value }
})
</script>


<template>
  <section>
    <header>
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ $t('Auth.Profile.Title') }}</h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {{ $t('Auth.Profile.Subtitle') }}
      </p>
    </header>

    <form @submit.prevent="SaveChanges" class="mt-6 space-y-4">
      <div>
        <InputLabel for="name" class="mb-1" :value="$t('Auth.Profile.Name')" />

        <TextInput id="name" type="text" v-model="form.name" required autofocus
          autocomplete="name" />
      </div>

      <div>
        <InputLabel for="email" class="mb-1" :value="$t('Auth.Profile.Email')" />

        <TextInput id="email" type="email" v-model="form.email" required
          autocomplete="email" />
      </div>

      <div class="flex items-center gap-4">
        <PrimaryButton :disabled="loading || !changed">
          {{ $t('Auth.Profile.Save') }}
        </PrimaryButton>
      </div>
    </form>
  </section>
</template>
