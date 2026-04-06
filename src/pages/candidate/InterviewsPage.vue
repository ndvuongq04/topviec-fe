<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GlobalModal from '@/components/ui/GlobalModal.vue'

const router = useRouter()

// Tab Logic
const activeTab = ref<'upcoming' | 'history'>('upcoming')

// Modal states
const isSelectionModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const activeInterview = ref<{ title: string; company: string } | null>(null)
const selectedAppointment = ref({ title: '', time: '', location: '' })

interface Interview {
  id: string
  jobTitle: string
  company: string
  companyLogo: string
  date?: string
  time?: string
  duration?: string
  type: 'Online' | 'Offline'
  location: string
  link?: string
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'PendingSelection'
  round: string
  deadline?: string
}

const interviews = ref<Interview[]>([
  {
    id: '4',
    jobTitle: 'Senior UI/UX Designer',
    company: 'TopViec Technology',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=TV',
    type: 'Online',
    location: 'Google Meet',
    status: 'PendingSelection',
    round: 'Vòng 1 — HR Interview',
    deadline: '01/04/2026'
  },
  {
    id: '1',
    jobTitle: 'Product Owner',
    company: 'Fintech Core Solutions',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=FC',
    date: 'Thứ Ba, 28 Tháng 3, 2026',
    time: '14:00 - 15:00',
    duration: '60 phút',
    type: 'Online',
    location: 'meet.google.com/abc-defg-hij',
    link: 'https://meet.google.com/abc-defg-hij',
    status: 'Upcoming',
    round: 'Vòng 1 — Technical'
  },
  {
    id: '2',
    jobTitle: 'Frontend Developer (React)',
    company: 'Nexus Global Systems',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=NG',
    date: 'Thứ Năm, 30 Tháng 3, 2026',
    time: '09:30 - 10:30',
    duration: '60 phút',
    type: 'Offline',
    location: '123 Lê Lợi, Phường Bến Thành, Quận 1, HCM',
    status: 'Upcoming',
    round: 'Vòng 2 — Culture Fit'
  },
  {
    id: '3',
    jobTitle: 'Junior Graphic Designer',
    company: 'Creative Hub Studio',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=CH',
    date: '15/03/2026',
    type: 'Online',
    location: 'Google Meet',
    status: 'Completed',
    round: 'Vòng 1'
  }
])

// Computed lists
const pendingInvitations = computed(() => interviews.value.filter(i => i.status === 'PendingSelection'))
const upcomingInterviews = computed(() => interviews.value.filter(i => i.status === 'Upcoming'))
const completedInterviews = computed(() => interviews.value.filter(i => i.status === 'Completed' || i.status === 'Cancelled'))

const handleSelectSlot = (item: any) => {
  activeInterview.value = { title: item.jobTitle, company: item.company }
  isSelectionModalOpen.value = true
}

const onConfirmSlot = () => {
  selectedAppointment.value = {
    title: activeInterview.value?.title || '',
    time: '25 Tháng 10, 2026<br>10:00 AM — 11:00 AM',
    location: 'Google Meet (Kèm link sau)'
  }
  isSelectionModalOpen.value = false
  isSuccessModalOpen.value = true
}

// Slot Selection logic
const selectedSlotId = ref<number | null>(3)
const slots = ref([
  { id: 1, day: 'Thứ Hai', date: '24 Tháng 10', time: '09:00 AM — 10:00 AM', icon: 'calendar_today' },
  { id: 2, day: 'Thứ Hai', date: '24 Tháng 10', time: '02:30 PM — 03:30 PM', icon: 'calendar_today' },
  { id: 3, day: 'Thứ Ba', date: '25 Tháng 10', time: '10:00 AM — 11:00 AM', icon: 'event_available' },
  { id: 4, day: 'Thứ Tư', date: '26 Tháng 10', time: '11:00 AM — 12:00 PM', icon: 'calendar_today' },
])
</script>

