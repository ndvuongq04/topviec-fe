<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-[#963131]/5 overflow-hidden">

    <!-- Tabs -->
    <div class="flex border-b border-[#963131]/5 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2"
        :class="activeTab === tab.key
          ? 'font-bold border-b-2 border-[#963131] text-[#963131] bg-[#963131]/5'
          : 'text-slate-500 hover:text-[#963131]'"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span
          v-if="tab.badge"
          class="text-xs font-black px-1.5 py-0.5 rounded-full bg-[#963131] text-white"
        >{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Search + Filters -->
    <div class="p-4 flex flex-wrap gap-3 items-center">

      <!-- Search -->
      <div class="flex-1 min-w-64 flex items-center bg-slate-50 dark:bg-white/5 rounded-lg px-4 border border-[#963131]/5 focus-within:ring-2 focus-within:ring-[#963131]/20 transition-all">
        <span class="material-symbols-outlined text-slate-400 text-xl">search</span>
        <input
          v-model="search"
          type="text"
          class="bg-transparent border-none focus:ring-0 text-sm w-full py-3 outline-none ml-2"
          placeholder="Tìm tên công ty, mã đơn hàng..."
        />
      </div>

      <!-- Loại đơn -->
      <select
        v-model="orderType"
        class="shrink-0 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg text-sm pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700 dark:text-slate-300"
      >
        <option value="">Loại đơn: Tất cả</option>
        <option value="package">Mua gói</option>
        <option value="single">Mua lẻ</option>
      </select>

      <!-- Trạng thái -->
      <select
        v-model="status"
        class="shrink-0 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg text-sm pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700 dark:text-slate-300"
      >
        <option value="">Trạng thái: Tất cả</option>
        <option value="paid">Đã thanh toán</option>
        <option value="pending">Chờ thanh toán</option>
        <option value="failed">Thất bại</option>
      </select>

      <!-- Date range -->
      <div class="flex items-center gap-2 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-[#963131]/20 transition-all">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Từ</span>
        <input v-model="dateFrom" type="date" class="bg-transparent border-none text-sm text-slate-700 outline-none" />
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Đến</span>
        <input v-model="dateTo" type="date" class="bg-transparent border-none text-sm text-slate-700 outline-none" />
      </div>

      <!-- Actions -->
      <button
        class="shrink-0 bg-[#963131] hover:bg-[#963131]/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm"
        @click="handleFilter"
      >
        Lọc
      </button>
      <button
        class="shrink-0 text-sm font-medium text-slate-500 hover:text-[#963131] transition-colors"
        @click="clearFilters"
      >
        Xoá bộ lọc
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search    = ref('')
const orderType = ref('')
const status    = ref('')
const dateFrom  = ref('')
const dateTo    = ref('')
const activeTab = ref('all')

const tabs = [
  { key: 'all',     label: 'Tất cả' },
  { key: 'today',   label: 'Hôm nay' },
  { key: '7days',   label: '7 ngày qua' },
  { key: 'month',   label: 'Tháng này' },
  { key: 'pending', label: 'Chờ xử lý', badge: 12 },
  { key: 'failed',  label: 'Thất bại' },
]

const emit = defineEmits<{
  filter: [payload: { search: string; orderType: string; status: string; dateFrom: string; dateTo: string; tab: string }]
}>()

const handleFilter = () => {
  emit('filter', {
    search: search.value, orderType: orderType.value,
    status: status.value, dateFrom: dateFrom.value,
    dateTo: dateTo.value, tab: activeTab.value,
  })
}

const clearFilters = () => {
  search.value = ''; orderType.value = ''; status.value = ''
  dateFrom.value = ''; dateTo.value = ''; activeTab.value = 'all'
}
</script>
