<template>
  <div class="interview-page">
    <nav class="breadcrumb">
      <router-link :to="{ name: 'recruiter-interviews' }" class="breadcrumb__link">
        Quản lý lịch phỏng vấn
      </router-link>
      <span class="material-symbols-outlined breadcrumb__sep">chevron_right</span>
      <span class="breadcrumb__current">Thiết lập phỏng vấn</span>
    </nav>

    <InterviewStageCards
      :stages="stageCards"
      :active-stage-id="activeStageId ?? 0"
      :total-candidates="totalApps"
      @select="handleSelectStage"
      @rename="handleRenameStage"
      @add="handleAddStage"
      @delete="handleDeleteStage"
    />

    <InterviewCandidateTable
      :stage-name="activeStageName"
      :candidates="filteredCandidates"
      :total-count="totalApps"
      :current-page="currentPage + 1"
      :total-pages="totalPages"
      v-model:search-value="searchValue"
      v-model:status-filter="statusFilter"
      @search="handleSearch"
      @export="handleExport"
      @open-link="handleOpenLink"
      @view-detail="handleViewDetail"
      @reschedule="handleReschedule"
      @remind="handleRemind"
      @cancel="handleCancel"
      @schedule="handleSchedule"
      @page-change="currentPage = $event - 1"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InterviewStageCards from '@/components/recruiter/interviews/InterviewStageCards.vue'
import InterviewCandidateTable from '@/components/recruiter/interviews/InterviewCandidateTable.vue'
import employerInterviewService from '@/services/employerInterview.service'
import employerApplicationService from '@/services/employerApplication.service'
import type { ResInterviewRoundDTO, ResInterviewScheduleDTO } from '@/types/interview.types'
import type { ResEmployerApplicationDTO } from '@/types/employerApplication.types'
import { useToast } from '@/composables/useToast'

const route  = useRoute()
const router = useRouter()
const toast  = useToast()
const jobId  = computed(() => Number(route.params.id))

const PAGE_SIZE = 10

// ── State ─────────────────────────────────────────────────
const activeStageId = ref<number | null>(null)
const currentPage   = ref(0) // 0-based per skill-Pagination.md
const searchValue   = ref('')
const statusFilter  = ref('all')

// ── API Data ───────────────────────────────────────────────
const rounds         = ref<ResInterviewRoundDTO[]>([])
const interviewApps  = ref<ResEmployerApplicationDTO[]>([])
const totalApps      = ref(0)
const roundSchedules = ref<ResInterviewScheduleDTO[]>([])

// ── Computed: Stage cards ──────────────────────────────────
const stageCards = computed(() =>
  rounds.value.map(r => ({
    id:    r.id,
    label: `Vòng ${r.roundNumber}`,
    name:  r.roundName,
    count: r.candidateCount,
  }))
)

const activeStageName = computed(() => {
  const r = rounds.value.find(r => r.id === activeStageId.value)
  return r ? `Vòng ${r.roundNumber} - ${r.roundName}` : ''
})

// ── Computed: Schedule lookup per applicationId ────────────
const scheduleByAppId = computed(() => {
  const map = new Map<number, ResInterviewScheduleDTO>()
  for (const s of roundSchedules.value) {
    map.set(s.applicationId, s)
  }
  return map
})

// ── Computed: Active round interviewers ────────────────────
const activeRoundInterviewers = computed(() =>
  rounds.value.find(r => r.id === activeStageId.value)?.interviewers ?? []
)

// ── Computed: Merge apps + schedules → candidate rows ─────
const allCandidates = computed(() =>
  interviewApps.value.map(app =>
    mapToCandidate(app, scheduleByAppId.value.get(app.id), activeRoundInterviewers.value)
  )
)

// ── Computed: Status filter (client-side on current page) ──
const filteredCandidates = computed(() => {
  const f = statusFilter.value
  if (f === 'all')         return allCandidates.value
  if (f === 'unscheduled') return allCandidates.value.filter(c => !c.hasSchedule)
  return allCandidates.value.filter(c => c.hasSchedule && c.scheduleStatus === f)
})

