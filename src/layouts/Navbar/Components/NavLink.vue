<script setup lang="ts">
import { computed } from "vue"
import type { RouterLinkProps } from "vue-router"
import { useLocalizedRoute } from "@/composables/useLocalizedRoute"

const props = defineProps<{
  href: RouterLinkProps["to"]
  active?: boolean
}>()

const { localizedRoute } = useLocalizedRoute()

const localizedHref = computed(() => {
  return localizedRoute(props.href as any)
})

const classes = computed(() =>
  props.active
    ? 'relative inline-flex h-6 items-center text-[14px] md:text-[16px] leading-5 text-white [font-family:"Open_Sans"] tracking-[2px] md:tracking-[5px] uppercase after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white after:scale-x-100 after:origin-left after:transition-transform after:duration-300'
    : 'relative inline-flex h-6 items-center text-[14px] md:text-[16px] leading-5 text-white [font-family:"Open_Sans"] tracking-[2px] md:tracking-[5px] uppercase after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100'
)

</script>

<template>
  <RouterLink :to="localizedHref" :class="classes">
    <slot />
  </RouterLink>
</template>
