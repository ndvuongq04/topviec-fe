<template>
  <div class="ct-wrap">
    <table class="ct-table">
      <thead>
        <tr>
          <th class="ct-th">Mã</th>
          <th class="ct-th">Người báo cáo</th>
          <th class="ct-th">Tin bị báo cáo</th>
          <th class="ct-th">Loại vi phạm</th>
          <th class="ct-th">Nhóm</th>
          <th class="ct-th">SLA</th>
          <th class="ct-th ct-th--center">Bằng chứng</th>
          <th class="ct-th">Trạng thái</th>
          <th class="ct-th ct-th--right">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in complaints" :key="row.id"
          :class="['ct-row', row.highlighted ? 'ct-row--highlighted' : '']"
          @click="$emit('select', row)"
        >
          <!-- Mã + Ngày -->
          <td class="ct-td">
            <span :class="['ct-id', row.highlighted ? 'ct-id--active' : '']">{{ row.id }}</span>
            <div class="ct-date">{{ row.date }}</div>
          </td>

          <!-- Người báo cáo (UV) -->
          <td class="ct-td">
            <div class="ct-sender">
              <img v-if="row.reporter.avatar" :src="row.reporter.avatar" :alt="row.reporter.name" class="ct-avatar" />
              <div v-else class="ct-avatar-initials" :style="{ background: row.reporter.initials_bg }">
                {{ row.reporter.initials }}
              </div>
              <span class="ct-sender-name">{{ row.reporter.name }}</span>
            </div>
          </td>

          <!-- Tin bị báo cáo -->
          <td class="ct-td">
            <div class="ct-job-title">{{ row.target.jobTitle }}</div>
            <div class="ct-employer-name">{{ row.target.employerName }}</div>
          </td>

          <!-- Loại vi phạm -->
          <td class="ct-td">
            <span class="ct-category">{{ categoryLabel[row.category] }}</span>
          </td>

          <!-- Nhóm A / B -->
          <td class="ct-td">
            <span :class="['ct-group-badge', `group-${row.group.toLowerCase()}`]">Nhóm {{ row.group }}</span>
          </td>

          <!-- SLA còn lại -->
          <td class="ct-td">
            <template v-if="row.status === 'resolved' || row.status === 'auto-closed' || row.status === 'hidden'">
              <span class="ct-sla-done">—</span>
            </template>
            <template v-else-if="row.deadlineHours > 0">
              <span :class="['ct-sla', slaClass(row.deadlineHours)]">Còn {{ row.deadlineHours }}h</span>
            </template>
            <template v-else>
              <span class="ct-sla sla-overdue">Quá hạn {{ Math.abs(row.deadlineHours) }}h</span>
            </template>
          </td>

          <!-- Bằng chứng -->
          <td class="ct-td ct-td--center">
            <span v-if="row.hasEvidence" class="material-symbols-outlined ct-evidence-icon" title="Có bằng chứng">attach_file</span>
            <span v-else class="ct-no-evidence">—</span>
          </td>

          <!-- Trạng thái -->
          <td class="ct-td">
            <span :class="['ct-badge', `status-${row.status}`]">{{ statusLabel[row.status] }}</span>
          </td>

          <!-- Hành động -->
          <td class="ct-td ct-td--right">
            <button class="ct-action-btn" @click.stop>
              <span class="material-symbols-outlined">more_vert</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface ComplaintReporter {
  name: string
  avatar?: string
  initials?: string
  initials_bg?: string
}

export interface ComplaintTarget {
  jobTitle: string
  employerName: string
}

export type ComplaintCategory =
  | 'missing-info'
  | 'duplicate'
  | 'company-mismatch'
  | 'fee-abuse'
  | 'fraud'

export interface Complaint {
  id: string
  reporter: ComplaintReporter
  target: ComplaintTarget
  category: ComplaintCategory
  group: 'A' | 'B'
  status: 'pending' | 'processing' | 'resolved' | 'auto-closed' | 'hidden'
  date: string
  deadlineHours: number  // dương = còn lại, âm = quá hạn, 0 = đã xử lý xong
  hasEvidence: boolean
  highlighted?: boolean
}

defineProps<{ complaints: Complaint[] }>()
defineEmits<{ select: [Complaint] }>()

