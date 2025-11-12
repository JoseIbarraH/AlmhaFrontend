<script setup lang="ts">
import Checkbox from '@/components/ui/Checkbox.vue';
import InputError from '@/components/ui/InputError.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { showNotification } from '@/components/composables/useNotification';

const auth = useAuthStore();

defineProps<{
  canResetPassword?: boolean;
  status?: string;
}>();

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  remember: false,
});

async function login() {
  const { success, message } = await auth.login(form.email, form.password, form.remember);

  if (success) {
    router.push({ name: 'dashboard.home' });
  } else {
    showNotification('error', message, 4000);
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="login" class="space-y-4">
      <div>
        <InputLabel for="email" value="Correo" />
        <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required
          autocomplete="username" />
        <InputError class="mt-2" />
      </div>

      <div>
        <InputLabel for="password" value="Contraseña" />
        <TextInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required
          autocomplete="current-password" />
        <InputError class="mt-2" />
      </div>

      <div class="flex justify-between items-center">
        <label class="flex items-center">
          <Checkbox name="remember" v-model:checked="form.remember" />
          <span class="ms-2 text-sm text-gray-600">Recuérdame</span>
        </label>
      </div>

      <div class="flex items-center justify-center">
        <PrimaryButton type="submit" class="mt-4" :disabled="auth.loading">
          <span v-if="auth.loading">Cargando...</span>
          <span v-else>Iniciar sesión</span>
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>
