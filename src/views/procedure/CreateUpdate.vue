<template>
    <TabsRoot v-model="tab" class="space-y-6 p-6">
        <TabsList class="flex gap-2 rounded-xl bg-neutral-900 p-1">

            <TabsTrigger value="basic" class="
                px-4 py-2 rounded-lg text-sm font-medium transition
                data-[state=active]:bg-[#DCBE9A]
                data-[state=active]:text-neutral-900
                hover:bg-neutral-800
            ">
                Básico
            </TabsTrigger>
            <TabsTrigger value="preparation" class="
                px-4 py-2 rounded-lg text-sm font-medium transition
                data-[state=active]:bg-[#DCBE9A]
                data-[state=active]:text-neutral-900
                hover:bg-neutral-800
            ">
                Preparacion
            </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" class="space-y-6">
            <div>
                <h1>Basico...</h1>
            </div>
        </TabsContent>

        <TabsContent value="preparation">
            <div>
                <h1>Preparacion...</h1>
            </div>
        </TabsContent>

    </TabsRoot>
</template>

<script setup lang="ts">
import {
    TabsRoot,
    TabsList,
    TabsTrigger,
    TabsContent
} from 'radix-vue'
import { ref } from 'vue'

const tab = ref('basic')

</script>