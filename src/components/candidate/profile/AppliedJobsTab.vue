<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div>
        <h1 class="text-2xl font-bold text-text-main dark:text-white flex items-center gap-2">
          Việc làm đã ứng tuyển
          <span v-if="!loading" class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
            {{ meta.totals }}
          </span>
        </h1>
        <p class="text-text-muted text-sm mt-1">Theo dõi trạng thái và tiến độ các đơn ứng tuyển của bạn.</p>
      </div>
      <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
        <button 
          v-for="filter in filterOptions" 
          :key="filter.value"
          @click="handleFilterChange(filter.value)"
          class="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          :class="activeFilter === filter.value 
            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
            : 'bg-slate-50 dark:bg-slate-800 text-text-muted hover:bg-slate-100 dark:hover:bg-slate-700'"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && applications.length === 0" class="flex flex-col items-center justify-center p-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-text-muted">Đang tải danh sách...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="applications.length === 0" class="bg-white dark:bg-surface-dark p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
        <span class="material-symbols-outlined text-3xl">work_history</span>
      </div>
      <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">Không tìm thấy đơn ứng tuyển nào</h3>
      <p class="text-text-muted text-sm mb-6">Bạn không có đơn ứng tuyển nào ở trạng thái này.</p>
      <button 
        v-if="activeFilter !== 'all'"
        @click="handleFilterChange('all')"
        class="text-primary font-bold text-sm hover:underline"
      >
        Xem tất cả các đơn
      </button>
    </div>

    <!-- Application List -->
    <div v-else class="grid grid-cols-1 gap-4">
      <div 
        v-for="app in applications" 
        :key="app.id"
        class="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-3xl p-5 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
      >
        <div class="flex flex-col md:flex-row gap-5">
          <!-- Company Logo -->
          <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-2 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img :src="app.jobPosting?.company.logoUrl || '/default-company.png'" :alt="app.jobPosting?.company.name" class="w-full h-full object-contain" />
          </div>

          <!-- Job Info -->
          <div class="flex-grow min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-bold text-text-main dark:text-white group-hover:text-primary transition-colors truncate">
                  {{ app.jobPosting?.title || 'Công việc không còn tồn tại' }}
                </h3>
                <p class="text-text-main dark:text-slate-300 font-medium text-sm mt-0.5 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[18px] text-text-muted">corporate_fare</span>
                  {{ app.jobPosting?.company.name || 'N/A' }}
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
                <span>Ngày nộp: <span class="font-medium text-text-main dark:text-white">{{ formatDate(app.createdAt) }}</span></span>
              </div>
            </div>
            
            <!-- Timeline Preview (Subtle) -->
            <div v-if="app.viewedAt" class="mt-3 text-xs text-secondary italic flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Nhà tuyển dụng đã xem hồ sơ vào {{ formatDate(app.viewedAt) }}
            </div>
            <div v-else-if="app.status === APPLICATION_STATUS.PENDING" class="mt-3 text-xs text-text-muted italic flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              Đang chờ nhà tuyển dụng phản hồi
            </div>
          </div>

          <!-- Actions -->
          <div class="flex md:flex-col items-center justify-end gap-2 shrink-0 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-5">
            <router-link 
              :to="{ name: 'JobDetail', params: { id: app.jobPostId } }"
              class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary text-text-main dark:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
            >
              <span class="material-symbols-outlined text-[18px]">visibility</span>
              Chi tiết
            </router-link>
            
            <button 
              v-if="app.cvId"
              @click="handleViewCv(app)"
              class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary text-text-main dark:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
            >
              <span class="material-symbols-outlined text-[18px]">description</span>
              Xem CV
            </button>

            <button 
              v-if="app.status === APPLICATION_STATUS.PENDING"
              @click="handleChangeCv(app)"
              class="flex-1 md:flex-none flex items-center justify-center gap-2 text-primary hover:bg-primary/5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
            >
              <span class="material-symbols-outlined text-[18px]">edit_document</span>
              Đổi CV
            </button>

            <button 
              v-if="app.status === APPLICATION_STATUS.PENDING"
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
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useApplicationStore } from '@/stores/application.store'
import { useCvsStore } from '@/stores/cvs.store'
import { 
  APPLICATION_STATUS, 
  APPLICATION_STATUS_OPTIONS
} from '@/constants/application.constants'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import type { ResApplication } from '@/types/application.types'
import dayjs from 'dayjs'

