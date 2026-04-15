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
            <th
              v-for="col in planColumns"
              :key="col.id"
              class="compare-table__th"
            >
              {{ col.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.label" class="compare-table__row">
            <td class="compare-table__td compare-table__td--label">{{ row.label }}</td>
            <td
              v-for="col in planColumns"
              :key="col.id"
              class="compare-table__td"
            >
              <template v-if="typeof row.values[col.id] === 'boolean'">
                <span :class="['material-symbols-outlined', row.values[col.id] ? 'icon--check' : 'icon--remove']">
                  {{ row.values[col.id] ? 'check' : 'remove' }}
                </span>
              </template>
              <span v-else class="compare-table__value">{{ row.values[col.id] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ResServicePackageDTO } from '@/types/servicePackage.types'

const props = defineProps<{
  packages: ResServicePackageDTO[]
}>()

const open = ref(true)

// ─── Cấu hình các tính năng cần so sánh ─────────────────────────────────────
interface FeatureConfig {
  key:    string
  label:  string
  format: (value: unknown) => string | boolean
}

const FEATURE_CONFIG: FeatureConfig[] = [
  {
    key:   'hot_job_quota',
    label: 'Tin nổi bật',
    format: (v) => {
      const n = Number(v)
      if (n === 0)    return false
      if (n >= 999)   return 'Không giới hạn'
      return `${n} tin`
    },
  },
  {
    key:   'cv_search_quota',
    label: 'Tìm kiếm ứng viên',
    format: (v) => {
      const n = Number(v)
      if (n === 0)    return false
      if (n >= 999)   return 'Không giới hạn'
      return `${n} lượt`
    },
  },
  {
    key:    'top_brand_badge',
    label:  'Huy hiệu thương hiệu',
    format: (v) => Boolean(v),
  },
  {
    key:    'unlimited_post',
    label:  'Đăng tin không giới hạn',
    format: (v) => Boolean(v),
  },
]

// ─── Cột (tên gói) ───────────────────────────────────────────────────────────
const planColumns = computed(() =>
  props.packages.map(pkg => ({ id: String(pkg.id), name: pkg.name }))
)

// ─── Hàng (tính năng × giá trị theo từng gói) ───────────────────────────────
const rows = computed(() =>
  FEATURE_CONFIG.map(config => {
    const values: Record<string, string | boolean> = {}
    for (const pkg of props.packages) {
      values[String(pkg.id)] = config.format(pkg.features?.[config.key])
    }
    return { label: config.label, values }
  })
)
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

.compare-table__row:hover td { background: #f8fafc; }

.compare-table__td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #f8fafc;
  color: #64748b;
}
.compare-table__td--label { font-weight: 600; color: #334155; text-align: left; padding-left: 1.5rem; }

.compare-table__value { color: #64748b; }

.icon--check { color: #10b981; font-size: 1.125rem; vertical-align: middle; }
.icon--remove { color: #e2e8f0; font-size: 1.125rem; vertical-align: middle; }
</style>
