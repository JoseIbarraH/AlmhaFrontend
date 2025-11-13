<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { ref, watch, onMounted } from 'vue';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const loading = ref(false);
const changed = ref(false);

const form = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const errors = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const formOriginal = ref({ ...form.value });

/**
 * 🔍 Validaciones generales al enviar
 */
const validateForm = (): boolean => {
  errors.value = { current_password: '', password: '', password_confirmation: '' };

  let valid = true;

  if (!form.value.current_password.trim()) {
    errors.value.current_password = t('Auth.Validations.Error.RequiredCurrentPassword');
    valid = false;
  }

  if (form.value.password.length < 8) {
    errors.value.password = t('Auth.Validations.Error.ShortPassword');
    valid = false;
  }

  /* const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
  if (!strongPasswordRegex.test(form.value.password)) {
    errors.value.password = t('Auth.Validations.Error.WeakPassword');
    valid = false;
  } */

 /*  if (form.value.password === form.value.current_password && form.value.password) {
    errors.value.password = t('Auth.Validations.Error.SamePassword');
    valid = false;
  } */

  if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = t('Auth.Validations.Error.ConfirmationPassword');
    valid = false;
  }

  return valid;
};

const SaveChanges = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('current_password', form.value.current_password);
    formData.append('password', form.value.password);
    formData.append('password_confirmation', form.value.password_confirmation);

    await api.post('/api/profile/password', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    showNotification('success', t('Auth.Validations.Success.UpdatePassword'), 3000);

    // Reset
    form.value = { current_password: '', password: '', password_confirmation: '' };
    formOriginal.value = { ...form.value };
    changed.value = false;
    errors.value = { current_password: '', password: '', password_confirmation: '' };
  } catch (err: any) {
    showNotification('error', err?.response?.data?.message || t('Auth.Validations.Error.UpdatePassword'), 4000);
  } finally {
    loading.value = false;
  }
};

/**
 * 👀 Validación en tiempo real para confirmar contraseña
 */
watch(
  () => [form.value.password, form.value.password_confirmation],
  ([newPass, newConfirm]) => {
    if (!newConfirm) {
      errors.value.password_confirmation = '';
      return;
    }
    if (newPass !== newConfirm) {
      errors.value.password_confirmation = t('Auth.Validations.Error.ConfirmationPassword');
    } else {
      errors.value.password_confirmation = '';
    }
  },
  { deep: true }
);

watch(form, (value) => {
  changed.value =
    value.current_password !== formOriginal.value.current_password ||
    value.password !== formOriginal.value.password ||
    value.password_confirmation !== formOriginal.value.password_confirmation;
}, { deep: true });

onMounted(() => {
  formOriginal.value = { ...form.value };
});
</script>

<template>
  <section>
    <header>
      <h2 class="text-lg font-medium dark:text-gray-100">{{ $t('Auth.Profile.PasswordUpdate.Title') }}</h2>
      <p class="mt-1 text-sm text-gray-400">
        {{ $t('Auth.Profile.PasswordUpdate.Subtitle') }}
      </p>
    </header>

    <form @submit.prevent="SaveChanges" class="mt-6 space-y-4">
      <!-- Contraseña actual -->
      <div>
        <InputLabel for="current_password" class="mb-1" :value="$t('Auth.Profile.PasswordUpdate.CurrentPassword')" />
        <TextInput
          id="current_password"
          v-model="form.current_password"
          type="password"
          autocomplete="current-password"
          :class="{ 'border-red-500 focus:border-red-500': errors.current_password }"
        />
        <transition name="fade">
          <p v-if="errors.current_password" class="text-red-500 text-sm mt-1">{{ errors.current_password }}</p>
        </transition>
      </div>

      <!-- Nueva contraseña -->
      <div>
        <InputLabel for="password" class="mb-1" :value="$t('Auth.Profile.PasswordUpdate.NewPassword')" />
        <TextInput
          id="password"
          v-model="form.password"
          type="password"
          autocomplete="new-password"
        />
        <transition name="fade">
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </transition>
      </div>

      <!-- Confirmar contraseña -->
      <div>
        <InputLabel for="password_confirmation" class="mb-1" :value="$t('Auth.Profile.PasswordUpdate.ConfirmPassword')" />
        <TextInput
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          autocomplete="new-password"
        />
        <transition name="fade">
          <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation }}</p>
        </transition>
      </div>

      <!-- Botón -->
      <div class="flex items-center gap-4">
        <PrimaryButton :disabled="loading || !changed">
          {{ $t('Auth.Profile.Save') }}
        </PrimaryButton>
      </div>
    </form>
  </section>
</template>
