<template>
  <div class="flex justify-center">
    <div class="w-full max-w-4xl pt-6 pb-16">
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
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
const jobId = route.params.id as string

// Mock: dữ liệu đã có sẵn (sẽ thay bằng API call)
const basicInfo = ref<BasicInfoData>({
  title: 'Senior Frontend Engineer',
  industry: 'it',
  level: 'senior',
  quantity: 3,
  deadline: '2023-11-15',
})

const details = ref<DetailsData>({
  description: 'Chúng tôi đang tìm kiếm một Senior Frontend Engineer tài năng để gia nhập đội ngũ phát triển sản phẩm cốt lõi.',
  requirements: '- Ít nhất 4 năm kinh nghiệm với Frontend (React/Vue/Angular)\n- Nắm vững HTML5, CSS3 và JavaScript (ES6+)\n- Có kinh nghiệm với TypeScript',
  benefits: '- Lương cạnh tranh + Thưởng tháng 13\n- Bảo hiểm sức khỏe cao cấp (PVI)\n- 15 ngày phép năm',
})

const skills = ref<SkillsData>({
  skills: ['ReactJS', 'TypeScript', 'TailwindCSS', 'Next.js'],
  expMin: 4,
  expMax: 8,
})

const salary = ref<SalaryData>({
  salaryMin: '1500',
  salaryMax: '2500',
  negotiable: false,
  workType: 'fulltime',
})

const locations = ref<LocationItem[]>([
  { city: 'hcm', address: 'Quận 1, TP. Hồ Chí Minh' },
])

const advanced = ref<AdvancedData>({
  featured: true,
  urgent: false,
})

function onUpdate() {
  console.log('Update job:', jobId, {
    basicInfo: basicInfo.value,
    details: details.value,
    skills: skills.value,
    salary: salary.value,
    locations: locations.value,
    advanced: advanced.value,
  })
}
</script>
