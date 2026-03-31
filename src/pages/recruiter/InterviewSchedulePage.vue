<template>
  <div class="schedule-page">
    <!-- Breadcrumb + heading -->
    <div class="schedule-page__top">
      <Breadcrumb :items="breadcrumbItems" :hide-home="true" />
      <h2 class="schedule-page__title">Tạo lịch phỏng vấn mới</h2>
      <p class="schedule-page__subtitle">
        Chủ động thiết lập thời gian và hình thức phỏng vấn cho ứng viên tiềm năng.
      </p>
    </div>

    <!-- Main grid -->
    <div class="schedule-page__grid">
      <!-- Left column -->
      <div class="schedule-page__main">
        <InterviewCandidateSection
          v-model="candidateForm"
          :candidates="candidates"
          :rounds="rounds"
        />

        <InterviewScheduleSection v-model="scheduleForm" />

        <InterviewNoteSection v-model="note" />
      </div>

      <!-- Right column -->
      <div class="schedule-page__sidebar">
        <InterviewSummaryCard
          :candidate-name="selectedCandidateName"
          :date="scheduleForm.date"
          :time="scheduleForm.time"
          :mode="scheduleForm.mode"
          :loading="submitting"
          @submit="handleSubmit"
        />

        <InterviewTipCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import InterviewCandidateSection from '@/components/recruiter/interviews/interview-schedule/Interviewcandidatesection.vue'
import InterviewScheduleSection from '@/components/recruiter/interviews/interview-schedule/Interviewschedulesection.vue'
import InterviewNoteSection from '@/components/recruiter/interviews/interview-schedule/Interviewnotesection.vue'
import InterviewSummaryCard from '@/components/recruiter/interviews/interview-schedule/Interviewsummarycard.vue'
import InterviewTipCard from '@/components/recruiter/interviews/interview-schedule/Interviewtipcard.vue'

const route = useRoute()
const jobId = route.query.jobId

const breadcrumbItems = computed(() => [
  { label: 'Thiết lập phỏng vấn', to: `/recruiter/jobs/${jobId}/interview-setup` },
  { label: 'Đặt lịch phỏng vấn thủ công' },
])

// ─── Static data (thay bằng API) ─────────────────────────────────────────────
const candidates = [
  { id: '1', label: 'Nguyễn Văn A - Frontend Developer' },
  { id: '2', label: 'Trần Thị B - Senior UI/UX Designer' },
  { id: '3', label: 'Lê Hoàng C - Backend Engineer' },
]

const rounds = [
  { value: '1', label: 'Vòng 1' },
  { value: '2', label: 'Vòng 2' },
  { value: '3', label: 'Vòng 3' },
  { value: 'final', label: 'Final' },
]

// ─── Form state ───────────────────────────────────────────────────────────────
const candidateForm = ref({ candidateId: '', round: '1' })

const scheduleForm = ref({
  date: '',
  time: '',
  mode: 'online' as 'online' | 'offline',
  meetingLink: '',
  location: '',
})

const note = ref('')
const submitting = ref(false)

// ─── Computed ─────────────────────────────────────────────────────────────────
const selectedCandidateName = computed(() => {
  const found = candidates.find(c => c.id === candidateForm.value.candidateId)
  return found ? found.label.split(' - ')[0] : ''
})

// ─── Handler ─────────────────────────────────────────────────────────────────
async function handleSubmit() {
  submitting.value = true
  try {
    // TODO: gọi API tạo lịch phỏng vấn
    const payload = {
      ...candidateForm.value,
      ...scheduleForm.value,
      note: note.value,
    }
    console.log('Submit payload:', payload)
    await new Promise(r => setTimeout(r, 1200)) // mock delay
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.schedule-page {
  margin: 0 auto;
  width: 100%;
  font-family: 'Manrope', sans-serif;
}

/* Top */
.schedule-page__top {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.schedule-page__title {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin: 0 0 0.25rem;
}

.schedule-page__subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Grid */
.schedule-page__grid {
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .schedule-page__grid {
    grid-template-columns: 1fr;
  }
}

/* Main column */
.schedule-page__main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Sidebar */
.schedule-page__sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>