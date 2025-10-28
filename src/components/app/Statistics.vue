<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white">
    <div
      v-for="card in cards"
      :key="card.id"
      class="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">{{ card.title }}</p>
          <p class="text-2xl font-bold" :class="card.textColor">{{ card.value ?? 0 }}</p>
        </div>
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center"
          :class="[card.iconBg, card.shape]"
        >
          <!-- Renderiza ícono SVG si es string -->
          <div v-if="typeof card.icon === 'string'" v-html="card.icon" class="w-4 h-4"></div>
          <!-- Renderiza componente si es función/componente -->
          <component v-else :is="card.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, type Component } from 'vue'

const props = defineProps<{
  totalObjectTitle?: string
  totalObject?: number
  totalObjectIcon?: string | Component
  totalObjectIconBg?: string
  totalObjectTextColor?: string

  totalActivatedTitle?: string
  totalActivated?: number
  totalActivatedIcon?: string | Component
  totalActivatedIconBg?: string
  totalActivatedTextColor?: string

  totalDeactivatedTitle?: string
  totalDeactivated?: number
  totalDeactivatedIcon?: string | Component
  totalDeactivatedIconBg?: string
  totalDeactivatedTextColor?: string

  lastObjectTitle?: string
  lastObject?: number
  lastObjectIcon?: string | Component
  lastObjectIconBg?: string
  lastObjectTextColor?: string
  lastObjectShape?: string
}>()

// Íconos por defecto
const defaultUsersIcon = () =>
  h(
    'svg',
    {
      class: 'w-4 h-4 text-blue-500',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
    },
    [
      h('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
        d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      }),
    ]
  )

const defaultUserAddIcon = () =>
  h(
    'svg',
    {
      class: 'h-4 w-4 text-blue-500',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      }),
    ]
  )

const defaultDotIcon = (color: string) => () =>
  h('div', { class: `w-3 h-3 ${color} rounded-full` })

const cards = computed(() => [
  {
    id: 'total',
    title: props.totalObjectTitle,
    value: props.totalObject,
    textColor: props.totalObjectTextColor || 'text-gray-800',
    iconBg: props.totalObjectIconBg || 'bg-blue-100',
    shape: '',
    icon: props.totalObjectIcon || defaultUsersIcon,
  },
  {
    id: 'activated',
    title: props.totalActivatedTitle,
    value: props.totalActivated,
    textColor: props.totalActivatedTextColor || 'text-green-600',
    iconBg: props.totalActivatedIconBg || 'bg-green-100',
    shape: '',
    icon: props.totalActivatedIcon || defaultDotIcon('bg-green-500'),
  },
  {
    id: 'deactivated',
    title: props.totalDeactivatedTitle,
    value: props.totalDeactivated,
    textColor: props.totalDeactivatedTextColor || 'text-red-600',
    iconBg: props.totalDeactivatedIconBg || 'bg-red-100',
    shape: '',
    icon: props.totalDeactivatedIcon || defaultDotIcon('bg-red-500'),
  },
  {
    id: 'last',
    title: props.lastObjectTitle,
    value: props.lastObject,
    textColor: props.lastObjectTextColor || 'text-blue-600',
    iconBg: props.lastObjectIconBg || 'bg-blue-100',
    shape: props.lastObjectShape || 'rounded-full',
    icon: props.lastObjectIcon || defaultUserAddIcon,
  },
])
</script>
