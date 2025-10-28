<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    auth.logout()
    router.push({ name: 'auth.login' })
  } catch (error) {
    console.error(error)
    auth.logout()
    router.push({ name: 'auth.login' })
  }
}
</script>

<template>
  <button @click="handleLogout" class="block cursor-pointer w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">Cerrar sesión</button>
</template>
