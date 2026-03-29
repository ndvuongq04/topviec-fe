<template>
  <div class="space-y-8 pt-6">
    <!-- Page Header -->
    <div class="flex items-end justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Phỏng vấn tổng quan</h1>
        <p class="text-slate-500 text-sm">Cập nhật tiến độ và theo dõi các lịch hẹn phỏng vấn ứng viên.</p>
      </div>
    </div>

    <!-- Main Content Area: Simplified Job List -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800/50">
      
      <!-- Loading State -->
      <div v-if="jobStore.loading && interviewingJobs.length === 0" class="p-4 space-y-4">
        <div v-for="i in 3" :key="i" class="h-20 bg-slate-50 dark:bg-slate-800 animate-pulse rounded-xl"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="interviewingJobs.length === 0" class="p-12 text-center space-y-3">
        <span class="material-symbols-outlined text-4xl text-slate-300">work_off</span>
        <p class="text-sm font-bold text-slate-500">Chưa có tin tuyển dụng nào đang phỏng vấn.</p>
      </div>

      <!-- Job Row (Based on User Preference) -->
      <div 
        v-for="(job, index) in interviewingJobs" 
        :key="job.id"
        class="transition-all"
      >
        <div 
          class="group flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
          @click="onToggleExpand(job.id)"
        >
          <!-- Icon -->
          <div 
            class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
            :class="getIconBg(index)"
          >
            <span class="material-symbols-outlined text-2xl" :class="getIconColor(index)">
              {{ ['terminal', 'javascript', 'palette', 'psychology'][index % 4] }}
            </span>
          </div>

          <!-- Info & Actions -->
          <div class="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
            <!-- Title Section -->
            <div class="md:col-span-8">
              <h5 class="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                {{ job.title }}
              </h5>
              <p class="text-xs text-slate-500 truncate mt-0.5">
                {{ job.industry?.name || 'Đội ngũ phát triển' }} • {{ job.level?.name || 'Junior/Middle' }}
              </p>
            </div>

            <!-- Candidates Section -->
            <div class="md:col-span-2">
              <span class="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-slate-400">groups</span>
                {{ job.applicationCount || 0 }} ứng viên
              </span>
            </div>

            <!-- Action Section -->
            <div class="md:col-span-2 flex justify-end">
              <button 
                class="px-4 py-1.5 text-xs font-bold text-primary border border-primary/20 rounded-lg group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all active:scale-95"
              >
                {{ selectedJobId === job.id ? 'Thu gọn' : 'Xem chi tiết' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Inline Detail View (Schedules) -->
        <div 
          v-if="selectedJobId === job.id" 
          class="bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-50 dark:border-slate-800 p-6 animate-in slide-in-from-top-2 duration-300"
        >
          <div v-if="interviewStore.loading" class="flex justify-center py-8">
             <div class="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
          
          <div v-else-if="interviewStore.schedules.length === 0" class="text-center py-8">
             <p class="text-xs font-bold text-slate-400">Chưa có lịch phỏng vấn nào được tạo.</p>
             <router-link :to="`/recruiter/interviews/create?jobId=${job.id}`" class="text-[10px] text-primary font-black uppercase mt-2 inline-block hover:underline">+ Tạo lịch phỏng vấn</router-link>
          </div>

          <div v-else class="space-y-4">
             <div class="flex items-center justify-between">
                <h6 class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Danh sách lịch phỏng vấn ({{ interviewStore.schedules.length }})</h6>
                <router-link :to="`/recruiter/interviews/create?jobId=${job.id}`" class="text-[10px] font-black text-primary hover:underline flex items-center gap-1">
                   <span class="material-symbols-outlined text-xs">add</span> Tạo mới
                </router-link>
             </div>

             <!-- Mini Table for Schedules -->
             <div class="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <table class="w-full text-left text-xs">
                   <thead>
                      <tr class="bg-slate-50/50 dark:bg-slate-800 font-bold uppercase text-[9px] text-slate-400 tracking-tighter">
                         <th class="px-4 py-3">Ứng viên</th>
                         <th class="px-4 py-3">Vòng phỏng vấn</th>
                         <th class="px-4 py-3">Thời gian</th>
                         <th class="px-4 py-3 text-center">Xác nhận</th>
                         <th class="px-4 py-3 text-right">Thao tác</th>
                      </tr>
                   </thead>
                   <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                      <tr v-for="s in interviewStore.schedules" :key="s.id" class="hover:bg-slate-50/30 transition-colors">
                         <td class="px-4 py-3 font-bold text-slate-900 dark:text-white">{{ s.candidateName }}</td>
                         <td class="px-4 py-3 font-semibold text-slate-500">{{ s.roundName }}</td>
                         <td class="px-4 py-3 text-slate-500 font-medium">{{ formatDate(s.scheduledAt) }}</td>
                         <td class="px-4 py-3 text-center">
                            <span v-if="s.confirmedByCandidate" class="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                            <span v-else class="material-symbols-outlined text-slate-300 text-base">pending</span>
                         </td>
                         <td class="px-4 py-3 text-right">
                           <button @click="onViewDetails(s)" class="text-primary font-black uppercase text-[10px] hover:underline">Chi tiết</button>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <GlobalModal
      :visible="showModal"
      title="Thông tin phỏng vấn"
      @close="showModal = false"
      :show-confirm="false"
      cancel-text="Đóng"
    >
       <div v-if="currentSchedule" class="space-y-4">
          <div class="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
             <div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black text-lg">
                {{ currentSchedule.candidateName?.charAt(0) }}
             </div>
             <div>
                <p class="text-base font-bold text-slate-900 dark:text-white">{{ currentSchedule.candidateName }}</p>
                <p class="text-xs text-slate-500">{{ currentSchedule.candidateEmail }}</p>
             </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
             <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-0.5">
                <span class="text-[9px] font-bold text-slate-400 uppercase">Thời gian</span>
                <p class="text-xs font-bold">{{ formatDate(currentSchedule.scheduledAt) }}</p>
             </div>
             <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-0.5">
                <span class="text-[9px] font-bold text-slate-400 uppercase">Loại vòng</span>
                <p class="text-xs font-bold">{{ currentSchedule.roundName }}</p>
             </div>
          </div>
          <div v-if="currentSchedule.meetingLink" class="p-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 rounded-xl">
              <span class="text-[9px] font-bold text-blue-600 uppercase mb-1 block">Link phỏng vấn</span>
              <a :href="currentSchedule.meetingLink" target="_blank" class="text-[11px] font-bold text-blue-700 truncate block hover:underline">{{ currentSchedule.meetingLink }}</a>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-800">
             <span :class="currentSchedule.confirmedByCandidate ? 'text-emerald-500' : 'text-amber-500'" class="text-[10px] font-bold uppercase flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">{{ currentSchedule.confirmedByCandidate ? 'check_circle' : 'schedule' }}</span>
                {{ currentSchedule.confirmedByCandidate ? 'Đã xác nhận' : 'Chờ xác nhận' }}
             </span>
             <router-link :to="`/recruiter/interviews/${currentSchedule.id}/evaluate`" class="px-5 py-2 bg-primary text-white font-bold text-xs rounded-lg active:scale-95 transition-all">Ghi nhận kết quả</router-link>
          </div>
       </div>
    </GlobalModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store'
import { useEmployerInterviewStore } from '@/stores/employerInterview.store'
import { JobPostingStatus } from '@/constants/jobPosting.constants'
import type { ResInterviewScheduleDTO } from '@/types/interview.types'
import GlobalModal from '@/components/ui/GlobalModal.vue'

const jobStore = useEmployerJobPostingStore()
const interviewStore = useEmployerInterviewStore()

// State
const selectedJobId = ref<number | null>(null)
const showModal = ref(false)
const currentSchedule = ref<ResInterviewScheduleDTO | null>(null)

// Computed
const interviewingJobs = computed(() => jobStore.jobs)

// Methods
async function onToggleExpand(id: number) {
  if (selectedJobId.value === id) {
    selectedJobId.value = null
    return
  }
  selectedJobId.value = id
  await interviewStore.fetchSchedules(id)
}

function onViewDetails(s: ResInterviewScheduleDTO) {
  currentSchedule.value = s
  showModal.value = true
}

function formatDate(dateStr: string) {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

function getIconBg(idx: number) {
  const bgs = ['bg-blue-50', 'bg-blue-500', 'bg-orange-50', 'bg-purple-50']
  return bgs[idx % bgs.length]
}

function getIconColor(idx: number) {
  const colors = ['text-blue-600', 'text-white', 'text-orange-600', 'text-purple-600']
  return colors[idx % colors.length]
}

onMounted(async () => {
  await jobStore.fetchJobs({
    status: JobPostingStatus.INTERVIEWING,
    size: 100
  })
})
</script>

<style scoped>
/* Standard styles */
</style>
