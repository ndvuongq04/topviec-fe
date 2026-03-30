<template>
  <div class="table-card">
    <table class="candidate-table">
      <thead>
        <tr class="table-head-row">
          <th class="th">Ứng viên</th>
          <th class="th">Vị trí ứng tuyển</th>
          <th class="th">Ngày ứng tuyển</th>
          <th class="th">Đánh giá</th>
          <th class="th">Trạng thái</th>
          <th class="th th--right">Thao tác</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          v-for="c in candidates"
          :key="c.id"
          class="table-row"
          @click="goToDetail(c.id)"
        >
          <!-- Candidate info -->
          <td class="td">
            <div class="candidate-info">
              <img :src="c.avatar" :alt="c.name" class="candidate-avatar" />
              <div>
                <p class="candidate-name">{{ c.name }}</p>
                <p class="candidate-email">{{ c.email }}</p>
              </div>
            </div>
          </td>

          <!-- Position -->
          <td class="td">
            <p class="cell-text">{{ c.position }}</p>
          </td>

          <!-- Applied at -->
          <td class="td">
            <p class="cell-text cell-text--muted">{{ c.appliedAt }}</p>
          </td>

          <!-- Rating -->
          <td class="td">
            <div class="stars">
              <span
                v-for="n in 5"
                :key="n"
                class="material-symbols-outlined star-icon"
                :style="n <= c.rating ? { fontVariationSettings: `'FILL' 1` } : {}"
              >star</span>
            </div>
          </td>

          <!-- Status -->
          <td class="td">
            <span :class="`status-badge status-badge--${c.status}`">
              {{ statusLabel[c.status] }}
            </span>
          </td>

          <!-- Actions -->
          <td class="td td--right">
            <div class="action-group">
              <button 
                class="action-btn" 
                title="Xem chi tiết"
                @click.stop="goToDetail(c.id)"
              >
                <span class="material-symbols-outlined">visibility</span>
              </button>
              <button class="action-btn" title="Phân loại nhanh">
                <span class="material-symbols-outlined">label</span>
              </button>
              <button class="action-btn" title="Tải CV">
                <span class="material-symbols-outlined">download</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <p class="pagination-info">
        Hiển thị <strong>1-10</strong> trong <strong>1,284</strong> hồ sơ
      </p>
      <div class="pagination-controls">
        <button class="page-btn page-btn--nav" disabled>
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="page-btn page-btn--active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <span class="page-ellipsis">...</span>
        <button class="page-btn">129</button>
        <button class="page-btn page-btn--nav">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

defineProps<{ candidates: any[] }>()

const router = useRouter()
const route = useRoute()

const statusLabel: Record<string, string> = {
  new:      'Mới',
  viewed:   'Đã xem',
  fit:      'Phù hợp',
  consider: 'Cân nhắc',
  rejected: 'Từ chối',
}

const goToDetail = (candidateId: string) => {
  router.push({
    name: 'recruiter-application-detail',
    params: {
      id: route.params.id,
      applicationId: candidateId
    }
  })
}
</script>

<style scoped>
.table-card {
  background: #fff;
  border-radius: 0 0 0.75rem 0.75rem;
  border: 1px solid #f1f5f9;
  border-top: none;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  overflow: hidden;
}

.candidate-table { width: 100%; border-collapse: collapse; text-align: left; }

.table-head-row { background: rgba(248,250,252,.6); border-bottom: 1px solid #f1f5f9; }
.th {
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: .05em;
}
.th--right { text-align: right; }

.table-body .table-row { border-bottom: 1px solid #f8fafc; transition: background .15s; cursor: pointer; }
.table-body .table-row:hover { background: rgba(248,250,252,.6); }

.td { padding: 1rem 1.5rem; vertical-align: middle; }
.td--right { text-align: right; }

/* Candidate info */
.candidate-info { display: flex; align-items: center; gap: 0.75rem; }
.candidate-avatar { width: 2.5rem; height: 2.5rem; border-radius: 9999px; object-fit: cover; }
.candidate-name  { font-size: 1.125rem; font-weight: 700; color: #0f172a; }
.candidate-email { font-size: 0.75rem; color: #64748b; margin-top: 0.125rem; }

/* Cells */
.cell-text       { font-size: 0.875rem; font-weight: 500; color: #0f172a; }
.cell-text--muted{ color: #64748b; }

/* Stars */
.stars     { display: flex; gap: 0.1rem; color: #fbbf24; }
.star-icon { font-size: 1.125rem; }

/* Status badges */
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}
.status-badge--new      { background: #dbeafe; color: #2563eb; }
.status-badge--viewed   { background: #e0e7ff; color: #4338ca; }
.status-badge--fit      { background: #d1fae5; color: #059669; }
.status-badge--consider { background: #fef3c7; color: #d97706; }
.status-badge--rejected { background: #fee2e2; color: #dc2626; }

/* Actions */
.action-group { display: inline-flex; gap: 0.25rem; }
.action-btn {
  padding: 0.375rem;
  border-radius: 0.375rem;
  color: #94a3b8;
  transition: color .15s, background .15s;
  cursor: pointer;
}
.action-btn:hover { color: #4B9AF6; background: #eff6ff; }

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-top: 1px solid #f1f5f9;
  background: rgba(248,250,252,.4);
}
.pagination-info { font-size: 0.875rem; color: #64748b; }
.pagination-info strong { font-weight: 700; color: #0f172a; }

.pagination-controls { display: flex; gap: 0.5rem; align-items: center; }
.page-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid transparent;
  transition: background .15s, border-color .15s;
  cursor: pointer;
}
.page-btn:hover:not(:disabled):not(.page-btn--active) {
  background: #fff;
  border-color: #e2e8f0;
}
.page-btn--active { background: #4B9AF6; color: #fff; font-weight: 700; }
.page-btn--nav    { padding: 0.5rem; border: 1px solid #e2e8f0; }
.page-btn:disabled{ opacity: .4; cursor: not-allowed; }
.page-ellipsis    { font-size: 0.875rem; color: #64748b; align-self: center; }
</style>