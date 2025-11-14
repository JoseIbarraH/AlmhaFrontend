<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import DangerButton from '@/components/ui/DangerButton.vue';
import InputError from '@/components/ui/InputError.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import Modal from '@/components/app/Modal.vue';
import { useRouter } from 'vue-router';
import { nextTick, ref } from 'vue';
import { api } from '@/plugins/api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const router = useRouter();

const confirmingUserDeletion = ref(false);
const passwordInput = ref<HTMLInputElement | null>(null);
const loading = ref(false);

const form = ref({
  password: '',
});

const confirmUserDeletion = () => {
  confirmingUserDeletion.value = true;

  nextTick(() => passwordInput.value?.focus());
};

const deleteUser = async () => {
  try {
    await api.delete('/api/profile/delete', {
      data: { password: form.value.password }
    });

    showNotification('success', t('Dashboard.Setting.Validations.Success.DeleteAccount'), 3000)
    router.push({ name: 'auth.login' });
  }catch (err: any) {
    console.error('Error Delete: ', err)
    showNotification('error', err?.response?.data?.message ?? '', 3000)
  }finally{
    closeModal()
  }
}

const closeModal = () => {
  confirmingUserDeletion.value = false;

  form.value.password = ""
};
</script>

<template>
  <section class="space-y-6">
    <header>
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ $t('Dashboard.Setting.Profile.DeleteAccount.Title') }}</h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {{ $t('Dashboard.Setting.Profile.DeleteAccount.Text') }}
      </p>
    </header>

    <DangerButton @click="confirmUserDeletion">{{ $t('Dashboard.Setting.Profile.DeleteAccount.Title') }}</DangerButton>

    <Modal :show="confirmingUserDeletion" @close="closeModal">
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          {{ $t('Dashboard.Setting.Profile.DeleteAccount.ModalTitle') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {{ $t('Dashboard.Setting.Profile.DeleteAccount.ModalText') }}
        </p>

        <div class="mt-6">
          <InputLabel for="password" value="Password" class="sr-only" />

          <!-- Asumiendo que TextInput tiene soporte Dark Mode interno (dark:bg, dark:text, dark:border) -->
          <TextInput id="password" ref="passwordInput" v-model="form.password" type="password" placeholder="Password" />

          <InputError class="mt-2" />
        </div>

        <div class="mt-6 flex justify-end">
          <SecondaryButton @click="closeModal"> Cancel </SecondaryButton>

          <DangerButton class="ms-3" :class="{ 'opacity-25': loading }" :disabled="loading" @click="deleteUser">
            Delete Account
          </DangerButton>
        </div>
      </div>
    </Modal>
  </section>
</template>
