<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import JobSearchBar from '@/components/candidate/job/JobSearchBar.vue'
import AdvancedFilter from '@/components/candidate/job/AdvancedFilter.vue'
import type { SearchFilters } from '@/components/candidate/job/AdvancedFilter.vue'
import JobCard from '@/components/candidate/job/JobCard.vue'
import { publicJobPostingService } from '@/services/jobPosting.service'
import { useSavedJobStore } from '@/stores/savedJob.store'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from '@/composables/useToast'
import type { ResJobPostingSummary, ResJobPostingDetail, PaginationMeta } from '@/types/jobPosting.types'

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

// ─── Quick View ──────────────────────────────────────────────────────────────

const quickViewJobId = ref<number | null>(null)
const quickViewDetail = ref<ResJobPostingDetail | null>(null)
const quickViewLoading = ref(false)

const isSavedQuickView = computed(() =>
  quickViewJobId.value ? savedJobStore.isSavedMap[quickViewJobId.value] || false : false
)

const formatQuickViewSalary = computed(() => {
  const d = quickViewDetail.value
  if (!d) return ''
  if (d.salaryNegotiable) return 'Thỏa thuận'
  const min = d.salaryMin ? `${(d.salaryMin / 1_000_000).toFixed(0)}tr` : ''
  const max = d.salaryMax ? `${(d.salaryMax / 1_000_000).toFixed(0)}tr` : ''
  if (min && max) return `${min} – ${max}`
  return min || max || 'Thỏa thuận'
})

async function openQuickView(id: number) {
  quickViewJobId.value = id
  quickViewLoading.value = true
  quickViewDetail.value = null
  try {
    quickViewDetail.value = await publicJobPostingService.getById(id)
  } catch {
    toast.error('Không thể tải chi tiết việc làm')
    quickViewJobId.value = null
  } finally {
    quickViewLoading.value = false
  }
}

