<template>
  <div class="p-8 space-y-8">

    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
      <router-link to="/recruiter/interviews" class="hover:text-primary transition-colors">
        Phỏng vấn
      </router-link>
      <span class="material-symbols-outlined text-[12px]">chevron_right</span>
      <span class="text-slate-700 dark:text-slate-200 truncate max-w-xs">
        {{ selectedJob?.title || '...' }}
      </span>
    </nav>

    <!-- Page Header -->
    <div class="flex items-center gap-4 flex-wrap">
      <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Quản lý Lịch phỏng vấn
      </h2>
      <span class="h-6 w-px bg-slate-200 hidden md:block"></span>
      <div v-if="selectedJob" class="flex items-center gap-2 px-3 py-1 bg-primary-container rounded-full">
        <span class="material-symbols-outlined text-primary text-sm">badge</span>
        <span class="text-on-primary-container text-xs font-bold uppercase tracking-wide">
          {{ selectedJob.title }}
        </span>
      </div>
    </div>

    <!-- Skeleton rounds -->
    <div v-if="interviewStore.loading && rounds.length === 0" class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="i in 3" :key="i" class="h-24 bg-white rounded-2xl border border-slate-100 animate-pulse"></div>
      <div class="h-24 bg-slate-100 rounded-2xl animate-pulse"></div>
    </div>

    <!-- Tiến độ phỏng vấn -->
    <InterviewStagesSection
      v-else-if="stages.length > 0"
      :stages="stages"
      :total-candidates="totalCandidates"
      :active-stage-id="activeStageId ?? undefined"
      @select-stage="selectStage"
    />

    <!-- Empty rounds -->
    <div v-else-if="!interviewStore.loading" class="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-3">
      <span class="material-symbols-outlined text-4xl text-slate-300">format_list_numbered</span>
      <p class="text-sm font-bold text-slate-500">Chưa có vòng phỏng vấn nào được thiết lập.</p>
      <p class="text-xs text-slate-400">Vui lòng liên hệ quản trị viên để thiết lập vòng phỏng vấn cho vị trí này.</p>
    </div>

    <!-- Skeleton table -->
    <div v-if="interviewStore.loading && activeStageId" class="bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
      <div v-for="i in 3" :key="i" class="h-16 bg-slate-50 rounded-xl animate-pulse"></div>
    </div>

    <!-- Danh sách ứng viên -->
    <InterviewCandidateTable
      v-else-if="activeStageId"
      :stage-name="stageName"
      :candidates="pagedCandidates"
      :total-count="totalCount"
      :current-page="currentPage"
      :total-pages="totalPages"
      @candidate-action="handleCandidateAction"
      @prev-page="currentPage > 1 && currentPage--"
      @next-page="currentPage < totalPages && currentPage++"
      @go-to-page="currentPage = $event"
    />

  </div>

  <!-- FAB -->
  <router-link
    :to="`/recruiter/interviews/create?jobId=${jobPostId}`"
    class="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group z-50"
  >
    <span class="material-symbols-outlined text-[28px]">add</span>
    <span class="absolute right-full mr-4 bg-on-surface text-white text-xs font-bold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
      Tạo lịch phỏng vấn mới
    </span>
  </router-link>

  <GlobalConfirmModal />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployerInterviewStore } from '@/stores/employerInterview.store'
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store'
import { publicJobPostingService } from '@/services/jobPosting.service'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import type { ResInterviewScheduleDTO } from '@/types/interview.types'
import type { ResJobPostingDetail } from '@/types/jobPosting.types'
import InterviewStagesSection from '@/components/recruiter/interviews/InterviewStagesSection.vue'
import InterviewCandidateTable from '@/components/recruiter/interviews/InterviewCandidateTable.vue'
import GlobalConfirmModal from '@/components/ui/GlobalConfirmModal.vue'

const route = useRoute()
const router = useRouter()
const interviewStore = useEmployerInterviewStore()
const jobStore = useEmployerJobPostingStore()
const toast = useToast()
const confirm = useConfirm()

const jobPostId = Number(route.params.id)
const PAGE_SIZE = 5

// ─── State ───────────────────────────────────────────────────────────────────
const activeStageId = ref<number | null>(null)
const currentPage = ref(1)
const selectedJob = ref<ResJobPostingDetail | null>(null)

// ─── Computed ────────────────────────────────────────────────────────────────
const rounds = computed(() => interviewStore.rounds)
const schedules = computed(() => interviewStore.schedules)

/** Map ResInterviewRoundDTO → Stage props cho InterviewStagesSection */
const stages = computed(() =>
  rounds.value.map(r => ({
    id: r.id,
    round: `Vòng ${r.roundNumber}`,
    name: r.roundName,
    count: r.candidateCount,
    progressPercent: r.id === activeStageId.value ? 100 : 0,
  }))
)

const totalCandidates = computed(() =>
  rounds.value.reduce((sum, r) => sum + (r.candidateCount ?? 0), 0)
)

const activeRound = computed(() => rounds.value.find(r => r.id === activeStageId.value))

const stageName = computed(() =>
  activeRound.value
    ? `Vòng ${activeRound.value.roundNumber} - ${activeRound.value.roundName}`
    : ''
)

/** Bỏ lịch đã hủy, map toàn bộ schedules → định dạng component */
const allCandidates = computed(() =>
  schedules.value
    .filter(s => s.status !== 'cancelled')
    .map(s => mapScheduleToCandidate(s))
)

const totalCount = computed(() => allCandidates.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / PAGE_SIZE)))

