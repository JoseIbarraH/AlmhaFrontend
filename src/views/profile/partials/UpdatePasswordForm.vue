<script setup lang="ts">
import InputError from '@/components/ui/InputError.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
/* import PrimaryButton from '@/components/PrimaryButton.vue'; */
import TextInput from '@/components/ui/TextInput.vue';
import { ref } from 'vue';

const passwordInput = ref<HTMLInputElement | null>(null);
const currentPasswordInput = ref<HTMLInputElement | null>(null);

const form = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
});


</script>

<template>
  <section>
    <header>
      <h2 class="text-lg font-medium text-gray-900">{{ $t('Auth.Profile.PasswordUpdate.Title') }}</h2>

      <p class="mt-1 text-sm text-gray-600">
        {{ $t('Auth.Profile.PasswordUpdate.Subtitle') }}
      </p>
    </header>

    <form @submit.prevent="" class="mt-6 space-y-6">
      <div>
        <InputLabel for="current_password" :value="$t('Auth.Profile.PasswordUpdate.CurrentPassword')" />

        <TextInput id="current_password" ref="currentPasswordInput" v-model="form.current_password" type="password"
          class="mt-1 block w-full" autocomplete="current-password" />

        <InputError class="mt-2" />
      </div>

      <div>
        <InputLabel for="password" :value="$t('Auth.Profile.PasswordUpdate.NewPassword')" />

        <TextInput id="password" ref="passwordInput" v-model="form.password" type="password" class="mt-1 block w-full"
          autocomplete="new-password" />

        <InputError class="mt-2" />
      </div>

      <div>
        <InputLabel for="password_confirmation" :value="$t('Auth.Profile.PasswordUpdate.ConfirmPassword')" />

        <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password"
          class="mt-1 block w-full" autocomplete="new-password" />

        <InputError class="mt-2" />
      </div>
    </form>
  </section>
</template>
