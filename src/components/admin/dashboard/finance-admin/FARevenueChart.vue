<template>
  <MonthlyRevenueBarChart
    :data="data"
    title="Doanh thu theo tháng"
    subtitle="So sánh doanh thu từng tháng theo đơn đã thanh toán"
    month-label-style="short"
    variant="detailed"
  />
</template>

<script setup lang="ts">
import MonthlyRevenueBarChart from '@/components/admin/dashboard/MonthlyRevenueBarChart.vue'
import type { MonthlyRevenue } from '@/types/dashboard.types'

defineProps<{
  data: MonthlyRevenue[]
}>()
</script>
