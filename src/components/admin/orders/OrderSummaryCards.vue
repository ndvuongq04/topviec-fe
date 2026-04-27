<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    icon: 'receipt_long',
    label: 'Tổng đơn hàng',
    value: '1,284',
    badge: 'Tất cả',
    note: 'Tổng số đơn trong hệ thống',
    badgeType: 'info' as const,
  },
  {
    icon: 'check_circle',
    label: 'Đã thanh toán',
    value: '1,102',
    badge: '85.8%',
    note: 'Tỉ lệ thanh toán thành công',
    badgeType: 'success' as const,
  },
  {
    icon: 'pending',
    label: 'Chờ xử lý',
    value: '47',
    badge: 'Pending',
    note: 'Đơn đang chờ thanh toán',
    badgeType: 'warning' as const,
  },
  {
    icon: 'monetization_on',
    label: 'Tổng giá trị',
    value: '284.6M đ',
    badge: '+8.2%',
    note: 'Doanh thu tạm tính',
    badgeType: 'success' as const,
  },
]
</script>
