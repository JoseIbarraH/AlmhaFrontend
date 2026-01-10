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

        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Image Column -->
                <div class="lg:col-span-1">
                    <div
                        class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 h-[400px]">
                        <div class="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    </div>
                </div>

                <!-- Info Column -->
                <div class="lg:col-span-2 space-y-6">
                    <div
                        class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-6">
                        <!-- Name & Status -->
                        <div class="space-y-4">
                            <div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            <div class="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

                            <div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            <div class="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Biography Skeleton -->
                    <div
                        class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-4">
                        <div class="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        <div class="space-y-2">
                            <div class="h-4 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            <div class="h-4 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            <div class="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        </div>
                    </div>
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
    animation: shimmer 2s ease-in-out infinite;
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
