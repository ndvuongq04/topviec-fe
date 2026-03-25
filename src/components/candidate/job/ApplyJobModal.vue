<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCvsStore } from '@/stores/cvs.store';
import { useToast } from '@/composables/useToast';

interface Props {
  show: boolean;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'confirm']);

const cvsStore = useCvsStore();
const toast = useToast();

const selectedCvId = ref<number | null>(null);
const acceptedTerms = ref(false);
const isUploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(async () => {
  if (cvsStore.cvs.length === 0) {
    await cvsStore.fetchMyCvs();
  }
  // Set default CV if exists
  const defaultCv = cvsStore.cvs.find(cv => cv.isDefault);
  if (defaultCv) {
    selectedCvId.value = defaultCv.id;
  }
});

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    uploadCv(file);
  }
}

async function uploadCv(file: File) {
  isUploading.value = true;
  try {
    await cvsStore.uploadCv(file, { title: file.name });
    toast.success('Thành công', 'Đã tải CV lên thành công');
    if (cvsStore.cvs.length > 0) {
      selectedCvId.value = cvsStore.cvs[0].id;
    }
  } catch (err) {
    toast.error('Lỗi', 'Không thể tải CV lên');
  } finally {
    isUploading.value = false;
  }
}

function triggerFileInput() {
  fileInput.value?.click();
}

function formatUpdateTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function openCv(cv: any) {
  const url = cv.pdfUrl || cv.fileUrl;
  if (url) {
    window.open(url, '_blank');
  } else {
    toast.error('Lỗi', 'Không tìm thấy liên kết bản xem trước CV');
  }
}

