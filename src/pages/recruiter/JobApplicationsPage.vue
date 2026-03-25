<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployerApplicationStore } from '@/stores/employerApplication.store'
import { APPLICATION_STATUS, APPLICATION_STATUS_OPTIONS } from '@/constants/application.constants'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const applicationStore = useEmployerApplicationStore()

const jobId = Number(route.params.id)

// State
const activeStatus = ref<string>('all')
const currentPage = ref(1)
const pageSize = ref(10)

const applications = computed(() => 
  applicationStore.applications.filter(a => a.status !== APPLICATION_STATUS.WITHDRAWN)
)
const meta = computed(() => applicationStore.meta)
const loading = computed(() => applicationStore.loading)

async function fetchApplications() {
  await applicationStore.fetchApplicationsByJob(jobId, {
    status: activeStatus.value !== 'all' ? activeStatus.value : undefined,
    page: Math.max(0, currentPage.value - 1),
    size: pageSize.value,
    sort: 'createdAt,desc'
  })
  
  if (applicationStore.error) {
    toast.error('Lỗi', applicationStore.error)
  }
}

// Watchers
watch([activeStatus, currentPage], () => {
  fetchApplications()
})

onMounted(() => {
  fetchApplications()
})

const summaryCards = computed(() => [
  { icon: 'group', label: 'Tổng hồ sơ', value: applications.value.length, bg: 'bg-primary/10 text-primary' },
  { icon: 'new_releases', label: 'Chưa xem', value: applications.value.filter(a => a.status === APPLICATION_STATUS.PENDING).length, bg: 'bg-blue-100 text-blue-600' },
  { icon: 'check_circle', label: 'Đang xem', value: applications.value.filter(a => a.status === APPLICATION_STATUS.SEEN).length, bg: 'bg-emerald-100 text-emerald-600' },
  { icon: 'star', label: 'Cân nhắc', value: applications.value.filter(a => a.status === APPLICATION_STATUS.CONSIDERING).length, bg: 'bg-amber-100 text-amber-600' },
])

const statusChips = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Chưa xem', value: APPLICATION_STATUS.PENDING },
  { label: 'Đã xem', value: APPLICATION_STATUS.SEEN },
  { label: 'Cân nhắc', value: APPLICATION_STATUS.CONSIDERING },
  { label: 'Phỏng vấn', value: APPLICATION_STATUS.INTERVIEWING },
  { label: 'Từ chối', value: APPLICATION_STATUS.REJECTED },
]

function getStatusBadgeClass(status: string) {
  const option = APPLICATION_STATUS_OPTIONS.find(o => o.value === status)
  switch (option?.color) {
    case 'blue': return 'bg-blue-100 text-blue-600'
    case 'cyan': return 'bg-cyan-100 text-cyan-600'
    case 'purple': return 'bg-purple-100 text-purple-600'
    case 'orange': return 'bg-orange-100 text-orange-600'
    case 'green': return 'bg-green-100 text-green-600'
    case 'success': return 'bg-emerald-100 text-emerald-600'
    case 'red': return 'bg-red-100 text-red-600'
    case 'gray': return 'bg-slate-100 text-slate-600'
    default: return 'bg-slate-100 text-slate-600'
  }
}

function getStatusLabel(status: string) {
  return APPLICATION_STATUS_OPTIONS.find(o => o.value === status)?.label || status
}

function formatDate(dateStr: string) {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('vi-VN')
}
</script>

