<template>
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

  <TabsRoot v-model="tab" class="space-y-6 py-10 px-20">
    <TabsList class="flex gap-2 rounded-xl bg-white p-1">

      <TabsTrigger value="basic" class="
        px-4 py-2 text-sm font-medium transition
        border-b-2 border-transparent
        text-gray-500
        hover:text-gray-300
        data-[state=active]:border-blue-500
        data-[state=active]:text-neutral-900
        data-[state=active]:shadow-[0_2px_0_0_rgba(59,130,246,0.8)]
      ">
        Básico
      </TabsTrigger>
      <TabsTrigger value="preparation" class="
        px-4 py-2 text-sm font-medium transition
        border-b-2 border-transparent
        text-gray-500
        hover:text-gray-300
        data-[state=active]:border-blue-500
        data-[state=active]:text-neutral-900
        data-[state=active]:shadow-[0_2px_0_0_rgba(59,130,246,0.8)]
      ">
        Preparacion
      </TabsTrigger>
    </TabsList>

    <TabsContent value="basic" forceMount class="space-y-6">
      <div>
        <BasicInfo :modelValue="form" @update:modelValue="handleFormUpdate" />
      </div>
    </TabsContent>

    <TabsContent value="preparation" forceMount>
      <div>
        <h1>Preparacion...</h1>
      </div>
    </TabsContent>

  </TabsRoot>
</template>

<script setup lang="ts">
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent
} from 'radix-vue'
import { ref, reactive, watch, onMounted } from 'vue'
import BasicInfo from './partials/BasicInfo.vue';
import type { Procedure } from './types';
import { useRouter } from 'vue-router';
import BackButton from '@/components/ui/BackButton.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import { api } from '@/plugins/api';

const router = useRouter()
const loading = ref(false)
const tab = ref('basic')

const ProcedureResponse = ref<Procedure>()

const props = defineProps<{ id?: number }>()

// Estado inicial del formulario
const getInitialFormState = (): Procedure => ({
  id: 0,
  status: 'inactive',
  title: '',
  subtitle: '',
  image: null,
  section: [],
  preStep: { deleted: [], updated: [], new: [] },
  phase: { deleted: [], updated: [], new: [] },
  faq: { deleted: [], updated: [], new: [] },
  do: { deleted: [], updated: [], new: [] },
  dont: { deleted: [], updated: [], new: [] },
  gallery: { deleted: [], updated: [], new: [] },
})

// Formulario reactivo
const form = reactive<Procedure>(getInitialFormState())

// Copia del estado inicial para comparar cambios
const initialForm = reactive<Procedure>(getInitialFormState())

const handleFormUpdate = (updatedForm: Procedure) => {

  form.title = updatedForm.title
  form.subtitle = updatedForm.subtitle
  form.status = updatedForm.status

  form.image = updatedForm.image

  if (updatedForm.section) form.section = updatedForm.section
  if (updatedForm.preStep) form.preStep = updatedForm.preStep
  if (updatedForm.phase) form.phase = updatedForm.phase
  if (updatedForm.faq) form.faq = updatedForm.faq
  if (updatedForm.do) form.do = updatedForm.do
  if (updatedForm.dont) form.dont = updatedForm.dont
  if (updatedForm.gallery) form.gallery = updatedForm.gallery
}

// ✅ Watch para debugging
watch(() => form.image, (newImage) => {
  console.log('🔍 form.image cambió:', {
    value: newImage,
    isFile: newImage instanceof File,
    name: newImage instanceof File ? newImage.name : 'N/A',
    type: typeof newImage
  })
}, { immediate: false })

// Función para detectar cambios
const hasChanges = (): boolean => {
  const changes = (
    form.title !== initialForm.title ||
    form.subtitle !== initialForm.subtitle ||
    form.status !== initialForm.status ||
    form.image instanceof File
  )

  console.log('🔎 Verificando cambios:', {
    titleChanged: form.title !== initialForm.title,
    subtitleChanged: form.subtitle !== initialForm.subtitle,
    statusChanged: form.status !== initialForm.status,
    imageIsFile: form.image instanceof File,
    hasChanges: changes
  })

  return changes
}

// Construir FormData solo con campos modificados
const buildFormData = (): FormData => {
  const formData = new FormData()

  // Campos simples
  if (form.title !== initialForm.title) {
    formData.append('title', form.title)
  }

  if (form.subtitle !== initialForm.subtitle) {
    formData.append('subtitle', form.subtitle)
  }

  if (form.status !== initialForm.status) {
    formData.append('status', form.status)
  }

  // Imagen principal
  if (form.image instanceof File) {
    formData.append('image', form.image)
  }

  // 🔥 SECTIONS (SIN IMÁGENES)
  if (JSON.stringify(form.section) !== JSON.stringify(initialForm.section)) {
    const cleanSections = form.section.map(({ image, ...rest }) => rest)
    formData.append('section', JSON.stringify(cleanSections))
  }

  form.section.forEach((section, index) => {
    if (section.image instanceof File) {
      formData.append(`section_images[${index}]`, section.image)
    }
  })

  const appendNestedChanges = (key: string, changes: any) => {
    if (changes.deleted?.length) {
      formData.append(`${key}[deleted]`, JSON.stringify(changes.deleted))
    }
    if (changes.updated?.length) {
      formData.append(`${key}[updated]`, JSON.stringify(changes.updated))
    }
    if (changes.new?.length) {
      formData.append(`${key}[new]`, JSON.stringify(changes.new))
    }
  }

  appendNestedChanges('preStep', form.preStep)
  appendNestedChanges('phase', form.phase)
  appendNestedChanges('faq', form.faq)
  appendNestedChanges('do', form.do)
  appendNestedChanges('dont', form.dont)
  appendNestedChanges('gallery', form.gallery)

  return formData
}


// Guardar cambios
const saveChanges = async () => {
  /* if (!hasChanges()) {
    console.warn('⚠️ No hay cambios para guardar')
    return
  } */

  const formData = buildFormData()

  const entries = [...formData.entries()]
  console.log('📦 FormData entries:', entries.length)

  if (entries.length === 0) {
    console.warn('⚠️ FormData está vacío')
    return
  }

  console.log('📋 Construcción dinámica:')
  formData.forEach((value, key) => {
    if (value instanceof File) {
      console.log(
        key,
        '→ File:',
        value.name,
        `(${value.type})`,
        value.size,
        'bytes'
      )
    } else {
      console.log(key, '→', value)
    }
  })

  try {
    await api.patch(`/api/procedure/${props.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

  } catch (error) {
    console.error('❌ Error guardando:', error)
  } finally {

  }

}

// Volver al índice
const backToIndex = () => {
  router.push({ name: 'dashboard.procedure' })
}

// Función para resetear el formulario
const resetForm = () => {
  Object.assign(form, getInitialFormState())
  Object.assign(initialForm, getInitialFormState())
}

// Función para cargar datos existentes
const loadProcedure = (data: Procedure) => {
  Object.assign(form, data)
  Object.assign(initialForm, JSON.parse(JSON.stringify(data)))
}

// Exponer funciones si es necesario
defineExpose({
  resetForm,
  loadProcedure,
  hasChanges
})

const editingForm = () => {
  if (ProcedureResponse.value)
    Object.assign(form, ProcedureResponse.value)
    Object.assign(initialForm, ProcedureResponse.value)
}

onMounted(async () => {
  console.log('id: ', props.id)

  const { data } = await api.get(`/api/procedure/${props.id}`)
  ProcedureResponse.value = data.data
  console.log(data)
  if (data) {
    editingForm()
  }
})

</script>
