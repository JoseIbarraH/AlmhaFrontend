<script setup lang="ts">
import { computed } from "vue"
import type { RouterLinkProps } from "vue-router"
import { useLocalizedRoute } from "@/components/composables/useLocalizedRoute"

const props = defineProps<{
  href: RouterLinkProps["to"];
  active?: boolean;
}>();

const { localizedRoute } = useLocalizedRoute()

const localizedHref = computed(() => {
  return localizedRoute(props.href as any)
})

const classes = computed(() =>
  props.active
    ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
    : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
)
</script>

<template>
  <router-link :to="localizedHref" :class="classes">
    <slot />
  </router-link>
</template>
