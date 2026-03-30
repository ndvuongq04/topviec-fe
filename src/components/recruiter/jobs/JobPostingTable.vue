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
