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

    <TabsRoot v-model="tab" class="space-y-6">
      <TabsList
        class="flex flex-wrap gap-2 rounded-xl bg-white p-1 w-full justify-center sm:justify-start lg:justify-center">
        <TabsTrigger value="basic" class="
          px-3 py-2 text-xs sm:text-sm font-medium transition
          border-b-2 border-transparent
          text-gray-500
          hover:text-gray-300
          data-[state=active]:border-blue-500
          data-[state=active]:text-neutral-900
          data-[state=active]:shadow-[0_2px_0_0_rgba(59,130,246,0.8)]
          flex-shrink-0
        ">
          Básico
        </TabsTrigger>
        <TabsTrigger value="preparation" class="
          px-3 py-2 text-xs sm:text-sm font-medium transition
          border-b-2 border-transparent
          text-gray-500
          hover:text-gray-300
          data-[state=active]:border-blue-500
          data-[state=active]:text-neutral-900
          data-[state=active]:shadow-[0_2px_0_0_rgba(59,130,246,0.8)]
          flex-shrink-0
        ">
          Preparación
        </TabsTrigger>
        <TabsTrigger value="recovery" class="
          px-3 py-2 text-xs sm:text-sm font-medium transition
          border-b-2 border-transparent
          text-gray-500
          hover:text-gray-300
          data-[state=active]:border-blue-500
          data-[state=active]:text-neutral-900
          data-[state=active]:shadow-[0_2px_0_0_rgba(59,130,246,0.8)]
          flex-shrink-0
        ">
          Recuperación
        </TabsTrigger>
        <TabsTrigger value="post-op" class="
          px-3 py-2 text-xs sm:text-sm font-medium transition
          border-b-2 border-transparent
          text-gray-500
          hover:text-gray-300
          data-[state=active]:border-blue-500
          data-[state=active]:text-neutral-900
          data-[state=active]:shadow-[0_2px_0_0_rgba(59,130,246,0.8)]
          flex-shrink-0
        ">
          <span class="hidden sm:inline">Recomendaciones postoperatorias</span>
          <span class="sm:hidden">Post-op</span>
        </TabsTrigger>
        <TabsTrigger value="faqs" class="
          px-3 py-2 text-xs sm:text-sm font-medium transition
          border-b-2 border-transparent
          text-gray-500
          hover:text-gray-300
          data-[state=active]:border-blue-500
          data-[state=active]:text-neutral-900
          data-[state=active]:shadow-[0_2px_0_0_rgba(59,130,246,0.8)]
          flex-shrink-0
        ">
          FAQs
        </TabsTrigger>
        <TabsTrigger value="galleries" class="
          px-3 py-2 text-xs sm:text-sm font-medium transition
          border-b-2 border-transparent
          text-gray-500
          hover:text-gray-300
          data-[state=active]:border-blue-500
          data-[state=active]:text-neutral-900
          data-[state=active]:shadow-[0_2px_0_0_rgba(59,130,246,0.8)]
          flex-shrink-0
        ">
          <span class="hidden sm:inline">Galería de resultados</span>
          <span class="sm:hidden">Galería</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic" forceMount>
        <BasicInfo :modelValue="form" @update:modelValue="handleFormUpdate" />
      </TabsContent>

      <TabsContent value="preparation" forceMount>
        <Preparation :modelValue="form" @update:modelValue="handleFormUpdate" :preStep="procedureResponse?.preStep" />
      </TabsContent>

      <TabsContent value="recovery" forceMount>
        <Recovery :modelValue="form" @update:modelValue="handleFormUpdate" :phase="procedureResponse?.phase" />
      </TabsContent>

      <TabsContent value="post-op" forceMount>
        <Postoperative :modelValue="form" @update:modelValue="handleFormUpdate" :do="procedureResponse?.do"
          :dont="procedureResponse?.dont" />
      </TabsContent>

      <TabsContent value="faqs" forceMount>
        <Faq :modelValue="form" @update:modelValue="handleFormUpdate" :faq="procedureResponse?.faq" />
      </TabsContent>

      <TabsContent value="galleries" forceMount>
        <Gallery :modelValue="form" @update:modelValue="handleFormUpdate" :gallery="procedureResponse?.gallery" />
      </TabsContent>
    </TabsRoot>
  </section>
