<template>
  <div class="relative w-full" ref="container">
    <!-- Label -->
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>

    <div class="relative">
      <!-- Input -->
      <div class="relative">
        <input ref="inputRef" type="text" v-model="searchQuery" @focus="open" @input="handleInput"
          @keydown.down.prevent="navigateOptions('down')" @keydown.up.prevent="navigateOptions('up')"
          @keydown.enter.prevent="selectHighlighted" @keydown.esc="close" :placeholder="defaultText" class="w-full rounded-lg px-3 py-2 pr-10 transition duration-150 ease-in-out focus:outline-none focus:ring-2
                 border border-gray-300 text-gray-900 bg-white
                 focus:ring-blue-500 focus:border-blue-500
                 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100
                 dark:focus:ring-blue-400 dark:focus:border-blue-400" :class="inputClass" />
        <!-- Icon -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" @click="toggle">
          <ChevronDown class="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <!-- Dropdown -->
      <div v-if="isOpen"
        class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none">
        <ul v-if="filteredOptions.length > 0">
          <li v-for="(option, index) in filteredOptions" :key="option.value" @click="selectOption(option)"
            class="px-3 py-2 cursor-pointer select-none truncate" :class="[
              highlightedIndex === index ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700',
              modelValue === option.value ? 'font-medium' : ''
            ]">
            {{ option.label }}
          </li>
        </ul>
        <div v-else class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
          No se encontraron resultados
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { ChevronDown } from 'lucide-vue-next';

interface Option {
  value: string | number;
  label: string;
}

const props = defineProps<{
  options: Option[];
  modelValue: string | number;
  label?: string;
  default?: string; // Placeholder text
  inputClass?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const container = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const isOpen = ref(false);
const searchQuery = ref('');
const highlightedIndex = ref(-1);

const defaultText = computed(() => props.default || 'Seleccionar...');

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;
  const query = searchQuery.value.toLowerCase();
  // If the query matches exactly the selected label, show all options (assume user is just viewing)
  // unless they are actively typing.
  // Actually, standard behavior: filter by query.
  // Exception: if the query IS the currently selected option's label, we might want to show all?
  // But usually, if I type "A", I want "A...".
  // Let's stick to simple filtering.
  return props.options.filter(option =>
    option.label.toLowerCase().includes(query)
  );
});

// Update input text when modelValue changes
watch(
  () => props.modelValue,
  (newValue) => {
    const selected = props.options.find(o => o.value === newValue);
    if (selected) {
      // Only update search query if it doesn't match (prevents cursor jumping if we were to bind 2-way strictly during typing, though here we only update on selection)
      if (searchQuery.value !== selected.label) {
        searchQuery.value = selected.label;
      }
    } else {
      // If cleared externally
      if (!newValue && newValue !== 0) {
        searchQuery.value = '';
      }
    }
  },
  { immediate: true }
);

// Close on click outside
onClickOutside(container, () => {
  close();
});

const open = () => {
  isOpen.value = true;
  highlightedIndex.value = -1; // Reset highlight
};

const close = () => {
  isOpen.value = false;
  highlightedIndex.value = -1;
  // On close, validate:
  // If the current search query doesn't match the selected value's label, revert it.
  const selected = props.options.find(o => o.value === props.modelValue);
  if (selected) {
    searchQuery.value = selected.label;
  } else {
    searchQuery.value = '';
  }
};

const toggle = () => {
  if (isOpen.value) {
    close();
  } else {
    open();
    // Focus input
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
};

const handleInput = () => {
  isOpen.value = true;
  highlightedIndex.value = 0; // Highlight first result on search
  // We do NOT emit update:modelValue here usually, unless we want to clear it if invalid.
  // It's safer to only emit on explicit selection.
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  searchQuery.value = option.label;
  isOpen.value = false;
};

const navigateOptions = (direction: 'up' | 'down') => {
  if (!isOpen.value) {
    open();
    return;
  }

  if (direction === 'down') {
    if (highlightedIndex.value < filteredOptions.value.length - 1) {
      highlightedIndex.value++;
    }
  } else {
    if (highlightedIndex.value > 0) {
      highlightedIndex.value--;
    }
  }
};

const selectHighlighted = () => {
  if (isOpen.value && highlightedIndex.value >= 0 && highlightedIndex.value < filteredOptions.value.length) {
    const option = filteredOptions.value[highlightedIndex.value];
    if (option) {
      selectOption(option);
    }
  }
};

</script>

<style scoped>
/* Optional custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
</style>
