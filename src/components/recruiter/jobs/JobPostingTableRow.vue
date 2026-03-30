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
.job-info__title { font-weight: 700; font-size: 1.125rem; color: var(--color-on-surface); margin: 0; }
.job-info__title--draft { font-style: italic; opacity: 0.7; }
.job-info__meta { font-size: 0.875rem; color: var(--color-on-surface-muted); margin: 0.25rem 0 0; }
.job-info__meta-code { font-family: monospace; }

/* Badges */
.badge { display: inline-flex; align-items: center; padding: 0.125rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; }
.badge--urgent  { background: var(--color-error-light);   color: var(--color-error-text); }
.badge--featured { background: var(--color-primary-light); color: var(--color-primary-text); }

/* Status chips */
.status-chip { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.875rem; font-weight: 700; white-space: nowrap; }
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
.performance__value { font-size: 0.875rem; font-weight: 700; color: var(--color-on-surface); margin: 0; }
.performance__value--primary { color: var(--color-primary); }
.performance__label { font-size: 0.75rem; color: var(--color-on-surface-muted); font-weight: 700; margin: 0; }

/* Deadline */
.deadline__date { font-size: 0.875rem; font-weight: 700; color: var(--color-on-surface); margin: 0; }
.deadline__date--error  { color: var(--color-error); }
.deadline__date--muted  { color: var(--color-on-surface-muted); }
.deadline__remaining { font-size: 0.75rem; color: var(--color-on-surface-muted); font-weight: 700; margin: 0.125rem 0 0; }
.deadline__remaining--urgent { color: var(--color-error); font-style: italic; }

/* Actions */
.actions { display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; }
.btn-action { width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); border: none; background: none; color: var(--color-on-surface-muted); cursor: pointer; transition: background 0.15s; }
.btn-action:hover { background: #f1f5f9; }
.btn-action--danger:hover { background: rgba(239,68,68,0.08); color: var(--color-error); }
.btn-submit { padding: 0.375rem 0.75rem; background: rgba(75,154,246,0.1); color: var(--color-primary); font-family: inherit; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; border-radius: var(--radius-sm); border: none; cursor: pointer; transition: background 0.15s, color 0.15s; }
.btn-submit:hover { background: var(--color-primary); color: #fff; }
.btn-extend { padding: 0.375rem 0.75rem; background: none; color: var(--color-on-surface); font-family: inherit; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; border-radius: var(--radius-sm); border: 1px solid var(--color-border); cursor: pointer; transition: background 0.15s; }
.btn-extend:hover { background: #f1f5f9; }
.icon-xl { font-size: 1.25rem !important; }
</style>
