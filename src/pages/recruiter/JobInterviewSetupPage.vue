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

    <!-- ── Reschedule Modal ───────────────────────────────── -->
    <GlobalModal
      :visible="isRescheduleVisible"
      title="Đổi lịch phỏng vấn"
      :subtitle="rescheduleCandidate?.name"
      icon="event_repeat"
      confirm-text="Lưu thay đổi"
      confirm-icon="save"
      :loading="isRescheduleLoading"
      @close="isRescheduleVisible = false"
      @confirm="confirmReschedule"
    >
      <div class="reschedule-form">
        <div class="reschedule-form__row">
          <div class="reschedule-form__field">
            <label class="reschedule-form__label">Ngày phỏng vấn <span class="reschedule-form__required">*</span></label>
            <input
              v-model="rescheduleForm.date"
              type="date"
              class="reschedule-form__input"
              :class="{ 'reschedule-form__input--error': rescheduleErrors.date }"
              @change="rescheduleErrors.date = ''"
            />
            <span v-if="rescheduleErrors.date" class="reschedule-form__error">{{ rescheduleErrors.date }}</span>
          </div>
          <div class="reschedule-form__field">
            <label class="reschedule-form__label">Giờ phỏng vấn <span class="reschedule-form__required">*</span></label>
            <input
              v-model="rescheduleForm.time"
              type="time"
              class="reschedule-form__input"
              :class="{ 'reschedule-form__input--error': rescheduleErrors.time }"
              @change="rescheduleErrors.time = ''"
            />
            <span v-if="rescheduleErrors.time" class="reschedule-form__error">{{ rescheduleErrors.time }}</span>
          </div>
        </div>

        <!-- Hình thức -->
        <div class="reschedule-form__field">
          <label class="reschedule-form__label">Hình thức phỏng vấn</label>
          <div class="reschedule-form__mode-toggle">
            <button
              type="button"
              class="reschedule-form__mode-btn"
              :class="{ 'reschedule-form__mode-btn--active': rescheduleForm.interviewType !== 'onsite' }"
              @click="setRescheduleType('online')"
            >
              <span class="material-symbols-outlined">videocam</span>
              Trực tuyến
            </button>
            <button
              type="button"
              class="reschedule-form__mode-btn"
              :class="{ 'reschedule-form__mode-btn--active': rescheduleForm.interviewType === 'onsite' }"
              @click="setRescheduleType('onsite')"
            >
              <span class="material-symbols-outlined">location_on</span>
              Trực tiếp
            </button>
          </div>
        </div>

        <!-- Link hoặc địa điểm tuỳ hình thức -->
        <div v-if="rescheduleForm.interviewType !== 'onsite'" class="reschedule-form__field">
          <label class="reschedule-form__label">Link họp (Google Meet / Zoom) <span class="reschedule-form__required">*</span></label>
          <input
            v-model="rescheduleForm.meetingLink"
            type="url"
            class="reschedule-form__input"
            :class="{ 'reschedule-form__input--error': rescheduleErrors.meetingLink }"
            placeholder="https://meet.google.com/..."
            @input="rescheduleErrors.meetingLink = ''"
          />
          <span v-if="rescheduleErrors.meetingLink" class="reschedule-form__error">{{ rescheduleErrors.meetingLink }}</span>
        </div>
        <div v-else class="reschedule-form__field">
          <label class="reschedule-form__label">Địa điểm phỏng vấn <span class="reschedule-form__required">*</span></label>
          <input
            v-model="rescheduleForm.location"
            type="text"
            class="reschedule-form__input"
            :class="{ 'reschedule-form__input--error': rescheduleErrors.location }"
            placeholder="Nhập địa chỉ văn phòng..."
            @input="rescheduleErrors.location = ''"
          />
          <span v-if="rescheduleErrors.location" class="reschedule-form__error">{{ rescheduleErrors.location }}</span>
        </div>

        <div class="reschedule-form__field">
          <label class="reschedule-form__label">Ghi chú cho người phỏng vấn</label>
          <textarea v-model="rescheduleForm.note" class="reschedule-form__input reschedule-form__textarea" rows="2" placeholder="Nhập ghi chú..." />
        </div>
      </div>
    </GlobalModal>

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
import type { ResInterviewRoundDTO, ResInterviewScheduleDTO } from '@/types/interview.types'
import { INTERVIEW_STATUS, INTERVIEW_TYPE } from '@/constants/interview.constants'
import { useToast } from '@/composables/useToast'
import GlobalModal from '@/components/ui/GlobalModal.vue'

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

