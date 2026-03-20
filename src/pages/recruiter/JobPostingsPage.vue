<template>
  <div class="space-y-8 pt-6">
    <!-- Top Actions -->
    <div class="flex items-end justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Danh sách tin tuyển dụng</h1>
        <p class="text-slate-500 text-sm">Quản lý và theo dõi hiệu quả các tin đăng của bạn.</p>
      </div>
      <router-link
        to="/recruiter/jobs/create"
        class="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20 cursor-pointer"
      >
        <span class="material-symbols-outlined">add</span>
        Đăng tin mới
      </router-link>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <JobPostingSummaryCard
        v-for="card in summaryCards"
        :key="card.label"
        :icon="card.icon"
        :label="card.label"
        :value="card.value"
      />
    </div>

    <!-- Filters & Search -->
    <JobPostingFilters
      :search="searchQuery"
      :filter="activeFilter"
      @update:search="searchQuery = $event"
      @update:filter="activeFilter = $event"
    />

    <!-- Job Table + Pagination -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
      <JobPostingTable
        :jobs="filteredJobs"
        @edit="onEdit"
        @pause="onPause"
        @close="onClose"
        @refresh="onRefresh"
        @view="onView"
      />
      <JobPostingPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="totalItems"
        :page-size="pageSize"
        @update:page="currentPage = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import JobPostingSummaryCard from '@/components/recruiter/jobs/JobPostingSummaryCard.vue'
import JobPostingFilters from '@/components/recruiter/jobs/JobPostingFilters.vue'
import JobPostingTable from '@/components/recruiter/jobs/JobPostingTable.vue'
import JobPostingPagination from '@/components/recruiter/jobs/JobPostingPagination.vue'
import type { FilterStatus } from '@/components/recruiter/jobs/JobPostingFilters.vue'
import type { JobPosting } from '@/components/recruiter/jobs/JobPostingTable.vue'

// Summary cards
const summaryCards = [
  { icon: 'work',         label: 'Tổng số tin',  value: 124 },
  { icon: 'check_circle', label: 'Đang tuyển',   value: 48 },
  { icon: 'schedule',     label: 'Chờ duyệt',    value: 12 },
  { icon: 'warning',      label: 'Hết hạn',       value: 15 },
]

// Mock data
const allJobs: JobPosting[] = [
  {
    id: 1,
    title: 'Senior Frontend Engineer (React/Tailwind)',
    code: 'TV-88219',
    type: 'Toàn thời gian',
    status: 'active',
    views: 1240,
    applications: 42,
    expiryDate: '24/12/2023',
  },
  {
    id: 2,
    title: 'Product Marketing Manager',
    code: 'TV-88220',
    type: 'Remote',
    status: 'pending',
    views: null,
    applications: 0,
    expiryDate: '30/12/2023',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    code: 'TV-88152',
    type: 'Toàn thời gian',
    status: 'expired',
    views: 4510,
    applications: 128,
    expiryDate: '01/11/2023',
  },
  {
    id: 4,
    title: 'Backend Architect (Node.js)',
    code: 'TV-88245',
    type: 'Hợp đồng',
    status: 'active',
    views: 890,
    applications: 15,
    expiryDate: '15/01/2024',
  },
]

// State
const searchQuery = ref('')
const activeFilter = ref<FilterStatus>('all')
const currentPage = ref(1)
const pageSize = 4

// Computed
const filteredJobs = computed(() => {
  return allJobs.filter((job) => {
    const matchesFilter = activeFilter.value === 'all' || job.status === activeFilter.value
    const matchesSearch =
      !searchQuery.value || job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})

const totalItems = computed(() => filteredJobs.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize)))

// Handlers
function onEdit(job: JobPosting) {
  console.log('Edit:', job)
}
function onPause(job: JobPosting) {
  console.log('Pause:', job)
}
function onClose(job: JobPosting) {
  console.log('Close:', job)
}
function onRefresh(job: JobPosting) {
  console.log('Refresh:', job)
}
function onView(job: JobPosting) {
  console.log('View:', job)
}
</script>
