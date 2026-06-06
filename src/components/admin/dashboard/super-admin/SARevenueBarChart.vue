<template>
  <MonthlyRevenueBarChart
    :data="data"
    title="Doanh thu 6 tháng gần nhất"
    month-label-style="long"
    variant="compact"
  />
</template>

<script setup lang="ts">
import MonthlyRevenueBarChart from '@/components/admin/dashboard/MonthlyRevenueBarChart.vue'
import type { MonthlyRevenue } from '@/types/dashboard.types'

defineProps<{
  data: MonthlyRevenue[]
}>()
</script>
