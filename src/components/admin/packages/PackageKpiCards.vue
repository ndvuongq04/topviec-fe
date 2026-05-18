<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <AdminKpiCard
      v-for="card in cards"
      :key="card.label"
      :icon="card.icon"
      :label="card.label"
      :value="card.value"
      :badge="card.badge"
      :note="card.note"
      :badge-type="card.badgeType"
    />
  </div>
</template>

<script setup lang="ts">
import AdminKpiCard from '@/components/admin/dashboard/AdminKpiCard.vue'

const cards = [
  {
    icon: 'inventory_2',
    label: 'Tổng số gói',
    value: '05',
    badge: '+1 New',
    note: 'Gói đang được kích hoạt',
    badgeType: 'success' as const,
  },
  {
    icon: 'payments',
    label: 'Doanh thu trung bình',
    value: '450k',
    badge: '/ user',
    note: 'Tính trên mỗi người dùng',
    badgeType: 'info' as const,
  },
  {
    icon: 'trending_up',
    label: 'Conversion Rate',
    value: '12.5%',
    badge: 'Optimal',
    note: 'Tỉ lệ chuyển đổi tối ưu',
    badgeType: 'success' as const,
  },
]
</script>
