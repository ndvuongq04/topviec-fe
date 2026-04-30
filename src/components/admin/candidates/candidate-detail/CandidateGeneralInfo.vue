<template>
  <div class="info-card">
    <h3 class="card-title">Thông tin chung</h3>
    <div class="fields-grid">
      <div v-for="field in fields" :key="field.label">
        <p class="field-label">{{ field.label }}</p>
        <p class="field-value">{{ field.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ResAdminCandidateDetailDTO } from '@/types/adminCandidate.types'
import { 
  JOB_SEEKING_STATUS_LABELS, 
  JobSeekingStatus,
  PREFERRED_WORK_TYPE_LABELS,
  PreferredWorkType
} from '@/constants/candidateProfile.constants'

const props = defineProps<{
  candidate: ResAdminCandidateDetailDTO
}>()

const formatSalary = () => {
  const { expectedSalaryMin, expectedSalaryMax, salaryNegotiable } = props.candidate
  if (salaryNegotiable) return 'Thỏa thuận'
  if (expectedSalaryMin && expectedSalaryMax) return `${expectedSalaryMin.toLocaleString()} - ${expectedSalaryMax.toLocaleString()} VNĐ`
  if (expectedSalaryMin) return `Từ ${expectedSalaryMin.toLocaleString()} VNĐ`
  if (expectedSalaryMax) return `Đến ${expectedSalaryMax.toLocaleString()} VNĐ`
  return 'Chưa cập nhật'
}

const fields = computed(() => [
  { 
    label: 'Trạng thái tìm việc', 
    value: JOB_SEEKING_STATUS_LABELS[props.candidate.jobSeekingStatus as JobSeekingStatus] || 'Chưa cập nhật' 
  },
  { 
    label: 'Mức lương mong muốn', 
    value: formatSalary() 
  },
  { 
    label: 'Địa điểm làm việc', 
    value: props.candidate.preferredLocationName || 'Chưa cập nhật' 
  },
  { 
    label: 'Hình thức làm việc', 
    value: PREFERRED_WORK_TYPE_LABELS[props.candidate.preferredWorkType as PreferredWorkType] || 'Chưa cập nhật' 
  },
])
</script>

<style scoped>
.info-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px -4px rgba(87, 66, 64, 0.05);
}
.card-title {
  font-size: 17px;
  font-weight: 700;
  color: #1b1c18;
  margin: 0 0 20px;
}
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 32px;
}
.field-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #574240;
  margin-bottom: 4px;
}
.field-value { font-size: 14px; font-weight: 500; color: #1b1c18; }
</style>