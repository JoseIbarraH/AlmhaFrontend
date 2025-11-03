<template>
  <section class="p-6 space-y-6">
    <header
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 shadow-sm rounded-lg h-[82px]">
      <h2 class="text-xl font-semibold text-gray-800">
        {{ $t('Dashboard.Blog.Title') }}
      </h2>

      <CreateButton @click="" class="flex items-center justify-center w-full sm:w-auto">
        {{ $t('Dashboard.Blog.Form.Create') }}
      </CreateButton>
    </header>
  </section>

</template>

<script setup lang="ts">
import CreateButton from '@/components/ui/CreateButton.vue';


</script>
