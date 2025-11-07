<script setup lang="ts">
import { onMounted, ref } from 'vue';

const model = defineModel<string>({ required: true });
const props = defineProps<{ autofocus?: boolean }>();

const input = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  if (props.autofocus) {
    input.value?.focus();
  }
});

defineExpose({
  focus: () => input.value?.focus()
});
</script>

<template>
  <textarea class="rounded-md border-gray-300 shadow-sm p-2" v-model="model"
    ref="input" :autofocus="autofocus"></textarea>
</template>
