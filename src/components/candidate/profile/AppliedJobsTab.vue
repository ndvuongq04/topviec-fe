<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div>
        <h1 class="text-2xl font-bold text-text-main dark:text-white flex items-center gap-2">
          Việc làm đã ứng tuyển
          <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
            {{ appliedJobs.length }}
          </span>
        </h1>
        <p class="text-text-muted text-sm mt-1">Theo dõi trạng thái và tiến độ các đơn ứng tuyển của bạn.</p>
      </div>
      <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          :class="activeFilter === filter.value 
            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
            : 'bg-slate-50 dark:bg-slate-800 text-text-muted hover:bg-slate-100 dark:hover:bg-slate-700'"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Empty state (Filtered) -->
    <div v-if="filteredJobs.length === 0" class="bg-white dark:bg-surface-dark p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
        <span class="material-symbols-outlined text-3xl">work_history</span>
      </div>
      <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">Không tìm thấy đơn ứng tuyển nào</h3>
      <p class="text-text-muted text-sm mb-6">Bạn không có đơn ứng tuyển nào ở trạng thái này.</p>
      <button 
        @click="activeFilter = 'all'"
        class="text-primary font-bold text-sm hover:underline"
      >
        Xem tất cả các đơn
      </button>
    </div>

    <!-- Application List -->
    <div v-else class="grid grid-cols-1 gap-4">
      <div 
        v-for="app in filteredJobs" 
        :key="app.id"
        class="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-3xl p-5 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
      >
        <div class="flex flex-col md:flex-row gap-5">
          <!-- Company Logo -->
          <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-2 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img :src="app.logoUrl" :alt="app.company" class="w-full h-full object-contain" />
          </div>

          <!-- Job Info -->
          <div class="flex-grow min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-bold text-text-main dark:text-white group-hover:text-primary transition-colors truncate">
                  {{ app.title }}
                </h3>
                <p class="text-text-main dark:text-slate-300 font-medium text-sm mt-0.5 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[18px] text-text-muted">corporate_fare</span>
                  {{ app.company }}
                </p>
              </div>
              <div :class="getStatusClasses(app.status)" class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shrink-0">
                <span class="material-symbols-outlined text-[16px]">{{ getStatusIcon(app.status) }}</span>
                {{ getStatusLabel(app.status) }}
              </div>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm">
              <div class="flex items-center gap-1.5 text-text-muted">
                <span class="material-symbols-outlined text-[18px]">calendar_today</span>
                <span>Ngày nộp: <span class="font-medium text-text-main dark:text-white">{{ app.appliedDate }}</span></span>
              </div>
              <div class="flex items-center gap-1.5 text-text-muted">
                <span class="material-symbols-outlined text-[18px]">description</span>
                <span>CV: <router-link to="#" class="text-primary hover:underline font-medium">{{ app.cvName }}</router-link></span>
              </div>
            </div>
            
            <!-- Timeline Preview (Subtle) -->
            <div v-if="app.lastActivity" class="mt-3 text-xs text-text-muted italic flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              {{ app.lastActivity }}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex md:flex-col items-center justify-end gap-2 shrink-0 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-5">
            <button 
              class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary text-text-main dark:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
            >
              <span class="material-symbols-outlined text-[18px]">visibility</span>
              Chi tiết
            </button>
            <button 
              v-if="app.status === 'sent'"
              @click="handleWithdraw(app)"
              class="flex-1 md:flex-none flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
            >
              <span class="material-symbols-outlined text-[18px]">cancel</span>
              Rút đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'

const toast = useToast()
const { confirm } = useConfirm()

interface AppliedJob {
  id: number
  title: string
  company: string
  logoUrl: string
  appliedDate: string
  cvName: string
  status: 'sent' | 'viewed' | 'interview_invited' | 'passed' | 'failed' | 'withdrawn'
  lastActivity?: string
}

const activeFilter = ref('all')

const filters = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đã gửi', value: 'sent' },
  { label: 'Dưới sự xem xét', value: 'viewed' },
  { label: 'Phỏng vấn', value: 'interview_invited' },
  { label: 'Kết quả', value: 'result' },
]