// ── Computed: Pagination ───────────────────────────────────
const totalPages = computed(() => Math.ceil(totalApps.value / PAGE_SIZE))

// ── Helpers ────────────────────────────────────────────────
function mapApiStatusToUi(status: string): 'confirmed' | 'pending' | 'overdue' {
  if (status === 'confirmed' || status === 'completed') return 'confirmed'
  if (status === 'no_show')                             return 'overdue'
  return 'pending'
}

function mapInterviewType(type: string): { label: string; formatType: 'online' | 'offline' } {
  if (type === 'online') return { label: 'Trực tuyến', formatType: 'online' }
  if (type === 'phone')  return { label: 'Điện thoại', formatType: 'online' }
  return { label: 'Trực tiếp', formatType: 'offline' }
}

function formatDateLabel(iso: string): string {
  const scheduled = new Date(iso)
  const today     = new Date()
  const diffDays  = Math.floor(
    (new Date(scheduled).setHours(0,0,0,0) - new Date(today).setHours(0,0,0,0)) / 86_400_000
  )
  const time = scheduled.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  if (diffDays === 0)  return `Hôm nay, ${time}`
  if (diffDays === 1)  return `Ngày mai, ${time}`
  if (diffDays === -1) return `Hôm qua, ${time}`
  return scheduled.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' }) + `, ${time}`
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

function mapToCandidate(
  app: ResEmployerApplicationDTO,
  schedule?: ResInterviewScheduleDTO,
  interviewers: { id: number; name: string }[] = [],
) {
  const firstInterviewer = interviewers[0]
  const base = {
    id:        app.id,
    name:      app.candidateName,
    role:      app.candidateEmail,
    avatarUrl: app.candidateAvatar ?? '',
    interviewer: firstInterviewer
      ? { id: firstInterviewer.id, name: firstInterviewer.name, initials: getInitials(firstInterviewer.name) }
      : { id: 0, name: '—', initials: '?' },
  }

  if (schedule) {
    const { label, formatType } = mapInterviewType(schedule.interviewType)
    return {
      ...base,
      hasSchedule:    true,
      scheduleStatus: schedule.status,
      dateLabel:      formatDateLabel(schedule.scheduledAt),
      dateFormatted:  new Date(schedule.scheduledAt).toLocaleDateString('vi-VN', {
        day: 'numeric', month: 'long', year: 'numeric',
      }),
      format:     schedule.meetingLink
        ? (schedule.meetingLink.includes('meet.google') ? 'Google Meet' : 'Zoom Meeting')
        : label,
      formatType,
      status: mapApiStatusToUi(schedule.status),
    }
  }

  // No schedule yet → hiển thị "Chưa lên lịch"
  return {
    ...base,
    hasSchedule:    false,
    scheduleStatus: undefined,
    dateLabel:      'Chưa lên lịch',
    dateFormatted:  '',
    format:         '—',
    formatType:     'offline' as const,
    status:         'pending' as const,
  }
}

// ── API Calls ──────────────────────────────────────────────
async function fetchRounds() {
  try {
    rounds.value = await employerInterviewService.getRounds(jobId.value)
    if (rounds.value.length > 0 && activeStageId.value === null) {
      activeStageId.value = rounds.value[0].id
    }
  } catch (err: any) {
    toast.error('Lỗi', err?.response?.data?.message ?? 'Không thể tải danh sách vòng phỏng vấn.')
  }
}

async function fetchApplications() {
  try {
    const res = await employerApplicationService.getApplicationsByJobPost(jobId.value, {
      status: 'interviewing',
      page:   currentPage.value,
      size:   PAGE_SIZE,
      search: searchValue.value || undefined,
    })
    interviewApps.value = res.result
    totalApps.value     = res.meta.totals
  } catch (err: any) {
    toast.error('Lỗi', err?.response?.data?.message ?? 'Không thể tải danh sách ứng viên.')
  }
}

async function fetchSchedules() {
  if (activeStageId.value === null) return
  try {
    roundSchedules.value = await employerInterviewService.getSchedules(jobId.value, {
      roundId: activeStageId.value,
    })
  } catch (err: any) {
    toast.error('Lỗi', err?.response?.data?.message ?? 'Không thể tải lịch phỏng vấn.')
  }
}

// ── Watchers ───────────────────────────────────────────────
// Đổi vòng → refetch lịch của vòng đó (ứng viên không đổi)
watch(activeStageId, () => {
  fetchSchedules()
})

// Đổi trang → refetch ứng viên
watch(currentPage, fetchApplications)

onMounted(async () => {
  await fetchRounds()
  await Promise.all([fetchApplications(), fetchSchedules()])
})

// ── Handlers ───────────────────────────────────────────────
function handleSelectStage(stageId: number) {
  activeStageId.value = stageId
}

function handleSearch() {
  currentPage.value = 0
  fetchApplications()
}

function handleExport() {
  console.log('Export data')
}

function handleOpenLink(candidateId: number) {
  console.log('Open meeting link for candidate:', candidateId)
}

function handleViewDetail(applicationId: number) {
  router.push({
    name: 'recruiter-job-interview-candidate-detail',
    params: { id: jobId.value, applicationId },
  })
}

function handleReschedule(candidateId: number) {
  console.log('Reschedule interview for candidate:', candidateId)
}

function handleRemind(candidateId: number) {
  console.log('Send reminder to candidate:', candidateId)
}

function handleCancel(candidateId: number) {
  console.log('Cancel interview for candidate:', candidateId)
}

function handleSchedule(applicationId: number) {
  router.push({
    name: 'recruiter-interview-create',
    query: { jobId: jobId.value, applicationId, roundId: activeStageId.value ?? undefined },
  })
}

async function handleRenameStage(stageId: number, newName: string) {
  try {
    const updated = await employerInterviewService.updateRound(stageId, { roundName: newName })
    const idx = rounds.value.findIndex(r => r.id === stageId)
    if (idx !== -1) rounds.value[idx] = updated
    toast.success('Đổi tên thành công!', `Vòng phỏng vấn đã được đổi thành "${newName}".`)
  } catch (err: any) {
    toast.error('Lỗi', err?.response?.data?.message ?? 'Không thể đổi tên vòng. Vui lòng thử lại.')
  }
}

async function handleAddStage(data: { roundName: string; description?: string; expectedDuration?: number; isFinal?: boolean }) {
  try {
    const created = await employerInterviewService.createRound(jobId.value, data)
    rounds.value.push(created)
    toast.success('Thêm vòng thành công!', `Đã thêm vòng phỏng vấn "${data.roundName}".`)
  } catch (err: any) {
    toast.error('Lỗi', err?.response?.data?.message ?? 'Không thể thêm vòng. Vui lòng thử lại.')
  }
}

async function handleDeleteStage(stageId: number) {
  try {
    await employerInterviewService.deleteRound(stageId)
    const deleted = rounds.value.find(r => r.id === stageId)
    rounds.value = rounds.value.filter(r => r.id !== stageId)
    if (activeStageId.value === stageId) {
      activeStageId.value = rounds.value.length > 0 ? rounds.value[0].id : null
    }
    toast.success('Đã xóa!', `Vòng phỏng vấn "${deleted?.roundName ?? ''}" đã được xóa.`)
  } catch (err: any) {
    toast.error('Lỗi', err?.response?.data?.message ?? 'Không thể xóa vòng. Vui lòng thử lại.')
  }
}
</script>

<style scoped>
.interview-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100vh;
  background: #f6f6f8;
  font-family: 'Manrope', sans-serif;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.breadcrumb__link {
  color: #6b7280;
  text-decoration: none;
  cursor: pointer;
}

.breadcrumb__link:hover {
  color: #4B9AF6;
  text-decoration: underline;
}

.breadcrumb__sep {
  font-size: 1.125rem;
  color: #9ca3af;
  user-select: none;
}

.breadcrumb__current {
  color: #0f172a;
  font-weight: 600;
}
</style>
