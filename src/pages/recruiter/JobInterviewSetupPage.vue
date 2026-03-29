<template>
  <div class="space-y-8 pt-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-widest font-bold">
      <router-link to="/recruiter/jobs" class="hover:text-primary transition-colors">Tuyển dụng</router-link>
      <span class="material-symbols-outlined text-[12px]">chevron_right</span>
      <span class="text-slate-400 select-none">{{ selectedJob?.title || '...' }}</span>
      <span class="material-symbols-outlined text-[12px]">chevron_right</span>
      <span class="text-primary">Thiết lập phỏng vấn</span>
    </nav>

    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {{ selectedJob?.title || 'Thiết lập phỏng vấn' }}
        </h2>
        <div class="flex items-center gap-3 mt-2">
          <span v-if="selectedJob" class="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
            Job ID: #{{ selectedJob.id }}
          </span>
          <span v-if="readiness" class="text-slate-500 text-sm flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">group</span> 
            {{ readiness.hasCvPassed ? 'Sẵn sàng phỏng vấn' : 'Chờ duyệt CV' }}
          </span>
        </div>
      </div>
      <div class="flex gap-3">
        <!-- Nếu chưa có dữ liệu Readiness -->
        <div v-if="!readiness && loading" class="h-10 w-40 bg-slate-100 animate-pulse rounded-xl"></div>

        <!-- Nếu đã có Readiness -->
        <template v-else-if="readiness">
          <!-- Nếu chưa đóng tin -->
          <div v-if="!readiness.isJobClosed" class="flex flex-col items-end gap-2">
            <button 
              disabled
              class="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-500 font-bold text-sm flex items-center gap-2 cursor-not-allowed"
              title="Bạn phải đóng tin tuyển dụng trước khi bắt đầu phỏng vấn"
            >
              <span class="material-symbols-outlined">lock</span>
              Cần đóng tin tuyển dụng
            </button>
            <router-link 
              :to="`/recruiter/jobs/${jobPostId}/edit`"
              class="text-xs text-primary font-bold hover:underline flex items-center gap-1"
            >
              Đi đến trang quản lý tin <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </router-link>
          </div>

          <!-- Nếu đã đóng tin -->
          <template v-else>
            <button 
              v-if="!isInterviewPhaseStarted && !readiness.ready"
              @click="handleStartInterviewing"
              :disabled="loading || !readiness.hasRounds"
              class="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
            >
              <span class="material-symbols-outlined">rocket_launch</span>
              {{ loading ? 'Đang xử lý...' : 'Xác nhận & Bắt đầu phỏng vấn' }}
            </button>

            <!-- Nút ENABLED khi đã chuẩn bị xong (ready = true) -->
            <button 
              v-else-if="!isInterviewPhaseStarted && readiness.ready"
              @click="handleStartInterviewing"
              class="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span class="material-symbols-outlined">rocket_launch</span>
              Bắt đầu phỏng vấn ngay
            </button>
            
            <div v-else class="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20">
              <span class="material-symbols-outlined">check_circle</span>
              Đang trong giai đoạn phỏng vấn
            </div>
          </template>
        </template>
      </div>
    </div>

    <!-- Dashboard Layout -->
    <div class="grid grid-cols-12 gap-8">
      <!-- Interview Stages Management Section (Main Content) -->
      <div class="col-span-12 lg:col-span-8 space-y-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">format_list_numbered</span>
            Các vòng phỏng vấn ({{ rounds.length }})
          </h3>
          <button @click="openAddModal" class="text-primary text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer">
            <span class="material-symbols-outlined text-sm">add_circle</span>
            Thêm vòng mới
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading && rounds.length === 0" class="space-y-4">
          <div v-for="i in 3" :key="i" class="h-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
        </div>

        <!-- Stage Cards -->
        <div v-else class="space-y-4">
          <div 
            v-for="(round, index) in rounds" 
            :key="round.id"
            class="group relative bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/20 hover:shadow-md transition-all"
          >
            <!-- Drag handle - mock for now -->
            <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
              <span class="material-symbols-outlined text-slate-400">drag_indicator</span>
            </div>
            
            <div class="flex gap-6">
              <div class="w-12 h-12 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-extrabold text-primary text-xl border border-primary/10">
                {{ index + 1 }}
              </div>
              <div class="flex-grow">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="text-base font-bold text-slate-900 dark:text-white">
                      {{ round.roundName }}
                      <span v-if="round.isFinal" class="ml-2 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded uppercase tracking-tighter">Vòng cuối</span>
                    </h4>
                    <p class="text-sm text-slate-500 mt-1">{{ round.description || 'Chưa có mô tả cho vòng này.' }}</p>
                  </div>
                  <div class="flex gap-1">
                    <button @click="openEditModal(round)" class="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer">
                      <span class="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button @click="confirmDelete(round)" class="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                      <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
                
                <div class="mt-4 flex flex-wrap gap-4 items-center border-t border-slate-50 dark:border-slate-800/50 pt-4">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-slate-400 text-sm">person</span>
                    <span class="text-xs font-semibold text-slate-500">Người phỏng vấn: </span>
                    <div class="flex -space-x-2">
                      <template v-if="round.interviewers && round.interviewers.length > 0">
                        <div 
                          v-for="iv in round.interviewers.slice(0, 3)" 
                          :key="iv.id"
                          class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border-2 border-white dark:border-slate-900 text-[8px] font-bold text-primary"
                          :title="iv.name"
                        >
                          {{ iv.name.charAt(0) }}
                        </div>
                        <div v-if="round.interviewers.length > 3" class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-900 text-[8px] font-bold text-slate-500">
                          +{{ round.interviewers.length - 3 }}
                        </div>
                      </template>
                      <span v-else class="text-[10px] text-slate-400 italic">Chưa phân công</span>
                    </div>
                  </div>
                  <div class="ml-auto">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ round.candidateCount }} Ứng viên</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State Add Zone -->
        <button @click="openAddModal" class="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 py-10 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 transition-all bg-white/50 dark:bg-slate-900/50 cursor-pointer">
          <span class="material-symbols-outlined text-4xl mb-2">add_circle</span>
          <span class="text-sm font-bold uppercase tracking-widest">Nhấn để thêm vòng phỏng vấn mới</span>
        </button>
      </div>

      <!-- Configuration & Stats Sidebar -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <!-- Readiness Card -->
        <div v-if="readiness" class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h4 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Trạng thái sẵn sàng</h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-slate-500">Số vòng tối thiểu</span>
              <span class="material-symbols-outlined text-sm" :class="readiness.hasRounds ? 'text-emerald-500' : 'text-rose-500'">
                {{ readiness.hasRounds ? 'check_circle' : 'cancel' }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-slate-500">Ứng viên đã duyệt CV</span>
              <span class="material-symbols-outlined text-sm" :class="readiness.hasCvPassed ? 'text-emerald-500' : 'text-rose-500'">
                {{ readiness.hasCvPassed ? 'check_circle' : 'cancel' }}
              </span>
            </div>
          </div>
          <div v-if="!readiness.ready" class="mt-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl">
            <p v-if="!readiness.isJobClosed" class="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed font-bold mb-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">warning</span> Yêu cầu bắt buộc:
            </p>
            <p class="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
              <template v-if="!readiness.isJobClosed">Bạn phải <b>Đóng tin tuyển dụng</b> (ngừng nhận hồ sơ mới) trước khi có thể bắt đầu phase phỏng vấn.</template>
              <template v-else-if="!readiness.hasRounds">Bạn cần tạo ít nhất <b>1 vòng phỏng vấn</b> để tiếp tục.</template>
              <template v-else-if="!readiness.hasCvPassed">Không có ứng viên nào đạt vòng hồ sơ (CV_PASSED) để phỏng vấn.</template>
            </p>
          </div>
        </div>

        <!-- Stats/Tips Card -->
        <div class="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
          <div class="relative z-10">
            <h4 class="text-base font-bold mb-2">Lời khuyên của TopViec</h4>
            <p class="text-xs opacity-90 leading-relaxed mb-4">Quy trình phỏng vấn lý tưởng thường kéo dài 2-4 vòng để đảm bảo trải nghiệm tốt nhất cho ứng viên.</p>
            <div class="flex items-end justify-between">
              <div>
                <p class="text-[10px] uppercase font-bold tracking-widest opacity-80">Gợi ý quy trình</p>
                <p class="text-xl font-extrabold">Standard flow</p>
              </div>
              <span class="material-symbols-outlined text-4xl opacity-30">tips_and_updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Round Modal -->
    <GlobalModal
      :visible="showModal"
      :title="editingRound ? 'Chỉnh sửa vòng PV' : 'Thêm vòng phỏng vấn mới'"
      :subtitle="editingRound ? 'Cập nhật lại thông tin quy trình' : 'Thiết lập bước đánh giá cho ứng viên'"
      @close="closeModal"
      @confirm="saveRound"
      :loading="loading"
    >
      <div class="space-y-6">
        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-widest">Tên vòng phỏng vấn</label>
          <input 
            v-model="roundForm.roundName"
            type="text" 
            placeholder="VD: Phỏng vấn chuyên môn, Culture Fit..."
            class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-widest">Mô tả chi tiết</label>
          <textarea 
            v-model="roundForm.description"
            rows="3"
            placeholder="Nhập mục tiêu hoặc lưu ý cho vòng này..."
            class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
          ></textarea>
        </div>
        <label class="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
          <input type="checkbox" v-model="roundForm.isFinal" class="w-4 h-4 text-primary" />
          <div>
            <p class="text-sm font-bold text-slate-900 dark:text-white">Đây là vòng cuối cùng</p>
            <p class="text-[11px] text-slate-500">Ứng viên pass vòng này sẽ được gửi Offer</p>
          </div>
        </label>
      </div>
    </GlobalModal>

    <!-- Global Confirm Modal for Deletion -->
    <GlobalConfirmModal />

    <!-- Floating Action Feedback -->
    <div v-if="rounds.length > 1" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-slow">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">info</span>
      <span class="text-sm font-medium">Lưu ý: Bạn chỉ có thể chỉnh sửa quy trình trước khi bắt đầu phỏng vấn.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useEmployerInterviewStore } from '@/stores/employerInterview.store';
