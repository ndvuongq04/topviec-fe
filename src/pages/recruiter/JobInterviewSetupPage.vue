<template>
  <div class="interview-page">
    <nav class="breadcrumb">
      <router-link :to="{ name: 'recruiter-jobs' }" class="breadcrumb__link">
        Tin tuyển dụng
      </router-link>
      <span class="material-symbols-outlined breadcrumb__sep">chevron_right</span>
      <span class="breadcrumb__current">Thiết lập phỏng vấn</span>
    </nav>

    <InterviewStageCards
      :stages="stages"
      :active-stage-id="activeStageId"
      :total-candidates="totalCandidates"
      @select="activeStageId = $event"
    />

    <InterviewCandidateTable
      :stage-name="activeStageName"
      :candidates="candidates"
      :total-count="totalCandidateCount"
      :current-page="currentPage"
      :total-pages="totalPages"
      @filter="handleFilter"
      @export="handleExport"
      @open-link="handleOpenLink"
      @view-detail="handleViewDetail"
      @reschedule="handleReschedule"
      @remind="handleRemind"
      @cancel="handleCancel"
      @page-change="currentPage = $event"
    />

    <InterviewFab
      tooltip="Tạo lịch phỏng vấn mới"
      @click="handleCreateInterview"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import InterviewStageCards from '@/components/recruiter/interviews/InterviewStageCards.vue'
import InterviewCandidateTable from '@/components/recruiter/interviews/InterviewCandidateTable.vue'
import InterviewFab from '@/components/recruiter/interviews/InterviewFab.vue'

const route = useRoute()
const jobId = computed(() => route.params.id)

// --- State ---
const activeStageId = ref(1)
const currentPage = ref(1)

// --- Mock Data (thay bằng store/API khi tích hợp) ---
const stages = [
  { id: 1, label: 'Vòng 1', name: 'HR Interview', count: 8 },
  { id: 2, label: 'Vòng 2', name: 'Technical', count: 12 },
  { id: 3, label: 'Vòng 3', name: 'Culture Fit', count: 4 },
]

const totalCandidates = 24

const candidates = [
  {
    id: 1,
    name: 'Lê Thuỳ Trang',
    role: 'UX/UI Specialist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDjIF9SrI38Nq6MUs2yDxhCI11xnHkZ1XgIXJYd01gzQE5i7dix22GQ-jQS0j7DvyiNfp16VZRLpe4HkF4E9Uw1DNsGY3vTUTBk8i6W_DN10VsMaPXUG1yT8K9ohluYwsSL2esPdl1u0gKaFGbt33Px-4iXlPvFB1gdDfO9A3idzas5WuxUU-rsuUaKwVbdU4rPbUgzFvGMSiojq6EYC3CakFRZy6osd7o-ha8qCi4rBzVqrIZY788YT1_TW4Hb9p4bcjzYH-1Dyw',
    dateLabel: 'Hôm nay, 14:30',
    dateFormatted: '22 Tháng 10, 2023',
    interviewer: {
      id: 1,
      name: 'Minh Tú (HR)',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3nD3KOiF9rzen7q6y3ldtGgw6JbiSFXtD2Y9b50fqyGvaNgI150ZiIhpzDCrKzzvQn6NyZ3ed1XBBksBLlNGrF78BzcBwb1ub4H2KGeqljcpAhL2bNC6KQapV_cpcA4vXs03iESRDdnSEiQKGVhAcd_jAIV-KfLPghNJan1CjsC_wgDXdlX_si8Nx_VbQeHVCbgsSiJABeE7w4dGl_mFuCTOJyXxqXU97brYuuaXGoUVqtTzJR6nwC8YzrZyKo-UJsVmBHVOQ',
      initials: 'MT',
    },
    format: 'Google Meet',
    formatType: 'online' as const,
    status: 'confirmed' as const,
  },
  {
    id: 2,
    name: 'Nguyễn Minh Quân',
    role: 'Visual Designer',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDql6gP61XgHOFwOTcWcRySpdix92n3pEBr9Utraka2e05afi3QxTMIw09m4i99Ofyg8lNcrKTJG6ZOOIidBtaDHJZWdhVvBhRE7FSbU4mb9-G72wQ2ss8wX7qiwcnJbYG4DG5WuJQMQo59kjo1asiF2qJYWaHydRNrPOAnaDZYtM3bQ3nbXnFOM1hV9N3wO1ArFJ6onwyxE8r4GmWcXyE-qU_Mw4Jdrf0yugMSxV4OKjh9-ghAS8MAwP8Y9T9uT7LwvbJBkrt95g',
    dateLabel: 'Mai, 09:00',
    dateFormatted: '23 Tháng 10, 2023',
    interviewer: {
      id: 2,
      name: 'Thanh Hà (HR)',
      initials: 'TH',
    },
    format: 'Văn phòng',
    formatType: 'offline' as const,
    status: 'pending' as const,
  },
  {
    id: 3,
    name: 'Phạm Bảo Yến',
    role: 'Lead UI Designer',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuudA4JAN9xXG69Lf1rylZ9EBMQlcxa6EX6Hx3KF4DTeacq_l3xleDDIoTaeayVKBLP2ppH2axNQOPud_CS0QqlF6i7vrs2XbE_BVnpM_XZlIUARVxB6tMIJg2Zmak_L1gEiaHx7BEcYtvVSgGQPgHjDJPSI9vPY6kbVqCZ_xsd46VPWB8kKV9Q0A57Wt2vPNoAKutY--iprWmCrG3ZKaYtGPuQIHbWM7xEdRbHoMOhQnAhPbZgLRIUHOl1GVit7Iaav6qspHx4w',
    dateLabel: 'Hôm qua, 15:00',
    dateFormatted: '21 Tháng 10, 2023',
    interviewer: {
      id: 1,
      name: 'Minh Tú (HR)',
      initials: 'MT',
    },
    format: 'Zoom Meeting',
    formatType: 'online' as const,
    status: 'overdue' as const,
  },
]

// --- Computed ---
const activeStageName = computed(() => {
  const stage = stages.find((s) => s.id === activeStageId.value)
  return stage ? `${stage.label} - ${stage.name}` : ''
})

const totalCandidateCount = computed(() => {
  return stages.find((s) => s.id === activeStageId.value)?.count ?? 0
})

const totalPages = computed(() => Math.ceil(totalCandidateCount.value / 3))

// --- Handlers (thay bằng logic thực khi tích hợp) ---
function handleFilter() {
  console.log('Open filter modal')
}

function handleExport() {
  console.log('Export data')
}

function handleOpenLink(candidateId: number) {
  console.log('Open meeting link for candidate:', candidateId)
}

function handleViewDetail(candidateId: number) {
  console.log('View detail for candidate:', candidateId)
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

function handleCreateInterview() {
  console.log('Create new interview')
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