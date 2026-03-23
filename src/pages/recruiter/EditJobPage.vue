<template>
  <div class="flex justify-center">
    <div class="w-full max-w-7xl pt-6 pb-16">
      <!-- Header Actions -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <nav class="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <router-link to="/recruiter/jobs" class="hover:text-primary transition-colors cursor-pointer">Tuyển dụng</router-link>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
            <router-link :to="`/recruiter/jobs/${jobId}`" class="hover:text-primary transition-colors cursor-pointer">Chi tiết tin</router-link>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
            <span class="text-slate-900 dark:text-slate-100 font-medium">Chỉnh sửa</span>
          </nav>
          <div class="flex items-center gap-3">
            <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Cập nhật tin tuyển dụng</h2>
            <span class="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">edit_note</span>
              Đang chỉnh sửa
            </span>
          </div>
          <p class="text-slate-500 mt-1">Cập nhật thông tin để tin tuyển dụng luôn chính xác và hấp dẫn nhất.</p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <router-link
            :to="`/recruiter/jobs/${jobId}`"
            class="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
          >
            Hủy bỏ
          </router-link>
          <button
            type="button"
            class="px-8 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            @click="onUpdate"
          >
            <span class="material-symbols-outlined text-lg">save</span>
            <span>Cập nhật tin</span>
          </button>
        </div>
      </div>

      <!-- Edit notice -->
      <div class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
        <span class="material-symbols-outlined text-amber-500 shrink-0 mt-0.5">info</span>
        <div class="text-sm text-amber-800 dark:text-amber-300">
          <p class="font-semibold">Lưu ý khi chỉnh sửa</p>
          <p class="mt-1 text-amber-700 dark:text-amber-400">Tin tuyển dụng sau khi cập nhật có thể cần được duyệt lại. Bạn còn <span class="font-bold">1 lần</span> chỉnh sửa cho tin này.</p>
        </div>
      </div>

      <!-- Form Sections (reuse from Create Job) -->
      <div class="space-y-6">
        <CreateJobBasicInfo v-model="basicInfo" />
        <CreateJobDetails v-model="details" />
        <CreateJobSkills v-model="skills" />
        <CreateJobSalary v-model="salary" />
        <CreateJobLocation v-model="locations" />
        <CreateJobAdvanced v-model="advanced" />
      </div>

      <!-- Final Actions -->
      <div class="mt-8 pt-6 flex justify-end gap-4 border-t border-slate-200 dark:border-slate-700">
        <router-link
          :to="`/recruiter/jobs/${jobId}`"
          class="px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-semibold hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
        >
          Hủy bỏ
        </router-link>
        <button
          type="button"
          class="px-12 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          @click="onUpdate"
        >
          <span class="material-symbols-outlined text-lg">save</span>
          <span>Cập nhật tin</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store'
import { employerJobPostingService } from '@/services/jobPosting.service'
import type { ReqUpdateJobPostingDTO } from '@/types/jobPosting.types'

import CreateJobBasicInfo from '@/components/recruiter/jobs/CreateJobBasicInfo.vue'
import CreateJobDetails from '@/components/recruiter/jobs/CreateJobDetails.vue'
import CreateJobSkills from '@/components/recruiter/jobs/CreateJobSkills.vue'
import CreateJobSalary from '@/components/recruiter/jobs/CreateJobSalary.vue'
import CreateJobLocation from '@/components/recruiter/jobs/CreateJobLocation.vue'
import CreateJobAdvanced from '@/components/recruiter/jobs/CreateJobAdvanced.vue'
import type { BasicInfoData } from '@/components/recruiter/jobs/CreateJobBasicInfo.vue'
import type { DetailsData } from '@/components/recruiter/jobs/CreateJobDetails.vue'
import type { SkillsData } from '@/components/recruiter/jobs/CreateJobSkills.vue'
import type { SalaryData } from '@/components/recruiter/jobs/CreateJobSalary.vue'
import type { LocationItem } from '@/components/recruiter/jobs/CreateJobLocation.vue'
import type { AdvancedData } from '@/components/recruiter/jobs/CreateJobAdvanced.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const jobStore = useEmployerJobPostingStore()
const jobId = route.params.id as string
const loading = ref(false)
const fetching = ref(true)

const basicInfo = ref<BasicInfoData>({
  title: '',
  industry: '',
  level: '',
  quantity: 1,
  deadline: '',
})

const details = ref<DetailsData>({
  description: '',
  requirements: '',
  benefits: '',
})

const skills = ref<SkillsData>({
  skills: [],
  expMin: 0,
  expMax: null,
})

const salary = ref<SalaryData>({
  salaryMin: '',
  salaryMax: '',
  negotiable: false,
  workType: 'FULL_TIME',
})

const locations = ref<LocationItem[]>([])

const advanced = ref<AdvancedData>({
  featured: false,
  urgent: false,
})

