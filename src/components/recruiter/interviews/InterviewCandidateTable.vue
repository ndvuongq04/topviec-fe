<template>
  <section class="candidate-table">
    <!-- Table Header -->
    <div class="candidate-table__header">
      <div class="candidate-table__header-left">
        <span class="material-symbols-outlined icon-primary">groups</span>
        <h3 class="candidate-table__title">
          Danh sách ứng viên:
          <span class="candidate-table__title--highlight">{{ stageName }}</span>
        </h3>
      </div>
      <div class="candidate-table__actions">
        <button class="btn-outline" @click="$emit('filter')">
          <span class="material-symbols-outlined btn-icon">filter_list</span>
          Bộ lọc
        </button>
        <button class="btn-outline" @click="$emit('export')">
          <span class="material-symbols-outlined btn-icon">download</span>
          Xuất dữ liệu
        </button>
      </div>
    </div>

    <!-- Table -->
    <table class="table">
      <thead>
        <tr>
          <th>Ứng viên</th>
          <th>Ngày &amp; Giờ</th>
          <th>Người phỏng vấn</th>
          <th>Hình thức</th>
          <th>Trạng thái</th>
          <th class="text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <InterviewCandidateRow
          v-for="candidate in candidates"
          :key="candidate.id"
          :candidate="candidate"
          @open-link="emit('openLink', $event)"
          @view-detail="emit('viewDetail', $event)"
          @reschedule="emit('reschedule', $event)"
          @remind="emit('remind', $event)"
          @cancel="emit('cancel', $event)"
        />
      </tbody>
    </table>

    <!-- Pagination Footer -->
    <div class="candidate-table__footer">
      <span class="candidate-table__footer-text">
        Hiển thị {{ candidates?.length || 0 }} trên {{ totalCount }} ứng viên vòng {{ stageName }}
      </span>
      <div class="pagination">
        <button
          class="pagination__btn"
          :disabled="currentPage <= 1"
          @click="$emit('pageChange', currentPage - 1)"
        >
          <span class="material-symbols-outlined pagination__icon">chevron_left</span>
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="pagination__page"
          :class="{ 'pagination__page--active': page === currentPage }"
          @click="$emit('pageChange', page)"
        >
          {{ page }}
        </button>
        <button
          class="pagination__btn"
          :disabled="currentPage >= totalPages"
          @click="$emit('pageChange', currentPage + 1)"
        >
          <span class="material-symbols-outlined pagination__icon">chevron_right</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InterviewCandidateRow from './InterviewCandidateRow.vue'

interface Interviewer {
  id: number
  name: string
  avatarUrl?: string
  initials: string
}

interface InterviewCandidate {
  id: number
  name: string
  role: string
  avatarUrl: string
  dateLabel: string
  dateFormatted: string
  interviewer: Interviewer
  format: string
  formatType: 'online' | 'offline'
  status: 'confirmed' | 'pending' | 'overdue'
}

defineProps<{
  stageName: string
  candidates: InterviewCandidate[]
  totalCount: number
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  filter: []
  export: []
  openLink: [candidateId: number]
  viewDetail: [candidateId: number]
  reschedule: [candidateId: number]
  pageChange: [page: number]
  remind: [candidateId: number]
  cancel: [candidateId: number]
}>()
</script>

<style scoped>
/* ============================================
   Font Size Scale (skill-font.md):
   1.875rem (30px) = Page title, stats lớn
   1.125rem (18px) = Tên item chính
   1rem     (16px) = Body, button cấp 1
   0.875rem (14px) = Data cells, metadata, chip
   0.75rem  (12px) = th, badge, label nhỏ (bold + uppercase)
   ============================================ */

.candidate-table {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #f1f5f9;
}

/* --- Section Header --- */
.candidate-table__header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(248, 250, 252, 0.3);
}

.candidate-table__header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-primary {
  color: #4b9af6;
}

.candidate-table__title {
  font-size: 0.875rem;            /* 14px – metadata / section label */
  font-weight: 700;
  color: #0f172a;
}

.candidate-table__title--highlight {
  color: #4b9af6;
}

.candidate-table__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  padding: 0.375rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.75rem;             /* 12px – nút phụ thu gọn, bold */
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-outline:hover {
  background: #f8fafc;
}

.btn-icon {
  font-size: 0.875rem;            /* 14px – icon trong nút */
}

/* --- Table --- */
.table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

.table thead {
  background: rgba(248, 250, 252, 0.5);
}

.table th {
  padding: 1rem 1.5rem;
  font-size: 0.75rem;             /* 12px – tiêu đề bảng (th), bold + uppercase */
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.table th.text-right {
  text-align: right;
}

.table tbody tr {
  border-bottom: 1px solid #f8fafc;
}

/* --- Footer / Pagination --- */
.candidate-table__footer {
  padding: 1rem 1.5rem;
  background: rgba(248, 250, 252, 0.3);
  border-top: 1px solid #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.candidate-table__footer-text {
  font-size: 0.875rem;            /* 14px – metadata */
  color: #64748b;
  font-weight: 500;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination__btn {
  padding: 0.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  cursor: pointer;
  background: transparent;
  transition: background 0.15s;
}

.pagination__btn:hover:not(:disabled) {
  background: #fff;
}

.pagination__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination__icon {
  font-size: 1.25rem;             /* 20px – icon điều hướng */
}

.pagination__page {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;            /* 14px – pagination text */
  font-weight: 700;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #64748b;
}

.pagination__page--active {
  background: #4b9af6;
  color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>