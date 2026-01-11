<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8 flex justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t('Dashboard.Setting.SettingPage.Title') }}
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">{{ $t('Dashboard.Setting.SettingPage.Subtitle') }}</p>
        </div>
        <div>
          <div class="flex justify-end gap-3">
            <button type="button" @click="cancelChanges" :hidden="!hasChanged"
              class="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700">
              {{ $t('Dashboard.Setting.SettingPage.Restore') }}
            </button>
            <PrimaryButton type="button" @click="saveChanges" :disabled="!hasChanged"
              class="px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
              {{ $t('Dashboard.Setting.SettingPage.Save') }}
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div>
        <Communication v-model="form.contact" />
      </div>

      <div>
        <SocialMedia v-model="form.social" />
      </div>

      <div>
        <Maintenance v-model="form.system" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/plugins/api';
import Communication from './partials/Communication.vue';
import Maintenance from './partials/Maintenance.vue';
import SocialMedia from './partials/SocialMedia.vue';
import { computed, onMounted, reactive } from 'vue';
import type { ApiResponse } from '@/types/apiResponse';
import type { Contact, Settings, Social, System } from './types';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import { showNotification } from '@/components/composables/useNotification';
import { useAuthStore } from '@/stores/authStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const auth = useAuthStore()

const form = reactive<{
  contact: Contact;
  social: Social;
  system: System;
}>({
  contact: {
    contact_phone: '',
    contact_email: '',
    contact_location: ''
  },
  social: {
    social_facebook: '',
    social_instagram: '',
    social_linkedin: '',
    social_threads: '',
    social_twitter: ''
  },
  system: {
    is_maintenance_mode: false
  }
});

const formInitial = reactive<{
  contact: Contact;
  social: Social;
  system: System;
}>({
  contact: {
    contact_phone: '',
    contact_email: '',
    contact_location: ''
  },
  social: {
    social_facebook: '',
    social_instagram: '',
    social_linkedin: '',
    social_threads: '',
    social_twitter: ''
  },
  system: {
    is_maintenance_mode: false
  }
});

// Computed para detectar cambios comparando valores profundos
const hasChanged = computed(() => {
  return JSON.stringify(form) !== JSON.stringify(formInitial);
});

const fetchSettings = async () => {
  try {
    const { data } = await api.get<ApiResponse<Settings>>('api/settings')
    if (data.data) {
      syncForm(data.data);
      // Copia profunda para evitar referencias compartidas
      syncFormInitial(data.data);
    }
    console.log('Settings Data: ', data)
  } catch (error) {
    console.error('Error al obtener Settings: ', error)
  }
}

const syncForm = (settings: Settings) => {
  // COMMUNICATION
  if (settings.contact) {
    form.contact.contact_phone = settings.contact.contact_phone ?? '';
    form.contact.contact_email = settings.contact.contact_email ?? '';
    form.contact.contact_location = settings.contact.contact_location ?? '';
  }

  // SOCIAL MEDIA
  if (settings.social) {
    form.social.social_facebook = settings.social.social_facebook ?? '';
    form.social.social_instagram = settings.social.social_instagram ?? '';
    form.social.social_linkedin = settings.social.social_linkedin ?? '';
    form.social.social_threads = settings.social.social_threads ?? '';
    form.social.social_twitter = settings.social.social_twitter ?? '';
  }

  // SYSTEM / MAINTENANCE
  if (settings.system) {
    form.system.is_maintenance_mode = Boolean(settings.system.is_maintenance_mode);
  }
};

const syncFormInitial = (settings: Settings) => {
  // COMMUNICATION
  if (settings.contact) {
    formInitial.contact.contact_phone = settings.contact.contact_phone ?? '';
    formInitial.contact.contact_email = settings.contact.contact_email ?? '';
    formInitial.contact.contact_location = settings.contact.contact_location ?? '';
  }

  // SOCIAL MEDIA
  if (settings.social) {
    formInitial.social.social_facebook = settings.social.social_facebook ?? '';
    formInitial.social.social_instagram = settings.social.social_instagram ?? '';
    formInitial.social.social_linkedin = settings.social.social_linkedin ?? '';
    formInitial.social.social_threads = settings.social.social_threads ?? '';
    formInitial.social.social_twitter = settings.social.social_twitter ?? '';
  }

  // SYSTEM / MAINTENANCE
  if (settings.system) {
    formInitial.system.is_maintenance_mode = Boolean(settings.system.is_maintenance_mode);
  }
};

const saveChanges = async () => {
  if (!hasChanged.value) return;
  if (!auth.can('page_settings')) return
  try {
    await api.put('api/settings', form);

    syncFormInitial({
      contact: form.contact,
      social: form.social,
      system: form.system
    });

    showNotification('success', t('Dashboard.Setting.SettingPage.Validations.Success'), 3000)
  } catch (error) {
    console.error('Error al guardar:', error);
    showNotification('error', t('Dashboard.Setting.SettingPage.Validations.Error'), 4000)
  }
}

const cancelChanges = () => {
  syncForm({
    contact: formInitial.contact,
    social: formInitial.social,
    system: formInitial.system
  });
}

onMounted(() => {
  fetchSettings()
})
</script>
