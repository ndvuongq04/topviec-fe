<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmployerInterviewStore } from '@/stores/employerInterview.store';
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store';
import { useEmployerApplicationStore } from '@/stores/employerApplication.store';
import { useToast } from '@/composables/useToast';
import { INTERVIEW_TYPE } from '@/constants/interview.constants';
import type { InterviewType } from '@/constants/interview.constants';

const route = useRoute();
const router = useRouter();
const interviewStore = useEmployerInterviewStore();
const jobStore = useEmployerJobPostingStore();
const appStore = useEmployerApplicationStore();
const toast = useToast();

// --- State ---
const selectedJobId = ref<number | null>(null);
const selectedRoundId = ref<number | null>(null);
const selectedApplicationId = ref<number | null>(null);
const interviewType = ref<InterviewType>(INTERVIEW_TYPE.ONLINE);
const location = ref('');
const notes = ref('');
const deadline = ref('');

const slots = ref([
  { date: '', startTime: '09:00', endTime: '10:00' }
]);

// --- Computed ---
const loading = computed(() => interviewStore.loading || jobStore.loading || appStore.loading);
const jobs = computed(() => jobStore.jobs);
const rounds = computed(() => interviewStore.rounds);
const applications = computed(() => appStore.applications);

// --- Lifecycle ---
onMounted(async () => {
  await jobStore.fetchJobs({ size: 100 });
  
  const queryJobId = route.query.jobId ? Number(route.query.jobId) : null;
  if (queryJobId) {
    selectedJobId.value = queryJobId;
  }
});

// --- Watchers ---
watch(selectedJobId, async (newId) => {
  if (newId) {
    selectedRoundId.value = null;
    selectedApplicationId.value = null;
    await interviewStore.fetchRounds(newId);
    if (rounds.value.length > 0) {
      selectedRoundId.value = rounds.value[0].id;
    }
  }
});

watch(selectedRoundId, async (newRoundId) => {
  if (newRoundId && selectedJobId.value) {
    selectedApplicationId.value = null;
    // Fetch apps in INTERVIEWING status for this job
    await appStore.fetchApplicationsByJob(selectedJobId.value, { status: 'INTERVIEWING', size: 100 });
  }
});

// --- Actions ---
function addSlot() {
  const lastSlot = slots.value[slots.value.length - 1];
  slots.value.push({ 
    date: lastSlot ? lastSlot.date : '', 
    startTime: '10:00', 
    endTime: '11:00' 
  });
}

function removeSlot(index: number) {
  if (slots.value.length > 1) {
    slots.value.splice(index, 1);
  }
}

