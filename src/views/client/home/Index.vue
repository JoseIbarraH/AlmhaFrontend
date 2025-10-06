<template>
  <h3>dashboard</h3>
  <NavLink :href="{ name: 'dashboard.home' }">
    {{ $t('Dashboard.Navbar.Dashboard') }}
  </NavLink>
</template>

<script setup lang="ts">
import NavLink from '@/components/NavLink.vue';
</script>
