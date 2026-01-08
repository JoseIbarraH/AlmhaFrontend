<template>
  <section class="bg-white rounded-2xl shadow-lg dark:bg-gray-900 p-6 sticky top-6">
    <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left mb-4 dark:text-gray-100">
      {{ $t('Dashboard.Team.Edit.PersonalInfo.Biography') }}
    </h3>

    <TextArea v-model="model.biography" id="biography" name="biography" rows="7"
      placeholder="Describe la experiencia profesional, educación, certificaciones y logros del miembro del equipo. Incluye información relevante que ayude a los pacientes a conocer mejor su perfil..."
      class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:border-transparent transition-all outline-none resize-none text-slate-900 placeholder:text-slate-400">
    </TextArea>
  </section>
</template>

<script setup lang="ts">
import TextArea from '@/components/ui/TextArea.vue';
import type { TeamMemberFrontend } from '../types'

const model = defineModel<TeamMemberFrontend>({
  required: true
})
</script>
