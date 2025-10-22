<template>
  <div
    class="grid grid-cols-1 gap-4 mt-4 border-2 border-dashed rounded-md p-4 cursor-pointer"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <input
      type="file"
      multiple
      accept="image/*,video/*"
      @change="handleFileChange"
      class="hidden"
      ref="fileInput"
    />

    <span v-if="form.carouselNavbar.length === 0" class="text-gray-500 col-span-full text-center">
      Arrastra y suelta imágenes aquí, o haz clic para seleccionarlas
    </span>

    <div class="grid grid-cols-1 md:grid-cols-3 max-h-[500px] overflow-y-auto gap-2 pr-2">
      <div
        v-for="(item, index) in form.carouselNavbar"
        :key="index"
        class="relative group border rounded-md"
      >
        <img
          v-if="isImage(item.image)"
          :src="resolveSrc(item.image)"
          alt="Gallery Image"
          class="object-cover w-full h-36 rounded-md"
        />

        <video v-else controls class="object-cover w-full h-36 rounded-md">
          <source :src="resolveSrc(item.image)" type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>

        <CloseButton
          @click.stop="removeFileCarouselUpload(index)"
          class="left-1 top-1"
          aria-label="Eliminar archivo"
        />
      </div>

      <!-- Botón para agregar más -->
      <div class="relative w-full h-full flex items-center justify-center">
        <button
          type="button"
          class="border border-blue-500 text-blue-500 px-3 py-1 rounded"
          @click.stop="openFilePicker"
          aria-label="Agregar archivo"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import CloseButton from '@/components/CloseButton.vue'

interface ChooseCarouselNavbar {
  image: string | File
  title?: string
  subtitle?: string
}

// 🔹 Estado reactivo
const form = reactive({
  carouselNavbar: [] as ChooseCarouselNavbar[],
})

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

// 🔹 Cargar datos desde la API
/* onMounted(async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_DASHBOARD + "/design/carouselNavbar")
    const data = await res.json()

    // Asegurar que los datos sean del tipo esperado
    if (Array.isArray(data)) {
      form.carouselNavbar = data.map((item: any) => ({
        image: item.image,
        title: item.title ?? '',
        subtitle: item.subtitle ?? '',
      }))
    }
  } catch (error) {
    console.error('Error al cargar datos del carrusel:', error)
  }
}) */

// 🔹 Drag & Drop
function handleDragOver() {
  isDragging.value = true
}
function handleDragLeave() {
  isDragging.value = false
}
function handleDrop(event: DragEvent) {
  isDragging.value = false
  if (event.dataTransfer?.files) processFiles(event.dataTransfer.files)
}

// 🔹 Manejadores de archivos
function openFilePicker() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) processFiles(target.files)
  target.value = '' // limpiar el input
}

function processFiles(files: FileList) {
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)
    if (!file) continue

    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      form.carouselNavbar.push({ image: file })
    }
  }
}

function removeFileCarouselUpload(index: number) {
  form.carouselNavbar.splice(index, 1)
}

// 🔹 Helpers
function isImage(file: string | File) {
  if (typeof file === 'string') return file.match(/\.(jpeg|jpg|png|gif|webp)$/i)
  return file.type.startsWith('image/')
}

function resolveSrc(file: string | File) {
  return typeof file === 'string' ? file : URL.createObjectURL(file)
}
</script>
