<template>
  <Transition name="slide-fade">
    <div v-if="visible" :class="[
      'z-50 min-w-[300px] max-w-md rounded-lg shadow-lg p-4 flex items-start gap-3',
      notificationClasses
    ]">
      <div class="flex-shrink-0">
        <component :is="iconComponent" :class="iconClasses" />
      </div>

      <div class="flex-1 space-y-1">
        <p v-for="(line, index) in messageLines" :key="index" class="font-medium text-sm leading-snug">
          {{ line }}
        </p>
      </div>

      <button @click="close" class="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity">
        <X :size="18" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-vue-next'

const props = defineProps({
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'warning', 'error'].includes(value)
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])
const visible = ref(false)

// 🔹 Divide el mensaje en líneas (por saltos de línea)
const messageLines = computed(() => props.message.split('\n'))

const notificationClasses = computed(() => ({
  success: 'bg-green-50 border border-green-200 text-green-800',
  warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border border-red-200 text-red-800'
}[props.type]))

const iconClasses = computed(() => ({
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600'
}[props.type]))

const iconComponent = computed(() => ({
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle
}[props.type]))

const close = () => {
  visible.value = false
  setTimeout(() => emit('close'), 300)
}

onMounted(() => {
  visible.value = true
  if (props.duration > 0) {
    setTimeout(() => close(), props.duration)
  }
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
