<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AdvancedFilter from '@/components/candidate/job/AdvancedFilter.vue'
import type { SearchFilters } from '@/components/candidate/job/AdvancedFilter.vue'
import JobCard from '@/components/candidate/job/JobCard.vue'
import { publicJobPostingService } from '@/services/jobPosting.service'
import { useSavedJobStore } from '@/stores/savedJob.store'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from '@/composables/useToast'
import type { ResJobPostingSummary, PaginationMeta } from '@/types/jobPosting.types'

const route = useRoute()
const savedJobStore = useSavedJobStore()
const authStore = useAuthStore()
const toast = useToast()

// ─── State ──────────────────────────────────────────────────────────────────

const jobs = ref<ResJobPostingSummary[]>([])
const loading = ref(false)
const meta = ref<PaginationMeta>({ page: 0, pageSize: 10, pages: 0, totals: 0 })
const currentPage = ref(0)
const sort = ref('publishedAt,desc')
const searchType = ref<'title' | 'company' | 'both'>('title')
const sidebarFilters = ref<SearchFilters>({})
const showMobileFilter = ref(false)

const keyword = computed(() => (route.query.keyword as string) || '')

const SORT_OPTIONS = [
  { label: 'Mới nhất', value: 'publishedAt,desc' },
  { label: 'Mức lương cao nhất', value: 'salaryMax,desc' },
  { label: 'Lượt xem nhiều nhất', value: 'viewCount,desc' },
]

const SEARCH_TYPE_OPTIONS = [
  { label: 'Tên việc làm', value: 'title' as const },
  { label: 'Tên công ty', value: 'company' as const },
  { label: 'Cả hai', value: 'both' as const },
]

// ─── Fetch ──────────────────────────────────────────────────────────────────

async function fetchJobs() {
  loading.value = true
  try {
    const params = {
      keyword: keyword.value || undefined,
      page: currentPage.value,
      size: 10,
      sort: sort.value || undefined,
      ...sidebarFilters.value,
    }
    const result = await publicJobPostingService.getList(params)
    jobs.value = result.result
    meta.value = result.meta

    if (authStore.isAuthenticated) {
      result.result.forEach(job => savedJobStore.checkIsSaved(job.id))
    }
  } catch {
    toast.error('Không thể tải danh sách việc làm. Vui lòng thử lại.')
  } finally {
    loading.value = false
  }
}

// ─── Handlers ───────────────────────────────────────────────────────────────

function onFilterChange(filters: SearchFilters) {
  sidebarFilters.value = filters
  currentPage.value = 0
  fetchJobs()
}

function onSortChange() {
  currentPage.value = 0
  fetchJobs()
}

function goToPage(page: number) {
  currentPage.value = page
  fetchJobs()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function handleBookmark(id: number) {
  if (!authStore.isAuthenticated) {
    toast.info('Vui lòng đăng nhập để lưu việc làm')
    return
  }
  try {
    if (savedJobStore.isSavedMap[id]) {
      await savedJobStore.unsave(id)
      toast.info('Đã bỏ lưu việc làm')
    } else {
      await savedJobStore.toggleSave(id)
      toast.success('Đã lưu việc làm thành công')
    }
  } catch {
    toast.error('Không thể thực hiện thao tác')
  }
}

// ─── Mapping ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const diffDays = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000)
  if (diffDays === 0) return 'Hôm nay'
  if (diffDays === 1) return 'Hôm qua'
  return `${diffDays} ngày trước`
}

function mapToCardProps(job: ResJobPostingSummary) {
  return {
    id: job.id,
    title: job.title,
    company: job.company.name,
    logoUrl: job.company.logoUrl || '',
    logoBg: 'bg-blue-50',
    logoBorder: 'border-blue-100',
    tags: [job.workType, job.level.name],
    salaryMin: job.salaryNegotiable
      ? 'Thỏa thuận'
      : `${((job.salaryMin ?? 0) / 1_000_000).toFixed(0)}tr`,
    salaryMax: job.salaryNegotiable
      ? ''
      : job.salaryMax ? `${(job.salaryMax / 1_000_000).toFixed(0)}tr` : '',
    location: 'Vietnam',
    postedAt: formatDate(job.publishedAt || job.createdAt),
    isHot: job.isFeatured || job.isUrgent,
    isSaved: savedJobStore.isSavedMap[job.id] || false,
  }
}

// ─── Watchers ───────────────────────────────────────────────────────────────

watch(() => route.query.keyword, () => {
  currentPage.value = 0
  fetchJobs()
})

watch(sort, onSortChange)

onMounted(fetchJobs)
</script>

