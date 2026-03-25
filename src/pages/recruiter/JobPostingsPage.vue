<template>
  <div class="space-y-8 pt-6">
    <!-- Top Actions -->
    <div class="flex items-end justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Danh sách tin tuyển dụng</h1>
        <p class="text-slate-500 text-sm">Quản lý và theo dõi hiệu quả các tin đăng của bạn.</p>
      </div>
      <router-link
        to="/recruiter/jobs/create"
        class="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20 cursor-pointer"
      >
        <span class="material-symbols-outlined">add</span>
        Đăng tin mới
      </router-link>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <JobPostingSummaryCard
        v-for="card in summaryCards"
        :key="card.label"
        :icon="card.icon"
        :label="card.label"
        :value="card.value"
      />
    </div>

    <!-- Filters & Search -->
    <JobPostingFilters
      :search="searchQuery"
      :filter="activeFilter"
      @update:search="searchQuery = $event"
      @update:filter="activeFilter = $event"
    />

    <!-- Job Table + Pagination -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
      <JobPostingTable
        :jobs="jobs"
        @edit="onEdit"
        @pendingApproval="onPendingApproval"
        @pause="onPause"
        @resume="onResume"
        @close="onClose"
        @extend="onExtend"
        @view="onView"
        @candidates="onCandidates"
      />
      <JobPostingPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="totalItems"
        :page-size="pageSize"
        @update:page="currentPage = $event"
      />
    </div>

    <!-- Extend Job Modal -->
    <GlobalModal
      :visible="showExtendModal"
      title="Gia hạn tin tuyển dụng"
      subtitle="Vui lòng chọn ngày hết hạn mới cho tin tuyển dụng này."
      icon="update"
      :loading="isExtending"
      confirm-text="Gia hạn"
      @close="closeExtendModal"
      @confirm="submitExtendJob"
    >
      <div v-if="jobToExtend" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Hạn chót mới</label>
          <input
            v-model="newDeadlineDate"
            type="date"
            class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-primary/20 focus:border-primary"
            :min="minDeadlineDate"
          />
          <p class="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">info</span>
            Bạn đang gia hạn tin: <strong class="text-slate-700 dark:text-slate-300">{{ jobToExtend.title }}</strong>
          </p>
        </div>
      </div>
    </GlobalModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store'
import type { ResJobPostingDetail, JobPostingStatus } from '@/types/jobPosting.types'

import JobPostingSummaryCard from '@/components/recruiter/jobs/JobPostingSummaryCard.vue'
import JobPostingFilters from '@/components/recruiter/jobs/JobPostingFilters.vue'
import JobPostingTable from '@/components/recruiter/jobs/JobPostingTable.vue'
import JobPostingPagination from '@/components/recruiter/jobs/JobPostingPagination.vue'
import GlobalModal from '@/components/ui/GlobalModal.vue'
import type { FilterStatus } from '@/components/recruiter/jobs/JobPostingFilters.vue'

const router = useRouter()
const toast = useToast()
const { confirm } = useConfirm()
const jobStore = useEmployerJobPostingStore()

// State
const jobs = computed(() => jobStore.jobs)
const totalItems = computed(() => jobStore.meta.totals)
const loading = computed(() => jobStore.loading)

const searchQuery = ref('')
const activeFilter = ref<FilterStatus>('all')
const currentPage = ref(1)
const pageSize = ref(10)

// Extend Modal State
const showExtendModal = ref(false)
const isExtending = ref(false)
const jobToExtend = ref<ResJobPostingDetail | null>(null)
const newDeadlineDate = ref('')

const minDeadlineDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
})
const summaryStats = ref({
  total: 0,
  active: 0,
  pending: 0,
  expired: 0
})

const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize.value)))

// Summary cards
const summaryCards = computed(() => [
  { icon: 'work',         label: 'Tổng số tin',  value: summaryStats.value.total },
  { icon: 'check_circle', label: 'Đang tuyển',   value: summaryStats.value.active },
  { icon: 'schedule',     label: 'Chờ duyệt',    value: summaryStats.value.pending },
  { icon: 'warning',      label: 'Hết hạn',      value: summaryStats.value.expired },
])