</template>

<script setup lang="ts">
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent
} from 'radix-vue'
import { ref, reactive, onMounted } from 'vue'
import BasicInfo from './partials/BasicInfo.vue';
import type { ProcedureBackend, ProcedureFrontend } from './types';
import { useRouter } from 'vue-router';
import BackButton from '@/components/ui/BackButton.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import { api } from '@/plugins/api';
import Preparation from './partials/Preparation.vue';
import Recovery from './partials/Recovery.vue';
import Postoperative from './partials/Postoperative.vue';
import Faq from './partials/Faq.vue';
import Gallery from './partials/Gallery.vue';

const router = useRouter()
const loading = ref(false)
const tab = ref('basic')

const initialPreStep = ref<any[]>([])
const initialPhase = ref<any[]>([])
const initialDo = ref<any[]>([])
const initialDont = ref<any[]>([])
const initialFaq = ref<any[]>([])
const initialGallery = ref<any[]>([])

const procedureResponse = ref<ProcedureBackend>()

const props = defineProps<{
  id?: string,
  locale?: string
}>()

// Estado inicial del formulario
const getInitialFormState = (): ProcedureFrontend => ({
  status: 'inactive',
  title: '',
  subtitle: '',
  image: null,
  section: [
    { type: 'what_is', image: null, title: '', contentOne: '', contentTwo: '' },
    { type: 'technique', image: null, title: '', contentOne: '', contentTwo: '' },
    { type: 'recovery', image: null, title: '', contentOne: '', contentTwo: '' }
  ],
  preStep: { deleted: [], updated: [], new: [] },
  phase: { deleted: [], updated: [], new: [] },
  faq: { deleted: [], updated: [], new: [] },
  do: { deleted: [], updated: [], new: [] },
  dont: { deleted: [], updated: [], new: [] },
  gallery: { deleted: [], updated: [], new: [] },
})

const form = reactive<ProcedureFrontend>(getInitialFormState())

const initialForm = reactive<ProcedureFrontend>(getInitialFormState())

const handleFormUpdate = (updatedForm: ProcedureFrontend) => {
  form.title = updatedForm.title
  form.subtitle = updatedForm.subtitle
  form.status = updatedForm.status
  form.image = updatedForm.image ?? form.image

  // ✅ MERGE seguro de section
  if (updatedForm.section) {
    form.section = updatedForm.section.map((s, i) => ({
      ...form.section[i], // conserva imageUrl
      ...s
    }))
  }

  if (updatedForm.preStep) form.preStep = updatedForm.preStep
  if (updatedForm.phase) form.phase = updatedForm.phase
  if (updatedForm.faq) form.faq = updatedForm.faq
  if (updatedForm.do) form.do = updatedForm.do
  if (updatedForm.dont) form.dont = updatedForm.dont
  if (updatedForm.gallery) form.gallery = updatedForm.gallery
}


const normalize = (normal?: {
  new?: any[]
  updated?: any[]
  deleted?: number[]
}) => ({
  new: Array.isArray(normal?.new) ? normal!.new : [],
  updated: Array.isArray(normal?.updated) ? normal!.updated : [],
  deleted: Array.isArray(normal?.deleted) ? normal!.deleted : [],
})

