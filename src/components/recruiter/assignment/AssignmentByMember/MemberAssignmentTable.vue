<template>
  <div class="assign-table">
    <div class="assign-table__header">
      <h3 class="assign-table__title">Danh sách việc được giao</h3>
      <button class="assign-table__filter-btn">
        <span class="material-symbols-outlined">filter_list</span> Lọc
      </button>
    </div>

    <div class="assign-table__wrap">
      <table class="assign-table__table">
        <thead>
          <tr>
            <th class="assign-table__th">Thông tin tin</th>
            <th class="assign-table__th">Trạng thái</th>
            <th class="assign-table__th">Hạn nộp</th>
            <th class="assign-table__th assign-table__th--right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in assignments" :key="row.id" class="assign-table__row">
            <td class="assign-table__td">
              <p class="assign-table__job-title">{{ row.title }}</p>
              <p class="assign-table__job-meta">{{ row.company }} • ID: {{ row.code }}</p>
            </td>
            <td class="assign-table__td">
              <span :class="['assign-table__status', `assign-table__status--${row.status}`]">
                {{ statusLabel[row.status] }}
              </span>
            </td>
            <td :class="['assign-table__td', row.status === 'expiring' && 'assign-table__td--warn']">
              {{ row.deadline }}
            </td>
            <td class="assign-table__td assign-table__td--right">
              <div class="assign-table__actions">
                <button class="assign-table__action-btn" :disabled="row.done" title="Chuyển giao">
                  <span class="material-symbols-outlined">swap_horiz</span>
                </button>
                <button class="assign-table__action-btn assign-table__action-btn--danger" :disabled="row.done" title="Gỡ phân công">
                  <span class="material-symbols-outlined">person_remove</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="assign-table__footer">
      <span class="assign-table__info">Hiển thị 1-{{ assignments.length }} của {{ assignments.length }} công việc</span>
      <div class="assign-table__pagination">
        <button class="assign-table__pag-btn" disabled>
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="assign-table__pag-btn assign-table__pag-btn--active">1</button>
        <button class="assign-table__pag-btn">2</button>
        <button class="assign-table__pag-btn">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  assignments: {
    id: number; title: string; company: string; code: string
    status: string; deadline: string; done: boolean
  }[]
}>()

const statusLabel: Record<string, string> = {
  active:    'Đang tuyển',
  expiring:  'Sắp hết hạn',
  completed: 'Hoàn thành',
}
</script>

<style scoped>
.assign-table {
  background: #fff; border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid rgba(226,232,240,0.3);
  display: flex; flex-direction: column; overflow: hidden; flex: 1;
}

.assign-table__header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(226,232,240,0.3);
  background: rgba(248,250,253,0.5); flex-shrink: 0;
}
.assign-table__title { font-size: 1.125rem; font-weight: 700; color: #0f172a; }
.assign-table__filter-btn {
  display: flex; align-items: center; gap: 4px;
  font-size: 1rem; font-weight: 600; color: #4B9AF6;
  background: none; border: none; cursor: pointer;
  font-family: 'Manrope', sans-serif; transition: color 0.15s;
}
.assign-table__filter-btn .material-symbols-outlined { font-size: 18px; }

.assign-table__wrap { overflow-x: auto; flex: 1; }
.assign-table__table { width: 100%; border-collapse: collapse; text-align: left; }

.assign-table__th {
  padding: 12px 16px; font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.07em; color: #64748b;
  background: #f8fafd; border-bottom: 1px solid rgba(226,232,240,0.5);
}
.assign-table__th--right { text-align: right; }

.assign-table__row { transition: background 0.15s; }
.assign-table__row:hover { background: rgba(248,250,253,0.3); }
.assign-table__row + .assign-table__row { border-top: 1px solid #f8fafc; }

.assign-table__td { padding: 1rem 1rem; vertical-align: middle; color: #64748b; font-size: 0.875rem; }
.assign-table__td--warn { color: #0f172a; font-weight: 500; }
.assign-table__td--right { text-align: right; }

.assign-table__job-title {
  font-size: 1rem; font-weight: 700; color: #0f172a;
  margin-bottom: 2px; cursor: pointer; transition: color 0.15s;
}
.assign-table__row:hover .assign-table__job-title { color: #4B9AF6; }
.assign-table__job-meta { font-size: 0.875rem; color: #64748b; }

.assign-table__status {
  display: inline-flex; align-items: center;
  padding: 4px 10px; border-radius: 999px;
  font-size: 0.875rem; font-weight: 700;
}
.assign-table__status--active    { background: #dbeafe; color: #1d4ed8; }
.assign-table__status--expiring  { background: #fef3c7; color: #b45309; }
.assign-table__status--completed { background: #d1fae5; color: #065f46; }

.assign-table__actions { display: flex; align-items: center; justify-content: flex-end; gap: 6px; }
.assign-table__action-btn {
  padding: 6px; border: none; background: none;
  border-radius: 6px; cursor: pointer; color: #64748b;
  display: flex; align-items: center; transition: all 0.15s;
}
.assign-table__action-btn:hover:not(:disabled) { color: #4B9AF6; background: #e0f2fe; }
.assign-table__action-btn--danger:hover:not(:disabled) { color: #ef4444; background: #fee2e2; }
.assign-table__action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.assign-table__action-btn .material-symbols-outlined { font-size: 20px; }

/* Footer / pagination */
.assign-table__footer {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(226,232,240,0.3);
  background: #fff; flex-shrink: 0;
}
.assign-table__info { font-size: 0.875rem; color: #64748b; }
.assign-table__pagination { display: flex; align-items: center; gap: 4px; }
.assign-table__pag-btn {
  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  border-radius: 6px; border: none; background: none;
  font-size: 0.875rem; font-weight: 700; color: #64748b;
  cursor: pointer; transition: background 0.15s;
  font-family: 'Manrope', sans-serif;
}
.assign-table__pag-btn:hover:not(:disabled) { background: #f1f4f9; }
.assign-table__pag-btn--active { background: #e0f2fe; color: #4B9AF6; }
.assign-table__pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.assign-table__pag-btn .material-symbols-outlined { font-size: 16px; }
</style>