const categoryLabel: Record<ComplaintCategory, string> = {
  'missing-info':     'Tin thiếu thông tin',
  'duplicate':        'Tin trùng lặp / spam',
  'company-mismatch': 'Thông tin công ty sai',
  'fee-abuse':        'Yêu cầu phí bất hợp lý',
  'fraud':            'Lừa đảo có bằng chứng',
}

const statusLabel: Record<string, string> = {
  pending:      'Chờ xử lý',
  processing:   'Đang xử lý',
  resolved:     'Đã giải quyết',
  'auto-closed':'Tự động đóng',
  hidden:       'Đã ẩn tin',
}

function slaClass(hours: number): string {
  if (hours <= 4)  return 'sla-critical'
  if (hours <= 24) return 'sla-warning'
  return 'sla-ok'
}
</script>

<style scoped>
.ct-wrap { overflow-x: auto; }
.ct-table { width: 100%; border-collapse: collapse; text-align: left; }

.ct-th {
  padding: 12px 16px;
  font-size: 0.75rem; font-weight: 700; font-family: 'Manrope', sans-serif;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #574240; white-space: nowrap;
}
.ct-th--right  { text-align: right; }
.ct-th--center { text-align: center; }

.ct-row { transition: background 0.15s; cursor: pointer; }
.ct-row:hover { background: #f6f4ec; }
.ct-row--highlighted { background: #f6f4ec; }

.ct-td { padding: 14px 16px; font-size: 0.875rem; color: #1b1c18; font-family: 'Manrope', sans-serif; vertical-align: middle; }
.ct-td--right  { text-align: right; }
.ct-td--center { text-align: center; }

/* Mã + ngày */
.ct-id { font-weight: 600; }
.ct-id--active { color: #963131; }
.ct-date { font-size: 0.75rem; color: #574240; margin-top: 2px; }

/* Người báo cáo */
.ct-sender { display: flex; align-items: center; gap: 10px; }
.ct-avatar { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; }
.ct-avatar-initials {
  width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700; color: #fff;
}
.ct-sender-name { font-weight: 600; font-size: 0.875rem; white-space: nowrap; }

/* Tin bị báo cáo */
.ct-job-title    { font-weight: 600; color: #1b1c18; }
.ct-employer-name { font-size: 0.75rem; color: #574240; margin-top: 2px; }

/* Loại vi phạm */
.ct-category { font-size: 0.875rem; color: #574240; }

/* Nhóm badge */
.ct-group-badge {
  padding: 3px 10px; border-radius: 9999px;
  font-size: 0.75rem; font-weight: 700; display: inline-block;
}
.group-a { background: #e4e2dc; color: #574240; }
.group-b { background: #ffdad6; color: #ba1a1a; }

/* SLA */
.ct-sla {
  font-size: 0.75rem; font-weight: 700;
  padding: 3px 8px; border-radius: 6px; white-space: nowrap;
}
.sla-ok       { background: #E1F5EE; color: #085041; }
.sla-warning  { background: #FAEEDA; color: #633806; }
.sla-critical { background: #ffdad6; color: #ba1a1a; }
.sla-overdue  { background: #ffdad6; color: #ba1a1a; }
.ct-sla-done  { color: #aaa; }

/* Bằng chứng */
.ct-evidence-icon { font-size: 18px; color: #963131; }
.ct-no-evidence   { color: #ccc; }

/* Trạng thái */
.ct-badge {
  padding: 4px 10px; border-radius: 9999px;
  font-size: 0.75rem; font-weight: 700; display: inline-block; white-space: nowrap;
}
.status-processing  { background: #FAEEDA; color: #633806; }
.status-pending     { background: #e4e2dc; color: #574240; }
.status-resolved    { background: #E1F5EE; color: #085041; }
.status-auto-closed { background: #e4e2dc; color: #574240; }
.status-hidden      { background: #ffdad6; color: #ba1a1a; }

/* Hành động */
.ct-action-btn {
  padding: 4px; background: transparent; border: none;
  cursor: pointer; color: #574240; border-radius: 6px;
  transition: color 0.15s;
}
.ct-action-btn:hover { color: #963131; }
.ct-action-btn .material-symbols-outlined { font-size: 18px; }
</style>