// Construir FormData solo con campos modificados
const buildFormData = (): FormData => {
  const formData = new FormData()

  formData.append('_method', 'patch')

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

  form.section.forEach((section, index) => {
    if ((section.title !== initialForm.section[index]?.title) ||
      (section.contentOne !== initialForm.section[index]?.contentOne) ||
      (section.contentTwo !== initialForm.section[index]?.contentTwo) ||
      section.image instanceof File
    ) {
      formData.append(`section[${index}][type]`, section.type)
    }
    if (section.title && (section.title !== initialForm.section[index]?.title)) {
      formData.append(`section[${index}][title]`, section.title)
    }
    if (section.contentOne && (section.contentOne !== initialForm.section[index]?.contentOne)) {
      formData.append(`section[${index}][contentOne]`, section.contentOne)
    }
    if (section.contentTwo && (section.contentTwo !== initialForm.section[index]?.contentTwo)) {
      formData.append(`section[${index}][contentTwo]`, section.contentTwo)
    }
    if (section.image instanceof File) {
      formData.append(`section[${index}][image]`, section.image)
    }
  })

  if (form.preStep) {
    const { new: created, updated } = normalize(form.preStep)

    const diff = diffById(
      [...created, ...updated],
      initialPreStep.value,
      (a, b) =>
        a.title === b.title &&
        a.description === b.description &&
        a.order === b.order
    )

    diff.new.forEach((step, index) => {
      formData.append(`preStep[new][${index}][title]`, step.title)
      formData.append(`preStep[new][${index}][description]`, step.description)
      formData.append(`preStep[new][${index}][order]`, String(step.order))
    })

    diff.updated.forEach((step, index) => {
      formData.append(`preStep[updated][${index}][id]`, String(step.id))
      formData.append(`preStep[updated][${index}][title]`, step.title)
      formData.append(`preStep[updated][${index}][description]`, step.description)
      formData.append(`preStep[updated][${index}][order]`, String(step.order))
    })

    diff.deleted.forEach((id, index) => {
      formData.append(`preStep[deleted][${index}]`, String(id))
    })
  }

  if (form.phase) {
    const { new: created, updated } = normalize(form.phase)

    const diff = diffById(
      [...created, ...updated],
      initialPhase.value,
      (a, b) =>
        a.period === b.period &&
        a.title === b.title &&
        a.description === b.description &&
        a.order === b.order
    )

    diff.new.forEach((rec, index) => {
      formData.append(`phase[new][${index}][period]`, rec.period)
      formData.append(`phase[new][${index}][title]`, rec.title)
      formData.append(`phase[new][${index}][description]`, rec.description)
      formData.append(`phase[new][${index}][order]`, String(rec.order))
    })

    diff.updated.forEach((rec, index) => {
      formData.append(`phase[updated][${index}][id]`, String(rec.id))
      formData.append(`phase[updated][${index}][period]`, rec.period)
      formData.append(`phase[updated][${index}][title]`, rec.title)
      formData.append(`phase[updated][${index}][description]`, rec.description)
      formData.append(`phase[updated][${index}][order]`, String(rec.order))
    })

    diff.deleted.forEach((id, index) => {
      formData.append(`phase[deleted][${index}]`, String(id))
    })
  }

  if (form.do) {
    const { new: created, updated } = normalize(form.do)

    const diff = diffById(
      [...created, ...updated],
      initialDo.value,
      (a, b) =>
        a.content === b.content &&
        a.order === b.order
    )

    diff.new.forEach((dos, index) => {
      formData.append(`do[new][${index}][content]`, dos.content)
      formData.append(`do[new][${index}][order]`, String(dos.order))
    })

    diff.updated.forEach((dos, index) => {
      formData.append(`do[updated][${index}][id]`, String(dos.id))
      formData.append(`do[updated][${index}][content ]`, dos.content)
      formData.append(`do[updated][${index}][order]`, String(dos.order))
    })

    diff.deleted.forEach((id, index) => {
      formData.append(`do[deleted][${index}]`, String(id))
    })
  }

  if (form.dont) {
    const { new: created, updated } = normalize(form.dont)

    const diff = diffById(
      [...created, ...updated],
      initialDont.value,
      (a, b) =>
        a.content === b.content &&
        a.order === b.order
    )

    diff.new.forEach((donts, index) => {
      formData.append(`dont[new][${index}][content]`, donts.content)
      formData.append(`dont[new][${index}][order]`, String(donts.order))
    })

    diff.updated.forEach((donts, index) => {
      formData.append(`dont[updated][${index}][id]`, String(donts.id))
      formData.append(`dont[updated][${index}][content ]`, donts.content)
      formData.append(`dont[updated][${index}][order]`, String(donts.order))
    })

    diff.deleted.forEach((id, index) => {
      formData.append(`dont[deleted][${index}]`, String(id))
    })
  }

  if (form.faq) {
    const { new: created, updated } = normalize(form.faq)

    const diff = diffById(
      [...created, ...updated],
      initialFaq.value,
      (a, b) =>
        a.question === b.question &&
        a.answer === b.answer &&
        a.order === b.order
    )

    diff.new.forEach((faq, index) => {
      formData.append(`faq[new][${index}][question]`, faq.question)
      formData.append(`faq[new][${index}][answer]`, faq.answer)
      formData.append(`faq[new][${index}][order]`, String(faq.order))
    })

    diff.updated.forEach((faq, index) => {
      formData.append(`faq[updated][${index}][id]`, String(faq.id))
      formData.append(`faq[updated][${index}][question]`, faq.question)
      formData.append(`faq[updated][${index}][answer]`, faq.answer)
      formData.append(`faq[updated][${index}][order]`, String(faq.order))
    })

    diff.deleted.forEach((id, index) => {
      formData.append(`faq[deleted][${index}]`, String(id))
    })
  }

  if (form.gallery) {
    const { new: created, updated } = normalize(form.gallery)

    const diff = diffById(
      [...created, ...updated],
      initialGallery.value,
      (a, b) =>
        a.content === b.content &&
        a.order === b.order
    )

    diff.new.forEach((gallery, index) => {
      if (gallery.path instanceof File) {
        formData.append(`gallery[new][${index}][path]`, gallery.path)
      } else {
        return
      }
    })

    diff.updated.forEach((gallery, index) => {
      if (gallery.path instanceof File) {
        formData.append(`gallery[updated][${index}][id]`, String(gallery.id))
        formData.append(`gallery[updated][${index}][path]`, gallery.path)
      } else {
        return
      }
    })

    diff.deleted.forEach((id, index) => {
      formData.append(`gallery[deleted][${index}]`, String(id))
    })
  }
  return formData
}

