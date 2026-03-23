<template>
  <div class="flex justify-center">
    <div class="w-full max-w-7xl pt-6 pb-16">
      <!-- Header Actions -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <nav class="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <router-link to="/recruiter/jobs" class="hover:text-primary transition-colors cursor-pointer">Tuyển dụng</router-link>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
            <span class="text-slate-900 dark:text-slate-100 font-medium">Đăng tin mới</span>
          </nav>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tạo tin tuyển dụng mới</h2>
          <p class="text-slate-500 mt-1">Điền đầy đủ thông tin để thu hút các ứng viên tiềm năng nhất.</p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <button
            type="button"
            class="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
            @click="onSaveDraft"
          >
            Lưu nháp
          </button>
          <button
            type="button"
            class="px-8 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            @click="onPublish"
          >
            <span>Đăng tin ngay</span>
            <span class="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </div>

      <!-- Form Sections -->
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
        <button
          type="button"
          class="px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-semibold hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
          @click="onSaveDraft"
        >
          Lưu nháp
        </button>
        <button
          type="button"
          class="px-12 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          @click="onPublish"
        >
          <span>Đăng tin ngay</span>
          <span class="material-symbols-outlined text-lg">send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store'
import type { ReqCreateJobPostingDTO } from '@/types/jobPosting.types'

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

const router = useRouter()
const toast = useToast()
const jobStore = useEmployerJobPostingStore()
const loading = ref(false)

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
  workType: 'FULL_TIME', // matches backend enum
})

const locations = ref<LocationItem[]>([
  { city: '1', address: '' },
])

const advanced = ref<AdvancedData>({
  featured: false,
  urgent: false,
})

function validateForm(): boolean {
  if (!basicInfo.value.title.trim()) { toast.error('Lỗi', 'Vui lòng nhập tiêu đề'); return false }
  if (!basicInfo.value.industry) { toast.error('Lỗi', 'Vui lòng chọn ngành nghề'); return false }
  if (!basicInfo.value.level) { toast.error('Lỗi', 'Vui lòng chọn cấp bậc'); return false }
  if (!basicInfo.value.quantity || basicInfo.value.quantity < 1) { toast.error('Lỗi', 'Số lượng tuyển phải >= 1'); return false }
  if (!basicInfo.value.deadline) { toast.error('Lỗi', 'Vui lòng chọn hạn nộp hồ sơ'); return false }
  if (new Date(basicInfo.value.deadline) <= new Date()) { toast.error('Lỗi', 'Hạn nộp hồ sơ phải trong tương lai'); return false }

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

function buildPayload(): ReqCreateJobPostingDTO {
  // Convert dates and parse numbers
  const payload: ReqCreateJobPostingDTO = {
    title: basicInfo.value.title,
    description: details.value.description,
    requirements: details.value.requirements,
    benefits: details.value.benefits || undefined,
    industryId: parseInt(basicInfo.value.industry) || 1, // fallback to 1 
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
      isRemote: false // default false for now
    })),
    skills: skills.value.skills.map((s, idx) => ({
      skillId: idx + 1, // mapping dummy tags to IDs
      isRequired: true,
    })),
    isFeatured: advanced.value.featured,
    isUrgent: advanced.value.urgent,
  }
  return payload
}

async function onSaveDraft() {
  if (!validateForm()) return

  try {
    loading.value = true
    const payload = buildPayload()
    const res = await jobStore.createJob(payload)
    toast.success('Thành công', 'Đã lưu nháp tin tuyển dụng')
    router.push(`/recruiter/jobs/${res.id}`)
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể lưu tin tuyển dụng')
  } finally {
    loading.value = false
  }
}

async function onPublish() {
  if (!validateForm()) return

  try {
    loading.value = true
    const payload = buildPayload()
    const res = await jobStore.createJob(payload)
    toast.success('Thành công', 'Tin tuyển dụng đã được tạo thành công')
    router.push(`/recruiter/jobs/${res.id}`)
  } catch (error: any) {
    toast.error('Lỗi', jobStore.error || 'Không thể đăng tin tuyển dụng')
  } finally {
    loading.value = false
  }
}
</script>
