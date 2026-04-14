<template>
  <section class="table-section">
    <div class="table-section__header" @click="open = !open">
      <h3 class="table-section__title">So sánh chi tiết các tính năng</h3>
      <span :class="['material-symbols-outlined', 'table-section__icon', open && 'table-section__icon--open']">expand_more</span>
    </div>

    <div v-show="open" class="table-section__body">
      <table class="compare-table">
        <thead>
          <tr>
            <th class="compare-table__th compare-table__th--feature">Tính năng</th>
            <th v-for="p in planNames" :key="p.id" :class="['compare-table__th', p.id === 'pro' && 'compare-table__th--pro']">
              {{ p.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.label" class="compare-table__row">
            <td class="compare-table__td compare-table__td--label">{{ row.label }}</td>
            <td v-for="p in planNames" :key="p.id" :class="['compare-table__td', p.id === 'pro' && 'compare-table__td--pro']">
              <template v-if="typeof row[p.id] === 'boolean'">
                <span :class="['material-symbols-outlined', row[p.id] ? 'icon--check' : 'icon--remove']">
                  {{ row[p.id] ? 'check' : 'remove' }}
                </span>
              </template>
              <span v-else :class="['compare-table__value', p.id === 'pro' && 'compare-table__value--pro']">
                {{ row[p.id] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(true)

const planNames = [
  { id: 'free', name: 'Free' },
  { id: 'basic', name: 'Basic' },
  { id: 'pro', name: 'Pro' },
  { id: 'premium', name: 'Premium' },
  { id: 'vip', name: 'VIP' },
]

const rows = [
  { label: 'Tin nổi bật',        free: false, basic: '2 tin',    pro: '10 tin',     premium: '25 tin',    vip: 'Không giới hạn' },
  { label: 'Tìm kiếm ứng viên',  free: false, basic: true,       pro: true,         premium: true,        vip: true },
  { label: 'Đánh giá CV-JD AI',  free: false, basic: false,      pro: '50 lượt',    premium: '200 lượt',  vip: 'Không giới hạn' },
  { label: 'Hiển thị trang chủ', free: false, basic: false,      pro: false,        premium: true,        vip: true },
  { label: 'Huy hiệu uy tín',    free: false, basic: false,      pro: false,        premium: true,        vip: true },
]
</script>

<style scoped>
.table-section {
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  border: 1px solid #f1f5f9;
  margin-bottom: 3rem;
}
.table-section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: rgba(248,250,252,0.5);
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  user-select: none;
}
.table-section__title { font-size: 1.125rem; font-weight: 800; color: #0f172a; }
.table-section__icon { transition: transform 0.2s; color: #64748b; }
.table-section__icon--open { transform: rotate(180deg); }
.table-section__body { overflow-x: auto; }

.compare-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; text-align: left; }
.compare-table__th {
  padding: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  border-bottom: 1px solid #f1f5f9;
  text-align: center;
}
.compare-table__th--feature { text-align: left; padding-left: 1.5rem; }
.compare-table__th--pro { background: rgba(239,246,255,0.3); }

.compare-table__row:hover td { background: #f8fafc; }
.compare-table__row:hover td.compare-table__td--pro { background: #eff6ff; }

.compare-table__td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #f8fafc;
  color: #64748b;
}
.compare-table__td--label { font-weight: 600; color: #334155; text-align: left; padding-left: 1.5rem; }
.compare-table__td--pro { background: rgba(239,246,255,0.3); }

.compare-table__value--pro { color: #4B9AF6; font-weight: 700; }

.icon--check { color: #10b981; font-size: 1.125rem; vertical-align: middle; }
.icon--remove { color: #e2e8f0; font-size: 1.125rem; vertical-align: middle; }
</style>