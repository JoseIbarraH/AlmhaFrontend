<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import InputLabel from '@/components/ui/InputLabel.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { api } from '@/plugins/api';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const auth = useAuthStore()

const loading = ref(false)

defineProps<{
  mustVerifyEmail?: Boolean;
  status?: String;
}>();

const form = ref({
  name: auth.user?.name ?? '',
  email: auth.user?.email ?? '',
})

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

  } catch (error) {
    showNotification('error', t('Auth.Validations.Error.ProfileUpdate'), 4000)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section>
    <header>
      <!-- Título: Aseguramos texto blanco en modo oscuro -->
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ $t('Auth.Profile.Title') }}</h2>

      <!-- Subtítulo: Aseguramos texto gris claro en modo oscuro -->
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {{ $t('Auth.Profile.Subtitle') }}
      </p>
    </header>

    <form @submit.prevent="SaveChanges" class="mt-6 space-y-6">
      <div>
        <!-- InputLabel debe manejar Dark Mode internamente, pero el TextInput es clave -->
        <InputLabel for="name" :value="$t('Auth.Profile.Name')" />

        <!-- Asumo que TextInput maneja dark mode internamente, especialmente bordes y fondo.
             Si no lo hace, necesitarías agregar dark:clases aquí o, mejor aún, dentro del componente TextInput. -->
        <TextInput id="name" type="text" v-model="form.name" required autofocus
          autocomplete="name" />
      </div>

      <div>
        <InputLabel for="email" :value="$t('Auth.Profile.Email')" />

        <TextInput id="email" type="email" v-model="form.email" required
          autocomplete="email" />
      </div>

      <div class="flex items-center gap-4">
        <!-- Asumo que PrimaryButton maneja dark mode internamente para fondo y hover. -->
        <PrimaryButton :disabled="auth.loading">
          {{ $t('Auth.Profile.Save') }}
        </PrimaryButton>
      </div>
    </form>
  </section>
</template>
