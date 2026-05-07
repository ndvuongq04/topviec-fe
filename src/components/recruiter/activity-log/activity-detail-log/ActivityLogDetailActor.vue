<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border-2 border-white dark:border-slate-700 shadow-sm">
        <img v-if="actor.avatar" :src="actor.avatar" :alt="actor.name" class="w-full h-full object-cover" />
        <span v-else class="text-primary font-bold text-base uppercase">{{ actor.initials || actor.name.charAt(0) }}</span>
      </div>
      <div>
        <h2 class="text-base font-bold text-slate-900 dark:text-white leading-tight">{{ actor.name }}</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ actor.role }}</p>
      </div>
    </div>
    <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
      <span class="material-symbols-outlined text-lg">schedule</span>
      {{ actor.time }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  actor: { name: string; role: string; avatar: string; initials?: string; time: string }
}>()
</script>

<style scoped>
/* Switched to Tailwind */
</style>