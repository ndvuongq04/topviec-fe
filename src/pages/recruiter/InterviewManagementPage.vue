<template>
  <div class="space-y-8 pt-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Quản lý lịch phỏng vấn</h2>
        <p class="text-slate-500 mt-1 text-sm font-medium">Theo dõi và quản lý toàn bộ các buổi phỏng vấn trong hệ thống.</p>
      </div>
      <div class="flex gap-3">
        <router-link
          to="/recruiter/interviews/overdue"
          class="px-5 py-2.5 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined">running_with_errors</span>
          Xử lý OVERDUE
        </router-link>
        <router-link
          to="/recruiter/interviews/propose"
          class="px-5 py-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary font-bold text-sm hover:bg-primary/10 transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined">mail_outline</span>
          Gửi đề xuất khung giờ (Cách 2)
        </router-link>
        <router-link
          to="/recruiter/interviews/create"
          class="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-lg">add_circle</span>
          Đặt lịch thủ công (Cách 1)
        </router-link>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-4">
          <div :class="`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 transition-colors`">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ stat.label }}</p>
            <p class="text-2xl font-black text-slate-900 dark:text-white">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4">
      <div class="flex-grow min-w-[280px] relative">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input 
          type="text" 
          placeholder="Tìm tên ứng viên, vị trí tuyển dụng..." 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <div class="flex items-center gap-2">
        <select class="bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/20 font-medium">
          <option>Tất cả các vòng</option>
          <option>Vòng 1 (Sàng lọc)</option>
          <option>Vòng 2 (Technical)</option>
          <option>Vòng Final (Culture)</option>
        </select>
        <select class="bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/20 font-medium">
          <option>Tất cả trạng thái</option>
          <option>Đã xác nhận</option>
          <option>Chờ xác nhận</option>
          <option>Quá hạn</option>
          <option>Đã xong</option>
        </select>
        <button class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-500 cursor-pointer">
          <span class="material-symbols-outlined">filter_list</span>
        </button>
      </div>
    </div>

    <!-- Interviews List -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-slate-50 dark:border-slate-800">
              <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Ứng viên</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tin tuyển dụng</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Vòng PV</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Thời gian</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Hình thức</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Trạng thái</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50 text-sm">
            <tr v-for="interview in interviews" :key="interview.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-5">
                <div class="flex items-center gap-3">
                  <img :src="interview.candidateAvatar" class="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-slate-700" />
                  <div>
                    <p class="font-bold text-slate-900 dark:text-white">{{ interview.candidateName }}</p>
                    <p class="text-xs text-slate-500">{{ interview.candidateEmail }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5">
                <p class="font-medium text-slate-700 dark:text-slate-300 max-w-[200px] truncate">{{ interview.jobTitle }}</p>
                <p class="text-[10px] font-bold text-slate-400 tracking-wider">#{{ interview.jobCode }}</p>
              </td>
              <td class="px-6 py-5">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wide">
                  {{ interview.round }}
                </span>
              </td>
              <td class="px-6 py-5">
                <p class="font-bold text-slate-900 dark:text-white">{{ interview.date }}</p>
                <p class="text-xs text-slate-500">{{ interview.time }}</p>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-slate-400 text-lg">{{ interview.isOnline ? 'videocam' : 'location_on' }}</span>
                  <span class="text-slate-600 dark:text-slate-400 font-medium">{{ interview.isOnline ? 'Online' : 'Trực tiếp' }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <span :class="getStatusClasses(interview.status)">
                  {{ interview.statusText }}
                </span>
              </td>
              <td class="px-6 py-5">
                <div class="flex justify-center gap-2">
                  <router-link
                    v-if="interview.status === 'confirmed'"
                    :to="`/recruiter/interviews/${interview.id}/evaluate`"
                    class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                    title="Ghi nhận kết quả"
                  >
                    <span class="material-symbols-outlined text-xl">assignment_turned_in</span>
                  </router-link>
                  <button v-else-if="interview.status === 'overdue'" class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer" title="Xử lý quá hạn">
                    <span class="material-symbols-outlined text-xl">warning</span>
                  </button>
                  <button class="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-xl">more_vert</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
        <span class="text-xs text-slate-500 font-medium">
          Hiển thị 1-5 trên tổng số 24 lịch hẹn
        </span>
    
        <div class="flex items-center gap-1">
          <!-- Prev -->
          <button
            class="p-1.5 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-400 cursor-not-allowed text-xs cursor-pointer"
            disabled
          >
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
    
          <!-- Page numbers -->
          <button class="w-8 h-8 rounded bg-primary text-white text-xs font-bold shadow-sm shadow-primary/20 cursor-pointer">1</button>
          <button class="w-8 h-8 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs font-medium transition-all cursor-pointer">2</button>
          <button class="w-8 h-8 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs font-medium transition-all cursor-pointer">3</button>
    
          <!-- Next -->
          <button
            class="p-1.5 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs cursor-pointer"
          >
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stats = [
  { label: 'Hôm nay', value: '4', icon: 'calendar_today', color: 'blue' },
  { label: 'Đã xác nhận', value: '12', icon: 'check_circle', color: 'emerald' },
  { label: 'Chờ phản hồi', value: '5', icon: 'hourglass_empty', color: 'amber' },
  { label: 'Cần xử lý quá hạn', value: '3', icon: 'error_outline', color: 'red' },
]

const interviews = ref([
  {
    id: 1,
    candidateName: 'Nguyễn Văn A',
    candidateEmail: 'vana@example.com',
    candidateAvatar: 'https://i.pravatar.cc/150?u=12',
    jobTitle: 'Senior Frontend Developer (ReactJS)',
    jobCode: 'FE-2024-001',
    round: 'Vòng 2 (Technical)',
    date: '27/03/2026',
    time: '09:30 - 10:30',
    isOnline: true,
    status: 'confirmed',
    statusText: 'Đã xác nhận'
  },
  {
    id: 2,
    candidateName: 'Trần Thị B',
    candidateEmail: 'thib@example.com',
    candidateAvatar: 'https://i.pravatar.cc/150?u=15',
    jobTitle: 'Senior UI/UX Designer',
    jobCode: 'UI-2024-099',
    round: 'Vòng 1 (Interview)',
    date: '--/--/----',
    time: 'Đang đợi UV chọn...',
    isOnline: true,
    status: 'pending',
    statusText: 'Chờ xác nhận'
  },
  {
    id: 3,
    candidateName: 'Lê Hoàng C',
    candidateEmail: 'hoangc@dev.com',
    candidateAvatar: 'https://i.pravatar.cc/150?u=18',
    jobTitle: 'Backend Engineer (NodeJS)',
    jobCode: 'BE-2024-042',
    round: 'Final Round',
    date: '25/03/2026',
    time: '14:00 - 15:30',
    isOnline: false,
    status: 'overdue',
    statusText: 'Quá hạn'
  },
  {
    id: 4,
    candidateName: 'Phạm Minh D',
    candidateEmail: 'minhd@talent.io',
    candidateAvatar: 'https://i.pravatar.cc/150?u=22',
    jobTitle: 'Senior Frontend Developer (ReactJS)',
    jobCode: 'FE-2024-001',
    round: 'Vòng 3 (Management)',
    date: '28/03/2026',
    time: '11:00 - 12:00',
    isOnline: true,
    status: 'pending',
    statusText: 'Chờ xác nhận'
  },
  {
    id: 5,
    candidateName: 'Hoàng Anh E',
    candidateEmail: 'anhe@it.com',
    candidateAvatar: 'https://i.pravatar.cc/150?u=30',
    jobTitle: 'Fullstack Developer',
    jobCode: 'FS-2024-012',
    round: 'Vòng 2 (Technical)',
    date: '24/03/2026',
    time: '10:00 - 11:30',
    isOnline: false,
    status: 'completed',
    statusText: 'Đã hoàn thành'
  }
])

const getStatusClasses = (status: string) => {
  const base = 'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border'
  switch (status) {
    case 'confirmed':
      return `${base} bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50`
    case 'pending':
      return `${base} bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50`
    case 'overdue':
      return `${base} bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50`
    case 'completed':
      return `${base} bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50`
    default:
      return `${base} bg-slate-50 text-slate-600 border-slate-100`
  }
}
</script>

<style scoped>
.font-black { font-weight: 950; }
</style>