onMounted(async () => {
  try {
    fetching.value = true
    const job = await employerJobPostingService.getById(jobId)

    basicInfo.value = {
      title: job.title,
      industry: job.industryId?.toString() || '1',
      level: job.levelId?.toString() || '1',
      quantity: job.headcount,
      deadline: job.deadline ? job.deadline.split('T')[0] : '', // format YYYY-MM-DD
    }

    details.value = {
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits || '',
    }

    skills.value = {
      skills: (job.skills || []).map(s => (s as any).skillName || s.skillId.toString()), // Mapping temporary name
      expMin: job.experienceYearsMin,
      expMax: job.experienceYearsMax ?? null,
    }

    salary.value = {
      salaryMin: job.salaryMin?.toString() || '',
      salaryMax: job.salaryMax?.toString() || '',
      negotiable: job.salaryNegotiable,
      workType: job.workType || 'FULL_TIME',
    }

    locations.value = (job.locations || []).map(l => ({
      city: l.provinceId?.toString() || '1',
      address: l.addressDetail || '',
    }))
    if (locations.value.length === 0) locations.value.push({ city: '1', address: '' })

    advanced.value = {
      featured: job.isFeatured,
      urgent: job.isUrgent,
    }
  } catch (error: any) {
    toast.error('Lỗi', 'Không thể tải thông tin tin tuyển dụng để chỉnh sửa')
    router.push('/recruiter/jobs')
  } finally {
    fetching.value = false
  }
})

function validateForm(): boolean {
  if (!basicInfo.value.title.trim()) { toast.error('Lỗi', 'Vui lòng nhập tiêu đề'); return false }
  if (!basicInfo.value.industry) { toast.error('Lỗi', 'Vui lòng chọn ngành nghề'); return false }
  if (!basicInfo.value.level) { toast.error('Lỗi', 'Vui lòng chọn cấp bậc'); return false }
  if (!basicInfo.value.quantity || basicInfo.value.quantity < 1) { toast.error('Lỗi', 'Số lượng tuyển phải >= 1'); return false }
  if (!basicInfo.value.deadline) { toast.error('Lỗi', 'Vui lòng chọn hạn nộp hồ sơ'); return false }

  if (!details.value.description.trim()) { toast.error('Lỗi', 'Vui lòng nhập mô tả công việc'); return false }
  if (!details.value.requirements.trim()) { toast.error('Lỗi', 'Vui lòng nhập yêu cầu ứng viên'); return false }

  if (skills.value.expMin === null || skills.value.expMin < 0) { toast.error('Lỗi', 'Kinh nghiệm tối thiểu không hợp lệ'); return false }

  if (!salary.value.negotiable) {
    if (!salary.value.salaryMin && !salary.value.salaryMax) {
      toast.error('Lỗi', 'Vui lòng nhập mức lương hoặc chọn thỏa thuận')
      return false
    }
  }
  
  if (!locations.value.length) { toast.error('Lỗi', 'Vui lòng thêm ít nhất 1 địa điểm làm việc'); return false }

  return true
}

function buildPayload(): ReqUpdateJobPostingDTO {
  return {
    title: basicInfo.value.title,
    description: details.value.description,
    requirements: details.value.requirements,
    benefits: details.value.benefits || undefined,
    industryId: parseInt(basicInfo.value.industry) || 1,
    levelId: parseInt(basicInfo.value.level) || 1,
    experienceYearsMin: skills.value.expMin || 0,
    experienceYearsMax: skills.value.expMax || undefined,
    salaryMin: salary.value.salaryMin ? parseInt(salary.value.salaryMin) : undefined,
    salaryMax: salary.value.salaryMax ? parseInt(salary.value.salaryMax) : undefined,
    salaryNegotiable: salary.value.negotiable,
    workType: salary.value.workType || 'FULL_TIME',
    headcount: basicInfo.value.quantity || 1,
    deadline: basicInfo.value.deadline ? new Date(basicInfo.value.deadline).toISOString() : new Date().toISOString(),
    locations: locations.value.map(loc => ({
      provinceId: parseInt(loc.city) || 1,
      addressDetail: loc.address || undefined,
      isRemote: false
    })),
    skills: skills.value.skills.map((s, idx) => ({
      skillId: idx + 1,
      isRequired: true,
    })),
    isFeatured: advanced.value.featured,
    isUrgent: advanced.value.urgent,
  }
}

async function onUpdate() {
  if (!validateForm()) return

  try {
    loading.value = true
    const payload = buildPayload()
    await jobStore.updateJob(jobId, payload)
    toast.success('Thành công', 'Cập nhật tin tuyển dụng thành công')
    router.push(`/recruiter/jobs/${jobId}`)
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể cập nhật tin tuyển dụng')
  } finally {
    loading.value = false
  }
}
</script>