async function fetchJobs() {
  await jobStore.fetchJobs({
    page: Math.max(0, currentPage.value - 1),
    size: pageSize.value,
    keyword: searchQuery.value || undefined,
    status: (activeFilter.value !== 'all' ? activeFilter.value : undefined) as JobPostingStatus | undefined
  })

  if (jobStore.error) {
    toast.error('Lỗi', jobStore.error)
  } else {
    // Update summary stats
    summaryStats.value = {
      total: totalItems.value || jobs.value.length,
      active: jobs.value.filter(j => j.status?.toLowerCase() === 'published').length,
      pending: jobs.value.filter(j => j.status?.toLowerCase() === 'pending_approval').length,
      expired: jobs.value.filter(j => j.status?.toLowerCase() === 'expired').length,
    }
  }
}

// Re-fetch when filters or page changes
watch([currentPage, activeFilter], () => {
  fetchJobs()
})

// Delay search to avoid spamming
let searchTimeout: any
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchJobs()
  }, 500)
})

onMounted(() => {
  fetchJobs()
})

// Handlers
function onEdit(job: ResJobPostingDetail) {
  router.push(`/recruiter/jobs/${job.id}/edit`)
}

async function onPendingApproval(job: ResJobPostingDetail) {
  const isConfirmed = await confirm({
    title: 'Xác nhận gửi duyệt',
    message: `Bạn có chắc chắn muốn gửi duyệt tin "${job.title}" không? Sau khi gửi, tin sẽ chuyển sang trạng thái "Chờ duyệt".`,
    confirmText: 'Gửi duyệt',
    cancelText: 'Hủy bỏ',
    confirmColor: 'primary',
    icon: 'send'
  })
  if (!isConfirmed) return

  try {
    await jobStore.pendingApproval(job.id)
    toast.success('Thành công', 'Đã gửi duyệt tin tuyển dụng')
    fetchJobs()
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể gửi duyệt tin')
  }
}

async function onPause(job: ResJobPostingDetail) {
  try {
    await jobStore.pauseJob(job.id)
    toast.success('Thành công', 'Đã tạm dừng tin tuyển dụng')
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể tạm dừng tin')
  }
}

async function onResume(job: ResJobPostingDetail) {
  try {
    await jobStore.resumeJob(job.id)
    toast.success('Thành công', 'Đã mở lại tin tuyển dụng')
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể mở lại tin')
  }
}

async function onClose(job: ResJobPostingDetail) {
  const isConfirmed = await confirm({
    title: 'Xác nhận đóng tin',
    message: `Bạn có chắc chắn muốn đóng tin "${job.title}" không? Tác vụ này không thể hoàn tác.`,
    confirmText: 'Đóng tin',
    cancelText: 'Hủy bỏ',
    confirmColor: 'red',
    icon: 'warning'
  })
  if (!isConfirmed) return

  try {
    await jobStore.closeJob(job.id)
    toast.success('Thành công', 'Đã đóng tin tuyển dụng')
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể đóng tin')
  }
}

async function onExtend(job: ResJobPostingDetail) {
  jobToExtend.value = job
  
  // Mặc định gia hạn thêm 30 ngày so với hiện tại hoặc deadline cũ
  const currentDeadline = new Date(job.deadline).getTime()
  const baseDate = currentDeadline > Date.now() ? currentDeadline : Date.now()
  const d = new Date(baseDate + 30 * 24 * 60 * 60 * 1000)
  
  newDeadlineDate.value = d.toISOString().split('T')[0]
  showExtendModal.value = true
}

function closeExtendModal() {
  showExtendModal.value = false
  setTimeout(() => { jobToExtend.value = null }, 300)
}

async function submitExtendJob() {
  if (!jobToExtend.value || !newDeadlineDate.value) return
  
  try {
    isExtending.value = true
    // Force 23:59:59 as requested
    const newDeadline = `${newDeadlineDate.value}T23:59:59`
    await jobStore.extendJob(jobToExtend.value.id, { newDeadline })
    toast.success('Thành công', 'Đã gia hạn tin tuyển dụng')
    fetchJobs()
    closeExtendModal()
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể gia hạn tin')
  } finally {
    isExtending.value = false
  }
}

function onView(job: ResJobPostingDetail) {
  router.push(`/recruiter/jobs/${job.id}`)
}

function onCandidates(job: ResJobPostingDetail) {
  router.push({ name: 'recruiter-job-applications', params: { id: job.id } })
}
</script>
