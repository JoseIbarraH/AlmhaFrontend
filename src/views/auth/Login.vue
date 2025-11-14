<script setup lang="ts">
import { showNotification } from '@/components/composables/useNotification';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import InputError from '@/components/ui/InputError.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import Checkbox from '@/components/ui/Checkbox.vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

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
  <!-- El div principal no necesita cambios si el fondo de la página maneja el dark mode -->
  <div>
    <form @submit.prevent="login" class="space-y-4">
      <div>
        <!-- El InputLabel debería manejar su propio dark mode, pero por si acaso, añadimos la clase -->
        <InputLabel for="email" class="mb-1 dark:text-gray-300" value="Correo" />
        <TextInput id="email" type="email" v-model="form.email" required
          autocomplete="username" />
        <InputError class="mt-2" />
      </div>

      <div>
        <!-- El InputLabel debería manejar su propio dark mode, pero por si acaso, añadimos la clase -->
        <InputLabel for="password" class="mb-1 dark:text-gray-300" value="Contraseña" />
        <TextInput id="password" type="password" v-model="form.password" required
          autocomplete="current-password" />
        <InputError class="mt-2" />
      </div>

      <div class="flex justify-between items-center">
        <label class="flex items-center">
          <Checkbox name="remember" v-model:checked="form.remember" />
          <!-- Clase crucial: Cambia el color del texto a gris claro en Dark Mode -->
          <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">Recuérdame</span>
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
