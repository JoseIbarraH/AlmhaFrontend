<template>
  <section>
    <TeamTitle />
  </section>

  <section class="bg-gradient-to-br from-[#F8F7F4] via-[#FFFFFF] to-[#F5F1EA]">
    <div class="p-6 rounded-lg flex justify-center items-center">
      <Search v-model="search" @search="doSearch" :text="$t('Client.Team.List.Search')" class="w-96" />
    </div>

    <!-- <TeamGrid :data="paginate.data" :filters="filters" :links="paginate.links" /> -->

    <div class="flex items-center justify-center gap-4 my-6">
      <div class="w-24 h-[1px] bg-gradient-to-r from-transparent to-[#DCBE9A]/50"></div>
      <div class="w-3 h-3 border-2 border-[#DCBE9A]/50 rounded-full"></div>
      <div class="w-24 h-[1px] bg-gradient-to-l from-transparent to-[#DCBE9A]/50"></div>
    </div>

    <!-- <div v-if="paginate.links.length > 3" class="w-full flex items-center justify-center pb-6">
      <Pagination :links="paginate.links" :last_page="paginate.last_page" :current_page="paginate.current_page"
        :filters="props.filters" />
    </div> -->

    <div
      class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DCBE9A]/30 to-transparent">
    </div>
  </section>

  <section>
    <Consultation />
  </section>
</template>

<script setup lang="ts">
import Consultation from '@/components/Consultation.vue';
import type { PaginatedResponse, Data, Filters } from './type';
import Pagination from '@/components/Pagination.vue';
import TeamTitle from './Partials/TeamTitle.vue';
import TeamGrid from './Partials/TeamGrid.vue';
import Search from '@/components/Search.vue';
import { onMounted, ref } from 'vue';


const props = defineProps<{
  paginate?: PaginatedResponse<Data>
  filters: Filters
}>()

const search = ref(props.filters?.search || '')

const doSearch = (value?: string) => {

}

onMounted(() => {
  console.log('props', props.paginate)
})

</script>
