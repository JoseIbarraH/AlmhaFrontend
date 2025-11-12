<template>
  <h3 class="text-lg font-semibold leading-tight text-gray-800 text-center sm:text-left mb-4 dark:text-gray-100">
    {{ $t('Dashboard.Team.CreateUpdate.PersonalInfo.Biography') }}
  </h3>

  <Editor v-model="modelValue.biography" />
</template>

<script setup lang="ts">
import type { TeamMember } from '../types'
import Editor from './Editor.vue'

const modelValue = defineModel<TeamMember>({
  required: true
})
</script>