const saveChanges = async () => {
  const formData = buildFormData()
  loading.value = true

  try {
    await api.post(`/api/procedure/${props.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    loading.value = false
    router.push({ name: 'dashboard.procedure' })
  } catch (error) {
    console.error('❌ Error guardando:', error)
  } finally {
    loading.value = false
  }
}

const backToIndex = () => {
  router.push({ name: 'dashboard.procedure' })
}


const editingForm = () => {
  if (!procedureResponse.value) return

  const p = procedureResponse.value

  // Campos simples
  form.title = p.title
  form.subtitle = p.subtitle
  form.status = p.status
  form.image = p.image

  form.section = (p.section ?? []).map(section => ({
    id: section.id,
    type: section.type,
    title: section.title,
    contentOne: section.contentOne,
    contentTwo: section.contentTwo,

    image: section.image,                // File futuro
    imageUrl: null // URL backend
  }))

  // preStep
  form.preStep = {
    new: [],
    updated: p.preStep ?? [],
    deleted: []
  }
  initialPreStep.value = JSON.parse(JSON.stringify(p.preStep ?? []))

  // phase
  form.phase = {
    new: [],
    updated: p.phase ?? [],
    deleted: []
  }
  initialPhase.value = JSON.parse(JSON.stringify(p.phase ?? []))

  form.do = {
    new: [],
    updated: p.do ?? [],
    deleted: []
  }
  initialDo.value = JSON.parse(JSON.stringify(p.do ?? []))

  form.dont = {
    new: [],
    updated: p.dont ?? [],
    deleted: []
  }
  initialDont.value = JSON.parse(JSON.stringify(p.dont ?? []))

  // snapshot inicial
  Object.assign(
    initialForm,
    JSON.parse(JSON.stringify(form))
  )
}

const diffById = <T extends { id?: number }>(
  current: T[],
  initial: T[],
  compare: (a: T, b: T) => boolean
) => {
  const initialMap = new Map(initial.map(i => [i.id, i]))

  return {
    updated: current.filter(c => {
      if (!c.id) return false
      const i = initialMap.get(c.id)
      return i && !compare(c, i)
    }),
    new: current.filter(c => !c.id),
    deleted: initial
      .filter(i => !current.some(c => c.id === i.id))
      .map(i => i.id)
  }
}

onMounted(async () => {
  const { data } = await api.get(`/api/procedure/${props.id}`)
  procedureResponse.value = data.data
  console.log("asd", data.data)
  if (data) {
    editingForm()
  }
})
</script>
