<template>
  <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
    <!-- Search row -->
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
        <input
          :value="search"
          class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 transition-all"
          placeholder="Tìm kiếm theo tên vị trí tuyển dụng..."
          type="text"
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <!-- Status filter chips -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer"
        :class="filter === tab.value
          ? tab.activeClass
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'"
        @click="$emit('update:filter', tab.value)"
      >
        <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
export type FilterStatus = 'all' | 'published' | 'pending_approval' | 'paused' | 'expired' | 'closed' | 'draft' | 'rejected'

defineProps<{
  search: string
  filter: FilterStatus
}>()

defineEmits<{
  'update:search': [value: string]
  'update:filter': [value: FilterStatus]
}>()

const tabs: { label: string; value: FilterStatus; icon: string; activeClass: string }[] = [
  { label: 'Tất cả',      value: 'all',              icon: 'list',          activeClass: 'bg-slate-800 text-white shadow-md' },
  { label: 'Đang tuyển',  value: 'published',        icon: 'check_circle',  activeClass: 'bg-emerald-500 text-white shadow-md shadow-emerald-200' },
  { label: 'Chờ duyệt',   value: 'pending_approval', icon: 'schedule',      activeClass: 'bg-amber-500 text-white shadow-md shadow-amber-200' },
  { label: 'Tạm dừng',    value: 'paused',           icon: 'pause_circle',  activeClass: 'bg-orange-500 text-white shadow-md shadow-orange-200' },
  { label: 'Đã đóng',     value: 'closed',           icon: 'lock',          activeClass: 'bg-indigo-500 text-white shadow-md shadow-indigo-200' },
  { label: 'Hết hạn',     value: 'expired',          icon: 'event_busy',    activeClass: 'bg-red-500 text-white shadow-md shadow-red-200' },
  { label: 'Bản nháp',    value: 'draft',            icon: 'draft',         activeClass: 'bg-slate-500 text-white shadow-md' },
]
</script>
