<script setup lang="ts">
import ResponsiveNavLink from '@/components/ui/ResponsiveNavLink.vue';
import LanguageSwitcher from '../components/app/LanguageSwitcher.vue';
import ApplicationLogo from '../components/app/ApplicationLogo.vue';
import { useRouteHelper } from '@/components/composables/useRouteHelper';
import DropdownLink from '../components/ui/DropdownLink.vue';
import Dropdown from '../components/ui/Dropdown.vue';
import { useAuthStore } from '@/stores/authStore';
import NavLink from '../components/ui/NavLink.vue';
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import LogOutButton from '@/components/app/LogOutButton.vue';
import LogOutButtonResponsive from '@/components/app/LogOutButtonResponsive.vue';

const auth = useAuthStore()

const showingNavigationDropdown = ref(false);

const { current } = useRouteHelper();

/* onMounted(() => {
  console.log('auth?', auth.user)
}) */
</script>

<template>
  <div>
    <div class="min-h-screen bg-gray-100">
      <nav class="border-b border-gray-100 bg-white">
        <!-- Primary Navigation Menu -->
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 justify-between">
            <div class="flex">
              <!-- Logo -->
              <div class="flex shrink-0 items-center">
                <router-link :to="{ name: 'dashboard.home' }">
                  <ApplicationLogo class="block h-9 w-auto fill-current" :color="'#11184F'" />
                </router-link>
              </div>

              <!-- Navigation Links -->
              <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink :href="{ name: 'dashboard.home' }" :active="current({ name: 'dashboard.home' })">
                  {{ $t('Dashboard.Navbar.Dashboard') }}
                </NavLink>
                <NavLink :href="{ name: 'dashboard.design' }" :active="current({ name: 'dashboard.design' })">
                  {{ $t('Dashboard.Navbar.Design') }}
                </NavLink>
                <NavLink :href="{ name: 'dashboard.team' }" :active="current({ name: 'dashboard.team' }) || current({ name: 'dashboard.team.create' })">
                  {{ $t('Dashboard.Navbar.Team') }}
                </NavLink>
                <NavLink :href="{ name: 'dashboard.blog' }" :active="current({ name: 'dashboard.blog' })">
                  {{ $t('Dashboard.Navbar.Blog') }}
                </NavLink>
                <NavLink :href="{ name: 'dashboard.service' }" :active="current({ name: 'dashboard.service' })">
                  {{ $t('Dashboard.Navbar.Service') }}
                </NavLink>
              </div>
            </div>

            <div class="hidden sm:ms-6 sm:flex sm:items-center">
              <div>
                <LanguageSwitcher />
              </div>
              <!-- Settings Dropdown -->
              <div class="relative ms-3">
                <Dropdown align="right" width="48">
                  <template #trigger>
                    <span class="inline-flex rounded-md">
                      <button type="button"
                        class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                        {{ auth?.user?.name }}
                        <svg class="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  </template>

                  <template #content>
                    <DropdownLink :href="{ name: 'dashboard.profile' }">
                      {{ $t('Dashboard.Navbar.Profile') }}
                    </DropdownLink>
                    <LogOutButton />
                  </template>
                </Dropdown>
              </div>
            </div>

            <!-- Hamburger -->
            <div class="-me-2 flex items-center sm:hidden">
              <div>
                <LanguageSwitcher />
              </div>
              <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none">
                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path :class="{
                    hidden: showingNavigationDropdown,
                    'inline-flex': !showingNavigationDropdown,
                  }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path :class="{
                    hidden: !showingNavigationDropdown,
                    'inline-flex': showingNavigationDropdown,
                  }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Responsive Navigation Menu -->
        <div :class="{
          block: showingNavigationDropdown,
          hidden: !showingNavigationDropdown,
        }" class="sm:hidden">
          <div class="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink :href="{ name: 'dashboard.home' }" :active="current({ name: 'dashboard.home' })">
              {{ $t('Dashboard.Navbar.Dashboard') }}
            </ResponsiveNavLink>
            <ResponsiveNavLink :href="{ name: 'dashboard.design' }" :active="current({ name: 'dashboard.design' })">
              {{ $t('Dashboard.Navbar.Design') }}
            </ResponsiveNavLink>
            <ResponsiveNavLink :href="{ name: 'dashboard.team' }" :active="current({ name: 'dashboard.team' })">
              {{ $t('Dashboard.Navbar.Team') }}
            </ResponsiveNavLink>
            <ResponsiveNavLink :href="{ name: 'dashboard.blog' }" :active="current({ name: 'dashboard.blog' })">
              {{ $t('Dashboard.Navbar.Blog') }}
            </ResponsiveNavLink>
            <ResponsiveNavLink :href="{ name: 'dashboard.service' }" :active="current({ name: 'dashboard.service' })">
              {{ $t('Dashboard.Navbar.Service') }}
            </ResponsiveNavLink>
          </div>

          <!-- Responsive Settings Options -->
          <div class="border-t border-gray-200 pb-1 pt-4">
            <div class="px-4">
              <div class="text-base font-medium text-gray-800">
                {{ auth?.user?.name }}
              </div>
              <div class="text-sm font-medium text-gray-500">
                {{ auth?.user?.email }}
              </div>
            </div>

            <div class="mt-3 space-y-1">
              <ResponsiveNavLink :href="{ name: 'dashboard.profile' }" :active="current({ name: 'dashboard.profile' })">
                Profile
              </ResponsiveNavLink>
              <LogOutButtonResponsive />
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Heading -->
      <header class="bg-white shadow" v-if="$slots.header">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <slot name="header" />
        </div>
      </header>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>
