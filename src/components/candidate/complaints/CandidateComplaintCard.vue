<template>
  <div :class="['ccc-card', dimmed ? 'ccc-card--dimmed' : '']">
    <div class="ccc-top">
      <div class="ccc-id-row">
        <span class="ccc-id">{{ complaint.id }}</span>
        <span class="ccc-date">{{ complaint.date }}</span>
      </div>
      <span :class="['ccc-status', `status-${complaint.status}`]">
        {{ statusLabel[complaint.status] }}
      </span>
    </div>

    <div class="ccc-body">
      <h3 class="ccc-job-title">{{ complaint.jobTitle }}</h3>
      <p class="ccc-company">
        <span class="material-symbols-outlined">business</span>
        {{ complaint.company }}
      </p>
    </div>

    <div class="ccc-footer">
      <div class="ccc-reason">
        <span class="material-symbols-outlined ccc-reason-icon">{{ complaint.reasonIcon }}</span>
        <span class="ccc-reason-text">{{ complaint.reason }}</span>
      </div>
      <button class="ccc-detail-btn" @click="$emit('view', complaint)">
        Xem chi tiết
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CandidateComplaint {
  id: string
  date: string
  status: 'pending' | 'processing' | 'resolved' | 'closed'
  jobTitle: string
  company: string
  reason: string
  reasonIcon: string
}

const props = defineProps<{ complaint: CandidateComplaint }>()
defineEmits<{ view: [CandidateComplaint] }>()

const dimmed = props.complaint.status === 'closed'

const statusLabel: Record<string, string> = {
  pending:    'Chờ xử lý',
  processing: 'Đang xử lý',
  resolved:   'Đã giải quyết',
  closed:     'Tự động đóng',
}
</script>

<style scoped>
.ccc-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(192,199,212,0.2);
  box-shadow: 0 8px 32px rgba(0,94,164,0.06);
  display: flex; flex-direction: column; gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.ccc-card:hover {
  background: #f9f9ff;
  transform: translateY(-4px);
}
.ccc-card--dimmed { opacity: 0.75; }

.ccc-top {
  display: flex; align-items: center;
  justify-content: space-between;
}
.ccc-id-row { display: flex; align-items: center; gap: 12px; }
.ccc-id   { font-size: 0.875rem; font-weight: 600; color: #071b3b; font-family: 'Manrope', sans-serif; }
.ccc-date { font-size: 0.875rem; color: #404752; font-family: 'Manrope', sans-serif; }

/* Status badges */
.ccc-status {
  padding: 4px 12px; border-radius: 9999px;
  font-size: 0.75rem; font-weight: 700; font-family: 'Manrope', sans-serif;
}
.status-pending    { background: #e2e7f0; color: #404752; }
.status-processing { background: #fff8e1; color: #795548; }
.status-resolved   { background: #75fd99; color: #005224; }
.status-closed     { background: #e0e8ff; color: #404752; }

.ccc-body { display: flex; flex-direction: column; gap: 6px; }
.ccc-job-title {
  font-size: 1.125rem; font-weight: 700; color: #071b3b; font-family: 'Manrope', sans-serif;
  transition: color 0.2s;
  margin: 0;
}
.ccc-card:hover .ccc-job-title { color: #005ea4; }
.ccc-company {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.875rem; color: #404752; margin: 0; font-family: 'Manrope', sans-serif;
}
.ccc-company .material-symbols-outlined { font-size: 16px; }

.ccc-footer {
  display: flex; align-items: center;
  justify-content: space-between;
}
.ccc-reason { display: flex; align-items: center; gap: 8px; }
.ccc-reason-icon { font-size: 18px; color: #ba1a1a; }
.ccc-reason-text { font-size: 0.875rem; font-weight: 500; color: #071b3b; font-family: 'Manrope', sans-serif; }

.ccc-detail-btn {
  display: flex; align-items: center; gap: 4px;
  font-size: 0.875rem; font-weight: 600; color: #005ea4;
  background: transparent; border: none; cursor: pointer;
  font-family: 'Manrope', sans-serif;
  transition: all 0.2s;
}
.ccc-detail-btn .material-symbols-outlined { font-size: 16px; transition: transform 0.2s; }
.ccc-card:hover .ccc-detail-btn { color: #0077ce; }
.ccc-card:hover .ccc-detail-btn .material-symbols-outlined { transform: translateX(4px); }
</style>