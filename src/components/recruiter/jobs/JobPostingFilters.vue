<template>
  <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 shadow-sm flex flex-col md:flex-row gap-4 items-center">
    <!-- Search -->
    <div class="relative flex-1 w-full">
      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
      <input
        :value="search"
        class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-primary/20 focus:border-primary"
        placeholder="Tìm kiếm tin tuyển dụng theo tên..."
        type="text"
        @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Tabs -->
    <div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
        :class="filter === tab.value
          ? 'bg-white dark:bg-slate-700 shadow-sm text-primary font-bold'
          : 'text-slate-600 dark:text-slate-400 hover:text-primary'"
        @click="$emit('update:filter', tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
export type FilterStatus = 'all' | 'published' | 'pending' | 'paused' | 'expired' | 'closed' | 'draft' | 'rejected'

defineProps<{
  search: string
  filter: FilterStatus
}>()

defineEmits<{
  'update:search': [value: string]
  'update:filter': [value: FilterStatus]
}>()

const tabs: { label: string; value: FilterStatus }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang tuyển', value: 'published' },
  { label: 'Chờ duyệt', value: 'pending' },
  { label: 'Tạm dừng', value: 'paused' },
  { label: 'Hết hạn', value: 'expired' },
]
</script>