// ── Reschedule Modal State ─────────────────────────────────
const isRescheduleVisible = ref(false)
const isRescheduleLoading = ref(false)
const rescheduleScheduleId = ref<number | null>(null)
const rescheduleCandidate  = ref<{ name: string } | null>(null)
const rescheduleForm = ref({
  date:          '',
  time:          '',
  interviewType: 'online' as string,
  meetingLink:   '',
  location:      '',
  note:          '',
})
const rescheduleErrors = ref<Record<string, string>>({})

// ── API Data ───────────────────────────────────────────────
const rounds         = ref<ResInterviewRoundDTO[]>([])
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

// ── Computed: Active round interviewers ────────────────────
const activeRoundInterviewers = computed(() =>
  rounds.value.find(r => r.id === activeStageId.value)?.interviewers ?? []
)

// ── Computed: Map schedules → candidate rows ───────────────
const filteredCandidates = computed(() =>
  roundSchedules.value.map(s => mapToCandidate(s, activeRoundInterviewers.value))
)

// ── Computed: Pagination ───────────────────────────────────
const totalApps  = computed(() => filteredCandidates.value.length)
const totalPages = computed(() => Math.ceil(totalApps.value / PAGE_SIZE))

// ── Helpers ────────────────────────────────────────────────
function mapApiStatusToUi(status: string): 'confirmed' | 'pending' | 'overdue' {
  if (status === INTERVIEW_STATUS.CONFIRMED || status === INTERVIEW_STATUS.COMPLETED) return 'confirmed'
  if (status === INTERVIEW_STATUS.NO_SHOW)                                            return 'overdue'
  return 'pending'
}

