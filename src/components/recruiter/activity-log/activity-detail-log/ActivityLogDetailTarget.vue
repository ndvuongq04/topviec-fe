<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
    <div class="space-y-1">
      <p class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Đối tượng tác động: {{ target.type }}</p>
      <h3 class="text-lg font-extrabold text-slate-900 dark:text-white">{{ target.name }}</h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 font-medium">{{ target.subInfo }}</p>
    </div>
    <div class="flex items-center gap-3 shrink-0">
      <button
        class="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm cursor-pointer"
        @click="$emit('view-profile')"
      >
        Xem hồ sơ
      </button>
      <button
        class="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-all shadow-sm shadow-primary/20 cursor-pointer"
        @click="$emit('view-job')"
      >
        Xem tin tuyển dụng
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  target: { type: string; name: string; subInfo: string }
}>()

defineEmits<{ 'view-profile': []; 'view-job': [] }>()
</script>

<style scoped>
/* Switched to Tailwind */
</style>