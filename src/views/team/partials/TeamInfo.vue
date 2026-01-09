<template>
  <section class="bg-white rounded-2xl shadow-lg dark:bg-gray-900 p-6 top-6">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left dark:text-gray-100">
      {{ $t('Dashboard.Team.Edit.PersonalInfo.Title') }}
    </h3>

    <div class="mt-2">
      <InputLabel for="name" :value="$t('Dashboard.Team.Edit.PersonalInfo.Name')" />
      <TextInput id="name" ref="nameInput" v-model="model.name" type="text"
        class="border rounded-md py-2 px-4 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white w-full
        text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
        :placeholder="$t('Dashboard.Team.Edit.PersonalInfo.Name')" />
    </div>

    <div class="mt-2">
      <InputLabel for="specialization" :value="$t('Dashboard.Team.Edit.PersonalInfo.Specialization')" />
      <TextArea id="specialization" ref="nameInput" v-model="model.specialization" type="text"
        class="mt-1 block w-full h-40" :placeholder="$t('Dashboard.Team.Edit.PersonalInfo.Specialization')" />
    </div>
  </section>
</template>

<script setup lang="ts">
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import type { TeamMemberFrontend } from '../types';

const model = defineModel<TeamMemberFrontend>({
  required: true
})

</script>
