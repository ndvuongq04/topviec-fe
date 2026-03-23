<template>
  <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
    <div class="space-y-2">
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ title }}</h1>
        <div class="flex items-center gap-2">
          <span
            class="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
            :class="statusClasses"
          >
            <span class="w-2 h-2 rounded-full" :class="dotClass"></span>
            {{ statusLabel }}
          </span>
          <span 
            v-if="isUrgent" 
            class="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 rounded-full text-xs font-bold flex items-center gap-1 border border-red-200 dark:border-red-800"
          >
            🔥 Tuyển gấp
          </span>
          <span 
            v-if="isFeatured" 
            class="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 rounded-full text-xs font-bold flex items-center gap-1 border border-purple-200 dark:border-purple-800"
          >
            ⭐ Nổi bật
          </span>
        </div>
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
        v-if="['active', 'published'].includes(status?.toLowerCase())"
        class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-orange-600 dark:text-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
        @click="$emit('pause')"
      >
        <span class="material-symbols-outlined text-lg">pause_circle</span>
        Tạm dừng
      </button>

      <button
        v-if="status?.toLowerCase() === 'paused'"
        class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-green-600 dark:text-green-500 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
        @click="$emit('resume')"
      >
        <span class="material-symbols-outlined text-lg">play_circle</span>
        Mở lại
      </button>

      <button
        v-if="['published', 'paused', 'pending_approval', 'active'].includes(status?.toLowerCase())"
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
  status: string
  isFeatured?: boolean
  isUrgent?: boolean
}>()

defineEmits<{
  edit: []
  pause: []
  resume: []
  close: []
}>()

const statusClasses = computed(() => {
  const map: Record<string, string> = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending_approval: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    paused: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    expired: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    closed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }
  return map[props.status?.toLowerCase()] || 'bg-slate-100 text-slate-700'
})

const dotClass = computed(() => {
  const map: Record<string, string> = {
    active: 'bg-green-500 animate-pulse',
    published: 'bg-green-500 animate-pulse',
    pending_approval: 'bg-amber-500',
    paused: 'bg-orange-500',
    expired: 'bg-slate-400',
    closed: 'bg-red-500',
  }
  return map[props.status?.toLowerCase()] || 'bg-slate-400'
})

const statusLabel = computed(() => {
  const map: Record<string, string> = {
    active: 'Đang tuyển',
    published: 'Đang tuyển',
    pending_approval: 'Chờ duyệt',
    paused: 'Tạm dừng',
    expired: 'Hết hạn',
    closed: 'Đã đóng',
  }
  return map[props.status?.toLowerCase()] || props.status
})
</script>
