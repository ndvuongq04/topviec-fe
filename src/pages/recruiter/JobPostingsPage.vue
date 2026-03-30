<template>
  <div class="job-postings-page">

    <!-- Page header -->
    <div class="page-header">
      <div>
        <h2 class="page-header__title">Tin tuyển dụng</h2>
        <p class="page-header__subtitle">Quản lý và theo dõi hiệu suất các vị trí đang tuyển.</p>
      </div>
      <button class="btn-export" @click="handleExport">
        <span class="material-symbols-outlined icon-xl">file_download</span>
        Xuất báo cáo
      </button>
    </div>

    <!-- Stats -->
    <JobPostingStatsGrid :stats="stats" />

    <!-- Listing panel -->
    <div class="listing-panel">
      <JobPostingFilters
        v-model="activeFilter"
        @filter="handleFilter"
        @sort="handleSort"
      />
      <JobPostingTable
        :jobs="filteredJobs"
        @view="handleView"
        @edit="handleEdit"
        @copy="handleCopy"
        @submit="handleSubmit"
        @extend="handleExtend"
        @close="handleClose"
        @delete="handleDelete"
      />
      <JobPostingPagination
        v-model:currentPage="currentPage"
        :total="stats.total"
        :per-page="10"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import JobPostingStatsGrid  from '@/components/recruiter/jobs/JobPostingStatsGrid.vue'
import JobPostingFilters    from '@/components/recruiter/jobs/JobPostingFilters.vue'
import JobPostingTable      from '@/components/recruiter/jobs/JobPostingTable.vue'
import JobPostingPagination from '@/components/recruiter/jobs/JobPostingPagination.vue'
import type { JobPostingFilterTab } from '@/components/recruiter/jobs/JobPostingFilters.vue'
import type { JobPostingRow, JobPostingStats } from '@/types/employerJobPosting.types'

// ── State ────────────────────────────────────────────────
const activeFilter = ref<JobPostingFilterTab>('all')
const currentPage  = ref(1)

// ── Mock data (thay bằng store/service thực tế) ──────────
const stats: JobPostingStats = { total: 24, active: 12, pending: 5, expiring: 3 }

const allJobs: JobPostingRow[] = [
  {
    id: 1, title: 'Senior Product Designer (UI/UX)', code: 'JOB-2023-001',
    status: 'active', postedAt: '15/10/2023', deadline: '30/11/2023',
    daysLeft: 12, views: '1,240', applicants: 86, isUrgent: true,
  },
  {
    id: 2, title: 'Fullstack Developer (NodeJS/React)', code: 'JOB-2023-005',
    status: 'pending', postedAt: '18/10/2023', deadline: '15/12/2023',
    views: 0, applicants: 0,
  },
  {
    id: 3, title: 'Marketing Manager', code: 'JOB-2023-012',
    status: 'expiring', postedAt: '01/10/2023', deadline: '20/11/2023',
    daysLeft: 2, views: '2,845', applicants: 156, isFeatured: true,
  },
  {
    id: 4, title: 'Kế toán trưởng (Chưa đặt tên)', code: 'JOB-DRAFT-09',
    status: 'draft', postedAt: '20/11/2023',
  },
]

// ── Computed ─────────────────────────────────────────────
const filteredJobs = computed<JobPostingRow[]>(() => {
  if (activeFilter.value === 'all') return allJobs
  return allJobs.filter(j => j.status === activeFilter.value)
})

// ── Handlers (kết nối store/service thực tế tại đây) ─────
const handleExport = () => console.log('export')
const handleFilter = () => console.log('open filter panel')
const handleSort   = () => console.log('open sort panel')
const handleView   = (id: number) => console.log('view', id)
const handleEdit   = (id: number) => console.log('edit', id)
const handleCopy   = (id: number) => console.log('copy', id)
const handleSubmit = (id: number) => console.log('submit', id)
const handleExtend = (id: number) => console.log('extend', id)
const handleClose  = (id: number) => console.log('close', id)
const handleDelete = (id: number) => console.log('delete', id)
</script>

<style scoped>
.job-postings-page {
  /* Design system tokens missing from Tailwind */
  --color-surface: #ffffff;
  --color-on-surface: #0f172a;
  --color-on-surface-muted: #64748b;
  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;
  --color-primary: #137fec;
  --color-primary-text: #1e40af;
  --color-primary-light: #dbeafe;
  --color-tertiary: #f59e0b;
  --color-tertiary-text: #b45309;
  --color-tertiary-light: #fef3c7;
  --color-error: #ef4444;
  --color-error-text: #b91c1c;
  --color-error-light: #fee2e2;

  --radius-full: 9999px;
  --radius-lg: 1rem;
  --radius-md: 0.75rem;
  --radius-sm: 0.5rem;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100vh;
  background-color: #f8fafc;
}

.page-header { display: flex; align-items: flex-end; justify-content: space-between; }
.page-header__title { font-size: 1.875rem; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 0.25rem; }
.page-header__subtitle { color: var(--color-on-surface-muted); margin: 0; font-size: 0.875rem; }

.btn-export {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-family: inherit;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: background 0.15s;
}
.btn-export:hover { background: #f8fafc; }

.listing-panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  border: 1px solid var(--color-border-light);
  overflow: hidden;
}

.icon-xl { font-size: 1.25rem !important; }
</style>
