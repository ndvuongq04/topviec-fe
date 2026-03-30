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
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100vh;
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


<template>
  <div class="stats-grid">
    <div class="stat-card">
      <p class="stat-card__label">Tổng số tin</p>
      <p class="stat-card__value">{{ stats.total }}</p>
      <span class="material-symbols-outlined stat-card__icon">list_alt</span>
    </div>
    <div class="stat-card stat-card--active">
      <p class="stat-card__label">Đang tuyển</p>
      <p class="stat-card__value">{{ stats.active }}</p>
      <span class="material-symbols-outlined stat-card__icon">rocket_launch</span>
    </div>
    <div class="stat-card stat-card--pending">
      <p class="stat-card__label">Chờ duyệt</p>
      <p class="stat-card__value">{{ String(stats.pending).padStart(2, '0') }}</p>
      <span class="material-symbols-outlined stat-card__icon">hourglass_empty</span>
    </div>
    <div class="stat-card stat-card--expiring">
      <p class="stat-card__label">Sắp hết hạn</p>
      <p class="stat-card__value">{{ String(stats.expiring).padStart(2, '0') }}</p>
      <span class="material-symbols-outlined stat-card__icon">alarm</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface JobPostingStats {
  total: number
  active: number
  pending: number
  expiring: number
}

defineProps<{
  stats: JobPostingStats
}>()
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
@media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px)  { .stats-grid { grid-template-columns: 1fr; } }

.stat-card {
  background: var(--color-surface);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  border: 1px solid var(--color-border-light);
  position: relative;
  overflow: hidden;
}
.stat-card__label {
  font-size: 0.875rem;
  font-weight: 700;
  color: #64748b;
  margin: 0 0 0.25rem;
}
.stat-card__value {
  font-size: 1.875rem;
  font-weight: 800;
  color: var(--color-on-surface);
  margin: 0;
  line-height: 1.2;
}
.stat-card__icon {
  position: absolute;
  right: -0.5rem;
  bottom: -0.5rem;
  font-size: 5rem !important;
  opacity: 0.05;
  transition: transform 0.5s;
}
.stat-card:hover .stat-card__icon { transform: scale(1.1); }

.stat-card--active   { border-left: 4px solid var(--color-primary); }
.stat-card--active   .stat-card__label { color: var(--color-primary); }
.stat-card--active   .stat-card__icon  { opacity: 0.1; color: var(--color-primary); }

.stat-card--pending  { border-left: 4px solid var(--color-tertiary); }
.stat-card--pending  .stat-card__label { color: var(--color-tertiary); }
.stat-card--pending  .stat-card__icon  { opacity: 0.1; color: var(--color-tertiary); }

.stat-card--expiring { border-left: 4px solid var(--color-error); }
.stat-card--expiring .stat-card__label { color: var(--color-error); }
.stat-card--expiring .stat-card__icon  { opacity: 0.1; color: var(--color-error); }
</style>


<template>
  <div class="toolbar">
    <div class="filter-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="filter-tab"
        :class="{ 'filter-tab--active': modelValue === tab.value }"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="toolbar-actions">
      <button class="btn-icon" title="Lọc" @click="$emit('filter')">
        <span class="material-symbols-outlined icon-xl">filter_list</span>
      </button>
      <button class="btn-icon" title="Sắp xếp" @click="$emit('sort')">
        <span class="material-symbols-outlined icon-xl">sort_by_alpha</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
export type JobPostingFilterTab = 'all' | 'active' | 'pending' | 'draft' | 'closed' | 'expired'

const tabs: { label: string; value: JobPostingFilterTab }[] = [
  { label: 'Tất cả',    value: 'all' },
  { label: 'Đang tuyển', value: 'active' },
  { label: 'Chờ duyệt', value: 'pending' },
  { label: 'Nháp',      value: 'draft' },
  { label: 'Đã đóng',   value: 'closed' },
  { label: 'Hết hạn',   value: 'expired' },
]

defineProps<{ modelValue: JobPostingFilterTab }>()

defineEmits<{
  'update:modelValue': [value: JobPostingFilterTab]
  filter: []
  sort: []
}>()
</script>

