<script setup lang="ts">
import LogOutButtonResponsive from '@/components/app/LogOutButtonResponsive.vue';
import { useRouteHelper } from '@/components/composables/useRouteHelper';
import ResponsiveNavLink from '@/components/ui/ResponsiveNavLink.vue';
import LanguageSwitcher from '../components/app/LanguageSwitcher.vue';
import ApplicationLogo from '../components/app/ApplicationLogo.vue';
import { useDarkMode } from '@/components/composables/useDarkMode';
import ThemeSwitcher from '@/components/app/ThemeSwitcher.vue';
import LogOutButton from '@/components/app/LogOutButton.vue';
import DropdownLink from '../components/ui/DropdownLink.vue';
import Dropdown from '../components/ui/Dropdown.vue';
import NavLink from '../components/ui/NavLink.vue';
import { useAuthStore } from '@/stores/authStore';
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import { LucideChevronDown, LucideMenu } from 'lucide-vue-next';

const auth = useAuthStore()

const showingNavigationDropdown = ref(false);

const { current } = useRouteHelper();


const { isDark } = useDarkMode()
</script>

<template>
  <div class=" min-h-screen bg-gray-100 dark:bg-gray-900 z-20">
    <nav class="fixed z-50 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 w-full">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex shrink-0 items-center">
              <router-link :to="{ name: 'dashboard.home' }">
                <ApplicationLogo class="block h-9 w-auto fill-current" :color="isDark ? '#fff' : '#11184F'" />
              </router-link>
            </div>

            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
              <NavLink :href="{ name: 'dashboard.home' }" :active="current({ name: 'dashboard.home' })">
                {{ $t('Dashboard.Navbar.Dashboard') }}
              </NavLink>
              <NavLink v-if="$can('view_design')" :href="{ name: 'dashboard.design' }" :active="current({ name: 'dashboard.design' })">
                {{ $t('Dashboard.Navbar.Design') }}
              </NavLink>
              <NavLink v-if="$can('view_teams')" :href="{ name: 'dashboard.team' }"
                :active="current({ name: 'dashboard.team' }) || current({ name: 'dashboard.team.create' }) || current({ name: 'dashboard.team.edit' })">
                {{ $t('Dashboard.Navbar.Team') }}
              </NavLink>
              <NavLink v-if="$can('view_blogs')" :href="{ name: 'dashboard.blog' }"
                :active="current({ name: 'dashboard.blog' }) || current({ name: 'dashboard.blog.edit' })">
                {{ $t('Dashboard.Navbar.Blog') }}
              </NavLink>
              <NavLink v-if="$can('view_services')" :href="{ name: 'dashboard.service' }"
                :active="current({ name: 'dashboard.service' }) || current({ name: 'dashboard.service.create' }) || current({ name: 'dashboard.service.edit' })">
                {{ $t('Dashboard.Navbar.Service') }}
              </NavLink>
            </div>
          </div>

          <div class="hidden sm:ms-6 sm:flex sm:items-center gap-4">

            <ThemeSwitcher />
            <LanguageSwitcher />

            <div class="relative ms-3">
              <Dropdown align="right" width="48">
                <template #trigger>
                  <span class="inline-flex rounded-md">
                    <button type="button"
                      class="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-gray-500 dark:text-gray-300 transition duration-150 ease-in-out hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                      {{ auth?.user?.name }}
                      <LucideChevronDown class="-me-0.5 ms-2 h-4 w-4" />
                    </button>
                  </span>
                </template>

                <template #content>
                  <DropdownLink :href="{ name: 'setting.profile' }">
                    {{ $t('Dashboard.Navbar.Setting') }}
                  </DropdownLink>
                  <LogOutButton />
                </template>
              </Dropdown>
            </div>
          </div>

          <div class="-me-2 flex items-center sm:hidden gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher color="bg-blue-500" />
            <button @click="showingNavigationDropdown = !showingNavigationDropdown"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:text-gray-500 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 dark:hover:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-700 focus:text-gray-500 dark:focus:text-gray-300 focus:outline-none">
              <LucideMenu class="w-6 h-6"/>
            </button>
          </div>
        </div>
      </div>

      <div :class="{
        block: showingNavigationDropdown,
        hidden: !showingNavigationDropdown,
        // CAMBIO 5: Fondo y borde del menú responsive
      }" class="sm:hidden border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div class="space-y-1 pb-3 pt-2">
          <ResponsiveNavLink :href="{ name: 'dashboard.home' }" :active="current({ name: 'dashboard.home' })">
            {{ $t('Dashboard.Navbar.Dashboard') }}
          </ResponsiveNavLink>
          <ResponsiveNavLink v-if="$can('view_design')" :href="{ name: 'dashboard.design' }" :active="current({ name: 'dashboard.design' })">
            {{ $t('Dashboard.Navbar.Design') }}
          </ResponsiveNavLink>
          <ResponsiveNavLink v-if="$can('view_teams')" :href="{ name: 'dashboard.team' }" :active="current({ name: 'dashboard.team' })">
            {{ $t('Dashboard.Navbar.Team') }}
          </ResponsiveNavLink>
          <ResponsiveNavLink v-if="$can('view_blogs')" :href="{ name: 'dashboard.blog' }" :active="current({ name: 'dashboard.blog' })">
            {{ $t('Dashboard.Navbar.Blog') }}
          </ResponsiveNavLink>
          <ResponsiveNavLink v-if="$can('view_services')" :href="{ name: 'dashboard.service' }" :active="current({ name: 'dashboard.service' })">
            {{ $t('Dashboard.Navbar.Service') }}
          </ResponsiveNavLink>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pb-1 pt-4">
          <div class="px-4">
            <div class="text-base font-medium text-gray-800 dark:text-gray-200">
              {{ auth?.user?.name }}
            </div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ auth?.user?.email }}
            </div>
          </div>

          <div class="mt-3 space-y-1">
            <ResponsiveNavLink :href="{ name: 'setting.profile' }" :active="current({ name: 'setting.profile' })">
              {{ $t('Dashboard.Navbar.Setting') }}
            </ResponsiveNavLink>
            <LogOutButtonResponsive />
          </div>
        </div>
      </div>
    </nav>

    <main>
      <div class="h-16"></div>
      <RouterView />
    </main>
  </div>
</template>
