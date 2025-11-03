<template>
  <div>
    <!-- Caja de upload -->
    <div
      class="relative rounded w-full justify-center flex items-center border-2 border-spacing-1 border-dashed"
      :class="error ? 'border-red-500' : 'border-gray-300'"
      :style="{
        aspectRatio: aspectRatio
      }"
    >
      <input
        type="file"
        accept="image/*"
        class="absolute inset-0 opacity-0 cursor-pointer"
        @change="openCropper"
      />

      <!-- Si no hay imagen -->
      <span v-if="!preview" class="text-4xl text-gray-400 font-bold">+</span>

      <!-- Si hay preview -->
      <div v-else class="w-full h-full">
        <img
          :src="preview"
          alt="Preview"
          class="w-full h-full object-cover rounded"
        />
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div class="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6">
        <h3 class="text-lg font-semibold mb-4">Recortar imagen</h3>

        <!-- Cropper container con altura fija -->
        <div class="w-full h-[500px] rounded bg-gray-900 overflow-hidden">
          <VuePictureCropper
            v-if="img"
            :boxStyle="{
              width: '100%',
              height: '100%',
              backgroundColor: '#111827'
            }"
            :img="img"
            :options="cropperOptions"
          />
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-2 mt-4">
          <button
            @click="close"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            @click="confirmCrop"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

const props = defineProps<{
  aspectRatio?: number;
  outputName?: string;
  error?: boolean;
  previewUrl?: string;
}>();

const emit = defineEmits<{
  (e: "done", payload: { file: File | string; url: string }): void;
}>();

const aspectRatio = props.aspectRatio ?? 1;
const outputName = props.outputName ?? "cropped.jpg";

const img = ref<string>("");
const preview = ref<string>(props.previewUrl ?? "");
const show = ref(false);

watch(
  () => props.previewUrl,
  (newVal) => {
    preview.value = newVal ?? "";
  }
);

function openCropper(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  img.value = URL.createObjectURL(file);
  show.value = true;
}

function close() {
  img.value = "";
  show.value = false;
}

function confirmCrop() {
  if (!cropper) return;

  const url = cropper.getDataURL();

  cropper.getFile({ fileName: outputName }).then((file) => {
    if (file) {
      preview.value = url;
      emit("done", { file, url });
      close();
    }
  });
}

const cropperOptions = computed(() => ({
  viewMode: 1, // 👈 El crop box no puede salir de la imagen
  dragMode: "move",
  aspectRatio: aspectRatio,
  autoCropArea: 1,
  background: false,
  responsive: true,
  restore: false,
  center: true,
  highlight: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: false,
  zoomable: true,
  zoomOnWheel: true,
  wheelZoomRatio: 0.1,
  minContainerWidth: 100,
  minContainerHeight: 100,
  ready() {
    if (!cropper) return;

    setTimeout(() => {
      if (!cropper) return;

      const containerData = cropper.getContainerData();
      const imageData = cropper.getImageData();

      if (!containerData || !imageData) return;

      // Calcular el zoom para que la imagen se ajuste al contenedor (contain, no cover)
      const scaleX = containerData.width / imageData.naturalWidth;
      const scaleY = containerData.height / imageData.naturalHeight;

      // Usar el MENOR para que toda la imagen quepa dentro del contenedor
      const scale = Math.min(scaleX, scaleY) * 0.95;

      cropper.zoomTo(scale);

      // Centrar la imagen en el contenedor
      const canvasData = cropper.getCanvasData();
      const centerX = (containerData.width - canvasData.width) / 2;
      const centerY = (containerData.height - canvasData.height) / 2;

      cropper.setCanvasData({
        left: centerX,
        top: centerY
      });
    }, 100);
  },
  zoom(e: any) {
    if (!cropper) return;

    const imageData = cropper.getImageData();
    const cropBoxData = cropper.getCropBoxData();
    const containerData = cropper.getContainerData();

    if (!imageData || !cropBoxData || !containerData) return;

    // Zoom mínimo: la imagen debe cubrir el área de recorte
    const minZoomX = cropBoxData.width / imageData.naturalWidth;
    const minZoomY = cropBoxData.height / imageData.naturalHeight;
    const minZoom = Math.max(minZoomX, minZoomY);

    // Zoom máximo: la imagen no debe ser más grande que el contenedor
    const maxZoomX = containerData.width / imageData.naturalWidth;
    const maxZoomY = containerData.height / imageData.naturalHeight;
    const maxZoom = Math.min(maxZoomX, maxZoomY) * 2; // Permitir hasta 2x el tamaño del contenedor

    if (e.detail.ratio < minZoom) {
      e.preventDefault();
      cropper.zoomTo(minZoom);
    }

    if (e.detail.ratio > maxZoom) {
      e.preventDefault();
      cropper.zoomTo(maxZoom);
    }
  }
}));
</script>
