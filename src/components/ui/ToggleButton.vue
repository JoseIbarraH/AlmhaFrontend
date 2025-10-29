<template>
  <button
    type="button"
    :class="[
      'relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
      isActive ? activeBgClass : 'bg-gray-300',
      isActive ? activeFocusRingClass : 'focus:ring-gray-400',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
    :aria-pressed="isActive"
    :aria-label="ariaLabel"
    :disabled="disabled"
    @click="toggle"
  >
    <span
      :class="[
        'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out',
        isActive ? 'translate-x-6' : 'translate-x-1'
      ]"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: boolean;
  color?: 'green' | 'blue' | 'red' | 'yellow';
  disabled?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
  disabled: false,
  ariaLabel: 'Toggle switch'
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

// Computed para mejor performance
const isActive = computed(() => props.modelValue);

const activeBgClass = computed(() => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-400'
  };
  return colors[props.color];
});

const activeFocusRingClass = computed(() => {
  const colors = {
    blue: 'focus:ring-blue-500',
    green: 'focus:ring-green-500',
    red: 'focus:ring-red-500',
    yellow: 'focus:ring-yellow-400'
  };
  return colors[props.color];
});

function toggle() {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
  }
}
</script>
