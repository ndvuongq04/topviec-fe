<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployerApplicationStore } from '@/stores/employerApplication.store'
import { APPLICATION_STATUS_OPTIONS } from '@/constants/application.constants'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const applicationStore = useEmployerApplicationStore()

const jobId = Number(route.params.id)
const applicationId = Number(route.params.applicationId)

const application = computed(() => applicationStore.currentApplication)
const loading = computed(() => applicationStore.loading)

// Local state for evaluation
const selectedStatus = ref<string>('')
const rating = ref(0)
const tags = ref<string[]>([])
const newTag = ref('')
const note = ref('')

const EVALUATION_STATUS_OPTIONS = [
  { value: 'cv_passed', label: 'Đạt vòng CV', icon: 'verified', colorClass: 'border-emerald-100 bg-emerald-50/30 text-emerald-700', activeClass: 'border-emerald-500 bg-emerald-50 shadow-sm', iconColor: 'text-emerald-500' },
  { value: 'considering', label: 'Cân nhắc', icon: 'help', colorClass: 'border-amber-100 bg-amber-50/30 text-amber-700', activeClass: 'border-amber-500 bg-amber-50 shadow-sm', iconColor: 'text-amber-500' },
  { value: 'rejected', label: 'Từ chối', icon: 'cancel', colorClass: 'border-rose-100 bg-rose-50/30 text-rose-700', activeClass: 'border-rose-500 bg-rose-50 shadow-sm', iconColor: 'text-rose-500' },
]

async function fetchDetail() {
  try {
    const data = await applicationStore.fetchApplicationDetail(applicationId)
    // Sync local state
    selectedStatus.value = data.status
    rating.value = data.recruiterRating || 0
    tags.value = data.recruiterTags ? data.recruiterTags.split(',').filter(t => t.trim()) : []
    note.value = data.recruiterNote || ''
  } catch (err) {
    toast.error('Lỗi', 'Không thể tải thông tin ứng tuyển')
  }
}

onMounted(() => {
  fetchDetail()
})

function addTag() {
  if (newTag.value.trim() && !tags.value.includes(newTag.value.trim())) {
    tags.value.push(newTag.value.trim())
    newTag.value = ''
  }
}

function removeTag(tag: string) {
  tags.value = tags.value.filter(t => t !== tag)
}

async function inviteForInterview() {
  try {
    await applicationStore.updateStatus(applicationId, {
      status: 'interviewing',
      note: 'Mời phỏng vấn trực tiếp từ trang chi tiết'
    })
    toast.success('Thành công', 'Đã cập nhật trạng thái mời phỏng vấn')
    fetchDetail() // Refresh data to update UI
  } catch (err) {
    toast.error('Lỗi', 'Không thể cập nhật trạng thái phỏng vấn')
  }
}

async function saveEvaluation() {
  try {
    // 1. Update status if changed
    if (selectedStatus.value !== application.value?.status) {
      await applicationStore.updateStatus(applicationId, {
        status: selectedStatus.value,
        note: note.value
      })
    }
    
    // 2. Update evaluation
    await applicationStore.evaluate(applicationId, {
      rating: rating.value,
      note: note.value,
      tags: tags.value.join(',')
    })
    
    toast.success('Thành công', 'Đã lưu đánh giá ứng viên')
  } catch (err) {
    toast.error('Lỗi', 'Không thể lưu đánh giá')
  }
}

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleString('vi-VN')
}

const interactionHistory = computed(() => {
  if (!application.value) return []
  const history = [
    { text: 'Đã ứng tuyển vào vị trí ' + application.value.jobTitle, time: formatDate(application.value.createdAt), color: 'bg-emerald-500' }
  ]
  if (application.value.viewedAt) {
    history.push({ text: 'NTD đã xem hồ sơ', time: formatDate(application.value.viewedAt), color: 'bg-slate-300' })
  }
  return history
})
</script>

