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