<template>
  <div class="flex flex-col flex-1 min-w-0">

    <!-- Page header -->
    <div class="bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 px-4 md:px-10 py-4">
      <div class="max-w-[1440px] mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 class="text-3xl font-extrabold text-text-main dark:text-white tracking-tight">
            <template v-if="keyword">
              Kết quả tìm kiếm: <span class="text-primary">"{{ keyword }}"</span>
            </template>
            <template v-else>Tìm kiếm việc làm</template>
          </h1>
          <p v-if="!loading" class="text-base text-text-muted mt-1">
            Tìm thấy <span class="font-bold text-text-main dark:text-white">{{ meta.totals }}</span> việc làm phù hợp
          </p>
        </div>

        <!-- Mobile: nút mở filter -->
        <button
          type="button"
          class="lg:hidden flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-surface-dark text-base font-bold text-text-main dark:text-white hover:border-primary transition-colors cursor-pointer shadow-sm"
          @click="showMobileFilter = !showMobileFilter"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Lọc nâng cao
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-6 flex gap-5 items-start">

      <!-- Sidebar (desktop) -->
      <aside class="w-[260px] min-w-[220px] shrink-0 hidden lg:block sticky top-[80px]">
        <AdvancedFilter @change="onFilterChange" />
      </aside>

      <!-- Mobile filter overlay -->
      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showMobileFilter"
          class="fixed inset-0 z-40 bg-black/40 lg:hidden"
          @click="showMobileFilter = false"
        />
      </Transition>
      <Transition
        enter-active-class="transition duration-300"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-200"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div
          v-if="showMobileFilter"
          class="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto p-4 bg-background-light dark:bg-background-dark lg:hidden"
        >
          <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
            <span class="text-lg font-extrabold text-text-main dark:text-white">Lọc nâng cao</span>
            <button type="button" @click="showMobileFilter = false" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <AdvancedFilter @change="(f) => { onFilterChange(f); showMobileFilter = false }" />
        </div>
      </Transition>

      <!-- Main content -->
      <main class="flex-1 min-w-0 flex flex-col gap-3">

        <!-- Top controls: Search type pills + Sort -->
        <div class="bg-background-light dark:bg-background-dark rounded-2xl px-4 py-3 flex items-center justify-between flex-wrap gap-3">

          <!-- Search type pills -->
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="text-xs font-bold text-text-muted whitespace-nowrap uppercase tracking-wider">Tìm kiếm theo:</span>
            <button
              v-for="opt in SEARCH_TYPE_OPTIONS"
              :key="opt.value"
              type="button"
              class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer"
              :class="searchType === opt.value
                ? 'bg-primary/10 border-primary text-primary shadow-sm'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-text-muted hover:border-slate-300'"
              @click="searchType = opt.value"
            >
              <svg
                v-if="searchType === opt.value"
                width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"
                class="text-primary shrink-0"
              ><polyline points="20 6 9 17 4 12" /></svg>
              {{ opt.label }}
            </button>
          </div>

          <!-- Sort -->
          <div class="flex items-center gap-2.5">
            <span class="text-xs font-bold text-text-muted whitespace-nowrap uppercase tracking-wider">Sắp xếp theo:</span>
            <select
              v-model="sort"
              class="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-base font-bold text-text-main dark:text-white bg-white dark:bg-surface-dark focus:border-primary focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option v-for="opt in SORT_OPTIONS" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Loading skeleton -->
        <template v-if="loading">
          <div
            v-for="i in 5"
            :key="i"
            class="h-40 bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-slate-700 animate-pulse"
          />
        </template>

        <!-- Empty state -->
        <div
          v-else-if="jobs.length === 0"
          class="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 py-16 flex flex-col items-center gap-3 text-center px-6"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-slate-300 dark:text-slate-600">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p class="text-lg text-text-main dark:text-white font-extrabold">Không tìm thấy việc làm phù hợp</p>
          <p class="text-base text-text-muted font-medium">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>

        <!-- Job list -->
        <template v-else>
          <div class="flex flex-col gap-3">
            <JobCard
              v-for="job in jobs"
              :key="job.id"
              v-bind="mapToCardProps(job)"
              @bookmark="handleBookmark"
            />
          </div>
        </template>

        <!-- Pagination -->
        <div
          v-if="meta.pages > 1"
          class="flex items-center justify-center gap-2 pt-2"
        >
          <!-- Prev -->
          <button
            type="button"
            :disabled="currentPage === 0"
            class="flex items-center gap-1 px-4 py-2 rounded-xl border text-sm font-bold transition-all"
            :class="currentPage === 0
              ? 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
              : 'border-slate-200 dark:border-slate-600 text-text-muted hover:border-primary hover:text-primary cursor-pointer'"
            @click="goToPage(currentPage - 1)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            Trước
          </button>

          <!-- Page numbers -->
          <template v-for="p in meta.pages" :key="p">
            <button
              v-if="Math.abs(p - 1 - currentPage) <= 2"
              type="button"
              class="w-10 h-10 rounded-xl border text-sm font-bold transition-all cursor-pointer"
              :class="currentPage === p - 1
                ? 'bg-primary border-primary text-white shadow-sm'
                : 'border-slate-200 dark:border-slate-600 text-text-muted hover:border-primary hover:text-primary'"
              @click="goToPage(p - 1)"
            >{{ p }}</button>
          </template>

          <!-- Next -->
          <button
            type="button"
            :disabled="currentPage >= meta.pages - 1"
            class="flex items-center gap-1 px-4 py-2 rounded-xl border text-sm font-bold transition-all"
            :class="currentPage >= meta.pages - 1
              ? 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
              : 'border-slate-200 dark:border-slate-600 text-text-muted hover:border-primary hover:text-primary cursor-pointer'"
            @click="goToPage(currentPage + 1)"
          >
            Sau
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

      </main>
    </div>
  </div>
</template>
