<template>
  <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left dark:text-gray-100">
    {{ $t('Dashboard.Team.CreateUpdate.PersonalInfo.Title') }}
  </h3>

  <div class="mt-2">
    <InputLabel for="name" :value="$t('Dashboard.Team.CreateUpdate.PersonalInfo.Name')" />
    <TextInput
      id="name"
      ref="nameInput"
      v-model="modelValue.name"
      type="text"
      class="border rounded-md py-2 px-4 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white w-full
      text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
      :placeholder="$t('Dashboard.Team.CreateUpdate.PersonalInfo.Name')" />
  </div>

  <div class="mt-2">
    <InputLabel for="category" :value="$t('Dashboard.Team.CreateUpdate.PersonalInfo.Status.Title')" />
    <Select class="mt-1 block w-full" id="category" :default="'Seleccione'" v-model="modelValue.status"
      :options="status" />
  </div>

  <div class="mt-2">
    <InputLabel for="specialization" :value="$t('Dashboard.Team.CreateUpdate.PersonalInfo.Specialization')" />
    <TextArea id="specialization" ref="nameInput" v-model="modelValue.specialization" type="text"
      class="mt-1 block w-full h-40" :placeholder="$t('Dashboard.Team.CreateUpdate.PersonalInfo.Specialization')" />
  </div>
</template>

<script setup lang="ts">
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Select from '@/components/ui/Select.vue';
import type { TeamMember } from '../types';

interface TeamMemberErrors {
  name?: string;
  status?: string;
  specialization?: string;
  [key: string]: string | undefined;
}

const modelValue = defineModel<TeamMember>({
  required: true
})

defineProps<{
  errors?: TeamMemberErrors;
}>();

const status = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
];

</script>
