<template>
  <div class="overdue-page">
    <!-- Breadcrumb & Header -->
    <div class="overdue-page__header">
      <div>
        <Breadcrumb 
          :items="breadcrumbItems" 
          hide-home
          class="overdue-page__breadcrumb-comp"
        />
        <h2 class="overdue-page__title">Quản lý lịch phỏng vấn</h2>
        <p class="overdue-page__subtitle">Ứng viên quá hạn phản hồi &amp; chưa xác nhận lịch.</p>
      </div>
    </div>

    <!-- Stats -->
    <OverdueStatsGrid :total-overdue="overdueApplications.length" />

    <!-- Table -->
    <OverdueTable
      :items="overdueApplications"
      :loading="loading"
      @extend="handleExtendDeadline"
      @force-schedule="handleForceSchedule"
    />

    <!-- Modals -->
    <ExtendDeadlineModal
      :visible="isExtendModalOpen"
      :candidate-name="selectedApp?.candidateName"
      :current-deadline="selectedApp?.reminderDeadline"
      :loading="isExtending"
      @close="isExtendModalOpen = false"
      @confirm="confirmExtend"
    />

    <ForceScheduleModal
      :visible="isForceScheduleModalOpen"
      :candidate-name="selectedApp?.candidateName"
      :loading="isForceScheduling"
      @close="isForceScheduleModalOpen = false"
      @confirm="confirmForceSchedule"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployerInterviewStore } from '@/stores/employerInterview.store'
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store'
import { useToast } from '@/composables/useToast'
import OverdueStatsGrid from '@/components/recruiter/interviews/interview-overdue/OverdueStatsGrid.vue'
import OverdueTable from '@/components/recruiter/interviews/interview-overdue/OverdueTable.vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import ExtendDeadlineModal from '@/components/recruiter/interviews/interview-overdue/ExtendDeadlineModal.vue'
import ForceScheduleModal from '@/components/recruiter/interviews/interview-overdue/ForceScheduleModal.vue'

const breadcrumbItems = [
  { label: 'Thiết lập phỏng vấn', to: '/recruiter/interviews' },
  { label: 'Ứng viên quá hạn' }
]

const route = useRoute()
const router = useRouter()
const interviewStore = useEmployerInterviewStore()
const jobStore = useEmployerJobPostingStore()
const toast = useToast()

// --- State ---
const selectedJobId = ref<number | null>(null)
const loading = ref(false)
const jobs = ref([
  { id: 1, title: 'Senior Frontend Developer (Vue.js)' },
  { id: 2, title: 'Product Designer (Figma)' }
])

const overdueApplications = ref([
  {
    applicationId: 101,
    candidateName: 'Nguyễn Văn A',
    candidateEmail: 'nguyenvana@gmail.com',
    reminderCount: 3,
    reminderDeadline: new Date(Date.now() - 86400000 * 2).toISOString() // 2 ngày trước
  },
  {
    applicationId: 102,
    candidateName: 'Trần Thị B',
    candidateEmail: 'tranthib@outlook.com',
    reminderCount: 1,
    reminderDeadline: new Date(Date.now() - 3600000 * 5).toISOString() // 5 giờ trước
  },
  {
    applicationId: 103,
    candidateName: 'Lê Hoàng C',
    candidateEmail: 'lehoangc@company.com',
    reminderCount: 5,
    reminderDeadline: new Date(Date.now() - 86400000 * 4).toISOString() // 4 ngày trước
  }
])

const isExtendModalOpen = ref(false)
const isForceScheduleModalOpen = ref(false)
const selectedAppId = ref<number | null>(null)
const selectedApp = computed(() => overdueApplications.value.find(a => a.applicationId === selectedAppId.value))
const isExtending = ref(false)
const isForceScheduling = ref(false)

// --- Lifecycle ---
onMounted(async () => {
  // await jobStore.fetchJobs({ size: 100 })
  selectedJobId.value = jobs.value[0].id
})

// --- Watchers ---
watch(selectedJobId, (newId) => {
  // if (newId) interviewStore.fetchOverdue(newId)
})

// --- Actions ---
function handleExtendDeadline(applicationId: number) {
  selectedAppId.value = applicationId
  isExtendModalOpen.value = true
}

async function confirmExtend(days: number) {
  if (!selectedApp.value) return

  isExtending.value = true
  
  // Giả lập API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  try {
    // Cập nhật local data (Mock)
    const baseDate = new Date(selectedApp.value.reminderDeadline)
    selectedApp.value.reminderDeadline = new Date(baseDate.getTime() + days * 86400000).toISOString()
    
    toast.success('Thành công', `Đã gia hạn thêm ${days} ngày cho ứng viên.`)
    isExtendModalOpen.value = false
  } catch {
    toast.error('Lỗi', 'Không thể gia hạn thời gian.')
  } finally {
    isExtending.value = false
  }
}

function handleForceSchedule(applicationId: number) {
  selectedAppId.value = applicationId
  isForceScheduleModalOpen.value = true
}

async function confirmForceSchedule(data: any) {
  if (!selectedApp.value) return

  isForceScheduling.value = true
  
  // Giả lập API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {
    // Xóa ứng viên khỏi danh sách (vì đã có lịch mới)
    const idx = overdueApplications.value.findIndex(a => a.applicationId === selectedApp.value?.applicationId)
    if (idx !== -1) {
      overdueApplications.value.splice(idx, 1)
    }

    toast.success('Thành công', `Đã đặt lịch phỏng vấn hộ cho ${selectedApp.value.candidateName}.`)
    isForceScheduleModalOpen.value = false
  } catch {
    toast.error('Lỗi', 'Không thể đặt lịch phỏng vấn.')
  } finally {
    isForceScheduling.value = false
  }
}
</script>

<style scoped>
.overdue-page {
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Header */
.overdue-page__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .overdue-page__header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.overdue-page__breadcrumb-comp {
  margin-bottom: 0.75rem;
}

.overdue-page__title {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin: 0 0 0.25rem;
}

.overdue-page__subtitle {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
}

/* Job selector */
.overdue-page__job-select {
  padding: 0.625rem 1.25rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  color: #475569;
  font-family: inherit;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  outline: none;
  min-width: 15rem;
  cursor: pointer;
  transition: box-shadow 0.18s;
}

.overdue-page__job-select:focus {
  box-shadow: 0 0 0 2px rgba(75,154,246,0.2);
}
</style>