<template>
  <div class="flex justify-between bg-white p-6 drop-shadow-sm">
    <h2 class="text-xl font-semibold leading-tight text-gray-800 flex justify-between">
      {{ $t('Dashboard.Team.Title') }}
    </h2>

    <CreateButton @click="createTeamMember" class="flex items-center">
      {{ $t('Dashboard.Team.Form.Create') }}
    </CreateButton>
  </div>
  <div class="p-6">
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <Statistics
        :total-object-title="$t('Dashboard.Team.TotalTeams')"
        :total-object="0"
        :total-activated-title="$t('Dashboard.Team.TeamsActives')"
        :total-activated="0"
        :total-deactivated-title="$t('Dashboard.Team.TeamsInactives')"
        :total-deactivated="0"
        :last-object-title="$t('Dashboard.Team.LastTeams')"
        :last-object="0"
      />
    </div>
    <h1>Team </h1>
  </div>
</template>

<script setup lang="ts">
import CreateButton from '@/components/ui/CreateButton.vue';
import Statistics from '@/components/app/Statistics.vue';

const createTeamMember = () => {

}

</script>
