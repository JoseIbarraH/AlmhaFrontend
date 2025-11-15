<script setup lang="ts">
import { computed } from "vue"
import type { RouterLinkProps } from "vue-router"
import { useLocalizedRoute } from "@/components/composables/useLocalizedRoute"

const props = defineProps<{
  href: RouterLinkProps["to"]
}>();

const { localizedRoute } = useLocalizedRoute()

const localizedHref = computed(() => {
  return localizedRoute(props.href as any)
})

</script>

<template>
  <router-link
    :to="localizedHref"
    class="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-white dark:hover:bg-indigo-900"
  >
    <slot />
  </router-link>
</template>
