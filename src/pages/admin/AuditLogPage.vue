<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Nhật kí hoạt động</h2>
        <p class="text-slate-500 text-base mt-1">Theo dõi và kiểm toán các hành động quản trị viên trên hệ thống</p>
      </div>
      <div class="flex gap-3 items-center shrink-0">
        <button class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">filter_list</span>
          Lưu bộ lọc
        </button>
        <button class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-bold bg-[#963131] hover:bg-[#963131]/90 text-white transition-all shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">sim_card_download</span>
          Xuất CSV
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <!-- [NOTE] KPI Stats hiện vẫn dùng mock data vì BE chưa cung cấp API thống kê riêng cho Logs -->
    <AuditLogKpiCards :stats="stats" />
    
    <!-- Filter -->
    <AuditLogFilters 
      v-model="filters"
      :active-type="activeLogType"
      @apply="handleApplyFilters"
    />
    
    <!-- Tabs & Table Container -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <!-- Tabs -->
      <div class="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
        <button
          v-for="tab in logTypeTabs"
          :key="tab.value"
          class="px-8 py-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2"
          :class="activeLogType === tab.value
            ? 'border-[#963131] text-[#963131] bg-white dark:bg-slate-900'
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border-transparent'"
          @click="handleTabChange(tab.value as any)"
        >
          <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
          {{ tab.label }}
          <span v-if="tab.count > 0" class="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
            {{ tab.count }}
          </span>
        </button>
      </div>

      <div class="relative">
        <!-- Loading Overlay -->
        <div v-if="loading" class="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 flex items-center justify-center backdrop-blur-[1px]">
          <div class="flex flex-col items-center gap-2">
            <span class="material-symbols-outlined animate-spin text-4xl text-[#963131]">progress_activity</span>
            <span class="text-sm font-bold text-slate-500">Đang tải dữ liệu...</span>
          </div>
        </div>

        <AuditLogTable 
          :logs="currentLogs" 
          :type="activeLogType"
          @view="handleView" 
        />

        <!-- Pagination -->
        <AuditLogPagination 
          :current="currentMeta.page + 1" 
          :total-pages="currentMeta.pages" 
          :total="currentMeta.totals" 
          :shown="currentLogs.length"
          @change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAdminLogStore } from '@/stores/adminLog.store'
import type { LogQueryParams } from '@/types/logs.types'
import AuditLogKpiCards from '@/components/admin/audit-log/AuditLogKpiCards.vue'
import AuditLogFilters from '@/components/admin/audit-log/AuditLogFilters.vue'
import AuditLogTable from '@/components/admin/audit-log/AuditLogTable.vue'
import AuditLogPagination from '@/components/admin/audit-log/AuditLogPagination.vue'

const router = useRouter()
const logStore = useAdminLogStore()
const { auditLogs, businessLogs, auditMeta, businessMeta, loading } = storeToRefs(logStore)

const activeLogType = ref<'AUDIT' | 'BUSINESS'>('AUDIT')

const logTypeTabs = computed(() => [
  { label: 'Nhật ký hệ thống', value: 'AUDIT', icon: 'security', count: auditMeta.value.totals },
  { label: 'Nhật ký nghiệp vụ', value: 'BUSINESS', icon: 'business_center', count: businessMeta.value.totals },
])

const currentLogs = computed(() => activeLogType.value === 'AUDIT' ? auditLogs.value : businessLogs.value)
const currentMeta = computed(() => activeLogType.value === 'AUDIT' ? auditMeta.value : businessMeta.value)

const filters = ref<LogQueryParams>({
  userId: null as any,
  action: '',
  category: '',
  severity: '',
  status: '',
  keyword: '',
  userRole: '',
  startDate: '',
  endDate: '',
  page: 0,
  size: 20
})

async function fetchData() {
  const params = {
    ...filters.value,
    page: currentMeta.value.page,
    size: currentMeta.value.pageSize
  }
  
  if (activeLogType.value === 'AUDIT') {
    await logStore.fetchAuditLogs(params)
  } else {
    await logStore.fetchBusinessLogs(params)
  }
}

onMounted(() => {
  fetchData()
})

function handleTabChange(type: 'AUDIT' | 'BUSINESS') {
  activeLogType.value = type
  // Reset pagination when switching tabs
  currentMeta.value.page = 0
  fetchData()
}

function handleApplyFilters() {
  currentMeta.value.page = 0 
  fetchData()
}

function handlePageChange(page: number) {
  currentMeta.value.page = page - 1
  fetchData()
}

function handleView(id: number) {
  router.push({ name: 'admin-audit-log-detail', params: { id, type: activeLogType.value.toLowerCase() } })
}

// Mock stats - [NOTE] BE chưa có API cho thống kê này
const stats = [
  { label: 'Tổng log hôm nay',     value: '1,284', icon: 'receipt_long', iconBg: '#e4e2dc', iconColor: '#574240', trend: '+12% so với hôm qua', trendVariant: 'up' },
  { label: 'Hành động rủi ro cao', value: '42',    icon: 'warning',      iconBg: '#ffdad6', iconColor: '#ba1a1a', trend: 'Cần chú ý',           trendVariant: 'warn' },
  { label: 'Admin hoạt động',      value: '17',    icon: 'group',        iconBg: '#eeedfe', iconColor: '#3c3489', trend: 'Đang online: 8',       trendVariant: 'neutral' },
  { label: 'Trace lỗi',            value: '29',    icon: 'bug_report',   iconBg: '#faeeda', iconColor: '#633806', trend: '+5 lỗi mới',           trendVariant: 'error' },
]
</script>