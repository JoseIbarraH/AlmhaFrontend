<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b
            border-gray-200 bg-white/70 backdrop-blur
            dark:border-gray-700 dark:bg-gray-800/50">

      <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {{ $t('Dashboard.Setting.Audit.List.Title') }}
      </h2>

      <!-- ⭐ Input de búsqueda manual -->
      <Search v-model="localSearch" :placeholder="$t('Dashboard.Setting.Audit.List.Search')" @search="handleSearch" />
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Audit.List.User') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Audit.List.Model') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Audit.List.Action') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Audit.List.Date') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Audit.List.IpAddress') }}
            </th>
            <th class="text-left px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('Dashboard.Setting.Audit.List.Details') }}
            </th>
          </tr>
        </thead>

        <tbody v-if="data.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
          <template v-for="(value, index) in data" :key="index">
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.user_name || 'N/A' }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{
                  formatAuditableType(value.auditable_type) || 'N/A' }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.event }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.created_at }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ value.ip_address }}</p>
              </td>
              <td @click="toggleRow(index)" class="px-6 py-4 cursor-pointer">
                <div
                  class="mx-auto text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  <LucideChevronDown v-if="openRow !== index" class="h-5 w-5" />
                  <LucideChevronUp v-else class="h-5 w-5" />
                </div>
              </td>
            </tr>

            <!-- Fila expandida (sin cambios) -->
            <tr v-if="openRow === index" class="bg-gray-50 dark:bg-gray-800/50">
              <td colspan="6" class="px-6 py-6">
                <div class="space-y-6">
                  <!-- Información del Usuario -->
                  <div class="bg-white dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <LucideUser class="h-4 w-4" />
                      {{ $t('Dashboard.Setting.Audit.List.Expand.UserInfo.Title') }}
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span
                          class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.UserInfo.Id') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">{{ value.user_id }}</span>
                      </div>
                      <div>
                        <span
                          class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.UserInfo.Name') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">
                          {{ value.user_name }}</span>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.UserInfo.Type') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">
                          {{ formatAuditableType(value.user_type) || 'N/A' }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Información del Evento -->
                  <div class="bg-white dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <LucideActivity class="h-4 w-4" />
                      {{ $t('Dashboard.Setting.Audit.List.Expand.EventDetails.Title') }}
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.EventDetails.Event') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">{{ value.event }}</span>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.EventDetails.AuditableType') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">
                          {{ formatAuditableType(value.auditable_type) || 'N/A' }}
                        </span>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.EventDetails.AuditableId') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">{{ value.auditable_id }}</span>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.EventDetails.Tags') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">{{ value.tags || 'N/A' }}</span>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.EventDetails.CreatedAt') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">{{ value.created_at }}</span>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.EventDetails.UpdatedAt') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">{{ value.updated_at }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Información de Conexión -->
                  <div class="bg-white dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <LucideGlobe class="h-4 w-4" />
                      {{ $t('Dashboard.Setting.Audit.List.Expand.ConectionInfo.Title') }}
                    </h3>
                    <div class="space-y-2 text-sm">
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.ConectionInfo.Ip') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">{{ value.ip_address }}</span>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.ConectionInfo.URL') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium break-all">{{ value.url }}</span>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">{{ $t('Dashboard.Setting.Audit.List.Expand.ConectionInfo.UserAgent') }}</span>
                        <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium break-all">
                          {{ value.user_agent || 'N/A' }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Valores Anteriores (Expandible) -->
                  <div v-if="value.old_values && Object.keys(value.old_values).length > 0"
                    class="bg-white dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">

                    <button @click="toggleSection(index, 'old')"
                      class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors">
                      <h3 class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <LucideFileText class="h-4 w-4" />
                        {{ $t('Dashboard.Setting.Audit.List.Expand.PreviousValues') }}
                        <span v-if="!value.old_values" class="text-xs font-normal text-gray-500 dark:text-gray-400">(Sin datos)</span>
                      </h3>

                      <LucideChevronDown v-if="!expandedSections[`${index}-old`]"
                        class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <LucideChevronUp v-else class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>

                    <div v-if="expandedSections[`${index}-old`] && value.old_values"
                      class="px-4 py-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">

                      <div class="text-xs text-gray-700 dark:text-gray-300 p-3 bg-white dark:bg-gray-900/50
                        rounded border border-gray-200 dark:border-gray-700
                        whitespace-pre-wrap break-words space-y-2
                        max-h-40 overflow-y-auto min-w-fit">

                        <div v-for="(val, key) in stripHtml(value.old_values)" :key="key">
                          <p class="font-semibold">{{ key }}:</p>
                          <p class="ml-2">{{ val }}</p>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div v-if="value.new_values && Object.keys(value.new_values).length > 0"
                    class="bg-white dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">

                    <button @click="toggleSection(index, 'new')"
                      class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors">
                      <h3 class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <LucideFileText class="h-4 w-4" />
                        {{ $t('Dashboard.Setting.Audit.List.Expand.NewValues') }}
                        <span v-if="!value.new_values" class="text-xs font-normal text-gray-500 dark:text-gray-400">(Sin datos)</span>
                      </h3>

                      <LucideChevronDown v-if="!expandedSections[`${index}-new`]"
                        class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <LucideChevronUp v-else class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>

                    <div v-if="expandedSections[`${index}-new`] && value.new_values"
                      class="px-4 py-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">

                      <div class="text-xs text-gray-700 dark:text-gray-300 p-3 bg-white dark:bg-gray-900/50
                        rounded border border-gray-200 dark:border-gray-700
                        whitespace-pre-wrap break-words space-y-2
                        max-h-40 overflow-y-auto min-w-fit">

                        <div v-for="(val, key) in stripHtml(value.new_values)" :key="key">
                          <p class="font-semibold">{{ key }}:</p>
                          <p class="ml-2">{{ val }}</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="6" class="px-6 py-12 text-center">
              <div class="flex flex-col items-center gap-2">
                <LucideSearch class="h-12 w-12 text-gray-400" />
                <p class="text-gray-500 dark:text-gray-400">No se encontraron registros</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '@/components/ui/Search.vue';
import type { Data } from '../types'
import { ref } from 'vue'
import {
  LucideChevronDown,
  LucideChevronUp,
  LucideSearch,
  LucideUser,
  LucideActivity,
  LucideGlobe,
  LucideFileText
} from 'lucide-vue-next'

defineProps<{
  data: Data[]
}>()

const emit = defineEmits<{
  'refresh-requested': []
  'search': [search: string] // ⭐ Nuevo evento
}>()

const localSearch = ref('')
const expandedSections = ref<Record<string, boolean>>({})
const openRow = ref<number | null>(null)

const handleSearch = (search: string) => {
  emit('search', search)
}

const toggleSection = (index: number, type: 'old' | 'new') => {
  const key = `${index}-${type}`
  expandedSections.value[key] = !expandedSections.value[key]
}

const toggleRow = (i: number) => {
  openRow.value = openRow.value === i ? null : i
}

const formatAuditableType = (text: string | null | undefined) => {
  if (!text) return '';
  return text.replace('App\\Models\\', '');
}

const stripHtml = (value: any): any => {
  if (typeof value === "string") {
    const temp = document.createElement("div")
    temp.innerHTML = value
    return temp.textContent || temp.innerText || ""
  }

  if (Array.isArray(value)) {
    return value.map(v => stripHtml(v))
  }

  if (typeof value === "object" && value !== null) {
    const cleaned: any = {}
    for (const key in value) {
      cleaned[key] = stripHtml(value[key])
    }
    return cleaned
  }

  return value
}
</script>
