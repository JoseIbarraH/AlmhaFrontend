<template>
  <div class="text-center mb-8">
    <div class="flex items-center justify-center gap-4 mb-4 text-sm text-gray-600">
      <span v-if="category === 'facial'" class="px-3 py-1 bg-custom-beige text-custom-dark rounded-full font-medium">
        {{ $t('Client.Blog.Categories.Facial') }}
      </span>
      <span v-if="category === 'bodily'" class="px-3 py-1 bg-custom-beige text-custom-dark rounded-full font-medium">
        {{ $t('Client.Blog.Categories.Bodily') }}
      </span>
      <span v-if="category === 'non-surgical'"
        class="px-3 py-1 bg-custom-beige text-custom-dark rounded-full font-medium">
        {{ $t('Client.Blog.Categories.NonSurgical') }}
      </span>
      <span v-if="category === 'general'" class="px-3 py-1 bg-custom-beige text-custom-dark rounded-full font-medium">{{
        $t('Client.Blog.Categories.General') }}</span>
      <span>•</span>
      <span>{{ formatDate(created_at) }}</span>
      <span>•</span>
      <span>{{ $t('Client.Blog.View.ReadingTime') }}</span>
    </div>

    <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-custom-dark mb-20 leading-tight">
      {{ normal }}
      <span class="bg-gradient-to-br from-[#DCBE9A] to-[#202020] bg-clip-text text-transparent block">
        {{ gradient}}
      </span>
    </h1>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string
  category: string
  created_at: string
}>()

function formatDate(fecha: string | Date): string {
  const date = new Date(fecha);

  const opciones: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formateado = date.toLocaleDateString('es-ES', opciones);

  // Capitalizar la primera letra del mes
  return formateado.replace(/^\d+ de (\w)/, (match, p1) => {
    return match.replace(p1, p1.toUpperCase());
  });
}

const words = props.title.split(" ")
const half = Math.ceil(words.length / 2) // redondea hacia arriba si es impar
const normal = words.slice(0, half).join(" ")
const gradient = words.slice(half).join(" ")
</script>