const appliedJobs = ref<AppliedJob[]>([
  {
    id: 1,
    title: 'Senior Frontend Developer (Vue.js)',
    company: 'TechFlow Solutions',
    logoUrl: 'https://img.logo.dev/techflow.ai?token=pk_ST1j_n19R660zT7B3mGqdg',
    appliedDate: '24/03/2026',
    cvName: 'Nguyen_Van_A_Frontend_Dev_2026.pdf',
    status: 'sent',
    lastActivity: 'Đang chờ nhà tuyển dụng phản hồi'
  },
  {
    id: 2,
    title: 'Product Designer (UI/UX)',
    company: 'Creative Studio',
    logoUrl: 'https://img.logo.dev/creativestudio.com?token=pk_ST1j_n19R660zT7B3mGqdg',
    appliedDate: '22/03/2026',
    cvName: 'Design_Portfolio_A.pdf',
    status: 'viewed',
    lastActivity: 'Nhà tuyển dụng đã xem hồ sơ của bạn'
  },
  {
    id: 3,
    title: 'Fullstack Engineer (TypeScript/Node.js)',
    company: 'Global Fintech',
    logoUrl: 'https://img.logo.dev/globalfintech.com?token=pk_ST1j_n19R660zT7B3mGqdg',
    appliedDate: '15/03/2026',
    cvName: 'Nguyen_Van_A_Fullstack_2026.pdf',
    status: 'interview_invited',
    lastActivity: 'Bạn có lời mời phỏng vấn kỹ thuật vào 09:00 AM, 27/03'
  },
  {
    id: 4,
    title: 'Mobile App Developer (Flutter)',
    company: 'AppMastery Inc.',
    logoUrl: 'https://img.logo.dev/appmastery.io?token=pk_ST1j_n19R660zT7B3mGqdg',
    appliedDate: '10/03/2026',
    cvName: 'Nguyen_Van_A_Mobile_2026.pdf',
    status: 'passed',
    lastActivity: 'Chúc mừng! Bạn đã vượt qua vòng sơ loại'
  },
  {
    id: 5,
    title: 'Marketing Specialist',
    company: 'Sun & Moon Agency',
    logoUrl: 'https://img.logo.dev/sunandmoon.com?token=pk_ST1j_n19R660zT7B3mGqdg',
    appliedDate: '01/03/2026',
    cvName: 'Nguyen_Van_A_Marketing_2026.pdf',
    status: 'failed',
    lastActivity: 'Nhà tuyển dụng trân trọng cảm ơn sự quan tâm của bạn'
  },
  {
    id: 6,
    title: 'Content Creator',
    company: 'Social Wave',
    logoUrl: 'https://img.logo.dev/socialwave.com?token=pk_ST1j_n19R660zT7B3mGqdg',
    appliedDate: '28/02/2026',
    cvName: 'Content_Sample.pdf',
    status: 'withdrawn',
    lastActivity: 'Bạn đã rút đơn ứng tuyển này'
  }
])

const filteredJobs = computed(() => {
  if (activeFilter.value === 'all') return appliedJobs.value
  if (activeFilter.value === 'result') return appliedJobs.value.filter(j => ['passed', 'failed'].includes(j.status))
  return appliedJobs.value.filter(j => j.status === activeFilter.value)
})

function getStatusLabel(status: string) {
  switch (status) {
    case 'sent': return 'Đã gửi'
    case 'viewed': return 'NTT đã xem'
    case 'interview_invited': return 'Mời phỏng vấn'
    case 'passed': return 'Đạt vòng PV'
    case 'failed': return 'Chưa phù hợp'
    case 'withdrawn': return 'Đã rút'
    default: return status
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'sent': return 'send'
    case 'viewed': return 'visibility'
    case 'interview_invited': return 'event_upcoming'
    case 'passed': return 'check_circle'
    case 'failed': return 'cancel'
    case 'withdrawn': return 'history'
    default: return 'info'
  }
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'sent': return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
    case 'viewed': return 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800'
    case 'interview_invited': return 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800'
    case 'passed': return 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
    case 'failed': return 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
    case 'withdrawn': return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
    default: return 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
  }
}

async function handleWithdraw(app: AppliedJob) {
  const ok = await confirm({
    title: 'Rút đơn ứng tuyển?',
    message: `Bạn có chắc chắn muốn rút đơn ứng tuyển cho vị trí "${app.title}" tại ${app.company}? Hành động này không thể hoàn tác.`,
    confirmText: 'Rút đơn',
    cancelText: 'Hủy',
    confirmColor: 'red',
    icon: 'cancel'
  })

  if (ok) {
    // In a real app, you would call an API here
    const index = appliedJobs.value.findIndex(j => j.id === app.id)
    if (index !== -1) {
      appliedJobs.value[index].status = 'withdrawn'
      appliedJobs.value[index].lastActivity = 'Bạn đã rút đơn ứng tuyển thành công'
      toast.success('Thành công', 'Đã rút đơn ứng tuyển thành công')
    }
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
