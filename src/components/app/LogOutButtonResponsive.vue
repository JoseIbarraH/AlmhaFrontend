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
  <button @click="handleLogout"
    class="block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
  >
  Cerrar sesión
  </button>
</template>
