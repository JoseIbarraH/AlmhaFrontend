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
        <Select class=" block w-full md:w-[400px]"
          v-model="modelValue.category"
          :options="categories"
          default="Categorias"
          />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagesPreview from '@/components/ui/ImagesPreview.vue';
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import Select from '@/components/ui/Select.vue';
import type { Blog } from '../types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const modelValue = defineModel<Blog>({
  required: true
})

const categories = [
  { value: "facial", label: t('Dashboard.Blog.Edit.Categories.Facial') },
  { value: "bodily", label: t('Dashboard.Blog.Edit.Categories.Bodily') },
  { value: "non-surgical", label: t('Dashboard.Blog.Edit.Categories.NonSurgical') },
  { value: "general", label: t('Dashboard.Blog.Edit.Categories.General') }
]

</script>
