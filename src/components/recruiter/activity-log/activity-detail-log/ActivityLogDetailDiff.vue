<template>
  <div class="space-y-4">
    <h3 class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Chi tiết thay đổi</h3>

    <div class="divide-y divide-slate-100 dark:divide-slate-800">
      <div
        v-for="change in changes"
        :key="change.field"
        class="grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-4 py-4"
      >
        <span class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ change.field }}</span>
        <div class="flex items-center gap-3 flex-wrap">
          <span
            class="inline-flex px-3 py-1.5 rounded-lg text-sm font-medium"
            :class="[getChipStyle(change.before.style), { 'line-through opacity-50': change.before.strikethrough }]"
          >
            {{ change.before.label }}
          </span>
          <span class="material-symbols-outlined text-slate-300 dark:text-slate-600">arrow_right_alt</span>
          <span
            class="inline-flex px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm"
            :class="getChipStyle(change.after.style)"
          >
            {{ change.after.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  changes: Array<{
    field: string
    before: { label: string; style: string; strikethrough?: boolean }
    after: { label: string; style: string }
  }>
}>()

function getChipStyle(style: string) {
  switch (style) {
    case 'chip-neutral': return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
    case 'chip-empty':   return 'bg-slate-50 dark:bg-slate-800/50 text-slate-400 border border-slate-200 dark:border-slate-700 italic'
    case 'chip-success': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
    case 'chip-info':    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    default:             return 'bg-slate-100 dark:bg-slate-800 text-slate-600'
  }
}
</script>

<style scoped>
/* Switched to Tailwind */
</style>