function handleConfirm() {
  if (!selectedCvId.value) {
    toast.warning('Chú ý', 'Vui lòng chọn CV để ứng tuyển');
    return;
  }
  if (!acceptedTerms.value) {
    toast.warning('Chú ý', 'Vui lòng đồng ý với điều khoản dịch vụ');
    return;
  }
  emit('confirm', selectedCvId.value);
}
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div 
        class="bg-white dark:bg-surface-dark w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:max-h-[90vh] animate-in fade-in zoom-in duration-300"
      >
        <!-- Custom Header -->
        <div class="px-8 py-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 class="text-xl font-bold font-display text-text-main dark:text-white">Nộp hồ sơ ứng tuyển</h3>
            <p class="text-text-muted text-xs font-medium uppercase tracking-wider mt-1">Sẵn sàng cho hành trình mới</p>
          </div>
          <button @click="emit('close')" class="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span class="material-symbols-outlined text-text-main dark:text-white">close</span>
          </button>
        </div>

        <div class="flex flex-col md:flex-row flex-grow overflow-hidden">
          <!-- Sidebar: Info & Actions -->
          <div class="w-full md:w-72 bg-slate-50 dark:bg-slate-800/30 border-r border-slate-100 dark:border-slate-800 p-8 flex flex-col gap-8 shrink-0">
            <!-- Job Brief -->
            <div class="space-y-4">
              <div class="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 p-2.5 flex items-center justify-center">
                <img :src="companyLogo" class="max-w-full max-h-full object-contain" :alt="companyName">
              </div>
              <div>
                <h4 class="font-bold text-text-main dark:text-white leading-tight line-clamp-2">{{ jobTitle }}</h4>
                <p class="text-sm text-text-secondary mt-1 line-clamp-1">{{ companyName }}</p>
              </div>
            </div>

            <div class="h-px bg-slate-200 dark:bg-slate-700 w-full opacity-50"></div>

            <!-- Create New CV Action -->
            <div class="space-y-3">
              <p class="text-[10px] font-bold text-text-muted uppercase tracking-widest">Cần CV mới?</p>
              <RouterLink 
                to="/profile?tab=cvs" 
                @click="emit('close')"
                class="group w-full flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-left"
              >
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white shrink-0">
                  <span class="material-symbols-outlined">auto_awesome</span>
                </div>
                <span class="text-sm font-bold text-text-main dark:text-gray-300">Tạo hồ sơ chuyên nghiệp</span>
              </RouterLink>
            </div>
          </div>

          <!-- Main Area: CV Selection -->
          <div class="flex-grow p-8 flex flex-col overflow-hidden">
            <div class="flex items-center justify-between mb-6">
              <h5 class="text-sm font-bold text-text-muted uppercase tracking-widest px-1">Danh sách CV của bạn</h5>
              <button 
                @click="triggerFileInput"
                :disabled="isUploading"
                class="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
              >
                <span class="material-symbols-outlined text-[18px]">cloud_upload</span>
                {{ isUploading ? 'Đang tải...' : 'Tải lên từ máy tính' }}
              </button>
            </div>

            <div class="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-3 mb-8">
              <template v-if="cvsStore.loading && cvsStore.cvs.length === 0">
                <div class="flex flex-col items-center py-12 gap-4">
                  <div class="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                  <p class="text-sm font-medium text-text-muted italic">Đang chuẩn bị hồ sơ...</p>
                </div>
              </template>

              <template v-else-if="cvsStore.cvs.length > 0">
                <div 
                  v-for="cv in cvsStore.cvs" 
                  :key="cv.id"
                  @click="selectedCvId = cv.id"
                  class="group p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 relative overflow-hidden"
                  :class="selectedCvId === cv.id 
                    ? 'border-primary bg-primary/[0.02] shadow-sm' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/40'"
                >
                  <!-- Selection Indicator -->
                  <div 
                    class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0"
                    :class="selectedCvId === cv.id ? 'border-primary bg-primary text-white' : 'border-slate-300 dark:border-slate-600'"
                  >
                    <span v-if="selectedCvId === cv.id" class="material-symbols-outlined text-[16px] font-bold">check</span>
                  </div>
                  
                  <div class="flex-grow flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <span class="material-symbols-outlined">description</span>
                    </div>
                    <div class="min-w-0">
                      <h6 class="text-sm font-bold text-text-main dark:text-white truncate">{{ cv.title }}</h6>
                      <p class="text-[10px] text-text-muted mt-0.5">Cập nhật: {{ formatUpdateTime(cv.updatedAt) }}</p>
                    </div>
                  </div>

                  <button 
                    @click.stop="openCv(cv)"
                    class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary transition-all ml-auto shrink-0"
                  >
                    <span class="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </template>

              <div v-else class="flex flex-col items-center justify-center py-16 px-8 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 mb-4">
                  <span class="material-symbols-outlined text-4xl">folder_off</span>
                </div>
                <p class="text-sm font-bold text-text-muted">Chưa có CV nào trên hệ thống</p>
                <p class="text-xs text-text-muted mt-1">Hãy tải lên hoặc tạo mới ngay bây giờ</p>
              </div>
            </div>

            <!-- Footer: Terms & Apply -->
            <div class="mt-auto space-y-6">
              <label class="flex items-start gap-4 cursor-pointer p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <input type="checkbox" v-model="acceptedTerms" class="peer sr-only">
                <div class="w-6 h-6 rounded-lg border-2 border-slate-300 dark:border-slate-600 peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-all shrink-0 mt-0.5">
                  <span v-if="acceptedTerms" class="material-symbols-outlined text-white text-[16px] font-black">check</span>
                </div>
                <span class="text-[11px] leading-relaxed text-text-secondary font-medium">
                  Tôi xác nhận đã đọc và đồng ý với 
                  <a href="#" class="text-primary font-bold hover:underline">Điều khoản dịch vụ</a>, 
                  <a href="#" class="text-primary font-bold hover:underline">Chính sách bảo mật</a> của TopViec và 
                  <a href="#" class="text-primary font-bold hover:underline">Thỏa thuận sử dụng dữ liệu</a> của Nhà tuyển dụng.
                </span>
              </label>

              <div class="flex items-center gap-4">
                <button 
                  @click="handleConfirm"
                  :disabled="!selectedCvId || !acceptedTerms || cvsStore.loading"
                  class="flex-grow h-14 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary/25 transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span class="material-symbols-outlined text-[22px]">rocket_launch</span>
                  Gửi đơn ứng tuyển
                </button>
              </div>
            </div>
          </div>
        </div>

        <input type="file" ref="fileInput" class="hidden" accept=".pdf,.doc,.docx" @change="handleFileSelect">
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

@keyframes pop-in {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-pop-in {
  animation: pop-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
