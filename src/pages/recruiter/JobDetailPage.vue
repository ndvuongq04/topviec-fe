<template>
  <div v-if="loading" class="pt-20 flex justify-center">
    <span class="material-symbols-outlined animate-spin text-4xl text-primary">autorenew</span>
  </div>
  <div v-else-if="job" class="pt-6">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6">
      <router-link to="/recruiter/jobs" class="hover:text-primary cursor-pointer transition-colors">
        Quản lý tin tuyển dụng
      </router-link>
      <span class="material-symbols-outlined text-[10px]">chevron_right</span>
      <span class="text-slate-900 dark:text-slate-100 font-medium">Chi tiết tin</span>
    </nav>

    <!-- Header -->
    <JobDetailHeader
      :title="job.title"
      :location="locationString"
      :status="job.status"
      :is-featured="job.isFeatured"
      :is-urgent="job.isUrgent"
      @edit="onEdit"
      @pendingApproval="onPendingApproval"
      @pause="onPause"
      @resume="onResume"
      @close="onClose"
    />

    <!-- Stats -->
    <JobDetailStats :stats="stats" />

    <!-- Content: 2/3 + 1/3 Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <JobDetailDescription
        :description="job.description"
        :description-list="[]"
        :requirements="requirementsList"
        :benefits="benefitsList"
        :skills="skillsList"
      />
      <JobDetailSidebar
        :general-info="generalInfo"
        :timeline="timeline"
        :conversion-rate="'--'"
        :progress-width="'0%'"
        :conversion-note="'Chưa có thống kê ứng viên cho tin này.'"
      />
    </div>
  </div>
  <div v-else class="pt-20 text-center text-slate-500">
    <p>Không tìm thấy tin tuyển dụng.</p>
    <button @click="$router.push('/recruiter/jobs')" class="mt-4 text-primary hover:underline">Quay lại danh sách</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store'
import { employerJobPostingService } from '@/services/jobPosting.service'
import type { ResJobPostingDetail } from '@/types/jobPosting.types'

import JobDetailHeader from '@/components/recruiter/jobs/JobDetailHeader.vue'
import JobDetailStats from '@/components/recruiter/jobs/JobDetailStats.vue'
import JobDetailDescription from '@/components/recruiter/jobs/JobDetailDescription.vue'
import JobDetailSidebar from '@/components/recruiter/jobs/JobDetailSidebar.vue'
import type { JobStat } from '@/components/recruiter/jobs/JobDetailStats.vue'
import type { BenefitItem } from '@/components/recruiter/jobs/JobDetailDescription.vue'
import type { GeneralInfoItem, TimelineEvent } from '@/components/recruiter/jobs/JobDetailSidebar.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { confirm } = useConfirm()
const jobStore = useEmployerJobPostingStore()
const jobId = route.params.id as string

const job = ref<ResJobPostingDetail | null>(null)
const loading = ref(true)

async function fetchJob() {
  try {
    loading.value = true
    job.value = await employerJobPostingService.getById(jobId)
  } catch (error: any) {
    toast.error('Lỗi', 'Không thể tải thông tin tin tuyển dụng')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchJob()
})

const provinceMap: Record<number, string> = {
  1: 'Hà Nội',
  2: 'TP. Hồ Chí Minh',
  3: 'Đà Nẵng',
  4: 'Hải Phòng',
  5: 'Cần Thơ',
  6: 'Bình Dương',
  7: 'Đồng Nai'
}

const locationString = computed(() => {
  if (!job.value?.locations?.length) return 'Chưa cập nhật'
  return job.value.locations.map(l => {
    let str = ''
    if (l.addressDetail) str += l.addressDetail + ', '
    str += (l as any).provinceName || provinceMap[l.provinceId] || `Tỉnh ID: ${l.provinceId}`
    return str
  }).join(' • ')
})

const requirementsList = computed(() => {
  if (!job.value?.requirements) return []
  return job.value.requirements.split('\n').filter(r => r.trim() !== '')
})

const benefitsList = computed<BenefitItem[]>(() => {
  if (!job.value?.benefits) return []
  const lines = job.value.benefits.split('\n').filter(b => b.trim() !== '')
  return lines.map(line => ({
    icon: 'check_circle',
    text: line.replace(/^- /, '')
  }))
})

const skillsList = computed(() => {
  if (!job.value?.skills) return []
  return job.value.skills.map(s => s.skillName || `Kỹ năng - ID ${s.skillId}`)
})

