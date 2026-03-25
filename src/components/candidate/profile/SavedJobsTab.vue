<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div>
        <h1 class="text-2xl font-bold text-text-main dark:text-white">Việc làm đã lưu</h1>
        <p class="text-text-muted text-sm mt-1">Xem và quản lý các công việc bạn đã lưu.</p>
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
    <div v-else-if="mappedJobs.length > 0" class="flex flex-col gap-4">
      <JobCard
        v-for="job in mappedJobs"
        :key="job.id"
        v-bind="job"
        @bookmark="handleUnsaveConfirm"
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
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import JobCard from '@/components/candidate/job/JobCard.vue'

const savedJobStore = useSavedJobStore()
const toast = useToast()
const { confirm } = useConfirm()
const currentPage = ref(0)

const mappedJobs = computed(() => {
  return savedJobStore.savedJobs.map((item) => {
    const job = item.jobPosting;
    return {
      id: job.id,
      title: job.title,
      company: job.company.name,
      logoUrl: job.company.logoUrl || "https://via.placeholder.com/150",
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
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Just now";
  if (diffInDays === 1) return "Yesterday";
  return `${diffInDays} days ago`;
}

async function fetchSavedJobs() {
  await savedJobStore.fetchSavedJobs(currentPage.value)
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
})
</script>
