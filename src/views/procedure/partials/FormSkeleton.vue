<template>
    <div class="space-y-6">
        <!-- Header skeleton -->
        <div
            class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full h-[88px]">
            <div class="h-7 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <div class="h-10 w-24 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div class="h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
        </div>

        <div class="space-y-6 max-w-6xl mx-auto">
            <!-- Tabs List Skeleton -->
            <div
                class="flex flex-wrap gap-2 rounded-xl bg-white p-1 w-full justify-center sm:justify-start lg:justify-center dark:bg-gray-800 h-[52px]">
                <div v-for="n in 6" :key="n" class="h-9 w-24 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse">
                </div>
            </div>

            <!-- Tab Content Skeleton (Basic Info) -->
            <div
                class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-6">
                <div class="space-y-4">
                    <div class="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    <div class="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        <div class="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    </div>
                    <div class="space-y-4">
                        <div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        <div class="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    <div class="h-48 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-gray-200,
.dark\:bg-gray-700 {
    position: relative;
    overflow: hidden;
    background: linear-gradient(90deg,
            #e5e7eb 0%,
            #f3f4f6 50%,
            #e5e7eb 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.dark .dark\:bg-gray-700 {
    background: linear-gradient(90deg,
            #374151 0%,
            #4b5563 50%,
            #374151 100%);
    background-size: 200% 100%;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}
</style>
