<script setup lang="ts">
import ApplicationLogo from '@/components/app/ApplicationLogo.vue';
import { useDarkMode } from '@/components/composables/useDarkMode';
import ThemeSwitcher from '@/components/app/ThemeSwitcher.vue';
import LanguageSwitcher from '@/components/app/LanguageSwitcher.vue';

const { isDark } = useDarkMode()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-100 dark:bg-gray-900 pt-6 sm:justify-center sm:pt-0">
    <div>
      <router-link :to="{ name: 'auth.login' }">
        <ApplicationLogo class="h-20 w-20 fill-current text-gray-500 dark:text-gray-400" :color="isDark ? '#fff' : '#11184F'" />
      </router-link>
    </div>

    <div class="flex absolute top-5 right-5 gap-4">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>

    <div class="mt-6 w-full overflow-hidden bg-white dark:bg-gray-800 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
      <RouterView />
    </div>
  </div>
</template>
