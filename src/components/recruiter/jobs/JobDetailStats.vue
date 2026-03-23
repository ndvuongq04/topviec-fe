<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex items-center gap-4 shadow-sm"
    >
      <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="stat.bgClass">
        <span class="material-symbols-outlined" :class="stat.iconClass">{{ stat.icon }}</span>
      </div>
      <div>
        <p class="text-xs text-slate-500 font-medium">{{ stat.label }}</p>
        <p class="text-xl font-extrabold text-slate-900 dark:text-white">{{ stat.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface JobStat {
  icon: string
  label: string
  value: string | number
  bgClass: string
  iconClass: string
}

defineProps<{
  stats: JobStat[]
}>()
</script>
