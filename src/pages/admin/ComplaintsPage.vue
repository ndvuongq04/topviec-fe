<template>
  <div class="cop-page">
    <div class="cop-welcome">
      <h1 class="cop-title">Tổng quan</h1>
      <p class="cop-desc">Quản lý và xử lý khiếu nại của người dùng hiệu quả.</p>
    </div>

    <ComplaintKpiCards />

    <ComplaintFilters @filter="onFilter" />

    <div class="cop-card">
      <!-- Loading skeleton -->
      <div v-if="store.loading" class="flex flex-col gap-3 py-4">
        <div v-for="i in 8" :key="i" class="h-14 rounded-lg bg-slate-100 animate-pulse" />
      </div>

      <!-- Empty state -->
      <div v-else-if="!store.reports.length" class="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <span class="material-symbols-outlined text-slate-300 text-[56px]">inbox</span>
        <p class="text-slate-500 font-medium">Không có khiếu nại nào phù hợp</p>
      </div>

      <!-- Table -->
      <ComplaintTable v-else :complaints="store.reports" @select="onSelect" />

      <ComplaintPagination
        v-if="store.meta.totals > 0"
        :current-page="currentPage"
        :total="store.meta.totals"
        :per-page="pageSize"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminReportStore } from '@/stores/adminReport.store'
import ComplaintKpiCards   from '@/components/admin/complaints/ComplaintKpiCards.vue'
import ComplaintFilters    from '@/components/admin/complaints/ComplaintFilters.vue'
import ComplaintTable      from '@/components/admin/complaints/ComplaintTable.vue'
import ComplaintPagination from '@/components/admin/complaints/ComplaintPagination.vue'
import type { ResReportSummary } from '@/types/report.types'
import type { ReqGetAdminReports } from '@/types/report.types'

const router      = useRouter()
const store       = useAdminReportStore()
const currentPage = ref(0)
const pageSize    = ref(10)
const filterParams = ref<Omit<ReqGetAdminReports, 'page' | 'size' | 'sort'>>({})

function fetchData() {
  store.fetchAll({
    ...filterParams.value,
    page: currentPage.value,
    size: pageSize.value,
    sort: 'createdAt,desc',
  })
}

onMounted(() => fetchData())

function onFilter(params: Omit<ReqGetAdminReports, 'page' | 'size' | 'sort'>) {
  filterParams.value = params
  currentPage.value  = 0
  fetchData()
}

function onPageChange(page: number) {
  currentPage.value = page
  fetchData()
}

async function onSelect(row: ResReportSummary) {
  await store.fetchById(row.id)
  router.push({ name: 'admin-complaint-detail', params: { id: row.id } })
}
</script>

<style scoped>
.cop-page {
  
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.cop-title {
  font-size: 1.875rem; font-weight: 900; font-family: 'Manrope', sans-serif;
  letter-spacing: -0.02em; color: #1b1c18; margin-bottom: 4px;
}
.cop-desc { font-size: 0.875rem; color: #574240; font-family: 'Manrope', sans-serif; }
.cop-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
}
</style>