import { useEmployerJobPostingStore } from '@/stores/employerJobPosting.store';
import { useToast } from '@/composables/useToast';
import { useConfirm } from '@/composables/useConfirm';
import GlobalModal from '@/components/ui/GlobalModal.vue';
import GlobalConfirmModal from '@/components/ui/GlobalConfirmModal.vue';
import type { ResInterviewRoundDTO, ReqCreateInterviewRoundDTO } from '@/types/interview.types';

const route = useRoute();
const toast = useToast();
const interviewConfirm = useConfirm();
const interviewStore = useEmployerInterviewStore();
const jobStore = useEmployerJobPostingStore();

const jobPostId = Number(route.params.id);

// --- State ---
const rounds = computed(() => interviewStore.rounds);
const readiness = computed(() => interviewStore.readiness);
const selectedJob = computed(() => jobStore.selectedJob);
const loading = computed(() => interviewStore.loading || jobStore.loading);

const showModal = ref(false);
const editingRound = ref<ResInterviewRoundDTO | null>(null);

const roundForm = reactive<ReqCreateInterviewRoundDTO>({
  roundName: '',
  description: '',
  isFinal: false,
});

const isInterviewPhaseStarted = ref(false);

// --- Lifecycle ---
onMounted(async () => {
  await Promise.all([
    jobStore.fetchJobById(jobPostId),
    interviewStore.fetchRounds(jobPostId),
    interviewStore.fetchReadiness(jobPostId)
  ]);
});

