<template>
  <div class="space-y-6 font-body">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-[0.875rem]">
      <router-link
        :to="{ name: 'admin-candidates' }"
        class="text-slate-500 transition-colors hover:text-[#963131]"
      >
        Quản lý Ứng Viên
      </router-link>
      <span class="material-symbols-outlined text-[0.75rem] text-slate-400">chevron_right</span>
      <span class="font-medium text-slate-900 dark:text-slate-100">Chi tiết ứng viên</span>
    </nav>

    <!-- Header & Action Buttons -->
    <div class="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-6">
        <!-- Left: Avatar + Info -->
        <div class="flex gap-6">
          <div class="w-24 h-24 rounded-full border border-slate-200 dark:border-slate-800 bg-white overflow-hidden flex items-center justify-center shrink-0 relative">
            <img
              v-if="candidate.avatar"
              :src="candidate.avatar"
              :alt="candidate.name"
              class="w-full h-full object-cover"
            />
            <span v-else class="material-symbols-outlined text-4xl text-slate-300">person</span>
            <div v-if="candidate.verified" class="absolute bottom-0 right-0 w-6 h-6 bg-green-600 rounded-full border-2 border-white flex items-center justify-center" title="Verified User">
              <span class="material-symbols-outlined text-white text-[0.75rem] font-bold">check</span>
            </div>
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h2 class="text-[1.875rem] font-extrabold tracking-tight leading-tight">{{ candidate.name }}</h2>
              <span v-if="candidate.verified" class="bg-blue-100 text-blue-700 text-[0.75rem] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                <span class="material-symbols-outlined text-[0.875rem]">verified</span>
                Đã xác minh
              </span>
            </div>
            <div class="flex flex-col gap-1 pt-2">
              <div class="flex items-center gap-2 text-[1rem] text-slate-600 dark:text-slate-400">
                <span class="material-symbols-outlined text-[1.125rem]">mail</span>
                {{ candidate.email }}
              </div>
              <div class="flex items-center gap-2 text-[1rem] text-slate-600 dark:text-slate-400">
                <span class="material-symbols-outlined text-[1.125rem]">call</span>
                {{ candidate.phone }}
              </div>
              <div class="flex items-center gap-2 text-[0.875rem] text-slate-500 dark:text-slate-500 font-medium">
                <span class="material-symbols-outlined text-[1rem]">calendar_today</span>
                Ngày tham gia: {{ candidate.joinDate }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Action buttons -->
        <div class="flex flex-wrap gap-3 shrink-0">
          <button
            class="px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[1rem] font-bold flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            @click="handleResetPassword"
          >
            <span class="material-symbols-outlined text-[1.125rem]">lock_reset</span>
            Reset mật khẩu
          </button>
          <button
            class="px-5 py-2.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[1rem] font-bold flex items-center gap-2 hover:bg-red-200 transition-colors"
            @click="handleLockAccount"
          >
            <span class="material-symbols-outlined text-[1.125rem]">block</span>
            Khóa tài khoản
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
        <div :class="['w-12 h-12 rounded-lg flex items-center justify-center shrink-0', stat.iconBg]">
          <span :class="['material-symbols-outlined text-[1.5rem]', stat.iconColor]">{{ stat.icon }}</span>
        </div>
        <div>
          <p class="text-[0.75rem] text-slate-500 font-bold uppercase tracking-wider">{{ stat.label }}</p>
          <p class="text-[1.875rem] font-extrabold text-slate-900 dark:text-slate-100 leading-none mt-1">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-slate-200 dark:border-slate-800">
      <nav class="flex gap-8">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="pb-4 text-[0.875rem] font-bold transition-colors relative"
          :class="activeTab === tab.key ? 'text-[#963131]' : 'text-slate-500 hover:text-slate-700'"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <div v-if="activeTab === tab.key" class="absolute bottom-0 left-0 w-full h-0.5 bg-[#963131]"></div>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="mt-4">
      <CandidateProfileTab
        v-if="activeTab === 'profile'"
        :candidate="candidate"
      />
      <CandidateCvsTab
        v-else-if="activeTab === 'cvs'"
        :cvs="mockCvs"
      />
      <CandidateApplicationsTab
        v-else-if="activeTab === 'applications'"
        :applications="mockApplications"
      />
      <CandidateFollowedTab
        v-else-if="activeTab === 'followed'"
        :companies="mockFollowedCompanies"
      />
      <CandidateSavedJobsTab
        v-else-if="activeTab === 'saved'"
        :jobs="mockSavedJobs"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CandidateProfileTab from '@/components/admin/candidates/candidate-detail/CandidateProfileTab.vue'
import CandidateCvsTab from '@/components/admin/candidates/candidate-detail/CandidateCvsTab.vue'
import CandidateApplicationsTab from '@/components/admin/candidates/candidate-detail/CandidateApplicationsTab.vue'
import CandidateFollowedTab from '@/components/admin/candidates/candidate-detail/CandidateFollowedTab.vue'
import CandidateSavedJobsTab from '@/components/admin/candidates/candidate-detail/CandidateSavedJobsTab.vue'
import { useToast } from '@/composables/useToast'

const toast = useToast()
const activeTab = ref('profile')

const tabs = [
  { key: 'profile', label: 'Hồ sơ' },
  { key: 'cvs', label: 'Danh sách CV' },
  { key: 'applications', label: 'Lịch sử ứng tuyển' },
  { key: 'followed', label: 'Công ty đã follow' },
  { key: 'saved', label: 'Tin đã lưu' },
]

const candidate = ref({
  id: 'UV-9921',
  name: 'Lê Minh Anh',
  email: 'le.minh.anh@example.com',
  phone: '+84 912 345 678',
  joinDate: '12 Thg 10, 2023',
  avatar: 'https://i.pravatar.cc/150?u=9921',
  verified: true,
  experience: '4 năm (Marketing)',
  salaryExpect: '$1,200 - $1,500',
  location: 'Hồ Chí Minh, Việt Nam',
  jobStatus: 'Đang tìm việc',
  stats: {
    totalCvs: 2,
    applications: 5,
    followedCompanies: 12,
    savedJobs: 8,
  }
})

// ─── Mock Data for Tabs ──────────────────────────────────────────────────────────
const mockCvs = [
  { id: 1, name: 'Senior_Marketing_Executive_LMA.pdf', updatedAt: 'Hôm nay, 10:24 AM', isPrimary: true },
  { id: 2, name: 'Digital_Marketing_Specialist.pdf', updatedAt: '15 Thg 09, 2023', isPrimary: false },
  { id: 3, name: 'CV_English_Version_MinhAnh.pdf', updatedAt: '01 Thg 08, 2023', isPrimary: false },
]

const mockApplications = [
  { id: 1, date: '24 Thg 10, 2023', position: 'Trưởng phòng Marketing', company: 'Công ty Cổ phần TechNova', status: 'interview', statusLabel: 'Đang phỏng vấn' },
  { id: 2, date: '10 Thg 09, 2023', position: 'Digital Marketing Senior', company: 'Tập đoàn VinaCorp', status: 'rejected', statusLabel: 'Đã từ chối' },
  { id: 3, date: '05 Thg 08, 2023', position: 'Content Creator', company: 'Media Star Agency', status: 'accepted', statusLabel: 'Đã trúng tuyển' },
]

const mockFollowedCompanies = [
  { id: 1, name: 'TechNova', initial: 'T', followDate: '01 Thg 10, 2023' },
  { id: 2, name: 'VinaCorp', initial: 'V', followDate: '25 Thg 08, 2023' },
  { id: 3, name: 'FPT Software', initial: 'F', followDate: '12 Thg 07, 2023' },
  { id: 4, name: 'Shopee Vietnam', initial: 'S', followDate: '30 Thg 06, 2023' },
]

const mockSavedJobs = [
  { id: 1, position: 'Brand Manager', company: 'Global Brands VN', savedAt: 'Hôm qua' },
  { id: 2, position: 'Marketing Director', company: 'StartUp Hub', savedAt: '20 Thg 10, 2023' },
  { id: 3, position: 'Creative Lead', company: 'Design Plus', savedAt: '15 Thg 10, 2023' },
]

const stats = computed(() => [
  {
    label: 'Tổng CV',
    value: candidate.value.stats.totalCvs,
    icon: 'description',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Lần ứng tuyển',
    value: candidate.value.stats.applications,
    icon: 'send',
    iconBg: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-600',
  },
  {
    label: 'Cty theo dõi',
    value: candidate.value.stats.followedCompanies,
    icon: 'corporate_fare',
    iconBg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600',
  },
  {
    label: 'Việc làm đã lưu',
    value: candidate.value.stats.savedJobs,
    icon: 'bookmark',
    iconBg: 'bg-[#963131]/10',
    iconColor: 'text-[#963131]',
  },
])

function handleResetPassword() {
  toast.info('Tính năng', 'Reset mật khẩu đang được phát triển.')
}

function handleLockAccount() {
  toast.info('Tính năng', 'Khóa tài khoản đang được phát triển.')
}
</script>

<style scoped>
/* Không cần style scoped vì đã dùng Tailwind đồng bộ với EmployerDetailPage */
</style>