const stats = computed<JobStat[]>(() => {
  if (!job.value) return []
  // Calculate remaining days
  const now = new Date()
  const deadline = new Date(job.value.deadline)
  const diffTime = Math.max(0, deadline.getTime() - now.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return [
    { icon: 'visibility', label: 'Lượt xem', value: job.value.viewCount?.toLocaleString('vi-VN') || '0', bgClass: 'bg-blue-50 dark:bg-blue-900/20', iconClass: 'text-blue-600 dark:text-blue-400' },
    { icon: 'groups', label: 'Ứng viên', value: '0', bgClass: 'bg-orange-50 dark:bg-orange-900/20', iconClass: 'text-orange-600 dark:text-orange-400' },
    { icon: 'history_edu', label: 'Lần chỉnh sửa', value: `${job.value.editCount || 0}`, bgClass: 'bg-purple-50 dark:bg-purple-900/20', iconClass: 'text-purple-600 dark:text-purple-400' },
    { icon: 'schedule', label: 'Ngày còn lại', value: diffDays > 0 ? `${diffDays} ngày` : 'Đã hết hạn', bgClass: 'bg-red-50 dark:bg-red-900/20', iconClass: 'text-red-600 dark:text-red-400' },
  ]
})

const generalInfo = computed<GeneralInfoItem[]>(() => {
  if (!job.value) return []
  
  const industryName = job.value.industry?.name || 'Chưa cập nhật'
  const levelName = job.value.level?.name || 'Chưa cập nhật'

  const expStr = job.value.experienceYearsMax 
    ? `${job.value.experienceYearsMin} - ${job.value.experienceYearsMax} năm` 
    : `${job.value.experienceYearsMin} năm trở lên`

  const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
  let salaryStr = 'Thỏa thuận'
  if (!job.value.salaryNegotiable && (job.value.salaryMin || job.value.salaryMax)) {
    if (job.value.salaryMin && job.value.salaryMax) {
      salaryStr = `${formatCurrency(job.value.salaryMin)} - ${formatCurrency(job.value.salaryMax)}`
    } else if (job.value.salaryMin) {
      salaryStr = `Từ ${formatCurrency(job.value.salaryMin)}`
    } else {
      salaryStr = `Đến ${formatCurrency(job.value.salaryMax as number)}`
    }
  }

  return [
    { icon: 'category', label: 'Ngành nghề', value: industryName }, 
    { icon: 'military_tech', label: 'Cấp bậc', value: levelName },
    { icon: 'history', label: 'Kinh nghiệm', value: expStr },
    { icon: 'monetization_on', label: 'Mức lương', value: salaryStr, valueClass: 'text-primary font-bold' },
    { icon: 'work', label: 'Hình thức', value: job.value.workType },
    { icon: 'person_add', label: 'Số lượng', value: `${job.value.headcount} người` },
  ]
})

const timeline = computed<TimelineEvent[]>(() => {
  if (!job.value) return []
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '--'
    const d = new Date(dateStr)
    return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }
  const onlyDate = (dateStr: string) => {
    if (!dateStr) return '--'
    return new Date(dateStr).toLocaleDateString('vi-VN')
  }

  return [
    { label: 'Ngày tạo', value: formatDate(job.value.createdAt) },
    { label: 'Ngày đăng', value: formatDate(job.value.publishedAt || job.value.createdAt) },
    { label: 'Hạn cuối', value: onlyDate(job.value.deadline), dotClass: 'bg-red-500', valueClass: 'font-bold text-red-500' },
  ]
})

function onEdit() {
  router.push(`/recruiter/jobs/${jobId}/edit`)
}
async function onPendingApproval() {
  const isConfirmed = await confirm({
    title: 'Xác nhận gửi duyệt',
    message: `Bạn có chắc chắn muốn gửi duyệt tin "${job.value?.title}" không?`,
    confirmText: 'Gửi duyệt',
    cancelText: 'Hủy bỏ',
    confirmColor: 'primary',
    icon: 'send'
  })
  if (!isConfirmed) return

  try {
    await jobStore.pendingApproval(jobId)
    toast.success('Thành công', 'Đã gửi duyệt tin tuyển dụng')
    fetchJob()
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể gửi duyệt tin')
  }
}
async function onPause() {
  try {
    await jobStore.pauseJob(jobId)
    toast.success('Thành công', 'Đã tạm dừng tin tuyển dụng')
    fetchJob()
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể tạm dừng tin')
  }
}
async function onResume() {
  try {
    await jobStore.resumeJob(jobId)
    toast.success('Thành công', 'Đã mở lại tin tuyển dụng')
    fetchJob()
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể mở lại tin')
  }
}
async function onClose() {
  const isConfirmed = await confirm({
    title: 'Xác nhận đóng tin',
    message: `Bạn có chắc chắn muốn đóng tin "${job.value?.title}" không? Tác vụ này không thể hoàn tác.`,
    confirmText: 'Đóng tin',
    cancelText: 'Hủy bỏ',
    confirmColor: 'red',
    icon: 'warning'
  })
  if (!isConfirmed) return
  
  try {
    await jobStore.closeJob(jobId)
    toast.success('Thành công', 'Đã đóng tin tuyển dụng')
    fetchJob()
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể đóng tin')
  }
}
</script>
