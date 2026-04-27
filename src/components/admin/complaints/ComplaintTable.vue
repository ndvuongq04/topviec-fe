<template>
  <div class="ct-wrap">
    <table class="ct-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col"
            :class="['ct-th', col === 'Actions' ? 'ct-th--right' : '']">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in complaints" :key="row.id"
          :class="['ct-row', row.highlighted ? 'ct-row--highlighted' : '']"
          @click="$emit('select', row)">
          <td class="ct-td">
            <span :class="['ct-id', row.highlighted ? 'ct-id--active' : '']">{{ row.id }}</span>
          </td>
          <td class="ct-td">
            <div class="ct-sender">
              <img v-if="row.sender.avatar" :src="row.sender.avatar" :alt="row.sender.name" class="ct-avatar" />
              <div v-else class="ct-avatar-initials" :style="{ background: row.sender.initials_bg }">
                {{ row.sender.initials }}
              </div>
              <div>
                <div class="ct-sender-name">{{ row.sender.name }}</div>
                <span class="ct-sender-type">{{ row.sender.type }}</span>
              </div>
            </div>
          </td>
          <td class="ct-td ct-text-muted">{{ row.type }}</td>
          <td class="ct-td">
            <span :class="['ct-badge', `priority-${row.priority}`]">{{ priorityLabel[row.priority] }}</span>
          </td>
          <td class="ct-td ct-text-muted">{{ row.date }}</td>
          <td class="ct-td">
            <span :class="['ct-badge', `status-${row.status}`]">{{ statusLabel[row.status] }}</span>
          </td>
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
export interface ComplaintSender {
  name: string; type: string
  avatar?: string; initials?: string; initials_bg?: string
}
export interface Complaint {
  id: string; sender: ComplaintSender; type: string
  priority: 'urgent' | 'important' | 'normal'
  date: string; status: 'pending' | 'processing' | 'sent' | 'resolved'
  highlighted?: boolean
}

defineProps<{ complaints: Complaint[] }>()
defineEmits<{ select: [Complaint] }>()

const columns = ['Mã', 'Người gửi', 'Loại', 'Ưu tiên', 'Ngày', 'Trạng thái', 'Hành động']

const priorityLabel: Record<string, string> = {
  urgent: 'Khẩn cấp', important: 'Quan trọng', normal: 'Bình thường'
}
const statusLabel: Record<string, string> = {
  pending: 'Chờ xử lý', processing: 'Đang xử lý', sent: 'Đã gửi', resolved: 'Đã giải quyết'
}
</script>

<style scoped>
.ct-wrap { overflow-x: auto; }
.ct-table { width: 100%; border-collapse: collapse; text-align: left; }

.ct-th {
  padding: 12px 24px;
  font-size: 0.75rem; font-weight: 700; font-family: 'Manrope', sans-serif;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #574240;
}
.ct-th--right { text-align: right; }

.ct-row { transition: background 0.15s; cursor: pointer; }
.ct-row:hover { background: #f6f4ec; }
.ct-row--highlighted { background: #f6f4ec; }

.ct-td { padding: 16px 24px; font-size: 0.875rem; color: #1b1c18; font-family: 'Manrope', sans-serif; }
.ct-td--right { text-align: right; }
.ct-text-muted { color: #574240; }

.ct-id { font-weight: 500; }
.ct-id--active { color: #963131; font-weight: 600; }

.ct-sender { display: flex; align-items: center; gap: 12px; }
.ct-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
.ct-avatar-initials {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700; color: #fff;
}
.ct-sender-name { font-weight: 700; font-size: 0.875rem; color: #1b1c18; }
.ct-sender-type {
  display: inline-block; margin-top: 2px;
  font-size: 0.75rem; color: #574240;
  background: #f0eee7; padding: 1px 6px; border-radius: 4px;
}

/* Badges */
.ct-badge {
  padding: 4px 10px; border-radius: 9999px;
  font-size: 0.75rem; font-weight: 700; display: inline-block;
}
.priority-urgent   { background: #ffdad6; color: #ba1a1a; }
.priority-important{ background: #FAEEDA; color: #633806; }
.priority-normal   { background: #e4e2dc; color: #574240; }

.status-processing { background: #FAEEDA; color: #633806; }
.status-pending    { background: #e4e2dc; color: #574240; }
.status-sent       { background: #e4e2dc; color: #574240; }
.status-resolved   { background: #E1F5EE; color: #085041; }

.ct-action-btn {
  padding: 4px; background: transparent; border: none;
  cursor: pointer; color: #574240; border-radius: 6px;
  transition: color 0.15s;
}
.ct-action-btn:hover { color: #963131; }
.ct-action-btn .material-symbols-outlined { font-size: 18px; }
</style>