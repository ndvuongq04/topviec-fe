<template>
  <div class="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
    <span class="text-sm text-slate-500">
      Hiển thị {{ rangeStart }}-{{ rangeEnd }} trên tổng số {{ totalItems }} tin đăng
    </span>

    <div class="flex items-center gap-1">
      <!-- Prev -->
      <button
        class="p-1.5 rounded border text-sm"
        :class="currentPage <= 1
          ? 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400 cursor-not-allowed'
          : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100'"
        :disabled="currentPage <= 1"
        @click="$emit('update:page', currentPage - 1)"
      >
        <span class="material-symbols-outlined">chevron_left</span>
      </button>

      <!-- Page numbers -->
      <button
        v-for="page in totalPages"
        :key="page"
        class="w-8 h-8 rounded text-sm font-medium"
        :class="page === currentPage
          ? 'bg-primary text-white font-bold'
          : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100'"
        @click="$emit('update:page', page)"
      >
        {{ page }}
      </button>

      <!-- Next -->
      <button
        class="p-1.5 rounded border text-sm"
        :class="currentPage >= totalPages
          ? 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400 cursor-not-allowed'
          : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100'"
        :disabled="currentPage >= totalPages"
        @click="$emit('update:page', currentPage + 1)"
      >
        <span class="material-symbols-outlined">chevron_right</span>
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

defineEmits<{
  'update:page': [page: number]
}>()

const rangeStart = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const rangeEnd = computed(() => Math.min(props.currentPage * props.pageSize, props.totalItems))
</script>