/** Slice theo trang hiện tại */
const pagedCandidates = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return allCandidates.value.slice(start, start + PAGE_SIZE)
})

/** Map nhanh scheduleId → schedule gốc để dùng trong actions */
const scheduleMap = computed(() => {
  const map = new Map<number, ResInterviewScheduleDTO>()
  schedules.value.forEach(s => map.set(s.id, s))
  return map
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isPast(dateStr: string): boolean {
  return !!dateStr && new Date(dateStr) < new Date()
}

/** Map trạng thái API → 3 trạng thái mà component hiểu */
function getDisplayStatus(s: ResInterviewScheduleDTO): 'confirmed' | 'pending' | 'overdue' {
  if (isPast(s.scheduledAt) && s.status !== 'completed' && s.status !== 'cancelled') {
    return 'overdue'
  }
  if (s.confirmedByCandidate || s.status === 'confirmed' || s.status === 'completed') {
    return 'confirmed'
  }
  return 'pending'
}

/** Lấy người phỏng vấn đầu tiên của vòng */
function getInterviewer(roundId: number) {
  const round = rounds.value.find(r => r.id === roundId)
  const iv = round?.interviewers?.[0]
  if (!iv) return { name: 'Chưa phân công', initials: '--' }
  // Tạo initials từ 2 ký tự cuối tên
  const initials = iv.name.trim().split(' ').map(w => w[0]).slice(-2).join('').toUpperCase()
  return { name: iv.name, initials }
}

/** Label cho hình thức phỏng vấn */
function getMeetingLabel(s: ResInterviewScheduleDTO): string {
  if (s.interviewType === 'online') {
    if (s.meetingLink?.toLowerCase().includes('zoom')) return 'Zoom Meeting'
    return 'Google Meet'
  }
  if (s.interviewType === 'phone') return 'Điện thoại'
  return s.location || 'Văn phòng'
}

/** Định dạng giờ tương đối: "Hôm nay, 14:30" / "Hôm qua, 15:00" / "Ngày mai, 09:00" */
function formatScheduleLabel(dateStr: string): string {
  if (!dateStr) return '--:--'
  const d = new Date(dateStr)
  const time = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })

  const today = new Date(); today.setHours(0, 0, 0, 0)
  const dDay = new Date(d); dDay.setHours(0, 0, 0, 0)
  const diff = dDay.getTime() - today.getTime()
  const ONE_DAY = 86400000

  if (diff === 0)         return `Hôm nay, ${time}`
  if (diff === ONE_DAY)   return `Ngày mai, ${time}`
  if (diff === -ONE_DAY)  return `Hôm qua, ${time}`
  return time
}

function formatScheduleDate(dateStr: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

/** Map ResInterviewScheduleDTO → props của InterviewCandidateRow */
function mapScheduleToCandidate(s: ResInterviewScheduleDTO) {
  return {
    id: s.id,
    candidateName: s.candidateName,
    candidateRole: s.candidateEmail,          // email làm subtitle
    candidateAvatar: '',                       // không có avatar từ API
    scheduleLabel: formatScheduleLabel(s.scheduledAt),
    scheduleDate: formatScheduleDate(s.scheduledAt),
    interviewer: getInterviewer(s.roundId),
    meetingType: (s.interviewType === 'online' ? 'online' : 'offline') as 'online' | 'offline',
    meetingLabel: getMeetingLabel(s),
    status: getDisplayStatus(s),
  }
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────
onMounted(async () => {
  // Ưu tiên dùng lại từ store (đã load ở trang tổng quan), fallback gọi public API
  const cached = jobStore.jobs.find(j => j.id === jobPostId)
  if (cached) {
    selectedJob.value = cached
  } else {
    selectedJob.value = await publicJobPostingService.getById(jobPostId).catch(() => null)
  }

  await interviewStore.fetchRounds(jobPostId)
  if (rounds.value.length > 0) {
    await selectStage(rounds.value[0].id)
  }
})

// ─── Actions ─────────────────────────────────────────────────────────────────
async function selectStage(id: number | string) {
  activeStageId.value = Number(id)
  currentPage.value = 1
  await interviewStore.fetchSchedules(jobPostId, { roundId: Number(id) })
}

async function handleCandidateAction(id: number | string) {
  const schedule = scheduleMap.value.get(Number(id))
  if (!schedule) return

  const status = getDisplayStatus(schedule)

  // Confirmed + có link → mở link họp
  if (status === 'confirmed' && schedule.meetingLink) {
    window.open(schedule.meetingLink, '_blank')
    return
  }

  // Overdue → hỏi và đổi lịch
  if (status === 'overdue') {
    const ok = await confirm.confirm({
      title: 'Đổi lịch phỏng vấn?',
      message: `Lịch phỏng vấn với ${schedule.candidateName} đã quá hạn. Bạn muốn hủy để tạo lịch mới?`,
      confirmText: 'Đổi lịch',
      cancelText: 'Giữ lại',
      confirmColor: 'red',
    })
    if (!ok) return
    try {
      await interviewStore.deleteSchedule(schedule.id)
      toast.info('Đã hủy lịch cũ', 'Vui lòng tạo lịch phỏng vấn mới cho ứng viên.')
      await interviewStore.fetchSchedules(jobPostId, { roundId: activeStageId.value! })
    } catch {
      // error handled by store
    }
    return
  }

  // Pending → xem chi tiết / ghi kết quả
  router.push(`/recruiter/interviews/${schedule.id}/evaluate`)
}
</script>
