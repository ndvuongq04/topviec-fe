<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="flex items-center gap-4">
        <!-- Select All Checkbox -->
        <div 
          v-if="mappedJobs.length > 0"
          @click="toggleSelectAll"
          class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer shrink-0"
          :class="isAllSelected 
            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary'"
        >
          <span v-if="isAllSelected" class="material-symbols-outlined text-sm font-bold">check</span>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-text-main dark:text-white">Việc làm đã lưu</h1>
          <p class="text-text-muted text-sm mt-1">Xem và quản lý các công việc bạn đã lưu.</p>
        </div>
      </div>
      <div v-if="savedJobStore.meta.totals > 0" class="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <span class="text-sm text-text-muted font-medium">Đã lưu: </span>
        <span class="text-sm font-bold text-primary">{{ savedJobStore.meta.totals }}</span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="savedJobStore.loading && savedJobStore.savedJobs.length === 0" class="flex justify-center py-12">
      <span class="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
    </div>

    <!-- List -->
    <div v-else-if="mappedJobs.length > 0" class="flex flex-col gap-4 pb-20">
      <JobCard
        v-for="job in mappedJobs"
        :key="job.id"
        v-bind="job"
        :selectable="true"
        :selected="selectedIds.includes(job.id)"
        @bookmark="handleUnsaveConfirm"
        @select="handleSelect"
        @quick-apply="onQuickApply"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="bg-white dark:bg-surface-dark p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        <span class="material-symbols-outlined text-3xl">bookmark_border</span>
      </div>
      <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">Chưa có việc làm nào được lưu</h3>
      <p class="text-text-muted text-sm mb-6">Lưu lại những công việc hấp dẫn để xem lại và ứng tuyển sau.</p>
      <router-link
        to="/"
        class="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/30 transition-colors"
      >
        <span class="material-symbols-outlined text-[20px]">search</span>
        Khám phá ngay
      </router-link>
    </div>

    <!-- Batch Action Bar -->
    <Transition name="slide-up">
      <div 
        v-if="selectedIds.length > 0"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-6 min-w-[320px] md:min-w-[500px]"
      >
        <div class="flex flex-col">
          <span class="text-sm font-bold text-text-main dark:text-white">Đã chọn {{ selectedIds.length }} việc làm</span>
          <span v-if="selectedIds.length > 10" class="text-xs text-red-500 font-medium">Tối đa 10 việc làm mỗi lần ứng tuyển</span>
          <span v-else class="text-xs text-text-muted">Bạn có thể ứng tuyển nhanh vào các vị trí này</span>
        </div>
        
        <div class="flex items-center gap-3 ml-auto">
          <button 
            @click="selectedIds = []"
            class="text-sm font-bold text-text-muted hover:text-text-main px-4 py-2 transition-colors"
          >
            Hủy
          </button>
          <button 
            @click="handleBatchApply"
            :disabled="selectedIds.length > 10"
            class="bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[20px]">send</span>
            Ứng tuyển ngay
          </button>
        </div>
      </div>
    </Transition>

    <!-- Batch Apply Selection Modal -->
    <Transition name="fade">
      <div v-if="showBatchApplyModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <div class="bg-white dark:bg-surface-dark w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-300">
          <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 class="text-xl font-bold text-text-main dark:text-white">Ứng tuyển hàng loạt</h3>
            <button @click="showBatchApplyModal = false" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div class="p-6">
            <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-start gap-3">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                Bạn đang ứng tuyển vào <strong>{{ selectedIds.length }} vị trí</strong> công việc. 
                Vui lòng chọn 1 CV chung để nộp cho tất cả.
              </p>
            </div>

            <h4 class="text-sm font-bold text-text-muted mb-3 px-1">Danh sách CV của bạn</h4>
            <div class="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <div 
                v-for="cv in cvsStore.cvs" 
                :key="cv.id"
                @click="selectedCvId = cv.id"
                class="group p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4"
                :class="selectedCvId === cv.id 
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/5' 
                  : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-800/50'"
              >
                <div class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-primary">description</span>
                </div>
                <div class="flex-grow">
                  <p class="font-bold text-sm text-text-main dark:text-white">{{ cv.title }}</p>
                  <p class="text-xs text-text-muted mt-0.5">Cập nhật: {{ dayjs(cv.updatedAt).format('DD/MM/YYYY') }}</p>
                </div>
                <div 
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                  :class="selectedCvId === cv.id ? 'border-primary bg-primary text-white' : 'border-slate-300 dark:border-slate-600'"
                >
                  <div v-if="selectedCvId === cv.id" class="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <button 
              @click="showBatchApplyModal = false"
              class="flex-1 px-4 py-3 rounded-xl font-bold text-sm text-text-muted hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              Hủy bỏ
            </button>
            <button 
              @click="confirmBatchApply"
              class="flex-1 bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-[18px]">send</span>
              Gửi đơn ngay
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-8">
      <button
        class="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        :disabled="currentPage === 0"
        @click="changePage(currentPage - 1)"
      >
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      
      <div class="flex items-center gap-2">
         <button 
           v-for="p in totalPages" 
           :key="p"
           class="w-10 h-10 rounded-xl text-sm font-bold transition-all"
           :class="currentPage === p-1 
             ? 'bg-primary text-white shadow-lg shadow-primary/20' 
             : 'text-text-muted hover:bg-slate-50 dark:hover:bg-slate-800'"
           @click="changePage(p-1)"
         >
           {{ p }}
         </button>
      </div>

      <button
        class="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        :disabled="currentPage === totalPages - 1"
        @click="changePage(currentPage + 1)"
      >
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useSavedJobStore } from '@/stores/savedJob.store'
import { useApplicationStore } from '@/stores/application.store'
import { useCvsStore } from '@/stores/cvs.store'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useQuickApply } from '@/composables/useQuickApply'
import JobCard from '@/components/candidate/job/JobCard.vue'
import dayjs from 'dayjs'

