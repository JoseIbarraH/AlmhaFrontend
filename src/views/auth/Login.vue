<script setup lang="ts">
import Checkbox from '@/components/Checkbox.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/plugins/api';
import { useAuthStore } from '@/stores/authStore'; // para guardar token
import { sesionSetService } from '@/services/sesionService'; // opcional si quieres backup local

defineProps<{
  canResetPassword?: boolean;
  status?: string;
}>();

const router = useRouter();
const loading = ref(false);
const errorMessage = ref('');
const form = reactive({
  email: '',
  password: '',
  remember: false,
});

async function login() {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await api.post('login', {
      email: form.email,
      password: form.password,
      remember: form.remember,
    });

    const data = response.data;

    if (data?.access_token && data?.user) {
      const auth = useAuthStore();
      auth.setAuth(data.user, data.access_token, form.remember);

      // Opcional: backup extra
      sesionSetService('auth-token', data.access_token);

      router.push({ name: 'dashboard.home' });
    } else {
      errorMessage.value = data?.message || 'Error al iniciar sesión.';
    }
  } catch (err: any) {
    console.error(err);
    errorMessage.value =
      err?.response?.data?.message ?? 'Ocurrió un error al intentar iniciar sesión.';
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <div>
    <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
      {{ status }}
    </div>

    <form @submit.prevent="login" class="space-y-4">
      <div>
        <InputLabel for="email" value="Correo" />
        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autocomplete="username"
        />
        <InputError class="mt-2" />
      </div>

      <div>
        <InputLabel for="password" value="Contraseña" />
        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="current-password"
        />
        <InputError class="mt-2" />
      </div>

      <div class="flex justify-between items-center">
        <label class="flex items-center">
          <Checkbox name="remember" v-model:checked="form.remember" />
          <span class="ms-2 text-sm text-gray-600">Recuérdame</span>
        </label>
      </div>

      <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </div>

      <div class="flex items-center justify-center">
        <PrimaryButton type="submit" class="mt-4" :disabled="loading">
          <span v-if="loading">Cargando...</span>
          <span v-else>Iniciar sesión</span>
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>
