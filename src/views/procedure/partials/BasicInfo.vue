<template>
  <div
    class="flex flex-col p-6 border rounded-xl border-gray-300 shadow space-y-6 bg-white mb-6 dark:bg-gray-800 dark:border-gray-900">
    <div class="space-y-4">
      <div class="space-y-2">
        <h1 class="text-xl font-bold dark:text-white">{{ $t('Dashboard.Procedure.Edit.BasicInfo.Title') }}</h1>
        <h2 class="dark:text-gray-400">{{ $t('Dashboard.Procedure.Edit.BasicInfo.Subtitle') }}</h2>
      </div>
      <div>
        <InputLabel for="title" :value="$t('Dashboard.Procedure.Edit.BasicInfo.InputTitle')" class="text-[17px] mb-2" />
        <TextInput id="title" v-model="model.title"
          :placeholder="$t('Dashboard.Procedure.Edit.BasicInfo.InputTitlePlaceholder')" />
      </div>
      <div>
        <InputLabel for="subtitle" :value="$t('Dashboard.Procedure.Edit.BasicInfo.InputSubtitle')"
          class="text-[17px] mb-2" />
        <TextInput id="subtitle" v-model="model.subtitle"
          :placeholder="$t('Dashboard.Procedure.Edit.BasicInfo.InputSubtitlePlaceholder')" />
      </div>
<!--       <div>
        <InputLabel for="category" :value="$t('Dashboard.Procedure.Edit.BasicInfo.InputCategory')"
          class="text-[17px] mb-2" />
        <Multiselect v-model="selectedCategory" :options="categoryOptions" :searchable="true" :close-on-select="true"
          :show-labels="false" :placeholder="$t('Dashboard.Blog.Edit.Default')" label="label" track-by="value"
          class="custom-multiselect">
          <template #noResult>
            <span>{{ $t('Dashboard.Blog.Edit.NoResults') }}</span>
          </template>
          <template #noOptions>
            <span>{{ $t('Dashboard.Blog.Edit.NoOptions') }}</span>
          </template>
        </MultiSelect>
      </div> -->
      <div class="flex items-end gap-3">
        <div class="flex-1">
          <InputLabel for="category" class="mb-1" :value="$t('Dashboard.Procedure.Edit.BasicInfo.InputCategory')" />

          <div class="custom-multiselect">
            <MultiSelect v-model="selectedCategory" :options="categoryOptions" :searchable="true"
              :close-on-select="true" :show-labels="false" :placeholder="$t('Dashboard.Blog.Edit.Default')"
              label="label" track-by="value" class="custom-multiselect">
              <template #noResult>
                <span>{{ $t('Dashboard.Blog.Edit.NoResults') }}</span>
              </template>
              <template #noOptions>
                <span>{{ $t('Dashboard.Blog.Edit.NoOptions') }}</span>
              </template>
            </MultiSelect>
          </div>
        </div>

        <button type="button" @click="handleCategoryModal" class="h-[42px] px-3 rounded-lg border border-gray-300 dark:border-gray-600
                 flex items-center justify-center
                 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">
          <LucidePlusSquare class="w-5 h-5" />
        </button>
      </div>
      <div class="space-y-2">
        <InputLabel for="image" :value="$t('Dashboard.Procedure.Edit.BasicInfo.ImageTitle')" class="text-[17px] mb-2" />

        <div v-if="imagePreview" class="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
          <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover" />
          <button type="button"
            class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
            @click="removeImage">
            <LucideX class="w-4 h-4" />
          </button>
        </div>

        <div class="flex items-center gap-4">
          <button type="button" variant="outline"
            class="w-full bg-transparent flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-300 shadow rounded-md py-2 dark:text-gray-100 dark:hover:text-gray-800"
            @click="openFilePicker">
            <LucideUpload class="w-4 h-4" />
            {{ imagePreview ? $t('Dashboard.Procedure.Edit.BasicInfo.ChangeImage') :
              $t('Dashboard.Procedure.Edit.BasicInfo.UploadImage') }}
          </button>

          <input ref="fileInput" id="image" type="file" accept="image/*" class="hidden" @change="onFileChange" />
        </div>

        <p class="text-xs text-muted-foreground dark:text-gray-100">
          {{ $t('Dashboard.Procedure.Edit.BasicInfo.Recommendation') }}
        </p>
      </div>
    </div>
  </div>

  <Section sectionKey="what_is" :title="$t('Dashboard.Procedure.Edit.BasicInfo.Section.Title')"
    :subtitle="$t('Dashboard.Procedure.Edit.BasicInfo.Section.Subtitle')" :modelValue="model.section[0]"
    @update:model="updateSection(0, $event)"
    :placeholderTitle="$t('Dashboard.Procedure.Edit.BasicInfo.Section.TitlePlaceholder')"
    :placeholderContentOne="$t('Dashboard.Procedure.Edit.BasicInfo.Section.ContentOnePlaceholder')"
    :placeholderContentTwo="$t('Dashboard.Procedure.Edit.BasicInfo.Section.ContentTwoPlaceholder')"
    :allowImage="true" />

  <CategoryManager :show="isOpen" @close="handleCategoryModal" :categories="categories" @update="$emit('update')" />
</template>

<script setup lang="ts">
import InputLabel from '@/components/ui/InputLabel.vue'
import TextInput from '@/components/ui/TextInput.vue'
import type { Category, ProcedureFrontend } from '../types'
import { LucidePlusSquare, LucideUpload, LucideX } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import Section from './Section.vue'
import MultiSelect from 'vue-multiselect'
import CategoryManager from './CategoryManager.vue'

const props = defineProps<{
  categories?: Category[]
}>()

const model = defineModel<ProcedureFrontend>({
  required: true
})

const isOpen = ref(false);

const emit = defineEmits(['update'])

const selectedCategory = computed({
  get: () => {
    if (!model.value.category) return null;
    return categoryOptions.value.find(cat => cat.value === model.value.category) || null;
  },
  set: (newValue) => {
    if (newValue?.value !== undefined) {
      model.value.category = newValue.value;
    }
  }
});

const handleCategoryModal = () => {
  isOpen.value = !isOpen.value
}

const categoryOptions = computed(() => {
  return props.categories?.map(cat => ({
    value: cat.id,
    label: cat.title
  })) ?? []
})

const updateSection = (index: number, section: any) => {
  const newSections = [...model.value.section]
  newSections[index] = section

  model.value = {
    ...model.value,
    section: newSections
  }
}

const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)

const updateModel = (payload: Partial<ProcedureFrontend>) => {
  model.value = {
    ...model.value,
    ...payload
  }
}

const openFilePicker = () => {
  fileInput.value?.click()
}

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  imagePreview.value = URL.createObjectURL(file)

  updateModel({ image: file })
}

const removeImage = () => {
  imagePreview.value = null
  updateModel({ image: null })

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

watch(
  () => model.value.image,
  (image) => {
    if (typeof image === 'string') {
      imagePreview.value = image
    }
  },
  { immediate: true }
)
</script>
