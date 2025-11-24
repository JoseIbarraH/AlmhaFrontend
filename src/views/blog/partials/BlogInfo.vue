<template>
  <div class="flex flex-col h-full sm:flex-row w-full p-8 rounded-2xl dark:bg-gray-800">
    <div class="relative w-full sm:w-80">
      <ImagesPreview v-model="modelValue.image" class="max-h-48" />
    </div>

    <div class="px-2 py-8 md:p-0 md:pl-4 w-full">
      <div class="mb-4">
        <InputLabel for="title_blog" class="mb-1" :value="$t('Dashboard.Blog.Edit.TitlePost')" />
        <TextInput id="title" type="text" v-model="modelValue.title" />
      </div>

      <div>
        <InputLabel for="category" class="mb-1" :value="$t('Dashboard.Blog.Edit.Category')" />

        <Select
          class="block w-full md:w-[400px]"
          :model-value="Number(modelValue.category)"
          @update:model-value="modelValue.category = Number($event)"
          :options="categoryOptions"
          default="Categorias"
        />

        <p class="mt-2 text-xs text-gray-500">
          Categoría seleccionada: {{ modelValue.category }} (tipo: {{ typeof modelValue.category }})
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import type { BlogForm, Category } from '../types';
import Select from '@/components/ui/Select.vue';
import { computed } from 'vue';

const props = defineProps<{
  categories: Category[] | null
}>()

const modelValue = defineModel<BlogForm>({
  required: true
})

const categoryOptions = computed(() => {
  return props.categories?.map(cat => ({
    value: cat.id,
    label: cat.title
  })) ?? []
})
</script>