async function handleSubmit() {
  if (!selectedRoundId.value || !selectedApplicationId.value) {
    toast.error('Lỗi', 'Vui lòng chọn vòng phỏng vấn và ứng viên.');
    return;
  }

  // Validate slots
  for (const slot of slots.value) {
    if (!slot.date || !slot.startTime || !slot.endTime) {
      toast.error('Lỗi', 'Vui lòng điền đây đủ thông tin các khung giờ.');
      return;
    }
  }

  const payload = {
    applicationId: selectedApplicationId.value,
    interviewType: interviewType.value,
    location: location.value,
    notes: notes.value,
    slots: slots.value.map(s => ({
      startTime: `${s.date}T${s.startTime}:00`,
      endTime: `${s.date}T${s.endTime}:00`
    }))
  };

  try {
    await interviewStore.createSlots(selectedRoundId.value, payload);
    toast.success('Thành công', 'Đã gửi đề xuất khung giờ cho ứng viên.');
    router.push('/recruiter/interviews');
  } catch (err) {
    // Error handled by store
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
        <router-link to="/recruiter/interviews" class="hover:text-primary transition-colors">Quản lý lịch</router-link>
        <span class="material-symbols-outlined text-[14px]">chevron_right</span>
        <span class="text-primary">Đề xuất khung giờ</span>
      </div>
      <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Gửi đề xuất khung giờ (Cách 2)</h1>
      <p class="mt-2 text-slate-500 font-medium">Cho phép ứng viên chủ động chọn thời gian phỏng vấn phù hợp từ danh sách bạn đưa ra.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: Configuration Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Target Selection Card -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 space-y-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">1</div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Thông tin cơ bản</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest">Tin tuyển dụng</label>
              <select v-model="selectedJobId" class="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold text-slate-700 dark:text-slate-200">
                <option :value="null" disabled>Chọn tin tuyển dụng...</option>
                <option v-for="job in jobs" :key="job.id" :value="job.id">{{ job.title }}</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest">Vòng phỏng vấn</label>
              <select v-model="selectedRoundId" :disabled="!selectedJobId" class="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold text-slate-700 dark:text-slate-200 disabled:opacity-50">
                <option :value="null" disabled>Chọn vòng...</option>
                <option v-for="r in rounds" :key="r.id" :value="r.id">{{ r.roundName }} ({{ r.roundNumber }})</option>
              </select>
            </div>

            <div class="space-y-2 md:col-span-2">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest">Ứng viên</label>
              <select v-model="selectedApplicationId" :disabled="!selectedRoundId" class="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold text-slate-700 dark:text-slate-200 disabled:opacity-50">
                <option :value="null" disabled>Chọn ứng viên (đang ở trạng thái INTERVIEWING)...</option>
                <option v-for="app in applications" :key="app.id" :value="app.id">{{ app.candidateName }} ({{ app.candidateEmail }})</option>
              </select>
              <p v-if="!applications.length && selectedRoundId" class="text-[10px] text-amber-500 font-bold italic mt-1">Lưu ý: Chỉ những hồ sơ đã chuyển sang trạng thái "Phỏng vấn" mới xuất hiện ở đây.</p>
            </div>
          </div>
        </div>

        <!-- Details Card -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 space-y-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">2</div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Chi tiết đề xuất</h3>
          </div>

          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest">Hình thức</label>
                <div class="flex gap-2">
                  <button 
                    @click="interviewType = INTERVIEW_TYPE.ONLINE"
                    :class="['flex-1 py-3 rounded-2xl font-bold text-sm border-2 transition-all', interviewType === INTERVIEW_TYPE.ONLINE ? 'bg-primary/5 border-primary text-primary' : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500 hover:bg-slate-100']"
                  >Online</button>
                  <button 
                    @click="interviewType = INTERVIEW_TYPE.ONSITE"
                    :class="['flex-1 py-3 rounded-2xl font-bold text-sm border-2 transition-all', interviewType === INTERVIEW_TYPE.ONSITE ? 'bg-primary/5 border-primary text-primary' : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500 hover:bg-slate-100']"
                  >Trực tiếp</button>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest">{{ interviewType === INTERVIEW_TYPE.ONLINE ? 'Link họp (Google Meet, Zoom...)' : 'Địa điểm cụ thể' }}</label>
                <input v-model="location" type="text" placeholder="Nhập địa điểm hoặc link..." class="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest">Ghi chú cho ứng viên (Tùy chọn)</label>
              <textarea v-model="notes" rows="2" placeholder="Tài liệu cần chuẩn bị, người liên hệ khi đến nơi..." class="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-sm"></textarea>
            </div>
          </div>
        </div>

        <!-- Slot Builder Card -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 space-y-6">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">3</div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">Thiết lập các khung giờ trống</h3>
            </div>
            <button @click="addSlot" class="flex items-center gap-2 text-primary font-bold text-sm hover:underline cursor-pointer">
              <span class="material-symbols-outlined text-lg">add_circle</span>
              Thêm khung giờ
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="(slot, idx) in slots" :key="idx" class="group flex flex-wrap md:flex-nowrap items-end gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-transparent hover:border-primary/20 transition-all relative">
              <div class="flex-grow space-y-2 min-w-[200px]">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày phỏng vấn</label>
                <input v-model="slot.date" type="date" class="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div class="w-32 space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Từ (Giờ)</label>
                <input v-model="slot.startTime" type="time" class="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div class="w-32 space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đến (Giờ)</label>
                <input v-model="slot.endTime" type="time" class="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <button 
                @click="removeSlot(idx)" 
                v-if="slots.length > 1"
                class="mb-1 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all cursor-pointer"
              >
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
          
          <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 flex gap-3">
            <span class="material-symbols-outlined text-amber-500">info</span>
            <p class="text-xs text-amber-700 dark:text-amber-400 leading-relaxed font-medium">Bạn nên cung cấp ít nhất **3 khung giờ khác nhau** để tăng khả năng ứng viên có thể sắp xếp tham gia.</p>
          </div>
        </div>
      </div>

      <!-- Right: Preview & Submit -->
      <div class="space-y-6">
        <div class="sticky top-8 space-y-6">
          <div class="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200 dark:shadow-none overflow-hidden relative">
            <div class="relative z-10 space-y-6">
              <h3 class="text-xl font-bold">Xác nhận gửi đề xuất</h3>
              <div class="space-y-4 py-4 border-y border-white/10 text-sm">
                <div class="flex justify-between">
                  <span class="text-white/50">Số lượng slot:</span>
                  <span class="font-bold underline text-primary-light">{{ slots.length }} khung giờ</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-white/50">Ứng viên:</span>
                  <span class="font-bold text-right ml-4">{{ applications.find(a => a.id === selectedApplicationId)?.candidateName || '---' }}</span>
                </div>
              </div>
              
              <div class="space-y-3">
                <button 
                  @click="handleSubmit"
                  :disabled="loading"
                  class="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale cursor-pointer flex items-center justify-center gap-2"
                >
                  <span v-if="loading" class="animate-spin material-symbols-outlined">progress_activity</span>
                  {{ loading ? 'Đang gửi...' : 'GỬI ĐỀ XUẤT NGAY' }}
                </button>
                <button @click="router.back()" class="w-full py-3 bg-white/5 text-white/70 hover:text-white rounded-2xl font-bold text-sm transition-all cursor-pointer">Hủy bỏ</button>
              </div>
            </div>
            <!-- Decorative circle -->
            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
            <h4 class="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 text-sm">
              <span class="material-symbols-outlined text-primary text-lg">lightbulb</span>
              Luồng thực hiện
            </h4>
            <ul class="space-y-4">
              <li v-for="(step, i) in ['NTD gửi đề xuất khung giờ', 'Ứng viên nhận email & link chọn lịch', 'Ứng viên chốt lịch phỏng vấn', 'Lịch hiển thị tại Bảng quản lý']" :key="i" class="flex gap-3 items-start">
                <div class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0 mt-0.5">{{ i + 1 }}</div>
                <p class="text-[11px] font-bold text-slate-500 leading-tight uppercase tracking-wide">{{ step }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