const toast = useToast()
const { confirm } = useConfirm()
const applicationStore = useApplicationStore()
const cvsStore = useCvsStore()

const { applications, loading, meta } = storeToRefs(applicationStore)

const activeFilter = ref('all')

const filterOptions = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đã gửi', value: APPLICATION_STATUS.PENDING },
  { label: 'Đã xem', value: APPLICATION_STATUS.SEEN },
  { label: 'Phỏng vấn', value: APPLICATION_STATUS.INTERVIEWING },
  { label: 'Kết quả', value: 'result' }, // custom filter logic if needed or just handle in fetch
]

onMounted(() => {
  fetchData()
  if (cvsStore.cvs.length === 0) {
    cvsStore.fetchMyCvs()
  }
})

const fetchData = async (page = 0) => {
  const status = activeFilter.value === 'all' ? undefined : activeFilter.value
  await applicationStore.fetchMyApplications({ status, page })
}

function handleViewCv(app: ResApplication) {
  const cvUrl = app.cv?.fileUrl || app.cv?.pdfUrl
  if (cvUrl) {
    window.open(cvUrl, '_blank')
  } else {
    // Fallback search in store
    const cv = cvsStore.cvs.find(c => c.id === app.cvId)
    if (cv?.fileUrl || cv?.pdfUrl) {
      window.open(cv.fileUrl || cv.pdfUrl, '_blank')
    } else {
      toast.error('Lỗi', 'Không tìm thấy liên kết CV')
    }
  }
}

function handleChangeCv(app: ResApplication) {
  toast.info('Thông báo', 'Chức năng đổi CV đang được phát triển')
}

const handleFilterChange = (value: string) => {
  activeFilter.value = value
  fetchData(0)
}

function getStatusLabel(status: string) {
  const option = APPLICATION_STATUS_OPTIONS.find(opt => opt.value === status)
  return option?.label || status
}


function getStatusIcon(status: string) {
  switch (status) {
    case APPLICATION_STATUS.PENDING: return 'send'
    case APPLICATION_STATUS.SEEN: return 'visibility'
    case APPLICATION_STATUS.INTERVIEWING: return 'event_upcoming'
    case APPLICATION_STATUS.OFFERED: return 'local_offer'
    case APPLICATION_STATUS.HIRED: return 'check_circle'
    case APPLICATION_STATUS.REJECTED: return 'cancel'
    case APPLICATION_STATUS.WITHDRAWN: return 'history'
    case APPLICATION_STATUS.EXPIRED: return 'timer_off'
    default: return 'info'
  }
}

function getStatusClasses(status: string) {
  const option = APPLICATION_STATUS_OPTIONS.find(opt => opt.value === status)
  const color = option?.color || 'default'
  
  switch (color) {
    case 'blue': return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
    case 'purple': return 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800'
    case 'orange': return 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800'
    case 'green':
    case 'success': return 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
    case 'red': return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
    case 'gray': return 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
    default: return 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
  }
}

function formatDate(date: string) {
  return dayjs(date).format('DD/MM/YYYY')
}

async function handleWithdraw(app: ResApplication) {
  const ok = await confirm({
    title: 'Rút đơn ứng tuyển?',
    message: `Bạn có chắc chắn muốn rút đơn ứng tuyển cho vị trí "${app.jobPosting?.title}" tại ${app.jobPosting?.company.name}? Hành động này không thể hoàn tác.`,
    confirmText: 'Rút đơn',
    cancelText: 'Hủy',
    confirmColor: 'red',
    icon: 'cancel'
  })

  if (ok) {
    try {
      await applicationStore.withdraw(app.id)
      toast.success('Thành công', 'Đã rút đơn ứng tuyển thành công')
    } catch (err) {
      toast.error('Lỗi', 'Không thể rút đơn ứng tuyển lúc này')
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
