<template>
  <GlobalModal
    :visible="visible"
    title="Phân công người phụ trách"
    :subtitle="job ? `${job.title} | ID: ${job.code || 'JOB-' + job.id}` : ''"
    icon="person_add"
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
          placeholder="Tìm kiếm theo tên hoặc email..." 
          type="text"
        />
      </div>

      <!-- List Header -->
      <div class="flex justify-between items-center mb-3 px-2 shrink-0">
        <span class="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Thành viên khả dụng</span>
        <span class="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Khối lượng công việc</span>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex-1 flex items-center justify-center">
        <span class="material-symbols-outlined animate-spin text-4xl text-slate-300">progress_activity</span>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredMembers.length === 0" class="flex-1 flex flex-col items-center justify-center text-slate-400">
        <span class="material-symbols-outlined text-5xl mb-2">search_off</span>
        <p class="text-sm font-medium">Không tìm thấy thành viên nào</p>
      </div>

      <!-- Member List (Scrollable) -->
      <div v-else class="flex-1 overflow-y-auto pr-2 space-y-2 -mr-2">
        <div 
          v-for="member in filteredMembers" 
          :key="member.id"
          class="flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 cursor-pointer border"
          :class="selectedMemberId === member.id ? 'bg-primary/5 border-primary/30' : 'hover:bg-slate-50 border-transparent'"
          @click="selectMember(member.id)"
        >
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200"
                   :class="getAvatarColorClass(member)"
                   :style="member.avatarUrl ? `background-image: url('${member.avatarUrl}'); background-size: cover;` : ''">
                <span v-if="!member.avatarUrl">{{ initials(member.name || member.email) }}</span>
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <p class="font-bold text-slate-900 text-lg leading-tight">{{ member.name || member.email.split('@')[0] }}</p>
              <p class="text-sm text-slate-500 mt-0.5">{{ member.email }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <!-- Job count badge -->
            <span 
              class="px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
              :class="getJobCountBadgeClass(member.jobCount || 0)"
            >
              <span class="material-symbols-outlined text-sm" v-if="(member.jobCount || 0) < 10">work_outline</span>
              <span class="material-symbols-outlined text-sm" v-else>warning</span>
              {{ member.jobCount || 0 }} Jobs
            </span>

            <!-- Checkbox/Radio indicator -->
            <div 
              class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
              :class="selectedMemberId === member.id ? 'bg-primary border-none shadow-sm shadow-primary/30' : 'border-2 border-slate-200'"
            >
              <span v-if="selectedMemberId === member.id" class="material-symbols-outlined text-white text-sm" style="font-variation-settings: 'FILL' 1;">check</span>
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
        :disabled="!selectedMemberId || submitting"
        @click="handleAssign"
      >
        <span v-if="submitting" class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
        <span v-else class="material-symbols-outlined text-[18px]">arrow_forward</span>
        Xác nhận phân công
      </button>
    </template>
  </GlobalModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useEmployerMemberStore } from '@/stores/employerMember.store'
import GlobalModal from '@/components/ui/GlobalModal.vue'

const props = defineProps<{
  visible: boolean
  job: { id: number; title: string; code?: string } | null
}>()

const emit = defineEmits<{
  close: []
  assign: [memberId: number]
}>()

const memberStore = useEmployerMemberStore()
const searchQuery = ref('')
const selectedMemberId = ref<number | null>(null)
const loading = ref(false)
const submitting = ref(false)

// We mock job count here because backend currently doesn't return it
// In a real scenario, this should come from `ResCompanyMember`
const membersWithMockData = computed(() => {
  return (memberStore.members?.result || []).map((m, index) => ({
    ...m,
    id: m.userId,
    name: m.email.split('@')[0], // Fallback if name is missing
    // Randomly mock job counts for demo purposes since backend doesn't have it yet
    jobCount: index % 3 === 0 ? 12 : index % 2 === 0 ? 6 : 2,
    avatarUrl: (m as any).avatarUrl || undefined // Thêm để tránh lỗi TS
  })).filter(m => m.status === 'active' && (m.roleName === 'owner' || m.roleName === 'manager' || m.roleName === 'recruiter')) as any[]
})

const filteredMembers = computed(() => {
  if (!searchQuery.value) return membersWithMockData.value
  
  const lowerQuery = searchQuery.value.toLowerCase()
  return membersWithMockData.value.filter(m => 
    (m.name && m.name.toLowerCase().includes(lowerQuery)) || 
    m.email.toLowerCase().includes(lowerQuery)
  )
})

watch(() => props.visible, async (newVal) => {
  if (newVal) {
    searchQuery.value = ''
    selectedMemberId.value = null
    // Load members if not loaded yet
    if (!memberStore.members) {
      loading.value = true
      try {
        await memberStore.getMembers({ page: 0, size: 50 })
      } finally {
        loading.value = false
      }
    }
  }
})

function selectMember(id: number) {
  if (selectedMemberId.value === id) {
    selectedMemberId.value = null // Toggle off
  } else {
    selectedMemberId.value = id
  }
}

function handleAssign() {
  if (!selectedMemberId.value) return
  submitting.value = true
  // Emit event to parent to handle API call
  emit('assign', selectedMemberId.value)
  // Parent should close the modal and toggle submitting
}

function initials(name: string) {
  if (!name) return 'U'
  return name.split(' ').slice(-2).map(w => w[0]).join('').toUpperCase()
}

function getAvatarColorClass(member: any) {
  const colors = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-emerald-100 text-emerald-700 border-emerald-200',
    'bg-amber-100 text-amber-700 border-amber-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-rose-100 text-rose-700 border-rose-200',
  ]
  // Simple hash to get consistent color for same user
  const hash = String(member.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

function getJobCountBadgeClass(count: number) {
  if (count >= 10) return 'bg-rose-100 text-rose-700'
  if (count >= 5) return 'bg-amber-100 text-amber-700'
  return 'bg-emerald-100 text-emerald-700'
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
