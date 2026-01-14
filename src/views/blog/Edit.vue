<template>
  <section class="p-6 space-y-6 dark:bg-gray-950">
    <FormSkeleton v-if="loading && !form.id" />

    <template v-else>
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
      <div class="max-w-6xl mx-auto space-y-6">

        <!-- Error state -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-800">{{ error }}</p>
          <button @click="loadBlog" class="mt-2 text-red-600 hover:text-red-800 underline">
            {{ $t('Dashboard.Blog.Edit.Retry') }}
          </button>
        </div>

        <!-- Content -->
        <template v-if="form.id">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800">
            <BlogInfo :model-value="form" :categories="categories" @update:model-value="updateForm"
              @update="fetchCategories" />
            <div class="bg-accent/30 px-6 py-4  border-y border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <h2 class="text-xl font-semibold text-primary dark:text-gray-100">Contenido del Artículo</h2>
            </div>
            <div class="p-4">
              <Editor v-model="form.content" :id="form.id" />
            </div>
          </div>

        </template>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import BackButton from '@/components/ui/BackButton.vue';
import BlogInfo from './partials/BlogInfo.vue';
import Editor from './partials/Editor.vue';
import FormSkeleton from './partials/FormSkeleton.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/plugins/api';
import type { Blog, BlogForm, Category } from './types';
import type { ApiResponse } from '@/types/apiResponse';
import { useAuthStore } from '@/stores/authStore';
import { showNotification } from '@/components/composables/useNotification';
import { useI18n } from 'vue-i18n';

const auth = useAuthStore()
const router = useRouter();
const route = useRoute();
const { t } = useI18n()

const props = defineProps<{
  id: string;
  locale?: string;
}>();

const loading = ref(false);
const error = ref('');
const categories = ref<Category[]>([])

const form = reactive<BlogForm>({
  id: 0,
  title: '',
  status: '',
  image: '',
  content: '',
  category: '',
  writer: ''
});

// Actualizar formulario (si BlogInfo emite cambios)
const updateForm = (updates: Partial<BlogForm>) => {
  Object.assign(form, updates);
};

const backToIndex = () => {
  router.push({ name: 'dashboard.blog' });
};

const initialForm = reactive<Partial<BlogForm>>({})

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
      form.writer = data.data.writer ?? '';

      // Save initial state
      Object.assign(initialForm, {
        title: form.title,
        status: form.status,
        image: form.image,
        content: form.content,
        category: form.category,
        writer: form.writer
      })
    }

  } catch (error: any) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.GetData'), 4000)
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const { data } = await api.get<ApiResponse<Category[]>>('/api/blog-category');
    categories.value = data.data
  } catch (error: any) {
    showNotification('error', t('Dashboard.Blog.Validations.Error.GetCategories'), 4000)
  }
}

const buildFormData = (): FormData => {
  const formData = new FormData()

  if (form.title !== initialForm.title) formData.append('title', form.title)
  if (form.status !== initialForm.status) formData.append('status', form.status)

  if (form.image instanceof File) {
    formData.append('image', form.image)
  } else if (typeof form.image === 'string' && form.image.trim() !== '' && form.image !== initialForm.image) {
    // Only send image string if it changed (though usually we only send files on update)
    // If it's a string, it's likely the URL, which backend might not need unless it's a new URL/path
    // Assuming backend handles image update only if a file is sent usually.
    // However keeping logic generic:
    formData.append('image', form.image)
  }

  if (form.content !== initialForm.content) formData.append('content', form.content)

  // Compare numbers carefully
  if (Number(form.category) !== Number(initialForm.category)) formData.append('category', String(form.category))

  if (form.writer !== initialForm.writer) formData.append('writer', form.writer)

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
    console.log('erro del update: ', err)
  } finally {
    loading.value = false;
  }
};

let initialized = false;
onMounted(async () => {
  if (!initialized) {
    fetchCategories()
    loadBlog()
    initialized = true;
  }
})

watch(
  () => route.params.locale,
  () => {
    loadBlog()
    fetchCategories()
  }
)
</script>
