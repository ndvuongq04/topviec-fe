<template>
  <div class="complaint-detail">
    <div v-if="store.loading" class="complaint-detail__state">
      <span class="material-symbols-outlined">progress_activity</span>
      <p>Đang tải chi tiết khiếu nại...</p>
    </div>

    <div v-else-if="store.error" class="complaint-detail__state complaint-detail__state--error">
      <span class="material-symbols-outlined">error</span>
      <p>{{ store.error }}</p>
    </div>

    <div v-else-if="complaint" class="complaint-detail__content">
      <ComplaintDetailHeader
        :complaint="complaint"
        @reject="onReject"
        @request-info="onRequestInfo"
        @confirm="onConfirm"
      />

      <div class="complaint-detail__grid">
        <div class="complaint-detail__left">
          <ComplaintDetailOverview :overview="complaint.overview" />
          <div class="complaint-detail__row">
            <ComplaintDetailJobInfo :job="complaint.job" />
            <ComplaintDetailReporter :reporter="complaint.reporter" />
          </div>
          <ComplaintDetailContent :content="complaint.content" />
          <ComplaintDetailDecisionPanel />
        </div>

        <div class="complaint-detail__right">
          <div class="complaint-detail__sticky">
            <ComplaintDetailAccountImpact :impact="complaint.impact" />
            <ComplaintDetailWarnings :warnings="complaint.warnings" />
            <ComplaintDetailHistory :history="complaint.history" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  COMPLAINT_PRIORITY_OPTIONS,
  COMPLAINT_STATUS_OPTIONS,
  COMPLAINT_TYPE_OPTIONS,
  VIOLATION_GROUP_OPTIONS,
} from '@/constants/complaints.constants'
import { JOB_POSTING_STATUS_LABELS } from '@/constants/jobPosting.constants'
import ComplaintDetailAccountImpact from '@/components/admin/complaints/complaint-detail/ComplaintDetailAccountImpact.vue'
import ComplaintDetailContent from '@/components/admin/complaints/complaint-detail/ComplaintDetailContent.vue'
import ComplaintDetailDecisionPanel from '@/components/admin/complaints/complaint-detail/ComplaintDetailDecisionPanel.vue'
import ComplaintDetailHeader from '@/components/admin/complaints/complaint-detail/ComplaintDetailHeader.vue'
import ComplaintDetailHistory from '@/components/admin/complaints/complaint-detail/ComplaintDetailHistory.vue'
import ComplaintDetailJobInfo from '@/components/admin/complaints/complaint-detail/ComplaintDetailJobInfo.vue'
import ComplaintDetailOverview from '@/components/admin/complaints/complaint-detail/ComplaintDetailOverview.vue'
import ComplaintDetailReporter from '@/components/admin/complaints/complaint-detail/ComplaintDetailReporter.vue'
import ComplaintDetailWarnings from '@/components/admin/complaints/complaint-detail/ComplaintDetailWarnings.vue'
import { useAdminReportStore } from '@/stores/adminReport.store'

const route = useRoute()
const store = useAdminReportStore()

const onReject = () => {}
const onRequestInfo = () => {}
const onConfirm = () => {}

const complaintTypeLabelMap = Object.fromEntries(COMPLAINT_TYPE_OPTIONS.map((item) => [item.value, item.label])) as Record<string, string>
const complaintStatusLabelMap = Object.fromEntries(COMPLAINT_STATUS_OPTIONS.map((item) => [item.value, item.label])) as Record<string, string>
const complaintPriorityLabelMap = Object.fromEntries(COMPLAINT_PRIORITY_OPTIONS.map((item) => [item.value, item.label])) as Record<string, string>
const violationGroupLabelMap = Object.fromEntries(VIOLATION_GROUP_OPTIONS.map((item) => [item.value, item.label])) as Record<string, string>

function formatDateTime(value: string | null | undefined) {
  if (!value) return '-'
  return new Date(value).toLocaleString('vi-VN')
}

function formatLabel(value: string | null | undefined) {
  if (!value) return '-'
  return value.replace(/_/g, ' ')
}

function getComplaintTypeLabel(value: string | null | undefined) {
  if (!value) return '-'
  return complaintTypeLabelMap[value] ?? formatLabel(value)
}

function getComplaintStatusLabel(value: string | null | undefined) {
  if (!value) return '-'
  return complaintStatusLabelMap[value] ?? formatLabel(value)
}

function getComplaintPriorityLabel(value: string | null | undefined) {
  if (!value) return '-'
  return complaintPriorityLabelMap[value] ?? formatLabel(value)
}

function getViolationGroupLabel(value: string | null | undefined) {
  if (!value) return '-'
  return violationGroupLabelMap[value] ?? value
}

function getJobPostingStatusLabel(value: string | null | undefined) {
  if (!value) return '-'
  return JOB_POSTING_STATUS_LABELS[value as keyof typeof JOB_POSTING_STATUS_LABELS] ?? formatLabel(value)
}

