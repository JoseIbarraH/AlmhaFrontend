<template>
    <div class="space-y-6">
        <!-- Header skeleton -->
        <div
            class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 w-full h-[88px] dark:shadow-xl">
            <div class="h-7 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <div class="h-10 w-24 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div class="h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
        </div>

        <!-- Content skeleton -->
        <div class="max-w-6xl mx-auto space-y-6">
            <div
                class="bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <!-- Blog info header skeleton -->
                <div
                    class="bg-accent/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 h-[60px] flex items-center">
                    <div class="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>

                <!-- Inputs skeleton -->
                <div class="p-6 md:p-8 space-y-6">
                    <!-- Title -->
                    <div class="space-y-2">
                        <div class="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        <div class="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    </div>

                    <!-- Grid -->
                    <div class="grid md:grid-cols-2 gap-6 w-full">
                        <div class="space-y-2">
                            <div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            <div class="flex gap-3">
                                <div class="h-10 flex-1 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                <div class="h-[42px] w-[42px] rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse">
                                </div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            <div class="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Image -->
                    <div class="space-y-2">
                        <div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        <div class="h-48 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    </div>
                </div>

                <!-- Editor header -->
                <div
                    class="bg-accent/30 px-6 py-4 border-y border-gray-200 dark:border-gray-700 dark:bg-gray-900 h-[60px] flex items-center">
                    <div class="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>

                <!-- Editor body -->
                <div class="p-4">
                    <div class="h-64 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
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