// --- Actions ---
function openAddModal() {
  editingRound.value = null;
  roundForm.roundName = '';
  roundForm.description = '';
  roundForm.isFinal = false;
  showModal.value = true;
}

function openEditModal(round: ResInterviewRoundDTO) {
  editingRound.value = round;
  roundForm.roundName = round.roundName;
  roundForm.description = round.description || '';
  roundForm.isFinal = round.isFinal;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

async function saveRound() {
  if (!roundForm.roundName.trim()) {
    toast.error('Lỗi', 'Vui lòng nhập tên vòng phỏng vấn');
    return;
  }

  try {
    if (editingRound.value) {
      await interviewStore.updateRound(editingRound.value.id, { ...roundForm });
      toast.success('Thành công', 'Đã cập nhật vòng phỏng vấn');
    } else {
      await interviewStore.createRound(jobPostId, { ...roundForm });
      toast.success('Thành công', 'Đã thêm vòng phỏng vấn mới');
    }
    closeModal();
    // Refresh readiness
    interviewStore.fetchReadiness(jobPostId);
  } catch (err) {
    // Error handled by store
  }
}

async function confirmDelete(round: ResInterviewRoundDTO) {
  const isConfirmed = await interviewConfirm.confirm({
    title: 'Xóa vòng phỏng vấn?',
    message: `Bạn có chắc chắn muốn xóa "${round.roundName}"? Hành động này không thể hoàn tác.`,
    confirmText: 'Xóa ngay',
    cancelText: 'Hủy',
    confirmColor: 'red',
  });

  if (isConfirmed) {
    try {
      await interviewStore.deleteRound(round.id);
      toast.success('Thành công', 'Đã xóa vòng phỏng vấn');
      interviewStore.fetchReadiness(jobPostId);
    } catch (err) {}
  }
}

async function handleStartInterviewing() {
  const isConfirmed = await interviewConfirm.confirm({
    title: 'Bắt đầu giai đoạn phỏng vấn?',
    message: 'Sau khi bắt đầu, hệ thống sẽ chốt quy trình và cho phép bạn mời ứng viên phỏng vấn. Bạn không nên thay đổi số lượng vòng sau bước này.',
    confirmText: 'Bắt đầu ngay',
  });

  if (isConfirmed) {
    try {
      await interviewStore.startInterviewing(jobPostId);
      toast.success('Thành công', 'Giai đoạn phỏng vấn đã bắt đầu. Trạng thái các ứng viên đã được cập nhật.');
      isInterviewPhaseStarted.value = true;
      await interviewStore.fetchReadiness(jobPostId);
      // Có thể chuyển hướng sang trang quản lý lịch phỏng vấn
      // router.push(`/recruiter/jobs/${jobPostId}/interviews`);
    } catch (err) {}
  }
}
</script>

<style scoped>
.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}

@keyframes bounce-slow {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
  40% {transform: translateY(-10px) translateX(-50%);}
  60% {transform: translateY(-5px) translateX(-50%);}
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
