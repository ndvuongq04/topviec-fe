<template>
  <div class="space-y-8">

    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Đơn hàng</h2>
        <p class="text-slate-500 text-sm mt-1">Theo dõi và quản lý toàn bộ giao dịch thanh toán trên nền tảng</p>
      </div>
    </div>

    <!-- KPI Cards -->
    <OrderSummaryCards />

    <!-- Filter -->
    <OrderFilters @filter="onFilter" />

    <!-- Table Card -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <OrderTable
        :orders="store.orders"
        :meta="store.meta"
        :loading="store.loading"
        @page-change="onPageChange"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OrderFilters from '@/components/admin/orders/OrderFilters.vue'
import OrderSummaryCards from '@/components/admin/orders/OrderSummaryCards.vue'
import OrderTable from '@/components/admin/orders/OrderTable.vue'
import { useAdminOrderStore } from '@/stores/order.store'
import type { OrderStatus } from '@/types/order.types'

const store       = useAdminOrderStore()
const currentPage = ref(0)            // 0-based theo skill-Pagination.md
const filterStatus = ref<OrderStatus | undefined>(undefined)

function fetch() {
  store.fetchOrders({ page: currentPage.value, status: filterStatus.value })
}

function onPageChange(page: number) {
  currentPage.value = page
  fetch()
}

function onFilter(status: OrderStatus | undefined) {
  filterStatus.value = status
  currentPage.value  = 0   // reset về trang đầu khi đổi filter
  fetch()
}

onMounted(() => fetch())
</script>