<style scoped>
.toolbar {
  padding: 1.25rem;
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.filter-tabs { display: flex; gap: 0.5rem; overflow-x: auto; }
.filter-tabs::-webkit-scrollbar { display: none; }

.filter-tab {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  font-family: inherit;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  background: #f1f5f9;
  color: #475569;
  transition: background 0.15s, color 0.15s;
}
.filter-tab:hover { background: #e2e8f0; }
.filter-tab--active { background: var(--color-primary); color: #fff; }

.toolbar-actions { display: flex; gap: 0.75rem; }
.btn-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: none;
  color: var(--color-on-surface-muted);
  cursor: pointer;
  transition: background 0.15s;
}
.btn-icon:hover { background: #f8fafc; }
.icon-xl { font-size: 1.25rem !important; }
</style>

<template>
  <div class="table-wrapper">
    <table class="job-table">
      <thead>
        <tr>
          <th>Thông tin tin tuyển dụng</th>
          <th>Trạng thái</th>
          <th class="col-center">Hiệu suất</th>
          <th>Hạn nộp</th>
          <th class="col-right">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <JobPostingTableRow
          v-for="job in jobs"
          :key="job.id"
          :job="job"
          @view="$emit('view', $event)"
          @edit="$emit('edit', $event)"
          @copy="$emit('copy', $event)"
          @submit="$emit('submit', $event)"
          @extend="$emit('extend', $event)"
          @close="$emit('close', $event)"
          @delete="$emit('delete', $event)"
        />
        <tr v-if="jobs.length === 0">
          <td colspan="5" class="empty">Không có tin tuyển dụng nào.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import JobPostingTableRow from './JobPostingTableRow.vue'
import type { JobPostingRow } from '@/types/employerJobPosting.types'

defineProps<{ jobs: JobPostingRow[] }>()

defineEmits<{
  view:   [id: number]
  edit:   [id: number]
  copy:   [id: number]
  submit: [id: number]
  extend: [id: number]
  close:  [id: number]
  delete: [id: number]
}>()
</script>

<style scoped>
.table-wrapper { overflow-x: auto; }

.job-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}
.job-table thead tr { background: rgba(248,250,252,0.5); }
.job-table th {
  padding: 1rem 1.5rem;
  font-size: 0.625rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-on-surface-muted);
  border-bottom: 1px solid #f1f5f9;
  white-space: nowrap;
}
.col-center { text-align: center; }
.col-right  { text-align: right; }

.job-table tbody tr + tr { border-top: 1px solid #f8fafc; }

.empty {
  padding: 3rem;
  text-align: center;
  color: var(--color-on-surface-muted);
  font-size: 0.875rem;
}
</style>

<template>
  <tr class="table-row">
    <!-- Job info -->
    <td class="td">
      <div class="job-info">
        <span
          v-if="job.isUrgent"
          class="material-symbols-outlined job-info__icon"
          style="font-variation-settings:'FILL' 1"
        >new_releases</span>
        <span
          v-else-if="job.isFeatured"
          class="material-symbols-outlined job-info__icon job-info__icon--star"
          style="font-variation-settings:'FILL' 1"
        >star</span>
        <span v-else class="job-info__spacer" />

        <div>
          <div class="job-info__title-row">
            <h4 class="job-info__title" :class="{ 'job-info__title--draft': job.status === 'draft' }">
              {{ job.title }}
            </h4>
            <span v-if="job.isUrgent"   class="badge badge--urgent">Gấp</span>
            <span v-if="job.isFeatured" class="badge badge--featured">Nổi bật</span>
          </div>
          <p class="job-info__meta">
            {{ job.status === 'draft' ? 'Lưu nháp' : 'Đăng ngày' }}: {{ job.postedAt }}
            • Mã: <span class="job-info__meta-code">{{ job.code }}</span>
          </p>
        </div>
      </div>
    </td>

    <!-- Status -->
    <td class="td">
      <span class="status-chip" :class="statusChipClass">
        <span v-if="job.status === 'active'" class="status-chip__dot status-chip__dot--pulse" />
        {{ statusLabel }}
      </span>
    </td>

    <!-- Performance -->
    <td class="td td--center">
      <div class="performance">
        <div class="performance__item">
          <p class="performance__value">{{ job.views ?? '-' }}</p>
          <p class="performance__label">Lượt xem</p>
        </div>
        <div v-if="job.status !== 'draft'" class="performance__item">
          <p class="performance__value performance__value--primary">{{ job.applicants ?? '-' }}</p>
          <p class="performance__label">Ứng viên</p>
        </div>
      </div>
    </td>

    <!-- Deadline -->
    <td class="td">
      <template v-if="job.deadline">
        <p class="deadline__date" :class="{ 'deadline__date--error': job.status === 'expiring' }">
          {{ job.deadline }}
        </p>
        <p
          v-if="job.daysLeft !== undefined"
          class="deadline__remaining"
          :class="{ 'deadline__remaining--urgent': job.daysLeft <= 3 }"
        >
          Còn {{ job.daysLeft }} ngày
        </p>
      </template>
      <p v-else class="deadline__date deadline__date--muted">-</p>
    </td>

    <!-- Actions -->
    <td class="td td--right">
      <div class="actions">
        <!-- Draft: chỉ edit + delete -->
        <template v-if="job.status === 'draft'">
          <button class="btn-action" title="Chỉnh sửa" @click="$emit('edit', job.id)">
            <span class="material-symbols-outlined icon-xl">edit</span>
          </button>
          <button class="btn-action btn-action--danger" title="Xóa" @click="$emit('delete', job.id)">
            <span class="material-symbols-outlined icon-xl">delete</span>
          </button>
        </template>

        <!-- Pending: nút gửi duyệt nhanh -->
        <template v-else-if="job.status === 'pending'">
          <button class="btn-submit" @click="$emit('submit', job.id)">Gửi duyệt</button>
          <JobPostingDropdown>
            <button class="dropdown-menu__item" @click="$emit('view', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">visibility</span>
              Xem chi tiết
            </button>
            <button class="dropdown-menu__item" @click="$emit('edit', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">edit</span>
              Chỉnh sửa tin
            </button>
            <button class="dropdown-menu__item" @click="$emit('submit', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">send</span>
              Gửi duyệt tin
            </button>
            <div class="dropdown-menu__divider" />
            <button class="dropdown-menu__item dropdown-menu__item--danger" @click="$emit('delete', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">delete</span>
              Xóa tin
            </button>
          </JobPostingDropdown>
        </template>

        <!-- Expiring: nút gia hạn nhanh -->
        <template v-else-if="job.status === 'expiring'">
          <button class="btn-extend" @click="$emit('extend', job.id)">Gia hạn</button>
          <JobPostingDropdown>
            <button class="dropdown-menu__item" @click="$emit('view', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">visibility</span>
              Xem chi tiết
            </button>
            <button class="dropdown-menu__item" @click="$emit('edit', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">edit</span>
              Chỉnh sửa tin
            </button>
            <button class="dropdown-menu__item" @click="$emit('extend', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">update</span>
              Gia hạn tin
            </button>
            <div class="dropdown-menu__divider" />
            <button class="dropdown-menu__item dropdown-menu__item--danger" @click="$emit('close', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">block</span>
              Đóng tin
            </button>
            <button class="dropdown-menu__item dropdown-menu__item--danger" @click="$emit('delete', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">delete</span>
              Xóa tin
            </button>
          </JobPostingDropdown>
        </template>

        <!-- Active + default: icon actions + dropdown -->
        <template v-else>
          <button class="btn-action" title="Chỉnh sửa" @click="$emit('edit', job.id)">
            <span class="material-symbols-outlined icon-xl">edit</span>
          </button>
          <button class="btn-action" title="Sao chép" @click="$emit('copy', job.id)">
            <span class="material-symbols-outlined icon-xl">content_copy</span>
          </button>
          <JobPostingDropdown>
            <button class="dropdown-menu__item" @click="$emit('view', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">visibility</span>
              Xem chi tiết
            </button>
            <button class="dropdown-menu__item" @click="$emit('edit', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">edit</span>
              Chỉnh sửa tin
            </button>
            <button class="dropdown-menu__item" @click="$emit('submit', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">send</span>
              Gửi duyệt tin
            </button>
            <button class="dropdown-menu__item" @click="$emit('extend', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">update</span>
              Gia hạn tin
            </button>
            <div class="dropdown-menu__divider" />
            <button class="dropdown-menu__item dropdown-menu__item--danger" @click="$emit('close', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">block</span>
              Đóng tin
            </button>
            <button class="dropdown-menu__item dropdown-menu__item--danger" @click="$emit('delete', job.id)">
              <span class="material-symbols-outlined dropdown-menu__item-icon">delete</span>
              Xóa tin
            </button>
          </JobPostingDropdown>
        </template>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import JobPostingDropdown from './JobPostingDropdown.vue'
import type { JobPostingRow } from '@/types/employerJobPosting.types'

const props = defineProps<{ job: JobPostingRow }>()

defineEmits<{
  view:   [id: number]
  edit:   [id: number]
  copy:   [id: number]
  submit: [id: number]
  extend: [id: number]
  close:  [id: number]
  delete: [id: number]
}>()

const statusChipClass = computed(() => ({
  'status-chip--active':   props.job.status === 'active',
  'status-chip--pending':  props.job.status === 'pending',
  'status-chip--expiring': props.job.status === 'expiring',
  'status-chip--draft':    props.job.status === 'draft',
  'status-chip--closed':   props.job.status === 'closed',
}))

const statusLabel = computed(() => ({
  active:   'Đang tuyển',
  pending:  'Chờ duyệt',
  expiring: 'Sắp hết hạn',
  draft:    'Nháp',
  closed:   'Đã đóng',
}[props.job.status] ?? props.job.status))
</script>

<style scoped>
.table-row { transition: background 0.15s; }
.table-row:hover { background: rgba(248,250,252,0.5); }

.td {
  padding: 1.25rem 1.5rem;
  vertical-align: middle;
}
.td--center { text-align: center; }
.td--right  { text-align: right; }

/* Job info */
.job-info { display: flex; align-items: flex-start; gap: 0.75rem; }
.job-info__icon { margin-top: 0.125rem; flex-shrink: 0; font-size: 1.25rem !important; color: var(--color-primary); }
.job-info__icon--star { color: var(--color-tertiary); }
.job-info__spacer { width: 1.25rem; flex-shrink: 0; }
.job-info__title-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.job-info__title { font-weight: 700; font-size: 0.9375rem; color: var(--color-on-surface); margin: 0; }
.job-info__title--draft { font-style: italic; opacity: 0.7; }
.job-info__meta { font-size: 0.75rem; color: var(--color-on-surface-muted); margin: 0.25rem 0 0; }
.job-info__meta-code { font-family: monospace; }

/* Badges */
.badge { display: inline-flex; align-items: center; padding: 0.125rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; }
.badge--urgent  { background: var(--color-error-light);   color: var(--color-error-text); }
.badge--featured { background: var(--color-primary-light); color: var(--color-primary-text); }

/* Status chips */
.status-chip { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; white-space: nowrap; }
.status-chip__dot { width: 0.375rem; height: 0.375rem; border-radius: 50%; background: currentColor; }
.status-chip__dot--pulse { animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
.status-chip--active   { background: #dbeafe; color: #2563eb; }
.status-chip--pending  { background: var(--color-tertiary-light); color: var(--color-tertiary-text); }
.status-chip--expiring { background: var(--color-error-light);   color: var(--color-error-text); }
.status-chip--draft    { background: #f1f5f9; color: #64748b; }
.status-chip--closed   { background: #f1f5f9; color: #94a3b8; }

/* Performance */
.performance { display: flex; justify-content: center; gap: 1.5rem; }
.performance__item { text-align: center; }
.performance__value { font-size: 0.75rem; font-weight: 700; color: var(--color-on-surface); margin: 0; }
.performance__value--primary { color: var(--color-primary); }
.performance__label { font-size: 0.625rem; color: var(--color-on-surface-muted); font-weight: 500; margin: 0; }

/* Deadline */
.deadline__date { font-size: 0.875rem; font-weight: 600; color: var(--color-on-surface); margin: 0; }
.deadline__date--error  { color: var(--color-error); }
.deadline__date--muted  { color: var(--color-on-surface-muted); }
.deadline__remaining { font-size: 0.625rem; color: var(--color-on-surface-muted); font-weight: 500; margin: 0.125rem 0 0; }
.deadline__remaining--urgent { color: var(--color-error); font-style: italic; }

/* Actions */
.actions { display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; }
.btn-action { width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); border: none; background: none; color: var(--color-on-surface-muted); cursor: pointer; transition: background 0.15s; }
.btn-action:hover { background: #f1f5f9; }
.btn-action--danger:hover { background: rgba(239,68,68,0.08); color: var(--color-error); }
.btn-submit { padding: 0.375rem 0.75rem; background: rgba(75,154,246,0.1); color: var(--color-primary); font-family: inherit; font-size: 0.625rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; border-radius: var(--radius-sm); border: none; cursor: pointer; transition: background 0.15s, color 0.15s; }
.btn-submit:hover { background: var(--color-primary); color: #fff; }
.btn-extend { padding: 0.375rem 0.75rem; background: none; color: var(--color-on-surface); font-family: inherit; font-size: 0.625rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; border-radius: var(--radius-sm); border: 1px solid var(--color-border); cursor: pointer; transition: background 0.15s; }
.btn-extend:hover { background: #f1f5f9; }
.icon-xl { font-size: 1.25rem !important; }
</style>

<template>
  <div class="dropdown" ref="dropdownRef">
    <button class="btn-action" @click.stop="toggle">
      <span class="material-symbols-outlined icon-xl">more_vert</span>
    </button>
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="dropdown-menu"
        :style="menuStyle"
        @click.stop
      >
        <slot />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement>()
const menuStyle = ref({})

const toggle = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick()
    positionMenu()
  }
}

const positionMenu = () => {
  if (!dropdownRef.value) return
  const rect = dropdownRef.value.getBoundingClientRect()
  menuStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    right: `${window.innerWidth - rect.right}px`,
    zIndex: 9999,
  }
}

const onClickOutside = (e: MouseEvent) => {
  if (!dropdownRef.value?.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.dropdown { position: relative; display: inline-block; }

.btn-action {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: none;
  background: none;
  color: var(--color-on-surface-muted);
  cursor: pointer;
  transition: background 0.15s;
}
.btn-action:hover { background: #f1f5f9; }
.icon-xl { font-size: 1.25rem !important; }
</style>

<!-- dropdown-menu style phải là non-scoped vì dùng Teleport to body -->
<style>
.dropdown-menu {
  width: 14rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
  border: 1px solid #f1f5f9;
  padding: 0.5rem 0;
  overflow: hidden;
}
.dropdown-menu__item {
  width: 100%;
  padding: 0.625rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  color: #0f172a;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  box-sizing: border-box;
}
.dropdown-menu__item:hover { background: #f8fafc; }
.dropdown-menu__item--danger { color: #ef4444; }
.dropdown-menu__item--danger:hover { background: rgba(239,68,68,0.05); }
.dropdown-menu__item-icon { color: #4B9AF6; font-size: 1.25rem !important; }
.dropdown-menu__item--danger .dropdown-menu__item-icon { color: #ef4444; }
.dropdown-menu__divider { height: 1px; background: #f1f5f9; margin: 0.25rem 0; }
</style>

<template>
  <div class="pagination-bar">
    <p class="pagination-bar__info">
      Hiển thị <strong>{{ rangeStart }}-{{ rangeEnd }}</strong>
      trong số <strong>{{ total }}</strong> tin tuyển dụng
    </p>
    <div class="pagination-controls">
      <button class="page-btn" :disabled="currentPage <= 1" @click="$emit('update:currentPage', currentPage - 1)">
        <span class="material-symbols-outlined icon-xl">chevron_left</span>
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        class="page-btn"
        :class="{ 'page-btn--active': page === currentPage }"
        @click="$emit('update:currentPage', page)"
      >
        {{ page }}
      </button>
      <span v-if="showEllipsis" class="page-separator">...</span>
      <button class="page-btn" :disabled="currentPage >= totalPages" @click="$emit('update:currentPage', currentPage + 1)">
        <span class="material-symbols-outlined icon-xl">chevron_right</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  total: number
  currentPage: number
  perPage?: number
}>()

defineEmits<{ 'update:currentPage': [page: number] }>()

const perPage  = computed(() => props.perPage ?? 10)
const totalPages = computed(() => Math.ceil(props.total / perPage.value))
const rangeStart = computed(() => (props.currentPage - 1) * perPage.value + 1)
const rangeEnd   = computed(() => Math.min(props.currentPage * perPage.value, props.total))

const visiblePages = computed(() => {
  const pages: number[] = []
  for (let i = 1; i <= Math.min(totalPages.value, 3); i++) pages.push(i)
  return pages
})

const showEllipsis = computed(() => totalPages.value > 3)
</script>

<style scoped>
.pagination-bar {
  padding: 1rem 1.5rem;
  background: rgba(248,250,252,0.3);
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pagination-bar__info { font-size: 0.75rem; font-weight: 500; color: var(--color-on-surface-muted); margin: 0; }
.pagination-bar__info strong { font-weight: 700; color: var(--color-on-surface); }

.pagination-controls { display: flex; align-items: center; gap: 0.25rem; }
.page-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: none;
  background: none;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: inherit;
  color: var(--color-on-surface);
  cursor: pointer;
  transition: background 0.15s;
}
.page-btn:hover          { background: #f1f5f9; }
.page-btn--active        { background: var(--color-primary); color: #fff; }
.page-btn--active:hover  { background: var(--color-primary); }
.page-btn:disabled       { opacity: 0.3; cursor: default; }
.page-btn:disabled:hover { background: none; }
.page-separator { color: #cbd5e1; margin: 0 0.25rem; font-size: 0.75rem; }
.icon-xl { font-size: 1.25rem !important; }
</style>