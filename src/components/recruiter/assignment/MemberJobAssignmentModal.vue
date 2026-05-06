<template>
  <GlobalModal
    :visible="visible"
    title="Giao việc cho thành viên"
    :subtitle="member ? `<span class='text-primary font-bold'>${member.name}</span> | <span class='text-primary font-medium'>${member.role}</span>` : ''"
    icon="add_task"
    max-width="2xl"
    @close="$emit('close')"
  >
    <!-- Content Area -->
    <div class="flex flex-col h-[50vh] min-h-[400px]">
      <!-- Search -->
      <div class="relative mb-6 shrink-0">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span class="material-symbols-outlined text-slate-400 text-[20px]">search</span>
        </div>
        <input 
          v-model="searchQuery"
          class="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-full border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-base text-slate-900 placeholder:text-slate-400 transition-all duration-200" 
          placeholder="Tìm kiếm tin tuyển dụng theo tiêu đề hoặc mã..." 
          type="text"
        />
      </div>

      <!-- List Header -->
      <div class="flex justify-between items-center mb-3 px-2 shrink-0">
        <span class="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Tin tuyển dụng khả dụng</span>
        <span class="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Trạng thái</span>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex-1 flex items-center justify-center">
        <span class="material-symbols-outlined animate-spin text-4xl text-slate-300">progress_activity</span>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredJobs.length === 0" class="flex-1 flex flex-col items-center justify-center text-slate-400">
        <span class="material-symbols-outlined text-5xl mb-2">search_off</span>
        <p class="text-sm font-medium">Không tìm thấy tin tuyển dụng nào</p>
      </div>

      <!-- Job List (Scrollable) -->
      <div v-else class="flex-1 overflow-y-auto pr-2 space-y-2 -mr-2 custom-scrollbar">
        <div 
          v-for="job in filteredJobs" 
          :key="job.id"
          class="flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 cursor-pointer border group"
          :class="selectedJobId === job.id ? 'bg-primary/5 border-primary/30' : 'hover:bg-slate-50 border-transparent'"
          @click="selectJob(job.id)"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <span class="material-symbols-outlined">work</span>
            </div>
            <div>
              <p class="font-bold text-slate-900 text-lg leading-tight">{{ job.title }}</p>
              <p class="text-sm text-slate-500 mt-0.5">ID: {{ job.code || 'JOB-' + job.id }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <!-- Status indicator -->
            <span 
              class="px-2.5 py-1 rounded-full text-xs font-bold"
              :class="job.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'"
            >
              {{ job.status === 'active' ? 'Đang tuyển' : job.status }}
            </span>

            <!-- Checkbox/Radio indicator -->
            <div 
              class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
              :class="selectedJobId === job.id ? 'bg-primary border-none shadow-sm shadow-primary/30' : 'border-2 border-slate-200'"
            >
              <span v-if="selectedJobId === job.id" class="material-symbols-outlined text-white text-sm" style="font-variation-settings: 'FILL' 1;">check</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Footer -->
    <template #footer>
      <button 
        class="px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-base hover:bg-slate-50 transition-colors cursor-pointer"
        @click="$emit('close')"
        :disabled="submitting"
      >
        Hủy
      </button>
      <button 
        class="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!selectedJobId || submitting"
        @click="handleAssign"
      >
        <span v-if="submitting" class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
        <span v-else class="material-symbols-outlined text-[18px]">arrow_forward</span>
        Xác nhận giao việc
      </button>
    </template>
  </GlobalModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import GlobalModal from '@/components/ui/GlobalModal.vue'

const props = defineProps<{
  visible: boolean
  member: any | null
}>()

const emit = defineEmits<{
  close: []
  assign: [jobId: number]
}>()

const searchQuery = ref('')
const selectedJobId = ref<number | null>(null)
const loading = ref(false)
const submitting = ref(false)

// Dữ liệu Hardcoded để demo giao diện
const hardcodedJobs = [
  { id: 1, title: 'Senior UI/UX Designer',       code: '#JOB-8429', status: 'active' },
  { id: 2, title: 'Frontend Developer (React)',   code: '#JOB-8430', status: 'active' },
  { id: 3, title: 'Product Manager',              code: '#JOB-8431', status: 'paused' },
  { id: 4, title: 'Data Analyst',                 code: '#JOB-8432', status: 'active' },
  { id: 5, title: 'Mobile App Developer',         code: '#JOB-8433', status: 'active' },
  { id: 6, title: 'DevOps Engineer',              code: '#JOB-8434', status: 'active' },
  { id: 7, title: 'Fullstack Developer (Node.js)', code: '#JOB-8435', status: 'active' },
]

const availableJobs = computed(() => hardcodedJobs)

const filteredJobs = computed(() => {
  if (!searchQuery.value) return availableJobs.value
  
  const lowerQuery = searchQuery.value.toLowerCase()
  return availableJobs.value.filter(j => 
    j.title.toLowerCase().includes(lowerQuery) || 
    (j.code && j.code.toLowerCase().includes(lowerQuery))
  )
})

watch(() => props.visible, (newVal) => {
  if (newVal) {
    searchQuery.value = ''
    selectedJobId.value = null
    loading.value = true
    // Giả lập loading nhanh
    setTimeout(() => {
      loading.value = false
    }, 400)
  }
})

function selectJob(id: number) {
  if (selectedJobId.value === id) {
    selectedJobId.value = null
  } else {
    selectedJobId.value = id
  }
}

function handleAssign() {
  if (!selectedJobId.value) return
  submitting.value = true
  
  // Giả lập quá trình gửi
  setTimeout(() => {
    emit('assign', selectedJobId.value!)
    submitting.value = false
  }, 800)
}

defineExpose({
  setSubmitting: (val: boolean) => { submitting.value = val }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>
