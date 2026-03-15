<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div class="flex items-center justify-between mb-4">
        <span class="material-symbols-outlined p-2 rounded-lg" :class="[stat.iconBg, stat.iconColor]">
          {{ stat.icon }}
        </span>
        <span
          class="text-xs font-bold flex items-center gap-0.5"
          :class="stat.trendUp ? 'text-emerald-500' : 'text-red-500'"
        >
          {{ stat.trend }}
          <span class="material-symbols-outlined text-xs">
            {{ stat.trendUp ? 'arrow_upward' : 'arrow_downward' }}
          </span>
        </span>
      </div>
      <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">{{ stat.label }}</p>
      <h3 class="text-2xl font-bold mt-1">{{ stat.value }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface StatItem {
  icon: string
  label: string
  value: string
  trend: string
  trendUp: boolean
  iconBg: string
  iconColor: string
}

defineProps<{ stats: StatItem[] }>()
</script>