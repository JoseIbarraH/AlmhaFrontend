<script setup lang="ts">
import Checkbox from '@/components/Checkbox.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { loginService } from '@/services/authService';
import { reactive, ref } from 'vue';
import { sesionSetService } from '@/services/sesionService';
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps<{
  canResetPassword?: boolean;
  status?: string;
}>();

const loanding = ref(false)

const form = reactive({
  email: '',
  password: '',
  remember: false,
});

async function login() {
  loanding.value = true
  try {
    const data = await loginService(form.email, form.password)
    if (data) {
      sesionSetService('auth-token', data.token)
      router.push({ name: 'dashboard.home' })
    } else {
      alert(data.error)
    }
  }
  catch (err) {
    console.error(err)
    alert("Error al enviar los datos")
  }
  finally {
    loanding.value = false
  }
}
</script>

<template>
  <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
    {{ status }}
  </div>

  <form @submit.prevent="login">
    <div>
      <InputLabel for="email" value="Correo" />

      <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus
        autocomplete="username" />

      <InputError class="mt-2" />
    </div>

    <div class="mt-4">
      <InputLabel for="password" value="Contraseña" />

      <TextInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required
        autocomplete="current-password" />

      <InputError class="mt-2" />
    </div>

    <div class="mt-4 mb-4 flex justify-between">
      <label class="flex items-center">
        <Checkbox name="remember" v-model:checked="form.remember" />
        <span class="ms-2 text-sm text-gray-600">Recuerdame</span>
      </label>
      <!-- <Link v-if="canResetPassword"
        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Olvidaste tu contraseña?
      </Link> -->
    </div>

    <div class="mt-4 flex items-center justify-center">

      <!-- <PrimaryButton class="mt-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
        Iniciar sesión
      </PrimaryButton> -->
      <PrimaryButton type="submit" class="mt-4" :disabled="loanding">
        Iniciar sesión
      </PrimaryButton>
    </div>
  </form>
</template>
