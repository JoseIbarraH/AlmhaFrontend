<template>
  <div class="grid grid-cols-1 gap-4 mt-4 border-2 border-dashed rounded-md p-4 cursor-pointer"
    :class="{ 'border-blue-500 bg-blue-50': isDragging }" @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
    <input type="file" multiple accept="image/*,video/*" @change="handleFileChange" class="hidden" ref="fileInput" />

    <span v-if="carouselItems.length === 0" class="text-gray-500 col-span-full text-center">
      {{ $t('Dashboard.Design.ChooseCarouselImage.DropImage') }}
    </span>

    <!-- Contenedor scrollable -->
    <div class="max-h-[500px] overflow-y-auto space-y-4 pr-2">
      <div v-for="(item, index) in carouselItems" :key="index"
        class="relative group border rounded-md p-3 bg-white shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          <!-- Imagen / Video -->
          <div class="w-full">
            <img v-if="isImage(item.url)" :src="item.url" alt="Gallery Image"
              class="object-cover w-full h-36 rounded-md" />

            <video v-else controls class="object-cover w-full h-36 rounded-md">
              <source :src="resolveSrc(item.url)" type="video/mp4" />
              {{ $t('Dashboard.Design.ChooseCarouselImage.LabelTitle') }}
            </video>

            <CloseButton @click.stop="removeFileCarouselUpload(index)" class="top-1 left-1"
              aria-label="Eliminar archivo" />
          </div>

          <!-- Inputs -->
          <div class="w-full md:col-span-2">
            <InputLabel for="design_title" :value="$t('Dashboard.Design.ChooseCarouselImage.LabelTitle')" />
            <TextInput id="design_title" v-model="item.title" type="text" class="mt-1 block w-full"
              :placeholder="$t('Dashboard.Design.ChooseCarouselImage.LabelTitlePlaceholder')" />

            <InputLabel for="design_slogan" class="mt-2"
              :value="$t('Dashboard.Design.ChooseCarouselImage.LabelSlogan')" />
            <TextInput id="design_slogan" v-model="item.text" type="text" class="mt-1 block w-full"
              :placeholder="$t('Dashboard.Design.ChooseCarouselImage.LabelSloganPlaceholder')" />
          </div>
        </div>
      </div>
    </div>

    <!-- Botón agregar -->
    <div class="relative w-full h-full flex items-center justify-center">
      <button type="button" class="mt-2 border border-blue-500 text-blue-500 px-3 py-1 rounded"
        @click.stop="openFilePicker" aria-label="Agregar archivo">
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CloseButton from '@/components/CloseButton.vue';
import type { ChooseCarouselStaticForm, carouselUrlsInt } from '../types';
import InputLabel from '@/components/InputLabel.vue';
import TextInput from '@/components/TextInput.vue';

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const carouselItems = ref<carouselUrlsInt[]>([])

// Inicializar con lo que viene del backend
onMounted(() => {
  if (props.form.carouselUrls && Array.isArray(props.form.carouselUrls)) {
    carouselItems.value = [...props.form.carouselUrls];
  }
});

// Abrir file picker
function openFilePicker() {
  fileInput.value?.click();
}

// Drag & drop
function handleDragOver() { isDragging.value = true; }
function handleDragLeave() { isDragging.value = false; }

function handleDrop(event: DragEvent) {
  isDragging.value = false;
  if (event.dataTransfer?.files) processFiles(event.dataTransfer.files);
}

// Manejo de nuevos archivos
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) processFiles(target.files);
  target.value = '';
}

function processFiles(files: FileList) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      carouselItems.value.push({
        url: file,
        title: "",
        text: ""
      });
    }
  }
  props.form.carouselUrls = carouselItems.value;
}

// Eliminar item
function removeFileCarouselUpload(index: number) {
  carouselItems.value.splice(index, 1);
  props.form.carouselUrls = carouselItems.value;
}


</script>
