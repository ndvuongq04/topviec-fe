<template>
  <div class="flex justify-center">
    <div class="w-full max-w-4xl pt-6 pb-16">
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

const basicInfo = ref<BasicInfoData>({
  title: '',
  industry: 'it',
  level: 'staff',
  quantity: 1,
  deadline: '',
})

const details = ref<DetailsData>({
  description: '',
  requirements: '',
  benefits: '',
})

const skills = ref<SkillsData>({
  skills: ['ReactJS', 'TailwindCSS'],
  expMin: null,
  expMax: null,
})

const salary = ref<SalaryData>({
  salaryMin: '',
  salaryMax: '',
  negotiable: false,
  workType: 'fulltime',
})

const locations = ref<LocationItem[]>([
  { city: 'hanoi', address: '' },
])

const advanced = ref<AdvancedData>({
  featured: false,
  urgent: true,
})

function onSaveDraft() {
  console.log('Save draft:', { basicInfo: basicInfo.value, details: details.value, skills: skills.value, salary: salary.value, locations: locations.value, advanced: advanced.value })
}

function onPublish() {
  console.log('Publish:', { basicInfo: basicInfo.value, details: details.value, skills: skills.value, salary: salary.value, locations: locations.value, advanced: advanced.value })
}
</script>
