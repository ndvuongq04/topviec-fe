<template>
  <div class="proposal-table">
    <!-- Header -->
    <div class="proposal-table__header">
      <h4 class="proposal-table__title">Danh sách đề xuất</h4>
      <button class="proposal-table__menu">
        <span class="material-symbols-outlined">more_vert</span>
      </button>
    </div>

    <!-- Table -->
    <table class="table">
      <thead>
        <tr>
          <th>Ứng viên</th>
          <th>Vòng PV</th>
          <th>Khung giờ đề xuất</th>
          <th>Trạng thái</th>
          <th class="text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <ProposalTableRow
          v-for="item in proposals"
          :key="item.id"
          :proposal="item"
          @resend="$emit('resend', item.id)"
          @cancel="$emit('cancel', item.id)"
          @view-schedule="$emit('view-schedule', item.id)"
          @new-proposal="$emit('new-proposal', item.candidateId)"
        />

        <!-- Empty state fallback -->
        <tr v-if="!proposals.length">
          <td colspan="5" class="table__empty">
            Chưa có đề xuất nào.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="proposal-table__footer">
      <span class="proposal-table__count">
        Hiển thị {{ proposals.length }} trong tổng số {{ total }} đề xuất
      </span>
      <div class="proposal-table__paging">
        <button
          class="paging-btn"
          :disabled="currentPage <= 1"
          @click="$emit('page-change', currentPage - 1)"
        >
          Trước
        </button>
        <button
          class="paging-btn"
          @click="$emit('page-change', currentPage + 1)"
        >
          Tiếp
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProposalTableRow from './ProposalTableRow.vue'

defineProps<{
  proposals: any[]
  total: number
  currentPage: number
}>()

defineEmits<{
  resend: [id: string]
  cancel: [id: string]
  'view-schedule': [id: string]
  'new-proposal': [candidateId: string]
  'page-change': [page: number]
}>()
</script>

<style scoped>
.proposal-table {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.04);
  overflow: hidden;
  border: 1px solid #f8fafc;
}

/* ── Header ── */
.proposal-table__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f8fafc;
  background: rgb(248 250 252 / 0.3);
}

.proposal-table__title {
  font-weight: 700;
  color: #0f172a;
  font-size: 0.9375rem;
}

.proposal-table__menu {
  padding: 0.375rem;
  border: none;
  background: none;
  border-radius: 0.375rem;
  color: #64748b;
  cursor: pointer;
  transition: background 0.15s;
}
.proposal-table__menu:hover {
  background: #fff;
}

/* ── Table ── */
.table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

.table thead {
  background: rgb(248 250 252 / 0.5);
}

.table th {
  padding: 1rem 1.5rem;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table .text-right {
  text-align: right;
}

.table__empty {
  padding: 3rem 1.5rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
}

/* ── Footer / Pagination ── */
.proposal-table__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgb(248 250 252 / 0.3);
}

.proposal-table__count {
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
}

.proposal-table__paging {
  display: flex;
  gap: 0.5rem;
}

.paging-btn {
  padding: 0.25rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  background: transparent;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.15s;
}

.paging-btn:hover:not(:disabled) {
  background: #fff;
}

.paging-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>