function initials(name: string) {
  const parts = name.trim().split(' ').filter(Boolean)
  const first = parts[0]
  const last = parts[parts.length - 1]

  if (first && last && parts.length >= 2) {
    return `${first[0]}${last[0]}`.toUpperCase()
  }

  return name.slice(0, 2).toUpperCase()
}

const complaint = computed(() => {
  const detail = store.currentReport
  if (!detail) return null

  const statusVariantMap: Record<string, string> = {
    pending: 'default',
    processing: 'warning',
    waiting_employer: 'warning',
    resolved: 'success',
    rejected: 'error',
    auto_closed: 'default',
  }

  const statusIconMap: Record<string, string> = {
    pending: 'schedule',
    processing: 'sync',
    waiting_employer: 'hourglass_top',
    resolved: 'check_circle',
    rejected: 'cancel',
    auto_closed: 'lock_clock',
  }

  const remainingHours = detail.remainingProcessingHours

  return {
    id: detail.reportCode,
    title: getComplaintTypeLabel(detail.complaintType),
    tags: [
      ...(detail.violationGroup
        ? [{ label: getViolationGroupLabel(detail.violationGroup), variant: 'default' }]
        : []),
      ...(remainingHours !== null
        ? [{
            label: remainingHours >= 0 ? `SLA ${remainingHours}h` : `Quá hạn ${Math.abs(remainingHours)}h`,
            variant: remainingHours <= 4 ? 'error' : 'warning',
            icon: 'timer',
          }]
        : []),
      {
        label: getComplaintStatusLabel(detail.status),
        variant: statusVariantMap[detail.status] ?? 'default',
        icon: statusIconMap[detail.status] ?? 'info',
      },
      ...(detail.priority === 'urgent'
        ? [{ label: getComplaintPriorityLabel(detail.priority), variant: 'error', icon: 'priority_high' }]
        : []),
    ],
    overview: {
      createdAt: formatDateTime(detail.createdAt),
      updatedAt: formatDateTime(detail.updatedAt),
      channel: 'Web',
      evidenceStatus: detail.evidences.length ? 'Đã cung cấp' : 'Chưa cung cấp',
    },
    job: {
      title: detail.jobPosting.title,
      company: detail.jobPosting.company.name,
      status: getJobPostingStatusLabel(detail.jobPosting.status),
    },
    reporter: {
      name: detail.reporter.fullName,
      id: String(detail.reporter.userId),
      initials: initials(detail.reporter.fullName),
      credible: true,
      reportsToday: 1,
      reportsLimit: 1,
    },
    content: {
      description: detail.description ?? 'Không có mô tả.',
      evidences: detail.evidences.map((item) => item.fileUrl),
      autoCheck: [
        { label: 'Mức ưu tiên', value: getComplaintPriorityLabel(detail.priority), variant: detail.priority === 'urgent' ? 'error' : 'default' },
        { label: 'Trạng thái', value: getComplaintStatusLabel(detail.status), variant: 'default' },
        { label: 'Admin phụ trách', value: detail.assignedAdmin?.fullName ?? 'Chưa phân công', variant: 'success' },
      ],
    },
    impact: {
      currentScore: detail.jobPosting.company.violationScore,
      projectedScore: detail.jobPosting.company.violationScore,
    },
    warnings: [
      ...(detail.violationGroup
        ? [{ icon: 'policy', text: `Thuộc ${getViolationGroupLabel(detail.violationGroup).toLowerCase()}.` }]
        : []),
      ...(remainingHours !== null && remainingHours <= 4
        ? [{ icon: 'timer_off', text: 'Vụ việc sắp chạm SLA. Cần xử lý gấp.' }]
        : []),
      ...(!detail.evidences.length
        ? [{ icon: 'attachment_off', text: 'Báo cáo hiện không có bằng chứng đính kèm.' }]
        : []),
    ],
    history: [
      {
        id: detail.reportCode,
        date: formatDateTime(detail.createdAt),
        desc: detail.resolutionNote ?? detail.description ?? 'Không có ghi chú.',
        points: `${detail.jobPosting.company.violationScore} pts`,
      },
    ],
  }
})

async function ensureDetailLoaded() {
  const id = Number(route.params.id)
  if (!id) return
  if (store.currentReport?.id === id) return
  await store.fetchById(id)
}

onMounted(() => {
  ensureDetailLoaded()
})

watch(() => route.params.id, () => {
  ensureDetailLoaded()
})
</script>

<style scoped>
.complaint-detail {
  margin: 0 auto;
  font-family: 'Manrope', sans-serif;
}

.complaint-detail__content {
  display: flex;
  flex-direction: column;
}

.complaint-detail__state {
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #574240;
}

.complaint-detail__state .material-symbols-outlined {
  font-size: 2rem;
}

.complaint-detail__state--error {
  color: #93000a;
}

.complaint-detail__grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .complaint-detail__grid {
    grid-template-columns: 1fr;
  }
}

.complaint-detail__left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.complaint-detail__right {
  display: flex;
  flex-direction: column;
}

.complaint-detail__sticky {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.complaint-detail__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .complaint-detail__row {
    grid-template-columns: 1fr;
  }
}
</style>
