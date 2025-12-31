<template>
  <PostoperativeDo v-model="modelValue" :do="props.do" />
  <PostoperativeDont v-model="modelValue" :dont="props.dont" />
</template>

<script setup lang="ts">
import type { DoBackend, DontBackend, ProcedureFrontend } from '../types';
import PostoperativeDo from './PostoperativeDo.vue';
import PostoperativeDont from './PostoperativeDont.vue';

interface Do extends DoBackend {
  tempId?: string
}

interface Dont extends DontBackend {
  tempId?: string
}

interface Props {
  do?: Do[]
  dont?: Dont[]
}

const props = withDefaults(defineProps<Props>(), {
  do: () => [],
  dont: () => []
})

const modelValue = defineModel<ProcedureFrontend>({
  required: true
})


</script>