<template>
  <main class="flex-1 min-w-0 pb-20 max-w-[1440px] mx-auto w-full px-4 md:px-10 py-6">
    <!-- Unified Header Card -->
    <div class="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
      <div class="p-5 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Lịch phỏng vấn</h2>
            <p class="text-slate-500 dark:text-gray-400 text-base mt-1">Theo dõi các buổi phỏng vấn sắp tới và xem lại lịch sử.</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-base font-bold bg-primary/10 text-primary border border-primary/20">
              <span class="material-symbols-outlined text-[16px]">calendar_today</span>
              {{ upcomingInterviews.length }} lịch sắp tới
            </span>
          </div>
        </div>
      </div>
      
      <!-- Tab Bar -->
      <div class="px-5 sm:px-6 py-3 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <button 
          @click="activeTab = 'upcoming'"
          class="whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-black transition-all duration-200 uppercase tracking-wider"
          :class="activeTab === 'upcoming' 
            ? 'bg-primary text-white shadow-md shadow-primary/20' 
            : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
        >
          Sắp tới
        </button>
        <button 
          @click="activeTab = 'history'"
          class="whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-black transition-all duration-200 uppercase tracking-wider"
          :class="activeTab === 'history' 
            ? 'bg-primary text-white shadow-md shadow-primary/20' 
            : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
        >
          Lịch sử
        </button>
      </div>
    </div>

    <!-- Tab Content: Upcoming -->
    <div v-show="activeTab === 'upcoming'" class="space-y-8">
      <!-- Section: Pending Invitations -->
      <div v-if="pendingInvitations.length > 0" class="space-y-4">
        <div class="flex items-center gap-2 px-1">
          <span class="material-symbols-outlined text-amber-500 text-lg">notification_important</span>
          <h3 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Cần xác nhận lịch ({{ pendingInvitations.length }})</h3>
        </div>
        
        <div class="grid gap-4">
          <div 
            v-for="invitation in pendingInvitations" 
            :key="invitation.id"
            class="group bg-white dark:bg-surface-dark p-5 rounded-2xl border-2 border-amber-100 dark:border-amber-900/30 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:shadow-amber-500/5 transition-all"
          >
            <div class="flex items-center gap-5">
              <div class="w-14 h-14 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center border border-amber-100 dark:border-amber-800/30 shrink-0">
                <span class="material-symbols-outlined text-amber-600 text-3xl">mark_email_unread</span>
              </div>
              <div class="min-w-0">
                <h4 class="font-black text-slate-900 dark:text-white text-lg truncate">{{ invitation.jobTitle }}</h4>
                <p class="text-slate-500 dark:text-gray-400 font-bold text-sm">{{ invitation.company }} • {{ invitation.round }}</p>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <button 
                @click="router.push(`/interviews/detail/${invitation.id}`)"
                class="flex-1 md:flex-none px-6 py-2.5 bg-amber-500 text-white rounded-xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
              >
                Chọn lịch ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Confirmed Interviews -->
      <div class="space-y-4">
        <div class="flex items-center gap-2 px-1">
          <span class="material-symbols-outlined text-primary text-xl">event_available</span>
          <h3 class="text-base font-black text-slate-900 dark:text-white uppercase tracking-widest">Đã xác nhận ({{ upcomingInterviews.length }})</h3>
        </div>

        <div v-if="upcomingInterviews.length === 0" class="bg-white dark:bg-surface-dark py-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
          <span class="material-symbols-outlined text-4xl text-slate-200 mb-3">calendar_today</span>
          <p class="text-slate-400 font-bold">Chưa có buổi phỏng vấn nào được lên lịch.</p>
        </div>

        <div v-else class="grid gap-4">
          <div 
            v-for="interview in upcomingInterviews" 
            :key="interview.id"
            class="bg-white dark:bg-surface-dark p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
            @click="router.push(`/interviews/detail/${interview.id}`)"
          >
            <div class="flex items-center gap-4 flex-grow min-w-0">
              <div class="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shrink-0">
                <span class="material-symbols-outlined text-primary text-2xl">apartment</span>
              </div>
              <div class="min-w-0 flex-grow">
                <h4 class="font-black text-slate-900 dark:text-white text-lg truncate">{{ interview.jobTitle }}</h4>
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-slate-500 dark:text-gray-400 text-sm font-bold">
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">calendar_today</span>
                    {{ interview.date }}
                  </span>
                  <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">schedule</span>
                    {{ interview.time }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-50 dark:border-slate-800 justify-between md:justify-end">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-black uppercase tracking-widest border border-slate-100 dark:border-slate-700">
                {{ interview.round }}
              </div>
              <button class="p-2 text-slate-400 hover:text-primary transition-colors">
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Content: History -->
    <div v-show="activeTab === 'history'" class="space-y-4">
      <div v-if="completedInterviews.length === 0" class="bg-white dark:bg-surface-dark py-20 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
        <span class="material-symbols-outlined text-5xl text-slate-200 mb-4">history_toggle_off</span>
        <h3 class="text-slate-900 dark:text-white font-black">Lịch sử trống</h3>
        <p class="text-slate-500 text-sm mt-1">Các buổi phỏng vấn đã hoàn thành sẽ hiển thị tại đây.</p>
      </div>

      <div v-else class="grid gap-3">
        <div 
          v-for="interview in completedInterviews" 
          :key="interview.id"
          class="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 opacity-75 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 shadow-sm"
          @click="router.push(`/interviews/detail/${interview.id}`)"
        >
          <div class="flex items-center gap-4 min-w-0">
            <div class="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
               <span class="material-symbols-outlined text-slate-400">apartment</span>
            </div>
            <div class="min-w-0">
              <h4 class="font-bold text-slate-900 dark:text-white text-sm truncate">{{ interview.jobTitle }}</h4>
              <p class="text-xs text-slate-500">{{ interview.date }} • {{ interview.round }}</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest">
            {{ interview.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Modals (Kept as they are) -->
    <GlobalModal
      :visible="isSelectionModalOpen"
      title="Chọn lịch phỏng vấn"
      :subtitle="`${activeInterview?.company} — ${activeInterview?.title}`"
      icon="event_available"
      max-width="2xl"
      @close="isSelectionModalOpen = false"
      @confirm="onConfirmSlot"
      confirm-text="Xác nhận lịch hẹn"
      confirm-icon="verified"
    >
      <div class="grid gap-4">
        <label 
          v-for="slot in slots" 
          :key="slot.id"
          :class="[
            'group relative flex items-center p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer',
            selectedSlotId === slot.id 
              ? 'border-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50'
          ]"
        >
          <input 
            type="radio" 
            name="interview_slot" 
            :value="slot.id" 
            v-model="selectedSlotId"
            class="w-5 h-5 text-primary border-slate-300 focus:ring-primary transition-all cursor-pointer"
          />
          <div class="ml-4 flex flex-grow items-center justify-between">
            <div>
              <p class="font-black text-slate-900 dark:text-white">{{ slot.day }}, {{ slot.date }}</p>
              <p class="text-sm font-bold text-slate-500 dark:text-gray-400">{{ slot.time }}</p>
            </div>
            <span 
              class="material-symbols-outlined transition-colors"
              :class="selectedSlotId === slot.id ? 'text-primary' : 'text-slate-300 group-hover:text-primary'"
              style="font-variation-settings: 'FILL' 1;"
            >
              {{ selectedSlotId === slot.id ? 'check_circle' : 'calendar_today' }}
            </span>
          </div>
        </label>
      </div>
      
      <div class="flex items-center justify-center gap-6 mt-6">
        <button class="text-slate-500 font-bold text-sm hover:text-primary transition-colors flex items-center gap-1.5 group">
          <span class="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">help</span>
          Yêu cầu khung giờ khác
        </button>
        <div class="h-4 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
        <button class="text-slate-500 font-bold text-sm hover:text-primary transition-colors flex items-center gap-1.5 group">
          <span class="material-symbols-outlined text-lg group-hover:-translate-y-0.5 transition-transform">mail</span>
          Liên hệ nhân sự
        </button>
      </div>
    </GlobalModal>

    <GlobalModal
      :visible="isSuccessModalOpen"
      title="Xác nhận Thành công"
      icon="check_circle"
      max-width="2xl"
      variant="primary"
      :show-default-footer="false"
      @close="isSuccessModalOpen = false"
    >
      <div class="text-center py-4">
        <div class="mb-6 flex justify-center">
          <div class="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center shadow-inner relative group">
            <div class="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-xl animate-pulse"></div>
            <span class="material-symbols-outlined text-emerald-500 text-5xl relative z-10" style="font-variation-settings: 'FILL' 1;">check_circle</span>
          </div>
        </div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-2">Lịch phỏng vấn đã được xác nhận</h2>
        <p class="text-slate-500 dark:text-gray-400 font-bold mb-8 max-w-sm mx-auto">
          Cảm ơn bạn. Chúng tôi đã nhận được sự lựa chọn của bạn.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
          <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <p class="text-[9px] uppercase tracking-widest font-black text-slate-400 mb-2 font-manrope">VỊ TRÍ</p>
            <div class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-lg">work</span>
              <span class="font-black text-[11px] text-slate-700 dark:text-slate-200 leading-tight">{{ selectedAppointment.title }}</span>
            </div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <p class="text-[9px] uppercase tracking-widest font-black text-slate-400 mb-2 font-manrope">THỜI GIAN</p>
            <div class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-lg">calendar_today</span>
              <span class="font-black text-[11px] text-slate-700 dark:text-slate-200 leading-tight" v-html="selectedAppointment.time"></span>
            </div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <p class="text-[9px] uppercase tracking-widest font-black text-slate-400 mb-2 font-manrope">PHƯƠNG THỨC</p>
            <div class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-lg">videocam</span>
              <span class="font-black text-[11px] text-slate-700 dark:text-slate-200 leading-tight">{{ selectedAppointment.location }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-primary text-white font-black py-3.5 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
            <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">event</span>
            Add to Google Calendar
          </button>
          <button class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-black py-3.5 px-8 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
            <span class="material-symbols-outlined text-lg">download</span>
            Download Invite
          </button>
        </div>
      </div>
    </GlobalModal>
  </main>
</template>
