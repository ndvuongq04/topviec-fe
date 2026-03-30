<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmployerInterviewStore } from '@/stores/employerInterview.store';
import { useEmployerApplicationStore } from '@/stores/employerApplication.store';
import { useToast } from '@/composables/useToast';
import { INTERVIEW_TYPE } from '@/constants/interview.constants';
import type { ReqCreateInterviewScheduleDTO } from '@/types/interview.types';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const interviewStore = useEmployerInterviewStore();
const applicationStore = useEmployerApplicationStore();

// --- Query Params ---
const jobId = Number(route.query.jobId);
const applicationId = Number(route.query.applicationId);

// --- State ---
const selectedRoundId = ref<number | null>(null);
const interviewDate = ref('');
const interviewTime = ref('');
const interviewType = ref<typeof INTERVIEW_TYPE[keyof typeof INTERVIEW_TYPE]>(INTERVIEW_TYPE.ONLINE);
const location = ref('');
const meetingLink = ref('');
const note = ref('');

const loading = computed(() => interviewStore.loading || applicationStore.loading);
const application = computed(() => applicationStore.currentApplication);
const rounds = computed(() => interviewStore.rounds);

// --- Lifecycle ---
onMounted(async () => {
  if (!applicationId || !jobId) {
    toast.error('Lỗi', 'Thông tin ứng viên hoặc tin tuyển dụng không hợp lệ.');
    router.push('/recruiter/interviews');
    return;
  }

  try {
    await Promise.all([
      applicationStore.fetchApplicationDetail(applicationId),
      interviewStore.fetchRounds(jobId)
    ]);

    // Mặc định chọn vòng đầu tiên nếu có
    if (rounds.value.length > 0) {
      selectedRoundId.value = rounds.value[0].id;
    }
  } catch (err) {
    // Error handled by store
  }
});

// --- Actions ---
async function handleCreateSchedule() {
  if (!selectedRoundId.value) {
    toast.error('Lỗi', 'Vui lòng chọn vòng phỏng vấn.');
    return;
  }
  if (!interviewDate.value || !interviewTime.value) {
    toast.error('Lỗi', 'Vui lòng chọn đầy đủ ngày và giờ phỏng vấn.');
    return;
  }

  // Gộp ngày và giờ thành LocalDateTime string (ISO format)
  // Backend mong đợi: yyyy-MM-ddTHH:mm:ss
  const scheduledAt = `${interviewDate.value}T${interviewTime.value}:00`;

  const payload: ReqCreateInterviewScheduleDTO = {
    applicationId,
    scheduledAt,
    interviewType: interviewType.value,
    location: interviewType.value === INTERVIEW_TYPE.ONSITE ? location.value : undefined,
    meetingLink: interviewType.value === INTERVIEW_TYPE.ONLINE ? meetingLink.value : undefined,
    interviewerNote: note.value
  };

  try {
    await interviewStore.createSchedule(selectedRoundId.value, payload);
    toast.success('Thành công', 'Đã tạo lịch phỏng vấn và gửi thông báo cho ứng viên.');
    router.push('/recruiter/interviews');
  } catch (err) {
    // Error handled by store
  }
}

function selectRound(id: number) {
  selectedRoundId.value = id;
}

function setInterviewType(type: typeof INTERVIEW_TYPE[keyof typeof INTERVIEW_TYPE]) {
  interviewType.value = type;
}
</script>

