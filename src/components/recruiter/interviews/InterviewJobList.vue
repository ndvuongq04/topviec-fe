<template>
  <div>
    <!-- Section header -->
    <div class="section-header">
      <h4>Tin tuyển dụng đang hoạt động</h4>
      <router-link to="/recruiter/job-postings" class="view-all-link">
        Xem tất cả
      </router-link>
    </div>

    <!-- Table -->
    <div class="job-list">
      <InterviewJobRow
        v-for="job in jobPostings"
        :key="job.id"
       :job="job"
        :is-active="activeId === job.id"
        @click="activeId = job.id"
        @view-detail="handleViewDetail(job.id)"
        @setup-rounds="handleSetupRounds(job.id)"
        @finish-interview="handleFinishInterview(job.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import InterviewJobRow from './InterviewJobRow.vue'
import { employerJobPostingService } from '@/services/employerJobPosting.service'
import { JobPostingStatus } from '@/constants/jobPosting.constants'
import type { ResJobPostingDetail } from '@/types/jobPosting.types'

type IconVariant = 'blue-light' | 'blue-solid' | 'orange' | 'purple' | 'green' | 'rose'
const ICON_VARIANTS: IconVariant[] = ['blue-light', 'blue-solid', 'orange', 'purple', 'green', 'rose']

const router = useRouter()

const rawJobs = ref<ResJobPostingDetail[]>([])
const isLoading = ref(false)
const activeId = ref<number | null>(null)

const jobPostings = computed(() =>
  rawJobs.value.map((job, index) => ({
    id: job.id,
    title: job.title,
    department: job.industry?.name ?? '',
    level: job.level?.name ?? '',
    candidateCount: job.applicationCount,
    interviewsPerWeek: 0,
    icon: 'work',
    iconVariant: ICON_VARIANTS[index % ICON_VARIANTS.length],
    status: job.status,
    interviewRoundsCount: job.interviewRoundsCount ?? 0,
  }))
)

async function fetchInterviewingJobs() {
  isLoading.value = true
  try {
    const res = await employerJobPostingService.getList({ status: JobPostingStatus.INTERVIEWING, size: 50 })
    rawJobs.value = res.result
    if (res.result.length > 0) activeId.value = res.result[0].id
  } catch (err) {
    console.error('Failed to fetch interviewing jobs:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchInterviewingJobs)

function handleViewDetail(jobId: number) {
  router.push({ name: 'recruiter-job-interview-setup', params: { id: jobId } })
}

function handleSetupRounds(jobId: number) {
  router.push({ name: 'recruiter-job-interview-stages', params: { id: jobId } })
}

function handleFinishInterview(jobId: number) {
  console.log('Finish interview process for job:', jobId)
  alert('Đã kết thúc đợt phỏng vấn cho tin tuyển dụng này.')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap');

.section-header {
  font-family: 'Manrope', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.section-header h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
}

.view-all-link {
  font-size: 1rem;
  font-weight: 700;
  color: #4B9AF6;
  text-decoration: none;
}
.view-all-link:hover { text-decoration: underline; }

.job-list {
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>