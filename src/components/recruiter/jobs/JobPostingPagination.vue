<template>
  <div v-if="totalItems > 0" class="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col sm:flex-row items-center justify-between gap-4">
    <!-- Info -->
    <span class="text-sm text-slate-500">
      Hiển thị <span class="font-bold text-slate-700 dark:text-slate-300">{{ rangeStart }}–{{ rangeEnd }}</span>
      trên <span class="font-bold text-slate-700 dark:text-slate-300">{{ totalItems }}</span> tin
    </span>

    <!-- Pages -->
    <div class="flex items-center gap-1.5">
      <!-- Prev -->
      <button
        class="w-9 h-9 flex items-center justify-center rounded-xl border text-sm transition-all"
        :class="currentPage <= 1
          ? 'border-slate-200 dark:border-slate-700 text-slate-300 cursor-not-allowed bg-white dark:bg-slate-900'
          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary bg-white dark:bg-slate-900 cursor-pointer'"
        :disabled="currentPage <= 1"
        @click="$emit('update:page', currentPage - 1)"
      >
        <span class="material-symbols-outlined text-[18px]">chevron_left</span>
      </button>

      <!-- Page numbers -->
      <button
        v-for="page in visiblePages"
        :key="page"
        class="w-9 h-9 rounded-xl text-sm font-bold transition-all cursor-pointer"
        :class="page === currentPage
          ? 'bg-primary text-white shadow-md shadow-primary/30'
          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'"
        @click="$emit('update:page', page)"
      >
        {{ page }}
      </button>

      <!-- Next -->
      <button
        class="w-9 h-9 flex items-center justify-center rounded-xl border text-sm transition-all"
        :class="currentPage >= totalPages
          ? 'border-slate-200 dark:border-slate-700 text-slate-300 cursor-not-allowed bg-white dark:bg-slate-900'
          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary bg-white dark:bg-slate-900 cursor-pointer'"
        :disabled="currentPage >= totalPages"
        @click="$emit('update:page', currentPage + 1)"
      >
        <span class="material-symbols-outlined text-[18px]">chevron_right</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
}>()

defineEmits<{ 'update:page': [page: number] }>()

const rangeStart = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const rangeEnd = computed(() => Math.min(props.currentPage * props.pageSize, props.totalItems))

// Show at most 5 page numbers around current page
const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: number[] = []
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)
  if (start > 1) pages.push(1)
  if (start > 2) pages.push(-1) // ellipsis placeholder
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push(-2) // ellipsis placeholder
  if (end < total) pages.push(total)
  return pages
})
</script>
