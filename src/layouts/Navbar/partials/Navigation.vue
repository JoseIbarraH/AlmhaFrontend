<template>
  <h3 class="font-bodoni text-white mb-6 text-2xl">Navegación</h3>
  <ul class="grid grid-cols-1 gap-6">
    <li v-for="link in links" :key="link.route">
      <NavLink :href="{ name: link.route }" @click="handleClose">
        {{ link.name }}
      </NavLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import NavLink from '../Components/NavLink.vue';

const links = [
  { name: "home", route: "client.home"},
  { name: "service", route: "client.service" },
  { name: "about us", route: "client.about_us" },
  { name: "team", route: "client.team" },
  { name: "blog", route: "client.blog" }
  /*{ name: "Products", route: "product" },
  { name: "Blog", route: "blog" }, */
]

interface Emits {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const handleClose = () => {
  emit('close')
}
</script>
