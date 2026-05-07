<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-['Manrope']">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 cursor-default"
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-lg" :class="stat.iconBg">
          <span class="material-symbols-outlined" :class="stat.iconColor">{{ stat.icon }}</span>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">{{ stat.label }}</p>
          <h3 class="text-[1.875rem] font-extrabold leading-tight text-slate-900 dark:text-white">{{ stat.value }}</h3>
        </div>
      </div>
      <div class="mt-4 flex items-center gap-2">
        <template v-if="stat.trend">
          <span
            class="text-xs font-bold flex items-center gap-0.5"
            :class="stat.trendUp === true
              ? 'text-emerald-500'
              : stat.trendUp === false
                ? 'text-rose-500'
                : 'text-slate-400'"
          >
            <span v-if="stat.trendUp !== undefined && stat.trendUp !== null" class="material-symbols-outlined text-xs">
              {{ stat.trendUp ? 'trending_up' : 'trending_down' }}
            </span>
            {{ stat.trend }}
          </span>
          <span class="text-slate-400 text-xs" v-if="stat.trendNote">{{ stat.trendNote }}</span>
        </template>
        <template v-else-if="stat.sub">
          <span class="text-slate-400 text-xs">{{ stat.sub }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stats: Array<{
    label: string; value: number; icon: string
    iconBg: string; iconColor: string
    trend?: string; trendUp?: boolean; trendNote?: string; sub?: string
  }>
}>()
</script>