<template>
  <div class="main-container">
    <div
      class="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar editor-container_include-word-count editor-container_include-fullscreen"
      ref="editorContainerElement">
      <div class="editor-container__editor">
        <div ref="editorElement">
          <ckeditor
            v-if="editor && config"
            v-model="content"
            :editor="editor"
            :config="config"
            @ready="onReady"
          />
        </div>
      </div>
      <div class="editor_container__word-count dark" ref="editorWordCountElement"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useTemplateRef, watch, computed, type Ref } from 'vue';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';

import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  Bookmark,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  Fullscreen,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  PlainTableOutput,
  RemoveFormat,
  ShowBlocks,
  SimpleUploadAdapter,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableLayout,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  WordCount,
  type EditorConfig
} from 'ckeditor5';

import translations from 'ckeditor5/translations/es.js';
import 'ckeditor5/ckeditor5.css';
import { api } from '@/plugins/api';

// Adapter personalizado para upload de imágenes
class MyUploadAdapter {
  loader: any;
  blogId: string | number;
  onImageUploaded: (url: string) => void;

  constructor(loader: any, blogId: string | number, onImageUploaded: (url: string) => void) {
    this.loader = loader;
    this.blogId = blogId;
    this.onImageUploaded = onImageUploaded;
  }

  upload() {
    return this.loader.file.then((file: File) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('upload', file);
        const token = localStorage.getItem('auth_token');

        api.post(`/api/blog/upload_image/${this.blogId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        })
          .then(response => {
            const imageUrl = response.data.url;
            this.onImageUploaded(imageUrl);
            resolve({ default: imageUrl });
          })
          .catch(error => {
            reject(error.response?.data?.message || 'Error al subir la imagen');
          });
      });
    });
  }

  abort() { }
}

// Props
const props = defineProps<{
  id: number | string;
}>();

// defineModel para v-model reactivo
const content = defineModel<string>({ required: true, default: '' });

const editor = ClassicEditor;
const uploadedImages = ref<string[]>([]);
const initialImages = ref<string[]>([]);
const isLayoutReady: Ref<boolean> = ref(false);
const editorWordCount = useTemplateRef<HTMLDivElement>('editorWordCountElement');

const LICENSE_KEY = 'GPL';

// Extraer URLs de imágenes del HTML
const extractImageUrls = (html: string): string[] => {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll('img');
  return Array.from(images).map(img => img.src);
};

// Guardar imágenes iniciales al montar
watch(content, (newValue) => {
  if (initialImages.value.length === 0 && newValue) {
    initialImages.value = extractImageUrls(newValue);
  }
}, { immediate: true });

// Detectar imágenes eliminadas y eliminarlas del servidor
watch(content, (newValue, oldValue) => {
  // No hacer nada si no hay contenido previo (primera carga)
  if (!oldValue || oldValue.trim() === '') return;

  const currentImages = extractImageUrls(newValue);
  const previousImages = extractImageUrls(oldValue);

  // Solo proceder si había imágenes antes
  if (previousImages.length === 0) return;

  // Encontrar imágenes que fueron eliminadas (estaban antes, ahora no)
  const deletedImages = previousImages.filter(url => !currentImages.includes(url));

  // NO eliminar si no hay imágenes eliminadas
  if (deletedImages.length === 0) return;

  // Eliminar solo las que fueron subidas en esta sesión o las iniciales
  const imagesToDelete = deletedImages.filter(url =>
    uploadedImages.value.includes(url) || initialImages.value.includes(url)
  );

  if (imagesToDelete.length > 0) {
    console.log('🗑️ Imágenes detectadas para eliminar:', imagesToDelete);
    deleteImagesFromServer(imagesToDelete);
  }
});

// Registrar imagen subida
const handleImageUploaded = (url: string) => {
  uploadedImages.value.push(url);
};

// Eliminar imágenes del servidor
const deleteImagesFromServer = async (imageUrls: string[]) => {
  for (const url of imageUrls) {
    try {
      await api.delete(`/api/blog/delete_image/${props.id}`, {
        data: {
          url: url,
          blog_id: props.id
        }
      });

      // Solo remover de los arrays si se eliminó exitosamente
      uploadedImages.value = uploadedImages.value.filter(img => img !== url);
      initialImages.value = initialImages.value.filter(img => img !== url);

      console.log('✅ Imagen eliminada del servidor:', url);
    } catch (error: any) {
      // Si es 422, la imagen probablemente no existe en el servidor
      if (error.response?.status === 422) {
        console.warn('⚠️ La imagen no existe en el servidor:', url);
        // Aún así la removemos de los arrays locales
        uploadedImages.value = uploadedImages.value.filter(img => img !== url);
        initialImages.value = initialImages.value.filter(img => img !== url);
      } else if (error.response?.status === 404) {
        console.warn('⚠️ Imagen no encontrada:', url);
        uploadedImages.value = uploadedImages.value.filter(img => img !== url);
        initialImages.value = initialImages.value.filter(img => img !== url);
      } else {
        console.error('❌ Error al eliminar imagen:', error.response?.data || error.message);
      }
    }
  }
};

// Configuración del editor
const config = computed<EditorConfig | null>(() => {
  if (!isLayoutReady.value) return null;

  return {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'sourceEditing',
        'showBlocks',
        'findAndReplace',
        'textPartLanguage',
        'fullscreen',
        '|',
        'heading',
        'style',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript',
        'code',
        'removeFormat',
        '|',
        'specialCharacters',
        'horizontalLine',
        'link',
        'bookmark',
        'insertImage',
        'insertImageViaUrl',
        'mediaEmbed',
        'insertTable',
        'insertTableLayout',
        'highlight',
        'blockQuote',
        'codeBlock',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent'
      ],
      shouldNotGroupWhenFull: false
    },
    plugins: [
      Alignment,
      Autoformat,
      AutoImage,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      BlockToolbar,
      Bold,
      Bookmark,
      Code,
      CodeBlock,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      FullPage,
      Fullscreen,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Paragraph,
      PasteFromOffice,
      PlainTableOutput,
      RemoveFormat,
      ShowBlocks,
      SimpleUploadAdapter,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableLayout,
      TableProperties,
      TableToolbar,
      TextPartLanguage,
      TextTransformation,
      TodoList,
      Underline,
      WordCount
    ],
    balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
    blockToolbar: [
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      '|',
      'link',
      'insertImage',
      'insertTable',
      'insertTableLayout',
      '|',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent'
    ],
    fontFamily: {
      supportAllValues: true
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40],
      supportAllValues: true
    },
    fullscreen: {
      onEnterCallback: (container: HTMLElement) =>
        container.classList.add(
          'editor-container',
          'editor-container_classic-editor',
          'editor-container_include-style',
          'editor-container_include-block-toolbar',
          'editor-container_include-word-count',
          'editor-container_include-fullscreen',
          'main-container'
        )
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
      ]
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true
        }
      ]
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage'
      ]
    },
    initialData: '',
    language: 'es',
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    menuBar: {
      isVisible: true
    },
    placeholder: 'Type or paste your content here!',
    style: {
      definitions: [
        { name: 'Article category', element: 'h3', classes: ['category'] },
        { name: 'Title', element: 'h2', classes: ['document-title'] },
        { name: 'Subtitle', element: 'h3', classes: ['document-subtitle'] },
        { name: 'Info box', element: 'p', classes: ['info-box'] },
        { name: 'CTA Link Primary', element: 'a', classes: ['button', 'button--green'] },
        { name: 'CTA Link Secondary', element: 'a', classes: ['button', 'button--black'] },
        { name: 'Marker', element: 'span', classes: ['marker'] },
        { name: 'Spoiler', element: 'span', classes: ['spoiler'] }
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    translations: [translations],
    extraPlugins: [
      function (editorInstance: any) {
        editorInstance.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
          return new MyUploadAdapter(loader, props.id, handleImageUploaded);
        };
      }
    ]
  };
});

onMounted(() => {
  isLayoutReady.value = true;
});

function onReady(editor: any) {
  if (!editorWordCount.value) return;

  [...editorWordCount.value.children].forEach(child => child.remove());

  const wordCount = editor.plugins.get('WordCount');
  editorWordCount.value.appendChild(wordCount.wordCountContainer);
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald&family=PT+Serif:ital,wght@0,400;0,700;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');

@media print {
  body {
    margin: 0 !important;
  }
}

:root {
  --ck-color-base-text: #333;
  --ck-content-font-family: 'Lato';
  --ck-spacing-unit: 0.6em;
  --ck-font-size-base: 13px;
  --ck-line-height-base: 1.84615;
  --ck-font-face: Helvetica, Arial, Tahoma, Verdana, Sans-Serif;
  --ck-color-text: var(--ck-color-base-text);
  --ck-spacing-small: calc(var(--ck-spacing-unit) * 0.5);
  --ck-spacing-standard: var(--ck-spacing-unit);
  --ck-spacing-large: calc(var(--ck-spacing-unit) * 1.5);
}

.ck-reset_all :not(.ck-reset_all-excluded *),
.ck.ck-reset,
.ck.ck-reset_all {
  word-wrap: break-word;
  background: transparent;
  border: 0;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  position: static;
  text-decoration: none;
  transition: none;
  vertical-align: middle;
  width: auto;
}

.main-container {
  font-family: var(--ck-content-font-family);
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.editor-container_classic-editor .editor-container__editor {
  width: 100%;
}

.ck-content h3.category {
  font-family: 'Oswald';
  font-size: 20px;
  font-weight: bold;
  color: #555;
  letter-spacing: 10px;
  margin: 0;
  padding: 0;
}

.ck-content h2.document-title {
  font-family: 'Oswald';
  font-size: 50px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  border: 0;
}

.ck-content h3.document-subtitle {
  font-family: 'Oswald';
  font-size: 20px;
  color: #555;
  margin: 0 0 1em;
  font-weight: bold;
  padding: 0;
}

.ck-content p.info-box {
  --background-size: 30px;
  --background-color: #e91e63;
  padding: 1.2em 2em;
  border: 1px solid var(--background-color);
  background:
    linear-gradient(135deg, var(--background-color) 0%, var(--background-color) var(--background-size), transparent var(--background-size)),
    linear-gradient(135deg,
      transparent calc(100% - var(--background-size)),
      var(--background-color) calc(100% - var(--background-size)),
      var(--background-color));
  border-radius: 10px;
  margin: 1.5em 2em;
  box-shadow: 5px 5px 0 #ffe6ef;
}

.ck-content span.marker {
  background: yellow;
}

.ck-content span.spoiler {
  background: #000;
  color: #000;
}

.ck-content span.spoiler:hover {
  background: #000;
  color: #fff;
}

.ck-content .button {
  display: inline-block;
  width: 260px;
  border-radius: 8px;
  margin: 0 auto;
  padding: 12px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
}

.ck-content .button--green {
  background-color: #406b1e;
}

.ck-content .button--black {
  background-color: #141517;
}

.editor_container__word-count .ck-word-count {
  color: var(--ck-color-text);
  display: flex;
  height: 20px;
  gap: var(--ck-spacing-small);
  justify-content: flex-end;
  font-size: var(--ck-font-size-base);
  line-height: var(--ck-line-height-base);
  font-family: var(--ck-font-face);
  padding: var(--ck-spacing-small) var(--ck-spacing-standard);
}

/* .dark .editor_container__word-count .ck-word-count {
  color: red
} */


.editor-container_include-word-count.editor-container_classic-editor .editor_container__word-count {
  border: 1px solid var(--ck-color-base-border);
  border-radius: var(--ck-border-radius);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: none;
}

.editor-container_include-word-count.editor-container_classic-editor .editor-container__editor .ck-editor .ck-editor__editable {
  border-radius: 0;
}

:deep(.ck-word-count) {
  display: flex;
  gap: 10px;
  padding: 10px;
  justify-content: end;
}

.dark :deep(.ck-word-count) {
  color: #d1d5db !important; /* texto gris claro */
}

:deep(.ck.ck-dropdown__panel .ck.ck-list) {
  max-height: 200px;
  overflow-y: auto;
}

:deep(.ck.ck-dropdown__panel .ck.ck-list .ck.ck-button__label) {
  font-size: 14px !important;
}
</style>
