<template>
  <div class="flex items-start gap-4 p-5 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl">
    <span class="material-symbols-outlined text-primary text-xl flex-shrink-0 mt-0.5">speaker_notes</span>
    <div class="space-y-1.5">
      <h4 class="text-sm font-bold text-slate-900 dark:text-white">Ghi chú từ Recruiter</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ note: string }>()
</script>

<style scoped>
/* Switched to Tailwind */
</style>