function mapInterviewType(type: string): { label: string; formatType: 'online' | 'offline' } {
  if (type === INTERVIEW_TYPE.ONLINE) return { label: 'Trực tuyến', formatType: 'online' }
  if (type === INTERVIEW_TYPE.PHONE)  return { label: 'Điện thoại', formatType: 'online' }
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
  schedule: ResInterviewScheduleDTO,
  interviewers: { id: number; name: string }[] = [],
) {
  const firstInterviewer = interviewers[0]
  const { label, formatType } = mapInterviewType(schedule.interviewType)
  return {
    id:        schedule.applicationId,
    name:      schedule.candidateName,
    role:      schedule.candidateEmail,
    avatarUrl: '',
    interviewer: firstInterviewer
      ? { id: firstInterviewer.id, name: firstInterviewer.name, initials: getInitials(firstInterviewer.name) }
      : { id: 0, name: '—', initials: '?' },
    hasSchedule:    true,
    scheduleStatus: schedule.status,
    dateLabel:      formatDateLabel(schedule.scheduledAt),
    dateFormatted:  new Date(schedule.scheduledAt).toLocaleDateString('vi-VN', {
      day: 'numeric', month: 'long', year: 'numeric',
    }),
    format:     schedule.interviewType === INTERVIEW_TYPE.ONLINE && schedule.meetingLink
      ? (schedule.meetingLink.includes('meet.google') ? 'Google Meet' : 'Trực tuyến')
      : label,
    formatType,
    status: mapApiStatusToUi(schedule.status),
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

async function fetchSchedules() {
  if (activeStageId.value === null) return
  try {
    roundSchedules.value = await employerInterviewService.getSchedules(jobId.value, {
      roundId: activeStageId.value,
      status:  statusFilter.value !== 'all' ? statusFilter.value : undefined,
      search:  searchValue.value.trim() || undefined,
    })
  } catch (err: any) {
    toast.error('Lỗi', err?.response?.data?.message ?? 'Không thể tải lịch phỏng vấn.')
  }
}

// ── Watchers ───────────────────────────────────────────────
watch(activeStageId, () => { fetchSchedules() })
watch(statusFilter,  () => { fetchSchedules() })

onMounted(async () => {
  await fetchRounds()
  await fetchSchedules()
})

// ── Handlers ───────────────────────────────────────────────
function handleSelectStage(stageId: number) {
  activeStageId.value = stageId
}

function handleSearch() {
  fetchSchedules()
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

function setRescheduleType(type: 'online' | 'onsite') {
  rescheduleForm.value.interviewType = type
}

function handleReschedule(applicationId: number) {
  const schedule = roundSchedules.value.find(s => s.applicationId === applicationId)
  if (!schedule) return

  const dt = new Date(schedule.scheduledAt)
  rescheduleScheduleId.value = schedule.id
  rescheduleCandidate.value  = { name: schedule.candidateName }
  rescheduleForm.value = {
    date:          dt.toISOString().split('T')[0],
    time:          dt.toTimeString().slice(0, 5),
    interviewType: schedule.interviewType,
    meetingLink:   schedule.meetingLink ?? '',
    location:      schedule.location ?? '',
    note:          schedule.interviewerNote ?? '',
  }
  rescheduleErrors.value = {}
  isRescheduleVisible.value = true
}

function validateReschedule(): boolean {
  const errors: Record<string, string> = {}
  const f = rescheduleForm.value

  if (!f.date) {
    errors.date = 'Vui lòng chọn ngày phỏng vấn.'
  } else if (!f.time) {
    errors.time = 'Vui lòng chọn giờ phỏng vấn.'
  } else {
    const scheduledAt = new Date(`${f.date}T${f.time}`)
    if (scheduledAt <= new Date()) {
      errors.date = 'Thời gian phỏng vấn phải ở tương lai.'
    }
  }

  if (f.interviewType !== 'onsite' && !f.meetingLink.trim()) {
    errors.meetingLink = 'Vui lòng nhập link họp.'
  }
  if (f.interviewType === 'onsite' && !f.location.trim()) {
    errors.location = 'Vui lòng nhập địa điểm phỏng vấn.'
  }

  rescheduleErrors.value = errors
  return Object.keys(errors).length === 0
}

async function confirmReschedule() {
  if (!validateReschedule()) return

  isRescheduleLoading.value = true
  try {
    const isOnsite = rescheduleForm.value.interviewType === 'onsite'
    const updated = await employerInterviewService.updateSchedule(rescheduleScheduleId.value!, {
      scheduledAt:     `${rescheduleForm.value.date}T${rescheduleForm.value.time}:00`,
      interviewType:   rescheduleForm.value.interviewType as 'online' | 'onsite' | 'phone',
      meetingLink:     !isOnsite ? rescheduleForm.value.meetingLink || undefined : undefined,
      location:        isOnsite  ? rescheduleForm.value.location    || undefined : undefined,
      interviewerNote: rescheduleForm.value.note || undefined,
    })

    const idx = roundSchedules.value.findIndex(s => s.id === rescheduleScheduleId.value)
    if (idx !== -1) roundSchedules.value[idx] = updated

    toast.success('Đổi lịch thành công!', `Lịch phỏng vấn của ${rescheduleCandidate.value?.name} đã được cập nhật.`)
    isRescheduleVisible.value = false
  } catch (err: any) {
    toast.error('Lỗi', err?.response?.data?.message ?? 'Không thể đổi lịch. Vui lòng thử lại.')
  } finally {
    isRescheduleLoading.value = false
  }
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

/* Reschedule form */
.reschedule-form { display: flex; flex-direction: column; gap: 1rem; padding: 0.25rem 0; }
.reschedule-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.reschedule-form__field { display: flex; flex-direction: column; gap: 0.375rem; }
.reschedule-form__label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }
.reschedule-form__input {
  width: 100%; padding: 0.75rem 1rem; box-sizing: border-box;
  background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.625rem;
  font-size: 0.875rem; font-family: inherit; color: #0f172a;
  outline: none; transition: border-color 0.18s, box-shadow 0.18s;
}
.reschedule-form__input:focus { border-color: #4b9af6; box-shadow: 0 0 0 3px rgba(75,154,246,0.15); }
.reschedule-form__textarea { resize: none; }
.reschedule-form__mode-toggle {
  display: flex; gap: 0.25rem; padding: 0.25rem;
  background: #f8fafc; border-radius: 0.75rem; width: fit-content;
}
.reschedule-form__mode-btn {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.5rem 1.25rem; border-radius: 0.625rem; border: none;
  background: transparent; font-size: 0.875rem; font-weight: 500;
  font-family: inherit; color: #64748b; cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
}
.reschedule-form__mode-btn .material-symbols-outlined { font-size: 1.1rem; }
.reschedule-form__mode-btn--active {
  background: #fff; color: #4b9af6; font-weight: 700;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.reschedule-form__required { color: #ef4444; margin-left: 2px; }
.reschedule-form__input--error { border-color: #ef4444 !important; }
.reschedule-form__input--error:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.15) !important; }
.reschedule-form__error { font-size: 0.75rem; color: #ef4444; font-weight: 500; margin-top: 2px; }
</style>