function closeQuickView() {
  quickViewJobId.value = null
  quickViewDetail.value = null
}

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

    <!-- Search bar -->
    <div class="sticky top-0 z-[45] bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 py-5 shadow-sm">
      <!-- Dot pattern -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute inset-0 opacity-10"
          style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 24px 24px;"
        />
        <div class="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-linear-to-l from-white to-transparent transform skew-x-12 translate-x-12" />
      </div>
      <div class="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-10">
        <JobSearchBar />
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-6 flex gap-5 items-start min-h-screen">

      <!-- Sidebar (desktop) -->
      <aside v-if="!quickViewJobId" class="w-65 min-w-55 shrink-0 hidden lg:block self-stretch">
        <div class="sticky top-[170px] max-h-[calc(100vh-190px)] overflow-y-auto custom-scrollbar pr-1">
          <AdvancedFilter @change="onFilterChange" />
        </div>
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
      <div class="flex-1 min-w-0 flex gap-4 items-start">

        <!-- Left col: job list -->
        <main
          class="flex flex-col gap-3 min-w-0 transition-all duration-300"
          :class="quickViewJobId ? 'w-[46%] shrink-0' : 'flex-1'"
        >

          <!-- Top controls: kết quả + pills + sort -->
          <div class="bg-background-light dark:bg-background-dark rounded-2xl px-4 py-3 flex items-center justify-between flex-wrap gap-3">

            <!-- Trái: đếm kết quả + mobile filter btn + pills -->
            <div class="flex items-center gap-2.5 flex-wrap">

              <!-- Số kết quả -->
              <p v-if="!loading" class="text-sm text-text-muted whitespace-nowrap">
                Tìm thấy <span class="font-bold text-text-main dark:text-white">{{ meta.totals }}</span> việc làm
              </p>

              <!-- Mobile: nút mở filter -->
              <button
                type="button"
                class="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-surface-dark text-sm font-bold text-text-main dark:text-white hover:border-primary transition-colors cursor-pointer"
                @click="showMobileFilter = !showMobileFilter"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Lọc
              </button>

              <span v-if="!quickViewJobId" class="text-xs font-bold text-text-muted whitespace-nowrap uppercase tracking-wider hidden sm:block">|</span>
              <button
                v-if="!quickViewJobId"
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
            <div v-if="!quickViewJobId" class="flex items-center gap-2.5">
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
                :is-active="quickViewJobId === job.id"
                :show-quick-view="true"
                @bookmark="handleBookmark"
                @quick-view="openQuickView"
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

        <!-- Right col: quick view detail panel -->
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-4"
        >
          <div
            v-if="quickViewJobId"
            class="flex-1 sticky top-[170px] bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
            style="max-height: calc(100vh - 190px)"
          >
            <!-- Loading state -->
            <div v-if="quickViewLoading" class="flex-1 flex items-center justify-center py-16">
              <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>

            <template v-else-if="quickViewDetail">
              <!-- Header -->
              <div class="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-700 shrink-0">
                <div class="flex items-start justify-between gap-3">
                  <RouterLink
                    :to="`/jobs/${quickViewJobId}`"
                    class="text-base font-bold text-text-main dark:text-white hover:text-primary transition-colors line-clamp-2 flex-1"
                  >
                    {{ quickViewDetail.title }}
                  </RouterLink>
                  <button
                    class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 shrink-0 cursor-pointer transition-colors"
                    @click="closeQuickView"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>

                <!-- Company -->
                <div class="flex items-center gap-2 mt-2">
                  <img
                    v-if="quickViewDetail.company.logoUrl"
                    :src="quickViewDetail.company.logoUrl"
                    :alt="quickViewDetail.company.name"
                    class="w-5 h-5 rounded object-contain"
                  />
                  <span class="text-sm text-text-muted">{{ quickViewDetail.company.name }}</span>
                </div>

                <!-- Info pills -->
                <div class="flex flex-wrap gap-1.5 mt-3">
                  <span class="px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium">
                    {{ formatQuickViewSalary }}
                  </span>
                  <span class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-text-muted text-xs">
                    {{ quickViewDetail.level.name }}
                  </span>
                  <span class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-text-muted text-xs">
                    {{ quickViewDetail.workType }}
                  </span>
                  <span v-if="quickViewDetail.experienceYearsMin" class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-text-muted text-xs">
                    {{ quickViewDetail.experienceYearsMin }}+ năm
                  </span>
                </div>

                <!-- Action buttons -->
                <div class="flex gap-2 mt-4">
                  <RouterLink
                    :to="`/jobs/${quickViewJobId}`"
                    class="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-semibold py-2.5 rounded-xl text-center transition-colors"
                  >
                    Ứng tuyển ngay
                  </RouterLink>
                  <button
                    class="w-10 h-10 border rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    :class="isSavedQuickView
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-slate-200 dark:border-slate-600 text-slate-400 hover:border-primary hover:text-primary'"
                    @click="quickViewJobId && handleBookmark(quickViewJobId)"
                  >
                    <span
                      class="material-symbols-outlined text-base"
                      :style="isSavedQuickView ? 'font-variation-settings: \'FILL\' 1' : ''"
                    >bookmark</span>
                  </button>
                </div>
              </div>

              <!-- Body -->
              <div class="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
                <div>
                  <h3 class="font-bold text-text-main dark:text-white mb-2">Mô tả công việc</h3>
                  <div class="text-text-muted dark:text-gray-400 leading-relaxed prose prose-sm max-w-none dark:prose-invert" v-html="quickViewDetail.description" />
                </div>
                <div>
                  <h3 class="font-bold text-text-main dark:text-white mb-2">Yêu cầu ứng viên</h3>
                  <div class="text-text-muted dark:text-gray-400 leading-relaxed prose prose-sm max-w-none dark:prose-invert" v-html="quickViewDetail.requirements" />
                </div>
                <div v-if="quickViewDetail.benefits">
                  <h3 class="font-bold text-text-main dark:text-white mb-2">Quyền lợi</h3>
                  <div class="text-text-muted dark:text-gray-400 leading-relaxed prose prose-sm max-w-none dark:prose-invert" v-html="quickViewDetail.benefits" />
                </div>
                <RouterLink
                  :to="`/jobs/${quickViewJobId}`"
                  class="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                >
                  Xem chi tiết đầy đủ
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </RouterLink>
              </div>
            </template>
          </div>
        </Transition>

      </div>
    </div>
  </div>
</template>
