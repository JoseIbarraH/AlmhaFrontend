<template>

  <div class="bg-accent/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
    <h2 class="text-xl font-semibold text-primary dark:text-gray-100">Información Básica</h2>
  </div>

  <div class="p-6 md:p-8 space-y-6">
    <!-- Título -->
    <div>
      <InputLabel for="title" class="mb-1" :value="$t('Dashboard.Blog.Edit.TitlePost')" />
      <TextInput id="title" type="text" v-model="model.title" />
    </div>

    <div class="grid md:grid-cols-2 gap-6 w-full">
      <div class="flex items-end gap-3">
        <div class="flex-1">
          <InputLabel for="category" class="mb-1" :value="$t('Dashboard.Blog.Edit.Category')" />

          <Select class="block w-full" :model-value="Number(model.category)"
            @update:model-value="model.category = Number($event)" :options="categoryOptions"
            :default="$t('Dashboard.Blog.Edit.Default')" />
        </div>

        <button type="button" @click="handleCategoryModal" class="h-[42px] px-3 rounded-lg border border-gray-300 dark:border-gray-600
           flex items-center justify-center
           hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">
          <LucidePlusSquare class="w-5 h-5" />
        </button>
      </div>
      <!-- Escritor -->
      <div>
        <InputLabel for="writer" class="mb-1" :value="$t('Dashboard.Blog.Edit.Writer')" />
        <TextInput id="writer" type="text" v-model="model.writer" />
      </div>
    </div>

    <div class="relative w-full">
      <InputLabel for="image" class="mb-1" :value="$t('Dashboard.Blog.Edit.Image')" />
      <ImagesPreview id="image" v-model="model.image" class="max-h-48" :disabled="$can('update_blogs')" />
    </div>

  </div>

  <CategoryManager :show="isOpen" @close="handleCategoryModal" :categories="categories" @update="$emit('update')" />
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import type { BlogForm, Category } from '../types';
import Select from '@/components/ui/Select.vue';
import { computed, ref } from 'vue';
import { LucidePlusSquare } from 'lucide-vue-next';
import CategoryManager from './CategoryManager.vue';

const props = defineProps<{
  categories?: Category[]
}>()

const model = defineModel<BlogForm>({
  required: true
})

const emit = defineEmits(['update'])

const isOpen = ref(false);

const handleCategoryModal = () => {
  isOpen.value = !isOpen.value
}

const categoryOptions = computed(() => {
  return props.categories?.map(cat => ({
    value: cat.id,
    label: cat.title
  })) ?? []
})
</script>
