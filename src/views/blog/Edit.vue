<template>
  <section class="p-6 space-y-6 dark:bg-gray-950">
    <header
      class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full">

      <h2 class="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left dark:text-gray-100">
        {{ $t('Dashboard.Blog.Edit.Title') }}
      </h2>

      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <BackButton @click="backToIndex" class="w-full sm:w-auto justify-center" :disabled="loading">
          {{ $t('Dashboard.Blog.Edit.BackButton') }}
        </BackButton>

        <PrimaryButton @click="saveChanges" class="w-full sm:w-auto flex items-center justify-center"
          :disabled="loading || !$can('update_blogs')">
          {{ loading ? $t('Dashboard.Blog.Edit.Saving') : $t('Dashboard.Blog.Edit.SaveChanges') }}
        </PrimaryButton>
      </div>
    </header>

    <!-- Loading state -->
    <div v-if="loading && !form.id" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-800">{{ error }}</p>
      <button @click="loadBlog" class="mt-2 text-red-600 hover:text-red-800 underline">
        {{ $t('Dashboard.Blog.Edit.Retry') }}
      </button>
    </div>

    <!-- Content -->
    <template v-if="form.id">
      <BlogInfo :model-value="form" :categories="categories" @update:model-value="updateForm" />

      <div>
        <Editor v-model="form.content" :id="form.id" />
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import BackButton from '@/components/ui/BackButton.vue';
import BlogInfo from './partials/BlogInfo.vue';
import Editor from './partials/Editor.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/plugins/api';
import type { Blog, BlogForm, Category, CategoryData } from './types';
import type { ApiResponse } from '@/types/apiResponse';
import { useAuthStore } from '@/stores/authStore';
import { showNotification } from '@/components/composables/useNotification';
import { useI18n } from 'vue-i18n';

const auth = useAuthStore()
const router = useRouter();
const { t } = useI18n()

const props = defineProps<{
  id: string;
  locale?: string;
}>();

const loading = ref(false);
const error = ref('');
const categories = ref<Category[] | null>(null)

const form = reactive<BlogForm>({
  id: 0,
  title: '',
  status: '',
  image: '',
  content: '',
  category: 0
});

// Actualizar formulario (si BlogInfo emite cambios)
const updateForm = (updates: Partial<BlogForm>) => {
  Object.assign(form, updates);
};

const backToIndex = () => {
  router.push({ name: 'dashboard.blog' });
};

const loadBlog = async () => {
  if (!props.id) {
    error.value = t('Dashboard.Blog.Validations.Error.IdNotFound');
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const { data } = await api.get<ApiResponse<Blog>>(`/api/blog/${props.id}`);

    if (data?.data) {
      form.id = data.data.id;
      form.title = data.data.title;
      form.status = data.data.status;
      form.image = data.data.image;
      form.content = data.data.content;
      form.category = data.data.category;
    }

  } catch (error: any) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.GetData'), 4000)
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const { data } = await api.get<ApiResponse<CategoryData>>('/api/blog/categories');
    categories.value = data.data?.categories
  } catch (error: any) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.GetCategories'), 4000)
  }
}

const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('title', form.title)
  formData.append('status', form.status)

  if (form.image instanceof File) {
    formData.append('image', form.image)
  } else if (typeof form.image === 'string' && form.image.trim() !== '') {
    formData.append('image', form.image)
  }

  formData.append('content', form.content)
  formData.append('category', String(form.category))

  return formData
}

const saveChanges = async () => {
  if (!auth.can('update_blogs'))
    loading.value = true;
  error.value = '';

  try {
    const formData = buildFormData()

    await api.post(`/api/blog/${props.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    showNotification('success', t('Dashboard.Blog.Validations.Success.Update'), 3000)

    router.push({ name: 'dashboard.blog' });
  } catch (err: any) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.Update'), 3000)
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadBlog();
  fetchCategories();
});
</script>
