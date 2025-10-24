<template>
  <div class="grid grid-cols-1 md:grid-cols-2 items-center rounded-lg overflow-hidden shadow">
    <!-- Vista previa de la imagen -->
    <div class="aspect-video w-full h-full">
      <ImagesPreview v-model="localValue.path" class="w-full h-full object-cover" />
    </div>

    <!-- Formulario -->
    <div class="p-4 flex flex-col gap-3">
      <div>
        <InputLabel for="title1" value="Título" />
        <TextInput id="title1" class="w-full" v-model="localValue.title" placeholder="Título" />
      </div>

      <div>
        <InputLabel for="subtitle1" value="Subtítulo" />
        <TextInput id="subtitle1" class="w-full" v-model="localValue.subtitle" placeholder="Subtítulo" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import ImagesPreview from '@/components/ImagesPreview.vue';
import { reactive, watch } from 'vue';
import TextInput from '@/components/TextInput.vue';
import InputLabel from '@/components/InputLabel.vue';

// v-model:imageVideo
const model = defineModel('imageVideo', { type: Object })

// estado local para edición
const localValue = reactive({ path: '', title: '', subtitle: '' })

// sincroniza
watch(
  model,
  (val) => Object.assign(localValue, val || { path: '', title: '', subtitle: '' }),
  { immediate: true, deep: true }
)

watch(localValue, (val) => {
  model.value = val
}, { deep: true })
</script>
