<script setup lang="ts">
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm.vue';
import UpdatePasswordForm from './partials/UpdatePasswordForm.vue';
import DeleteUserForm from './partials/DeleteUserForm.vue';

defineProps<{
  mustVerifyEmail?: boolean;
  status?: string;
}>();
</script>

<template>
  <template>
    <h2 class="text-xl font-semibold leading-tight text-gray-800">Profile</h2>
  </template>

  <div class="py-12">
    <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
      <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 dark:shadow-xl">
        <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" class="max-w-md" />
      </div>

      <!-- Contenedor 2: Actualización de Contraseña -->
      <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8
                dark:bg-gray-800 dark:shadow-xl">
        <UpdatePasswordForm class="max-w-md" />
      </div>

      <!-- Contenedor 3: Eliminar Cuenta -->
      <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8
                dark:bg-gray-800 dark:shadow-xl">
        <DeleteUserForm class="max-w-md" />
      </div>
    </div>
  </div>
</template>
