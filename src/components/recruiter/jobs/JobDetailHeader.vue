<template>
  <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
    <div class="space-y-2">
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ title }}</h1>
        <span
          class="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
          :class="statusClasses"
        >
          <span class="w-2 h-2 rounded-full" :class="dotClass"></span>
          {{ statusLabel }}
        </span>
      </div>
      <p class="text-slate-500 flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">location_on</span>
        {{ location }}
      </p>
    </div>
    <div class="flex items-center gap-3 shrink-0">
      <button
        class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
        @click="$emit('edit')"
      >
        <span class="material-symbols-outlined text-lg">edit</span>
        Chỉnh sửa
      </button>
      <button
        class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
        @click="$emit('pause')"
      >
        <span class="material-symbols-outlined text-lg">pause_circle</span>
        Tạm dừng
      </button>
      <button
        class="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all cursor-pointer"
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined text-lg">cancel</span>
        Đóng tin
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  location: string
  status: 'active' | 'pending' | 'expired'
}>()

defineEmits<{
  edit: []
  pause: []
  close: []
}>()

const statusClasses = computed(() => {
  const map: Record<string, string> = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    expired: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  }
  return map[props.status] ?? ''
})

const dotClass = computed(() => {
  const map: Record<string, string> = {
    active: 'bg-green-500 animate-pulse',
    pending: 'bg-amber-500',
    expired: 'bg-slate-400',
  }
  return map[props.status] ?? ''
})

const statusLabel = computed(() => {
  const map: Record<string, string> = {
    active: 'Đang tuyển',
    pending: 'Chờ duyệt',
    expired: 'Hết hạn',
  }
  return map[props.status] ?? props.status
})
</script>
