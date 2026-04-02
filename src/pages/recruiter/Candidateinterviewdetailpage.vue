<template>
  <div class="detail-page">
    <!-- Page header -->
    <div class="detail-page__header">
      <div>
        <Breadcrumb :items="breadcrumbItems" hide-home />
      </div>
      <span v-if="history" class="detail-page__stage-badge">
        <span class="detail-page__stage-dot" />
        {{ currentStageBadge }}
      </span>
    </div>

    <!-- Content -->
    <div v-if="loading" class="detail-page__state">Đang tải dữ liệu...</div>
    <div v-else-if="error" class="detail-page__state detail-page__state--error">{{ error }}</div>
    <InterviewTimeline v-else :items="timelineItems" />


  </div>
</template>

<script setup lang="ts">
import InterviewTimeline from '@/components/recruiter/interviews/candidate-detail/InterviewTimeline.vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import employerInterviewService from '@/services/employerInterview.service'
import type { ResInterviewHistoryDTO, ResInterviewResultDTO } from '@/types/interview.types'

const route = useRoute()
const jobId = Number(route.params.id)
const applicationId = Number(route.params.applicationId)

const history = ref<ResInterviewHistoryDTO | null>(null)
const results = ref<Record<number, ResInterviewResultDTO>>({})
const loading = ref(true)
const error = ref<string | null>(null)

// ─── Breadcrumb ─────────────────────────────────────────────────────────────
const breadcrumbItems = computed(() => [
  { label: 'Quản lý phỏng vấn', to: { name: 'recruiter-interviews' } },
  {
    label: 'Thiết lập phỏng vấn',
    to: { name: 'recruiter-job-interview-setup', params: { id: jobId } },
  },
  { label: history.value?.candidateName ?? 'Chi tiết ứng viên' },
])

// ─── Trạng thái ─────────────────────────────────────────────────────────────
const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Đang xử lý',
  REVIEWING: 'Đang xem xét',
  INTERVIEWING: 'Đang phỏng vấn',
  PASSED: 'Đã vượt qua',
  REJECTED: 'Bị từ chối',
  OFFERED: 'Đã offer',
  OVERDUE: 'Quá hạn',
  COMPLETED: 'Hoàn thành',
}


const currentStageBadge = computed(() => {
  if (!history.value) return ''
  const status = history.value.currentStatus
  const statusText = STATUS_LABELS[status] ?? status
  if (status === 'INTERVIEWING') {
    const lastScheduled = [...history.value.rounds].reverse().find(r => r.scheduleId)
    if (lastScheduled) return `${statusText} - Vòng ${lastScheduled.roundNumber}`
  }
  return statusText
})

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDateTime(isoString: string) {
  const d = new Date(isoString)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  return `${hh}:${mm} - ${dd}/${mo}/${d.getFullYear()}`
}

function getCountdown(isoString: string) {
  const diff = new Date(isoString).getTime() - Date.now()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  if (days > 1) return `Còn ${days} ngày`
  if (days === 1) return 'Còn 1 ngày'
  if (days === 0) return 'Hôm nay'
  return 'Đã qua'
}

// ─── Timeline items ───────────────────────────────────────────────────────────
const timelineItems = computed(() => {
  if (!history.value) return []
  return history.value.rounds.map(round => {
    let status: 'passed' | 'upcoming' | 'pending'
    if (!round.scheduleId) {
      status = 'pending'
    } else if (round.result) {
      status = 'passed'
    } else {
      status = 'upcoming'
    }

    const fullResult = round.scheduleId ? results.value[round.scheduleId] : undefined

    return {
      roundLabel: `Vòng ${round.roundNumber}: ${round.roundName}`,
      status,
      rating: fullResult?.rating ?? round.rating,
      scheduledAt: round.scheduledAt ? formatDateTime(round.scheduledAt) : undefined,
      note: fullResult?.note ?? round.note,
      countdown:
        status === 'upcoming' && round.scheduledAt
          ? getCountdown(round.scheduledAt)
          : undefined,
    }
  })
})

// ─── Fetch data ───────────────────────────────────────────────────────────────
onMounted(async () => {
  try {
    // API 1: lịch sử phỏng vấn theo đơn ứng tuyển
    history.value = await employerInterviewService.getInterviewHistory(applicationId)

    // API 2: kết quả chi tiết cho từng lịch đã có kết quả
    const fetches = history.value.rounds
      .filter(r => r.scheduleId && r.result)
      .map(r =>
        employerInterviewService
          .getResult(r.scheduleId!)
          .then(res => {
            results.value[r.scheduleId!] = res
          })
          .catch(() => {}),
      )
    await Promise.all(fetches)
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? e?.message ?? 'Không thể tải dữ liệu'
  } finally {
    loading.value = false
  }
})

</script>

<style scoped>
.detail-page {
  margin: 0 auto;
  width: 100%;
  font-family: 'Manrope', sans-serif;
}

/* Page header */
.detail-page__header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.detail-page__name {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin: 0 0 0.25rem;
}

.detail-page__role {
  font-size: 1.125rem;
  font-weight: 500;
  color: #64748b;
  margin: 0;
}

.detail-page__stage-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  white-space: nowrap;
  align-self: flex-start;
}

.detail-page__stage-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #4b9af6;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

/* State messages */
.detail-page__state {
  text-align: center;
  padding: 3rem 1rem;
  font-size: 0.95rem;
  color: #64748b;
}

.detail-page__state--error {
  color: #ef4444;
}
</style>