const savedJobStore = useSavedJobStore()
const applicationStore = useApplicationStore()
const cvsStore = useCvsStore()
const toast = useToast()
const { confirm } = useConfirm()
const { handleQuickApply } = useQuickApply()

const currentPage = ref(0)
const selectedIds = ref<number[]>([])
const showBatchApplyModal = ref(false)
const selectedCvId = ref<number | null>(null)

const isAllSelected = computed(() => {
  return mappedJobs.value.length > 0 && selectedIds.value.length === mappedJobs.value.length
})

function handleSelect(id: number, active: boolean) {
  if (active) {
    if (!selectedIds.value.includes(id)) {
      selectedIds.value.push(id)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(itemId => itemId !== id)
  }
}

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = mappedJobs.value.map(job => job.id)
  }
}

async function handleBatchApply() {
  if (selectedIds.value.length === 0) return
  
  if (selectedIds.value.length > 10) {
    toast.error('Lỗi', 'Tối đa 10 tin cho mỗi lần ứng tuyển hàng loạt')
    return
  }

  if (cvsStore.cvs.length === 0) {
    await cvsStore.fetchMyCvs()
  }

  if (cvsStore.cvs.length === 0) {
    toast.warning('Chú ý', 'Bạn cần có ít nhất một CV để ứng tuyển. Vui lòng tạo CV trước.')
    return
  }

  // Set default CV or first CV
  const defaultCv = cvsStore.cvs.find(cv => cv.isDefault) || cvsStore.cvs[0]
  if (defaultCv) {
    selectedCvId.value = defaultCv.id
  }

  showBatchApplyModal.value = true
}

async function confirmBatchApply() {
  if (!selectedCvId.value) {
    toast.warning('Chú ý', 'Vui lòng chọn CV để ứng tuyển')
    return
  }

  try {
    await applicationStore.bulkApply({
      jobPostIds: selectedIds.value,
      cvId: selectedCvId.value
    })
    
    toast.success('Thành công', `Đã gửi đơn ứng tuyển vào ${selectedIds.value.length} vị trí thành công!`)
    showBatchApplyModal.value = false
    selectedIds.value = []
  } catch (err: any) {
    const message = err?.response?.data?.message || 'Có lỗi xảy ra khi ứng tuyển hàng loạt'
    toast.error('Lỗi', message)
  }
}

const mappedJobs = computed(() => {
  return savedJobStore.savedJobs.map((item) => {
    const job = item.jobPosting;
    return {
      id: job.id,
      title: job.title,
      company: job.company.name,
      logoUrl: job.company.logoUrl || "/default-company.png",
      logoBg: "bg-blue-50",
      logoBorder: "border-blue-100",
      tags: [job.workType, job.level.name],
      salaryMin: job.salaryNegotiable
        ? "Thỏa thuận"
        : `${((job.salaryMin ?? 0) / 1_000_000).toFixed(0)}tr`,
      salaryMax: job.salaryNegotiable 
        ? "" 
        : job.salaryMax ? `${(job.salaryMax / 1_000_000).toFixed(0)}tr` : "",
      location: "Vietnam",
      postedAt: formatDate(job.publishedAt || job.createdAt),
      isHot: job.isFeatured || job.isUrgent,
      isSaved: true,
    };
  });
});

const totalPages = computed(() => savedJobStore.meta.pages)

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = dayjs(dateStr)
  const now = dayjs()
  const diffInDays = now.diff(date, 'day')

  if (diffInDays === 0) return "Hôm nay";
  if (diffInDays === 1) return "Hôm qua";
  return `${diffInDays} ngày trước`;
}

async function fetchSavedJobs() {
  await savedJobStore.fetchSavedJobs(currentPage.value)
}

async function onQuickApply(jobId: number) {
  const job = mappedJobs.value.find(j => j.id === jobId);
  if (job) {
    await handleQuickApply(jobId, job.title);
  }
}

async function handleUnsaveConfirm(jobPostId: number) {
  const job = savedJobStore.savedJobs.find(j => j.jobPostId === jobPostId);
  const jobTitle = job?.jobPosting?.title || 'việc làm này';

  const ok = await confirm({
    title: 'Bỏ lưu việc làm?',
    message: `Bạn có chắc chắn muốn bỏ lưu "${jobTitle}"?`,
    confirmText: 'Bỏ lưu',
    cancelText: 'Hủy',
    confirmColor: 'red',
    icon: 'bookmark_remove'
  })

  if (ok) {
    try {
      await savedJobStore.unsave(jobPostId)
      toast.success('Thành công', `Đã bỏ lưu ${jobTitle}`)
      
      // Nếu là item cuối cùng của trang và không phải trang đầu, lùi lại 1 trang
      if (savedJobStore.savedJobs.length === 0 && currentPage.value > 0) {
        currentPage.value--
        await fetchSavedJobs()
      }
    } catch (err) {
      toast.error('Lỗi', 'Có lỗi xảy ra khi thực hiện thao tác')
    }
  }
}

function changePage(page: number) {
  currentPage.value = page
  fetchSavedJobs()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchSavedJobs()
  cvsStore.fetchMyCvs()
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translate(-50%, 100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
</style>
