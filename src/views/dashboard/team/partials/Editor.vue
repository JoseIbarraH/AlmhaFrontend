<template>
  <div class="main-container">
    <div class="editor-container editor-container_classic-editor editor-container_include-style"
      ref="editorContainerElement">
      <div class="editor-container__editor min-h-52 max-h-52 overflow-y-auto overflow-visible">
        <ckeditor v-if="editor && config" v-model="modelValue" :editor="editor"
          :config="config" class="w-full" />
      </div>
    </div>
  </div>
</template>


<script setup>
/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdA7DArBSc4GYAMmCMBOHOAgDkzxBGxCjh0T2PrmK3RwBYR2UIBTAZxSYwwHGDHCJ4gLqR2vAGZ4AxgBNu0oA==
 */

import { computed, ref, onMounted } from 'vue';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import { useI18n } from 'vue-i18n';

const modelValue = defineModel({
  required: true
})

const { t } = useI18n();

import {
  ClassicEditor,
  Alignment,
  Autoformat,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  ShowBlocks,
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
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline
} from 'ckeditor5';

import translations from 'ckeditor5/translations/es.js';

import 'ckeditor5/ckeditor5.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL';

const isLayoutReady = ref(false);

const editor = ClassicEditor;

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }

  return {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'showBlocks',
        '|',
        /* 'heading', */
        /* 'style', */
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
        /* 'subscript',
        'superscript', */
        /* 'code', */
        'removeFormat',
        '|',
        'specialCharacters',
        'link',
        /* 'insertTable', */
        'highlight',
        'blockQuote',
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
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      /* Code, */
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      /* Heading, */
      Highlight,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      ShowBlocks,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      /* Style, */
      /* Subscript,
      Superscript, */
      /* Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar, */
      TextTransformation,
      TodoList,
      Underline
    ],
    balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
    fontFamily: {
      supportAllValues: true
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph'
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1'
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2'
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3'
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4'
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5'
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6'
        }
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
    /* initialData: props.form.biography, */
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
    placeholder: t('Dashboard.Team.CreateUpdate.PersonalInfo.Biography') ,
    style: {
      definitions: [
        {
          name: 'Article category',
          element: 'h3',
          classes: ['category']
        },
        {
          name: 'Title',
          element: 'h2',
          classes: ['document-title']
        },
        {
          name: 'Subtitle',
          element: 'h3',
          classes: ['document-subtitle']
        },
        {
          name: 'Info box',
          element: 'p',
          classes: ['info-box']
        },
        {
          name: 'CTA Link Primary',
          element: 'a',
          classes: ['button', 'button--green']
        },
        {
          name: 'CTA Link Secondary',
          element: 'a',
          classes: ['button', 'button--black']
        },
        {
          name: 'Marker',
          element: 'span',
          classes: ['marker']
        },
        {
          name: 'Spoiler',
          element: 'span',
          classes: ['spoiler']
        }
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    translations: [translations]
  };
});

onMounted(() => {
  isLayoutReady.value = true;
});
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
  min-height: 128px;
  max-height: 128px;
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

.ck {
  --ck-revision-history-sidebar-period-background: #ff5724;
  --ck-revision-history-sidebar-timeline-padding: var(--ck-spacing-large);
}

.ck {
  --ck-revision-history-loading-overlay-transition-duration: .2s;
  --ck-revision-history-loading-overlay-transition-delay: 0s;
  --ck-revision-history-loading-overlay-spinner-rotation-duration: 1s;
  --ck-revision-history-loading-overlay-spinner-size: 60px;
  --ck-revision-history-loading-overlay-visible-background: #fff;
}

.ck {
  --ck-revision-history-revision-background-color: var(--ck-color-base-background);
  --ck-revision-history-revision-border-color: #47576b;
  --ck-revision-history-revision-box-shadow: 0 1px 1px 1px #e6e6e6;
  --ck-revision-history-revision-author-icon-offset: 20px;
  --ck-revision-history-revision-transitions: background 100ms ease-in, border 100ms ease-in;
  --ck-revision-history-revision-selected-text-color: var(--ck-color-base-background);
  --ck-revision-history-revision-selected-input-text-color-empty: var(--ck-color-base-background);
  --ck-revision-history-revision-selected-background-color: var(--ck-color-base-active);
  --ck-revision-history-revision-highlighted-background-color: #e0f1ff;
  --ck-revision-history-revision-highlighted-background-color-hover: #cce7ff;
  --ck-revision-history-revision-delete-confirmation-background: #fcc;
  --ck-revision-history-revision-delete-confirmation-active-button-background: #ffb3b3;
}

.ck {
  --ck-revision-history-sidebar-revision-vertical-spacing: calc(var(--ck-spacing-standard) * 2);
}

.ck {
  --ck-revision-history-sidebar-period-background: #ff5724;
  --ck-revision-history-sidebar-timeline-padding: var(--ck-spacing-large);
}

:deep(.ck-word-count) {
  display: flex;
  gap: 10px;
  padding: 10px;
  justify-content: end;
}

::v-deep(.ck.ck-dropdown__panel .ck.ck-list) {
  max-height: 200px;
  overflow-y: auto;
}

::v-deep(.ck.ck-dropdown__panel .ck.ck-list .ck.ck-button__label) {
  font-size: 14px !important;
}
</style>