<template>
  <div class="space-y-8 pt-6">
    <!-- Breadcrumb & Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">
          <router-link to="/recruiter/interviews" class="hover:text-primary transition-colors">Phỏng vấn</router-link>
          <span class="material-symbols-outlined text-[12px]">chevron_right</span>
          <span class="text-primary">Đặt lịch thủ công</span>
        </nav>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tạo lịch phỏng vấn mới</h2>
        <p class="text-slate-500 mt-1 text-sm">Chủ động thiết lập thời gian và hình thức phỏng vấn cho ứng viên tiềm năng.</p>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Left Forms -->
      <div class="md:col-span-2 space-y-6">
        <!-- Candidate & Stage Selection -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div class="p-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">person_search</span>
              Thông tin ứng viên & Vòng phỏng vấn
            </h3>
          </div>
          <div class="p-6 space-y-6">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ứng viên đang chọn</label>
              <div v-if="application" class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/10">
                <img :src="application.candidateAvatar || 'https://ui-avatars.com/api/?name=' + application.candidateName" class="w-12 h-12 rounded-full border-2 border-white" />
                <div>
                  <p class="font-bold text-slate-900 dark:text-white tracking-tight">{{ application.candidateName }}</p>
                  <p class="text-xs text-slate-400">{{ application.candidateEmail }}</p>
                </div>
                <div class="ml-auto bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  {{ application.jobTitle }}
                </div>
              </div>
              <div v-else class="h-20 bg-slate-50 dark:bg-slate-800 animate-pulse rounded-xl"></div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vòng phỏng vấn</label>
              <div class="flex flex-wrap gap-3">
                <button 
                  v-for="round in rounds"
                  :key="round.id"
                  @click="selectRound(round.id)"
                  :class="[
                    'px-4 py-3 rounded-xl border-2 transition-all cursor-pointer font-bold text-sm',
                    selectedRoundId === round.id 
                      ? 'border-primary bg-primary/10 text-primary shadow-sm' 
                      : 'border-slate-100 dark:border-slate-800 bg-transparent text-slate-400 hover:border-primary/50'
                  ]"
                >
                  {{ round.roundName }}
                </button>
                <div v-if="rounds.length === 0 && !loading" class="text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg italic">
                  Chưa có vòng phỏng vấn nào được thiết lập cho tin tuyển dụng này.
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Time & Format Selection -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div class="p-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">schedule</span>
              Thời gian & Hình thức
            </h3>
          </div>
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ngày phỏng vấn</label>
                <input v-model="interviewDate" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200 outline-none" type="date" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Giờ phỏng vấn</label>
                <input v-model="interviewTime" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200 outline-none" type="time" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hình thức phỏng vấn</label>
              <div class="flex gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
                <button 
                  @click="setInterviewType(INTERVIEW_TYPE.ONLINE)"
                  :class="[
                    'px-6 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer transition-all',
                    interviewType === INTERVIEW_TYPE.ONLINE ? 'bg-white dark:bg-slate-700 shadow-sm text-primary font-bold' : 'text-slate-500 font-medium'
                  ]"
                >
                  <span class="material-symbols-outlined text-lg">videocam</span> Online
                </button>
                <button 
                  @click="setInterviewType(INTERVIEW_TYPE.ONSITE)"
                  :class="[
                    'px-6 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer transition-all',
                    interviewType === INTERVIEW_TYPE.ONSITE ? 'bg-white dark:bg-slate-700 shadow-sm text-primary font-bold' : 'text-slate-500 font-medium'
                  ]"
                >
                  <span class="material-symbols-outlined text-lg">location_on</span> Trực tiếp
                </button>
              </div>
            </div>
            
            <div v-if="interviewType === INTERVIEW_TYPE.ONLINE">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Link họp trực tuyến (Google Meet/Zoom)</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">link</span>
                <input v-model="meetingLink" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200 outline-none" placeholder="https://meet.google.com/xxx-xxxx-xxx" type="url" />
              </div>
            </div>

            <div v-else>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Địa điểm phỏng vấn</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                <input v-model="location" class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200 outline-none" placeholder="VD: Tòa nhà Bitexco, TP.HCM" type="text" />
              </div>
            </div>
          </div>
        </section>

        <!-- Notes Section -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div class="p-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">description</span>
              Ghi chú gửi ứng viên
            </h3>
          </div>
          <div class="p-6">
            <textarea v-model="note" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 resize-none text-slate-700 dark:text-slate-200 outline-none" placeholder="Nhập lời chào hoặc các lưu ý chuẩn bị cho ứng viên trước buổi phỏng vấn..." rows="4"></textarea>
            <div class="mt-4 flex items-center gap-2 text-slate-400 text-xs italic">
              <span class="material-symbols-outlined text-sm">info</span>
              Nội dung này sẽ được hiển thị trực tiếp trong email mời phỏng vấn.
            </div>
          </div>
        </section>
      </div>

      <!-- Right Sidebar Summary -->
      <div class="space-y-6">
        <section class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/10 dark:border-primary/20 overflow-hidden sticky top-24">
          <div class="h-2 bg-primary"></div>
          <div class="p-6">
            <h4 class="font-bold text-lg mb-4 text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-2">Tổng quan lịch hẹn</h4>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">person</span>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Ứng viên</p>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ application?.candidateName || 'Chưa xác định' }}</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Thời gian</p>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {{ interviewDate ? new Date(interviewDate).toLocaleDateString('vi-VN') : '--/--/----' }} lúc {{ interviewTime || '--:--' }}
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">{{ interviewType === INTERVIEW_TYPE.ONLINE ? 'videocam' : 'location_on' }}</span>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Hình thức</p>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Phỏng vấn {{ interviewType === INTERVIEW_TYPE.ONLINE ? 'Online' : 'Trực tiếp' }}
                  </p>
                </div>
              </div>
            </div>
            <hr class="my-6 border-slate-100 dark:border-slate-800" />
            <button 
              @click="handleCreateSchedule"
              :disabled="loading || !application || rounds.length === 0"
              class="w-full py-4 bg-primary text-white rounded-xl font-extrabold shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
            >
              <span class="material-symbols-outlined">send</span>
              {{ loading ? 'Đang xử lý...' : 'Xác nhận & Gửi email' }}
            </button>
            <p class="text-[11px] text-center text-slate-400 mt-4 px-4 leading-relaxed">
              Bằng cách nhấn nút, hệ thống sẽ tự động tạo sự kiện lịch và gửi thư mời cho ứng viên.
            </p>
          </div>
        </section>

        <div class="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/10 dark:border-primary/20">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-symbols-outlined text-primary">lightbulb</span>
            <h5 class="font-bold text-primary text-sm uppercase tracking-wider">Gợi ý chuyên gia</h5>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Hãy đính kèm tài liệu yêu cầu hoặc JD vị trí trong phần Ghi chú để ứng viên có sự chuẩn bị tốt nhất cho buổi trao đổi.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

