<script setup lang="ts">
import { computed, inject } from "vue";
import type { RouterLinkProps } from "vue-router";
import { useLocalizedRoute } from "@/components/composables/useLocalizedRoute";

const props = defineProps<{
  href: RouterLinkProps["to"];
  active?: boolean;
}>();

const closeSidebar = inject<() => void>('closeSidebar', () => {});

const { localizedRoute } = useLocalizedRoute()

const localizedHref = computed(() => {
  return localizedRoute(props.href as any)
})

const linkClasses = computed(() =>
  props.active
    ? "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm " +
      "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 " +
      "dark:bg-indigo-950/50 dark:text-indigo-400 dark:ring-indigo-900"

    : "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 " +
      "text-gray-600 hover:bg-gray-50 hover:text-gray-800 " +
      "dark:text-gray-300 dark:hover:bg-gray-800/70 dark:hover:text-white"
)

const iconContainerClasses = computed(() =>
  props.active
    ? "w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-200 " +
      "bg-indigo-200 dark:bg-indigo-900/50"

    : "w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-200 " +
      "bg-gray-50 group-hover:bg-indigo-100 dark:bg-gray-800/50 dark:group-hover:bg-indigo-900/40"
)
</script>

<template>
  <router-link :to="localizedHref" :class="linkClasses" @click="closeSidebar">
    <div :class="iconContainerClasses">
      <slot name="icon" />
    </div>

    <span class="flex-1">
      <slot />
    </span>

    <svg class="w-4 h-4 transition-opacity"
      :class="{
        'opacity-100': active,
        'opacity-0 group-hover:opacity-100': !active
      }"
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </router-link>
</template>
