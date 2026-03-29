<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmployerInterviewStore } from '@/stores/employerInterview.store';
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store';
import { useToast } from '@/composables/useToast';

const route = useRoute();
const router = useRouter();
const interviewStore = useEmployerInterviewStore();
const jobStore = useEmployerJobPostingStore();
const toast = useToast();

// --- State ---
const selectedJobId = ref<number | null>(null);
const loading = computed(() => interviewStore.loading || jobStore.loading);
const jobs = computed(() => jobStore.jobs);
const overdueApplications = computed(() => interviewStore.overdueApplications);

// --- Lifecycle ---
onMounted(async () => {
  await jobStore.fetchJobs({ size: 100 });
  
  const queryJobId = route.query.jobId ? Number(route.query.jobId) : null;
  if (queryJobId) {
    selectedJobId.value = queryJobId;
  } else if (jobs.value.length > 0) {
    selectedJobId.value = jobs.value[0].id;
  }
});

// --- Watchers ---
watch(selectedJobId, (newId) => {
  if (newId) {
    interviewStore.fetchOverdue(newId);
  }
});

// --- Actions ---
async function handleExtendDeadline(applicationId: number) {
  const days = prompt('Nhập số ngày muốn gia hạn thêm:', '2');
  if (days === null) return;
  
  const daysNum = parseInt(days);
  if (isNaN(daysNum) || daysNum <= 0) {
    toast.error('Lỗi', 'Số ngày không hợp lệ.');
    return;
  }

  try {
    await interviewStore.extendDeadline(applicationId, { extendDays: daysNum });
    toast.success('Thành công', `Đã gia hạn thêm ${daysNum} ngày cho ứng viên.`);
    if (selectedJobId.value) interviewStore.fetchOverdue(selectedJobId.value);
  } catch (err) {}
}

async function handleForceSchedule(applicationId: number) {
  router.push({
    path: '/recruiter/interviews/create',
    query: { 
      jobId: selectedJobId.value?.toString(), 
      applicationId: applicationId.toString(),
      force: 'true' 
    }
  });
}

function formatOverdueText(deadlineStr: string) {
  const deadline = new Date(deadlineStr);
  const now = new Date();
  const diffTime = now.getTime() - deadline.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) return `Quá hạn ${diffDays} ngày`;
  return 'Sắp hết hạn';
}
</script>

<template>
  <div class="space-y-8 pt-6">
    <!-- Breadcrumb & Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">
          <router-link to="/recruiter/interviews" class="hover:text-primary transition-colors cursor-pointer">Phỏng vấn</router-link>
          <span class="material-symbols-outlined text-[12px]">chevron_right</span>
          <span class="text-primary">Xử lý OVERDUE</span>
        </nav>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Ứng viên quá hạn phản hồi</h2>
        <p class="text-slate-500 mt-1">Quản lý và giải quyết các trường hợp chưa xác nhận lịch phỏng vấn.</p>
      </div>
      <div class="flex gap-3">
        <select v-model="selectedJobId" class="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-primary/20 min-w-[250px]">
          <option :value="null" disabled>Chọn tin tuyển dụng...</option>
          <option v-for="job in jobs" :key="job.id" :value="job.id">{{ job.title }}</option>
        </select>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-500">
            <span class="material-symbols-outlined">running_with_errors</span>
          </div>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 dark:text-white">{{ overdueApplications.length }}</p>
        <p class="text-sm text-slate-500 font-medium mt-1">Tổng ứng viên quá hạn</p>
      </div>
      
      <div class="lg:col-span-2 bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden flex items-center shadow-lg shadow-primary/20">
        <div class="relative z-10 space-y-2 max-w-lg">
          <h3 class="text-xl font-extrabold leading-tight">Mẹo xử lý nhanh</h3>
          <p class="text-white/80 text-xs leading-relaxed">Đối với ứng viên tiềm năng, hãy thử **Gia hạn** thêm 2 ngày. Nếu vẫn im lặng, bạn có thể **Đặt lịch hộ** nếu đã trao đổi qua điện thoại.</p>
        </div>
        <div class="absolute right-0 bottom-0 top-0 w-1/3 overflow-hidden pointer-events-none opacity-20">
          <span class="material-symbols-outlined text-[120px] absolute -right-10 -bottom-10 rotate-12 text-white">robot_2</span>
        </div>
      </div>
    </div>

    <!-- Main Table -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden relative min-h-[300px]">
      <div v-if="loading" class="absolute inset-0 z-10 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center backdrop-blur-[1px]">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>

      <div class="px-6 py-5 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">Danh sách ứng viên</h3>
      </div>

      <table class="w-full text-left">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] uppercase tracking-widest font-bold text-slate-400">
            <th class="px-6 py-4">Ứng viên & Thông tin</th>
            <th class="px-6 py-4 text-center">Số lần nhắc bài</th>
            <th class="px-6 py-4">Tình trạng</th>
            <th class="px-6 py-4">Hạn phản hồi</th>
            <th class="px-6 py-4 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
          <tr v-for="app in overdueApplications" :key="app.applicationId" class="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
            <td class="px-6 py-5">
              <div class="flex items-center gap-3">
                <img :src="`https://ui-avatars.com/api/?name=${app.candidateName}&background=random`" class="w-11 h-11 rounded-full object-cover bg-slate-100" />
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ app.candidateName }}</p>
                  <p class="text-xs text-slate-500">{{ app.candidateEmail }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-5">
              <div class="flex items-center justify-center gap-2">
                <span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
                  {{ app.reminderCount }} lần
                </span>
              </div>
            </td>
            <td class="px-6 py-5">
              <div class="space-y-1.5">
                <p class="text-sm font-bold text-red-500">{{ formatOverdueText(app.reminderDeadline) }}</p>
                <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden min-w-[100px]">
                  <div class="h-full rounded-full transition-all bg-red-500" :style="{ width: '100%' }"></div>
                </div>
              </div>
            </td>
            <td class="px-6 py-5 text-sm font-medium text-slate-600 dark:text-slate-400">
              {{ new Date(app.reminderDeadline).toLocaleString('vi-VN') }}
            </td>
            <td class="px-6 py-5">
              <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click="handleExtendDeadline(app.applicationId)"
                  title="Gia hạn thêm thời gian" 
                  class="p-2 text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer"
                >
                  <span class="material-symbols-outlined">more_time</span>
                </button>
                <button 
                  @click="handleForceSchedule(app.applicationId)"
                  title="Đặt lịch hộ ứng viên" 
                  class="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-xl transition-all cursor-pointer"
                >
                  <span class="material-symbols-outlined">event_available</span>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="!overdueApplications.length && !loading">
            <td colspan="5" class="px-6 py-20 text-center">
              <div class="flex flex-col items-center gap-2 text-slate-400">
                <span class="material-symbols-outlined text-4xl">check_circle</span>
                <p>Tuyệt vời! Hiên không có ứng viên nào bị quá hạn phản hồi.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.font-black { font-weight: 950; }
</style>
