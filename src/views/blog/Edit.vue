<template>
  <section class="p-6 space-y-6 dark:bg-gray-950">
    <header
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 h-[82px] sm:p-8">

      <h2 class="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left dark:text-gray-100">
        {{ $t('Dashboard.Blog.Edit.Title') }}
      </h2>

      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <BackButton @click="backToIndex" class="w-full sm:w-auto justify-center" :disabled="loading">
          {{ $t('Dashboard.Blog.Edit.BackButton') }}
        </BackButton>

        <PrimaryButton @click="saveChanges" class="w-full sm:w-auto flex items-center justify-center"
          :disabled="loading">
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
      <BlogInfo :model-value="form" @update:model-value="updateForm" />

      <div class="p-8">
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
import type { Blog } from './types';

const router = useRouter();

const props = defineProps<{
  id: string;
  locale?: string;
}>();

const loading = ref(false);
const error = ref('');

const form = reactive<Blog>({
  id: 0,
  title: '',
  status: '',
  image: '',
  content: '',
  category: ''
});

// Actualizar formulario (si BlogInfo emite cambios)
const updateForm = (updates: Partial<Blog>) => {
  Object.assign(form, updates);
};

const backToIndex = () => {
  router.push({ name: 'dashboard.blog' });
};

const loadBlog = async () => {
  if (!props.id) {
    error.value = 'ID del blog no proporcionado';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const { data } = await api.get(`/api/blog/${props.id}`);

    if (data?.data) {
      Object.assign(form, data.data);
      console.log("id ", form.id)
    } else {
      throw new Error('No se encontró el blog');
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Error al cargar el blog';
    console.error('Error loading blog:', err);
  } finally {
    loading.value = false;
  }
};

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
  formData.append('category', form.category)

  return formData
}

const saveChanges = async () => {

  loading.value = true;
  error.value = '';

  try {
    const formData = buildFormData()

    await api.post(`/api/blog/${props.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    // Opcional: Mostrar mensaje de éxito
    router.push({ name: 'dashboard.blog' });
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al guardar los cambios';
    console.error('Error saving blog:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadBlog();
});
</script>