<template>
  <div class="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950">
    <div v-if="loading && !application" class="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <template v-if="application">
      <main class="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
        <!-- Left Panel: CV Preview -->
        <section class="flex-1 flex flex-col gap-6">
          <!-- Breadcrumb & Actions -->
          <div class="flex justify-between items-center">
            <nav class="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-widest font-bold">
              <router-link to="/recruiter/jobs" class="hover:text-primary transition-colors">Tuyển dụng</router-link>
              <span class="material-symbols-outlined text-[12px]">chevron_right</span>
              <span class="text-slate-400 select-none">{{ application.jobTitle }}</span>
              <span class="material-symbols-outlined text-[12px]">chevron_right</span>
              <span class="text-primary">{{ application.candidateName }}</span>
            </nav>
            <div class="flex gap-2">
              <a v-if="application.cvFileUrl" :href="application.cvFileUrl" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-all">
                <span class="material-symbols-outlined text-lg">download</span>
                Tải CV
              </a>
              <button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-all cursor-pointer">
                <span class="material-symbols-outlined text-lg">print</span>
                In
              </button>
            </div>
          </div>

          <!-- CV Content Layout (Direct PDF Preview) -->
          <div class="bg-slate-200 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 min-h-[900px] w-full relative overflow-hidden flex flex-col group p-4 shadow-inner">
            <iframe 
              v-if="application.cvFileUrl" 
              :src="application.cvFileUrl" 
              class="w-full h-full min-h-[850px] rounded shadow-2xl border-none bg-white"
              title="CV Preview"
            ></iframe>
            
            <div v-else class="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400 bg-white/50 dark:bg-slate-900/50 rounded-lg">
              <span class="material-symbols-outlined text-6xl">pdf_off</span>
              <p class="font-medium italic text-sm text-center">Ứng viên chưa đính kèm file CV<br>hoặc định dạng file không hỗ trợ xem trực tiếp.</p>
              <a v-if="application.cvFileUrl" :href="application.cvFileUrl" target="_blank" class="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-lg hover:scale-105 transition-all">Tải File</a>
            </div>
          </div>
        </section>

        <!-- Right Panel: Evaluation & Action -->
        <section class="w-full md:w-[400px] flex flex-col gap-6">
          <!-- Phân loại & Đánh giá Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
            <div class="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">assignment_turned_in</span>
                Phân loại & Đánh giá
              </h2>
            </div>
            
            <div class="p-6 space-y-8" :class="{ 'opacity-60 pointer-events-none select-none': application.status === 'interviewing' }">
              <!-- Locked Message -->
              <div v-if="application?.status === 'interviewing'" class="p-3 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-bold flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">info</span>
                Ứng viên đang phỏng vấn - Đánh giá đã được khóa
              </div>
              
              <!-- Status Options -->
              <div class="space-y-3">
                <label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Trạng thái sàng lọc</label>
                <div class="grid grid-cols-1 gap-2">
                  <label 
                    v-for="opt in EVALUATION_STATUS_OPTIONS" 
                    :key="opt.value"
                    :class="[
                      'flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer',
                      selectedStatus === opt.value
                        ? opt.activeClass
                        : opt.colorClass + ' border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    ]"
                  >
                    <input type="radio" v-model="selectedStatus" :value="opt.value" class="w-4 h-4" :class="opt.iconColor.replace('text', 'text-').replace('-500', '-600')" :disabled="application?.status === 'interviewing'" />
                    <span class="text-sm font-bold" :class="selectedStatus === opt.value ? 'text-slate-900 dark:text-white' : ''">{{ opt.label }}</span>
                    <span class="material-symbols-outlined ml-auto text-lg" :class="opt.iconColor">{{ opt.icon }}</span>
                  </label>
                </div>
              </div>

              <!-- Rating Stars -->
              <div class="space-y-3">
                <label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Đánh giá chuyên môn</label>
                <div class="flex gap-2">
                  <button 
                    v-for="i in 5" 
                    :key="i" 
                    @click="rating = i"
                    :disabled="application.status === 'interviewing'"
                    class="transition-transform hover:scale-110 disabled:hover:scale-100"
                    :class="[i <= rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700', 'cursor-pointer']"
                  >
                    <span class="material-symbols-outlined text-3xl" :style="{ fontVariationSettings: i <= rating ? `'FILL' 1` : `'FILL' 0` }">
                      star
                    </span>
                  </button>
                </div>
              </div>

              <!-- Tags -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Nhãn (Tags)</label>
                  <button @click="addTag" v-if="application?.status !== 'interviewing'" class="text-xs text-primary font-bold hover:underline cursor-pointer">+ Thêm mới</button>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in tags" 
                    :key="tag"
                    class="group flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {{ tag }}
                    <span v-if="application?.status !== 'interviewing'" @click.stop="removeTag(tag)" class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100">close</span>
                  </span>
                  <input 
                    v-if="tags.length < 5 && application?.status !== 'interviewing'"
                    v-model="newTag"
                    @keyup.enter="addTag"
                    type="text" 
                    placeholder="Nhập tag..." 
                    class="bg-transparent border-none text-xs font-medium focus:ring-0 w-20 p-0"
                  />
                </div>
              </div>

              <!-- Internal Note -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Ghi chú nội bộ</label>
                  <span class="text-[10px] text-slate-400 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">visibility_off</span> Chỉ tuyển dụng thấy
                  </span>
                </div>
                <textarea 
                  v-model="note"
                  :disabled="application?.status === 'interviewing'"
                  class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:text-slate-200 p-4 outline-none resize-none disabled:bg-slate-100 disabled:text-slate-400" 
                  placeholder="Nhập nhận xét về ứng viên này..." 
                  rows="4"
                ></textarea>
              </div>
            </div>

            <!-- Final Footer Actions -->
            <div class="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <button 
                @click="saveEvaluation"
                :disabled="loading || application?.status === 'interviewing'"
                class="w-full bg-primary text-white py-3 rounded-xl font-extrabold text-sm shadow-lg shadow-primary/20 hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
              >
                <span class="material-symbols-outlined">save</span>
                {{ loading ? 'Đang lưu...' : 'Lưu Đánh Giá' }}
              </button>
              <!-- Removed Invite Button as per request -->
            </div>
          </div>

          <!-- History sidebar -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
            <h3 class="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">Lịch sử tương tác</h3>
            <div class="space-y-4">
              <div v-for="item in interactionHistory" :key="item.time" class="flex gap-3">
                <div :class="['w-1.5 h-1.5 rounded-full mt-1.5 shrink-0', item.color]"></div>
                <div>
                  <p class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ item.text }}</p>
                  <p class="text-[10px] text-slate-400">{{ item.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </template>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
