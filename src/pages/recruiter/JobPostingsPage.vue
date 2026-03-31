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
        v-model:searchValue="searchValue"
        @search="handleSearch"
      />
      <JobPostingTable
        :jobs="jobs"
        @view="handleView"
        @edit="handleEdit"
        @copy="handleCopy"
        @submit="handleSubmit"
        @extend="handleExtend"
        @close="handleClose"
        @delete="handleDelete"
        @applications="handleViewApplications"
      />
      <JobPostingPagination
        v-model:currentPage="currentPage"
        :total="totalJobs"
        :per-page="10"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { employerJobPostingService } from '@/services/employerJobPosting.service'
import { JobPostingStatus } from '@/constants/jobPosting.constants'
import type { ResJobPostingDetail } from '@/types/jobPosting.types'
import JobPostingStatsGrid  from '@/components/recruiter/jobs/JobPostingStatsGrid.vue'
import JobPostingFilters    from '@/components/recruiter/jobs/JobPostingFilters.vue'
import JobPostingTable      from '@/components/recruiter/jobs/JobPostingTable.vue'
import JobPostingPagination from '@/components/recruiter/jobs/JobPostingPagination.vue'
import type { JobPostingFilterTab } from '@/components/recruiter/jobs/JobPostingFilters.vue'
import type { JobPostingRow, JobPostingStats } from '@/types/employerJobPosting.types'

// ── State ────────────────────────────────────────────────
const activeFilter = ref<JobPostingFilterTab>('all')
const currentPage  = ref(0)
const searchValue  = ref('')
const router = useRouter()

const jobs      = ref<JobPostingRow[]>([])
const totalJobs = ref(0)
const stats     = ref<JobPostingStats>({ total: 0, active: 0, pending: 0, expiring: 0 })

// ── Status mapping ───────────────────────────────────────
const tabToStatus: Partial<Record<JobPostingFilterTab, JobPostingStatus>> = {
  active:       JobPostingStatus.PUBLISHED,
  pending:      JobPostingStatus.PENDING_APPROVAL,
  draft:        JobPostingStatus.DRAFT,
  closed:       JobPostingStatus.CLOSED,
  expired:      JobPostingStatus.EXPIRED,
  interviewing: JobPostingStatus.INTERVIEWING,
  completed:    JobPostingStatus.COMPLETED,
}

function mapStatus(apiStatus: string): JobPostingRow['status'] {
  const map: Record<string, JobPostingRow['status']> = {
    [JobPostingStatus.PUBLISHED]:        'active',
    [JobPostingStatus.RENEWED]:          'active',
    [JobPostingStatus.SCHEDULED]:        'pending',
    [JobPostingStatus.PENDING_APPROVAL]: 'pending',
    [JobPostingStatus.DRAFT]:            'draft',
    [JobPostingStatus.PAUSED]:           'paused',
    [JobPostingStatus.CLOSED]:           'closed',
    [JobPostingStatus.EXPIRED]:          'expired',
    [JobPostingStatus.REJECTED]:         'rejected',
    [JobPostingStatus.INTERVIEWING]:     'interviewing',
    [JobPostingStatus.COMPLETED]:        'completed',
  }
  return map[apiStatus] ?? 'draft'
}

function mapToRow(job: ResJobPostingDetail): JobPostingRow {
  const deadline = job.deadline ? new Date(job.deadline) : null
  const now      = new Date()
  const daysLeft = deadline
    ? Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : undefined
  const uiStatus = mapStatus(job.status)

  return {
    id:         job.id,
    title:      job.title,
    code:       `JOB-${String(job.id).padStart(5, '0')}`,
    status:     daysLeft !== undefined && daysLeft <= 3 && uiStatus === 'active' ? 'expiring' : uiStatus,
    postedAt:   job.publishedAt
      ? new Date(job.publishedAt).toLocaleDateString('vi-VN')
      : new Date(job.createdAt).toLocaleDateString('vi-VN'),
    deadline:   deadline ? deadline.toLocaleDateString('vi-VN') : undefined,
    daysLeft:   daysLeft !== undefined && daysLeft > 0 ? daysLeft : undefined,
    views:      job.viewCount,
    applicants: job.applicationCount ?? 0,
    editCount:  job.editCount,
    isUrgent:   job.isUrgent,
    isFeatured: job.isFeatured,
  }
}

// ── API calls ────────────────────────────────────────────
async function fetchJobs() {
  const res = await employerJobPostingService.getList({
    status:  tabToStatus[activeFilter.value],
    keyword: searchValue.value || undefined,
    page:    currentPage.value,
    size:    10,
  })
  jobs.value      = res.result.map(mapToRow)
  totalJobs.value = res.meta.totals
}

async function fetchStats() {
  const [allRes, activeRes, pendingRes] = await Promise.all([
    employerJobPostingService.getList({ size: 1 }),
    employerJobPostingService.getList({ status: JobPostingStatus.PUBLISHED, size: 1 }),
    employerJobPostingService.getList({ status: JobPostingStatus.PENDING_APPROVAL, size: 1 }),
  ])
  stats.value = {
    total:   allRes.meta.totals,
    active:  activeRes.meta.totals,
    pending: pendingRes.meta.totals,
    expiring: 0,
  }
}

// ── Watchers ─────────────────────────────────────────────
watch(activeFilter, () => {
  if (currentPage.value !== 0) {
    currentPage.value = 0 // triggers currentPage watcher → fetchJobs
  } else {
    fetchJobs()
  }
})

function handleSearch() {
  if (currentPage.value !== 0) {
    currentPage.value = 0
  } else {
    fetchJobs()
  }
}

watch(currentPage, fetchJobs)

onMounted(() => {
  fetchJobs()
  fetchStats()
})

// ── Handlers ─────────────────────────────────────────────
const handleExport = () => console.log('export')
const handleView   = (id: number) => console.log('view', id)
const handleEdit   = (id: number) => console.log('edit', id)
const handleCopy   = (id: number) => console.log('copy', id)
const handleSubmit = (id: number) => console.log('submit', id)
const handleExtend = (id: number) => console.log('extend', id)
const handleClose  = (id: number) => console.log('close', id)
const handleDelete = (id: number) => console.log('delete', id)
const handleViewApplications = (id: number) => {
  router.push({ name: 'recruiter-job-applications', params: { id } })
}
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


  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Manrope', sans-serif;
}

.page-header { display: flex; align-items: flex-end; justify-content: space-between; }
.page-header__title { font-size: 1.875rem; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 0.25rem; }
.page-header__subtitle { color: var(--color-on-surface-muted); margin: 0; font-size: 1rem; }

.btn-export {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-family: inherit;
  font-weight: 800;
  font-size: 1rem;
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
