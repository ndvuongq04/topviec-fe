<template>
  <div class="space-y-8 pt-6">

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h2 class="text-3xl font-extrabold text-on-background tracking-tight">Quản lý Phỏng vấn</h2>
        <p class="text-secondary mt-1 text-sm">Theo dõi tiến độ phỏng vấn theo từng tin tuyển dụng.</p>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Tin đang phỏng vấn -->
      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs font-bold text-secondary uppercase tracking-wider">Tin đang phỏng vấn</p>
            <h3 class="text-3xl font-extrabold mt-2 text-on-background">
              <span v-if="jobStore.loading" class="inline-block w-10 h-8 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></span>
              <span v-else>{{ interviewingJobs.length }}</span>
            </h3>
          </div>
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-lg">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">work</span>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2 text-xs font-medium text-secondary">
          <span class="material-symbols-outlined text-sm">info</span>
          <span>Đang trong giai đoạn phỏng vấn</span>
        </div>
      </div>

      <!-- Lịch hôm nay -->
      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs font-bold text-secondary uppercase tracking-wider">Lịch phỏng vấn hôm nay</p>
            <h3 class="text-3xl font-extrabold mt-2 text-on-background">
              <span v-if="schedulesLoading" class="inline-block w-10 h-8 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></span>
              <span v-else>{{ todayScheduleCount }}</span>
            </h3>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">event_available</span>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600">
          <span class="material-symbols-outlined text-sm">today</span>
          <span>Diễn ra trong ngày hôm nay</span>
        </div>
      </div>

      <!-- Chờ xác nhận -->
      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs font-bold text-secondary uppercase tracking-wider">Chờ ứng viên xác nhận</p>
            <h3 class="text-3xl font-extrabold mt-2 text-on-background">
              <span v-if="schedulesLoading" class="inline-block w-10 h-8 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></span>
              <span v-else>{{ pendingConfirmCount }}</span>
            </h3>
          </div>
          <div class="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">pending_actions</span>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2 text-xs font-medium text-amber-600">
          <span class="material-symbols-outlined text-sm">schedule</span>
          <span>Chưa nhận phản hồi từ ứng viên</span>
        </div>
      </div>
    </div>

    <!-- Job List -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-lg font-bold text-on-background">Tin tuyển dụng đang phỏng vấn</h4>
      </div>

      <!-- Loading skeleton -->
      <div
        v-if="jobStore.loading"
        class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden"
      >
        <div v-for="i in 3" :key="i" class="flex items-center gap-4 p-4">
          <div class="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse shrink-0"></div>
          <div class="flex-1 grid grid-cols-12 gap-4 items-center">
            <div class="col-span-4 space-y-2">
              <div class="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-3/4"></div>
              <div class="h-3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-1/2"></div>
            </div>
            <div class="col-span-2"><div class="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-full"></div></div>
            <div class="col-span-2"><div class="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-full"></div></div>
            <div class="col-span-2"><div class="h-6 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse w-24"></div></div>
            <div class="col-span-2 flex justify-end"><div class="h-8 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-24"></div></div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="interviewingJobs.length === 0"
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-16 text-center space-y-3"
      >
        <span class="material-symbols-outlined text-5xl text-slate-300">work_off</span>
        <p class="text-sm font-bold text-secondary">Chưa có tin tuyển dụng nào đang phỏng vấn.</p>
        <p class="text-xs text-slate-400">Các tin ở trạng thái "Đang phỏng vấn" sẽ hiển thị tại đây.</p>
      </div>

      <!-- Job list -->
      <div
        v-else
        class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden"
      >
        <div
          v-for="job in interviewingJobs"
          :key="job.id"
          class="group flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
        >
          <!-- Icon -->
          <div class="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <img
              v-if="job.company?.logoUrl"
              :src="job.company.logoUrl"
              :alt="job.company.name"
              class="w-10 h-10 rounded-lg object-cover"
            />
            <span v-else class="material-symbols-outlined text-2xl text-primary">work</span>
          </div>

          <!-- Columns -->
          <div class="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 items-center gap-4">

            <!-- Title + industry -->
            <div class="md:col-span-4">
              <h5 class="text-sm font-bold text-on-background truncate group-hover:text-primary transition-colors">
                {{ job.title }}
              </h5>
              <p class="text-xs text-secondary truncate mt-0.5">
                {{ job.industry?.name || 'Chưa phân ngành' }}
                <span v-if="job.level?.name"> • {{ job.level.name }}</span>
              </p>
            </div>

            <!-- Ứng viên -->
            <div class="md:col-span-2">
              <span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-slate-400">groups</span>
                {{ job.applicationCount ?? 0 }} ứng viên
              </span>
            </div>

            <!-- Lịch phỏng vấn -->
            <div class="md:col-span-2">
              <span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-slate-400">event_available</span>
                <span v-if="schedulesLoading" class="inline-block w-16 h-3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></span>
                <span v-else>{{ getScheduleCount(job.id) }} lịch PV</span>
              </span>
            </div>

            <!-- Status -->
            <div class="md:col-span-2">
              <span class="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase rounded-full inline-block">
                Đang phỏng vấn
              </span>
            </div>

            <!-- Action -->
            <div class="md:col-span-2 flex justify-end">
              <router-link
                :to="`/recruiter/jobs/${job.id}/interview-setup`"
                class="px-4 py-1.5 text-xs font-bold text-primary border border-primary/20 rounded-lg group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all active:scale-95 whitespace-nowrap"
              >
                Xem chi tiết
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store'
import { JobPostingStatus } from '@/constants/jobPosting.constants'
import employerInterviewService from '@/services/employerInterview.service'
import type { ResInterviewScheduleDTO } from '@/types/interview.types'

const jobStore = useEmployerJobPostingStore()

// ─── State ────────────────────────────────────────────────────────────────────

/** Map<jobId, schedules[]> — fetch song song sau khi có danh sách jobs */
const schedulesByJob = ref<Map<number, ResInterviewScheduleDTO[]>>(new Map())
const schedulesLoading = ref(false)

// ─── Computed ─────────────────────────────────────────────────────────────────

const interviewingJobs = computed(() => jobStore.jobs)

const allSchedules = computed(() =>
  Array.from(schedulesByJob.value.values()).flat()
)

const todayScheduleCount = computed(() => {
  const today = new Date().toDateString()
  return allSchedules.value.filter(s =>
    new Date(s.scheduledAt).toDateString() === today
  ).length
})

const pendingConfirmCount = computed(() =>
  allSchedules.value.filter(
    s => !s.confirmedByCandidate && s.status !== 'completed' && s.status !== 'cancelled'
  ).length
)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScheduleCount(jobId: number): number {
  return schedulesByJob.value.get(jobId)?.length ?? 0
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(async () => {
  await jobStore.fetchJobs({ status: JobPostingStatus.INTERVIEWING, size: 100 })

  if (interviewingJobs.value.length === 0) return

  // Fetch schedules song song cho tất cả jobs để tính KPI tổng quan
  schedulesLoading.value = true
  try {
    const results = await Promise.allSettled(
      interviewingJobs.value.map(job =>
        employerInterviewService.getSchedules(job.id).then(schedules => ({
          jobId: job.id,
          schedules,
        }))
      )
    )
    const map = new Map<number, ResInterviewScheduleDTO[]>()
    results.forEach(r => {
      if (r.status === 'fulfilled') {
        map.set(r.value.jobId, r.value.schedules)
      }
    })
    schedulesByJob.value = map
  } finally {
    schedulesLoading.value = false
  }
})
</script>
