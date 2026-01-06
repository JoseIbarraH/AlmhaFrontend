<template>
  <section class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900">Comunicación</h2>
      <p class="text-sm text-gray-500 mt-1">Información de contacto para tus visitantes</p>
    </div>
    <div class="px-6 py-6 space-y-5">
      <!-- Phone -->
      <div>
        <InputLabel for="phone" class="block text-sm font-medium text-gray-700 mb-2" value="Teléfono" />
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LucidePhone class="h-5 w-5 text-gray-400" />
          </div>
          <TextInput type="tel" id="phone" v-model="model.contact_phone" placeholder="+34 123 456 789"
            class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
      </div>

      <!-- Email -->
      <div>
        <InputLabel for="email" class="block text-sm font-medium text-gray-700 mb-2" value="Correo electrónico" />
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LucideMail class="h-5 w-5 text-gray-400" />
          </div>
          <TextInput type="email" id="email" v-model="model.contact_email" placeholder="contacto@empresa.com"
            class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
      </div>

      <!-- Location -->
      <div>
        <InputLabel for="location" class="block text-sm font-medium text-gray-700 mb-2" value="Ubicación" />
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LucideMapPin class="h-5 w-5 text-gray-400" />
          </div>
          <TextInput type="text" id="location" v-model="model.contact_location" placeholder="Madrid, España"
            class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InputLabel from '@/components/ui/InputLabel.vue';
import TextInput from '@/components/ui/TextInput.vue';
import { LucideMail, LucideMapPin, LucidePhone } from 'lucide-vue-next';
import type { Contact } from '../types';

const model = defineModel<Contact>({ required: true })

</script>
