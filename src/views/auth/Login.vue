<script setup lang="ts">
import Checkbox from '@/components/ui/Checkbox.vue';
import InputError from '@/components/ui/InputError.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

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
  const auth = useAuthStore();
  loading.value = true;
  errorMessage.value = '';

  try {
    // 👇 Usamos directamente el método del store
    await auth.login(form.email, form.password, form.remember);

    // 👇 Redirigir al dashboard después del login exitoso
    router.push({ name: 'dashboard.home' });
  } catch (err: any) {
    console.error(err);

    if (err.response?.status === 422) {
      errorMessage.value = 'Correo o contraseña incorrectos.';
    } else if (err.response?.status === 419) {
      errorMessage.value = 'Error de CSRF. Recarga la página e inténtalo de nuevo.';
    } else {
      errorMessage.value =
        err?.response?.data?.message ??
        'Ocurrió un error al intentar iniciar sesión.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
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
