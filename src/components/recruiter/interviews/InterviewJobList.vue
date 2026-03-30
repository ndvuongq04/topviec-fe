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
        v-for="job in JOB_POSTINGS"
        :key="job.id"
        :job="job"
        :is-active="activeId === job.id"
        @click="activeId = job.id"
        @view-detail="handleViewDetail(job.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InterviewJobRow from './InterviewJobRow.vue'

// Định nghĩa interface ở đây, không import từ InterviewJobRow
interface JobPostingRow {
  id: number
  title: string
  department: string
  level: string
  candidateCount: number
  interviewsPerWeek: number
  icon: string
  iconVariant: 'blue-light' | 'blue-solid' | 'orange' | 'purple' | 'green' | 'rose'
}

const router = useRouter()

const JOB_POSTINGS: JobPostingRow[] = [
  {
    id: 1,
    title: 'Tin tuyển dụng Java Developer',
    department: 'Phòng phát triển phần mềm',
    level: 'Senior Level',
    candidateCount: 12,
    interviewsPerWeek: 4,
    icon: 'terminal',
    iconVariant: 'blue-light',
  },
  {
    id: 2,
    title: 'Tin tuyển dụng React JS Developer',
    department: 'Đội ngũ Frontend',
    level: 'Middle Level',
    candidateCount: 8,
    interviewsPerWeek: 3,
    icon: 'javascript',
    iconVariant: 'blue-solid',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    department: 'Đội ngũ Design',
    level: 'Junior/Middle',
    candidateCount: 15,
    interviewsPerWeek: 5,
    icon: 'palette',
    iconVariant: 'orange',
  },
  {
    id: 4,
    title: 'AI Engineer',
    department: 'Phòng R&D',
    level: 'Expert Level',
    candidateCount: 4,
    interviewsPerWeek: 1,
    icon: 'psychology',
    iconVariant: 'purple',
  },
]

const activeId = ref<number>(JOB_POSTINGS[1].id)

function handleViewDetail(jobId: number) {
  router.push(`/recruiter/job-postings/${jobId}/interviews`)
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
  overflow: hidden;
}
</style>