<template>
  <div class="space-y-6 pt-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="router.back()"
          class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Quản lý CV & Sàng lọc
          </h1>
          <p class="text-slate-500 text-sm">
            Vị trí tuyển dụng: {{ applications[0]?.jobTitle || 'Theo dõi và đánh giá hồ sơ ứng viên của bạn' }}
          </p>
        </div>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-lg">download</span>
        Xuất báo cáo
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="card in summaryCards" 
        :key="card.label"
        class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4"
      >
        <div :class="['p-3 rounded-lg', card.bg]">
          <span class="material-symbols-outlined">{{ card.icon }}</span>
        </div>
        <div>
          <p class="text-xs font-bold text-slate-500 uppercase tracking-tight">{{ card.label }}</p>
          <p class="text-2xl font-black text-slate-900 dark:text-white">{{ card.value }}</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
      <!-- Status chips -->
      <div class="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          v-for="chip in statusChips"
          :key="chip.value"
          @click="activeStatus = chip.value; currentPage = 1"
          :class="[
            'px-4 py-1.5 text-sm font-bold rounded-full whitespace-nowrap transition-colors cursor-pointer',
            activeStatus === chip.value
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          ]"
        >
          {{ chip.label }}
        </button>
      </div>
    </div>

    <!-- Candidate Table -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px] relative">
      <!-- Loading Overlay -->
      <div v-if="loading" class="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 flex items-center justify-center backdrop-blur-[2px]">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>

      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ứng viên</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày ứng tuyển</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Đánh giá</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
          <tr
            v-for="app in applications"
            :key="app.id"
            class="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
          >
            <!-- Candidate info -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img :src="app.candidateAvatar || 'https://ui-avatars.com/api/?name=' + app.candidateName" :alt="app.candidateName" class="w-10 h-10 rounded-full object-cover shrink-0" />
                <div>
                  <p class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ app.candidateName }}</p>
                  <p class="text-xs text-slate-500">{{ app.candidateEmail }}</p>
                </div>
              </div>
            </td>
            <!-- Date -->
            <td class="px-6 py-4 text-sm text-slate-500">{{ formatDate(app.createdAt) }}</td>
            <!-- Evaluation -->
            <td class="px-6 py-4">
              <div v-if="app.recruiterRating" class="flex gap-0.5 text-amber-400">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="material-symbols-outlined text-lg"
                  :style="{ fontVariationSettings: i <= app.recruiterRating ? `'FILL' 1` : `'FILL' 0` }"
                >star</span>
              </div>
              <span v-else class="text-xs text-slate-400 italic">Chưa đánh giá</span>
            </td>
            <!-- Status -->
            <td class="px-6 py-4">
              <span :class="['px-3 py-1 text-xs font-bold rounded-full', getStatusBadgeClass(app.status)]">
                {{ getStatusLabel(app.status) }}
              </span>
            </td>
            <!-- Actions -->
            <td class="px-6 py-4 text-right space-x-1">
              <button
                @click="router.push({ name: 'recruiter-application-detail', params: { id: jobId, applicationId: app.id } })"
                class="p-1.5 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                title="Xem chi tiết"
              >
                <span class="material-symbols-outlined text-xl">visibility</span>
              </button>
              <a 
                v-if="app.cvFileUrl" 
                :href="app.cvFileUrl" 
                target="_blank"
                class="inline-block p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer" 
                title="Tải CV"
              >
                <span class="material-symbols-outlined text-xl">download</span>
              </a>
            </td>
          </tr>
          
          <tr v-if="applications.length === 0 && !loading">
            <td colspan="5" class="px-6 py-20 text-center">
              <div class="flex flex-col items-center gap-2 text-slate-400">
                <span class="material-symbols-outlined text-4xl">inbox</span>
                <p>Không tìm thấy hồ sơ ứng tuyển nào.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div v-if="meta.totals > 0" class="px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
        <p class="text-sm text-slate-500">Hiển thị <span class="font-bold">{{ (meta.page * meta.pageSize) + 1 }}–{{ Math.min((meta.page + 1) * meta.pageSize, meta.totals) }}</span> trong <span class="font-bold">{{ meta.totals }}</span> hồ sơ</p>
        <div class="flex gap-2">
          <button 
            @click="currentPage--"
            :disabled="currentPage === 1 || loading"
            class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer transition-colors"
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button 
            v-for="p in meta.pages" 
            :key="p"
            @click="currentPage = p"
            :class="[
              'px-4 py-2 rounded-lg font-bold text-sm cursor-pointer transition-all',
              currentPage === p 
                ? 'bg-primary text-white shadow-md' 
                : 'hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200'
            ]"
          >
            {{ p }}
          </button>
          <button 
            @click="currentPage++"
            :disabled="currentPage === meta.pages || loading"
            class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer transition-colors"
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
