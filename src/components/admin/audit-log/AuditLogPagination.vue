<template>
  <div class="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
    <p class="text-sm text-slate-500 font-medium">
      Hiển thị
      <span class="text-slate-900 dark:text-white font-bold">1–{{ shown }}</span>
      trong số
      <span class="text-slate-900 dark:text-white font-bold">{{ total.toLocaleString() }}</span> kết quả
    </p>
    <div class="flex items-center gap-2">
      <!-- Prev -->
      <button
        class="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
        :disabled="current === 1"
        @click="$emit('change', current - 1)"
      >
        <span class="material-symbols-outlined text-xl leading-none">chevron_left</span>
      </button>

      <!-- Page numbers -->
      <template v-for="p in displayPages" :key="p">
        <span v-if="p === '...'" class="px-1 text-slate-400 text-sm">...</span>
        <button
          v-else
          class="size-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors cursor-pointer"
          :class="current === (p as number)
            ? 'bg-[#963131] text-white shadow-sm'
            : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'"
          @click="$emit('change', p as number)"
        >{{ p }}</button>
      </template>

      <!-- Next -->
      <button
        class="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
        :disabled="current === totalPages"
        @click="$emit('change', current + 1)"
      >
        <span class="material-symbols-outlined text-xl leading-none">chevron_right</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ current: number; totalPages: number; total: number; shown: number }>()
defineEmits<{ change: [page: number] }>()

const displayPages = computed(() => {
  const pages: (number | string)[] = [1, 2, 3, '...', props.totalPages]
  return pages
})
</script>