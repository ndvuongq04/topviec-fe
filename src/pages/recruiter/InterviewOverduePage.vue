<template>
  <div class="space-y-8 pt-6">
    <!-- Breadcrumb & Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">
          <router-link to="/recruiter/interviews" class="hover:text-primary transition-colors">Phỏng vấn</router-link>
          <span class="material-symbols-outlined text-[12px]">chevron_right</span>
          <span class="text-primary">Xử lý OVERDUE</span>
        </nav>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Ứng viên quá hạn phản hồi</h2>
        <p class="text-slate-500 mt-1">Quản lý và giải quyết các trường hợp chưa xác nhận lịch phỏng vấn quá 48h.</p>
      </div>
      <div class="flex gap-3">
        <button class="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-lg">download</span>
          Xuất báo cáo
        </button>
        <button class="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">
          <span class="material-symbols-outlined text-lg">mail</span>
          Nhắc nhở tất cả
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-500">
            <span class="material-symbols-outlined">running_with_errors</span>
          </div>
          <span class="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">+12%</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 dark:text-white">24</p>
        <p class="text-sm text-slate-500 font-medium mt-1">Tổng quá hạn</p>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-500">
            <span class="material-symbols-outlined">forward_to_inbox</span>
          </div>
          <span class="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">Chờ</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 dark:text-white">08</p>
        <p class="text-sm text-slate-500 font-medium mt-1">Đã nhắc lần 2</p>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <span class="material-symbols-outlined">hourglass_bottom</span>
          </div>
          <span class="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">Cần xử lý</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 dark:text-white">05</p>
        <p class="text-sm text-slate-500 font-medium mt-1">Sắp tới deadline</p>
      </div>
      <div class="bg-primary p-6 rounded-2xl shadow-lg shadow-primary/20 relative overflow-hidden">
        <div class="relative z-10">
          <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-white">insights</span>
          </div>
          <p class="text-3xl font-extrabold text-white">82%</p>
          <p class="text-sm text-white/80 font-medium mt-1">Tỷ lệ hồi đáp trung bình</p>
        </div>
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full pointer-events-none"></div>
      </div>
    </div>

    <!-- Main Table -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div class="px-6 py-5 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">Danh sách ứng viên Overdue</h3>
        <div class="flex gap-3">
          <select class="text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option>Tất cả vị trí</option>
            <option>Senior Product Designer</option>
            <option>Golang Developer</option>
          </select>
          <select class="text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option>Số lần nhắc</option>
            <option>Lần 1</option>
            <option>Lần 2+</option>
          </select>
        </div>
      </div>

      <table class="w-full text-left">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] uppercase tracking-widest font-bold text-slate-400">
            <th class="px-6 py-4">Ứng viên & Vị trí</th>
            <th class="px-6 py-4">Tình trạng nhắc nhở</th>
            <th class="px-6 py-4">Thời hạn (Deadline)</th>
            <th class="px-6 py-4">Liên hệ</th>
            <th class="px-6 py-4 text-right">Hành động</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
          <tr v-for="candidate in overdueList" :key="candidate.id" class="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
            <td class="px-6 py-5">
              <div class="flex items-center gap-3">
                <div class="relative">
                  <img :src="candidate.avatar" class="w-11 h-11 rounded-full object-cover bg-slate-100" />
                  <div :class="['absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white dark:border-slate-900 rounded-full', candidate.isOverdue ? 'bg-red-500' : 'bg-amber-400']"></div>
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ candidate.name }}</p>
                  <p class="text-xs text-slate-500">{{ candidate.position }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-5">
              <div class="flex items-center gap-2">
                <div class="flex -space-x-1">
                  <span
                    v-for="i in 3" :key="i"
                    :class="['w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border border-white dark:border-slate-900', i <= candidate.remindCount ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-400']"
                  >{{ i }}</span>
                </div>
                <span class="text-xs font-bold text-slate-500">Đã nhắc {{ String(candidate.remindCount).padStart(2, '0') }} lần</span>
              </div>
            </td>
            <td class="px-6 py-5">
              <div class="space-y-1.5">
                <p class="text-sm font-bold" :class="candidate.isOverdue ? 'text-red-500' : 'text-amber-500'">{{ candidate.deadline }}</p>
                <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div :class="['h-full rounded-full transition-all', candidate.isOverdue ? 'bg-red-500' : 'bg-amber-400']" :style="{ width: candidate.progress + '%' }"></div>
                </div>
              </div>
            </td>
            <td class="px-6 py-5">
              <div class="flex gap-2">
                <button class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center cursor-pointer">
                  <span class="material-symbols-outlined text-lg">call</span>
                </button>
                <button class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center cursor-pointer">
                  <span class="material-symbols-outlined text-lg">mail</span>
                </button>
              </div>
            </td>
            <td class="px-6 py-5">
              <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button title="Gia hạn thêm thời gian" class="p-2 text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer">
                  <span class="material-symbols-outlined">more_time</span>
                </button>
                <button title="Đặt lịch hộ ứng viên" class="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-xl transition-all cursor-pointer">
                  <span class="material-symbols-outlined">event_available</span>
                </button>
                <button title="Từ chối ứng viên" class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all cursor-pointer">
                  <span class="material-symbols-outlined">person_remove</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
        <span class="text-xs text-slate-500 font-medium">Hiển thị 1-3 trên tổng số 24 ứng viên</span>
        <div class="flex items-center gap-1">
          <button class="p-1.5 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-400 cursor-not-allowed" disabled>
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button class="w-8 h-8 rounded bg-primary text-white text-xs font-bold cursor-pointer">1</button>
          <button class="w-8 h-8 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs font-medium transition-all cursor-pointer">2</button>
          <button class="w-8 h-8 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs font-medium transition-all cursor-pointer">3</button>
          <button class="p-1.5 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer">
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Info Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- AI Banner -->
      <div class="lg:col-span-2 bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden flex items-center">
        <div class="relative z-10 space-y-4 max-w-md">
          <h3 class="text-2xl font-extrabold leading-tight">Xử lý tự động nhanh chóng</h3>
          <p class="text-white/80 text-sm leading-relaxed">TopViec AI có thể giúp bạn tự động gửi mail nhắc nhở lần cuối hoặc tự động từ chối hồ sơ không phản hồi sau 5 ngày làm việc.</p>
          <button class="bg-white text-primary font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm cursor-pointer">
            Thiết lập tự động hóa
          </button>
        </div>
        <div class="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden pointer-events-none opacity-10">
          <span class="material-symbols-outlined text-[240px] absolute -right-20 -bottom-20 rotate-12">robot_2</span>
        </div>
      </div>

      <!-- Tips Card -->
      <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
        <h4 class="text-base font-bold text-slate-900 dark:text-white">Lưu ý xử lý</h4>
        <ul class="space-y-5">
          <li class="flex gap-3">
            <span class="material-symbols-outlined text-primary mt-0.5">verified</span>
            <div>
              <p class="text-sm font-bold text-slate-900 dark:text-white">Kiểm tra Spam</p>
              <p class="text-xs text-slate-500 leading-relaxed mt-0.5">Nhắc ứng viên kiểm tra thư mục rác nếu chưa nhận được link chọn lịch.</p>
            </div>
          </li>
          <li class="flex gap-3">
            <span class="material-symbols-outlined text-amber-500 mt-0.5">priority_high</span>
            <div>
              <p class="text-sm font-bold text-slate-900 dark:text-white">Gia hạn linh hoạt</p>
              <p class="text-xs text-slate-500 leading-relaxed mt-0.5">Chỉ nên gia hạn tối đa 2 lần cho những ứng viên tiềm năng cao.</p>
            </div>
          </li>
        </ul>
        <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
          <a href="#" class="text-primary text-sm font-bold hover:underline flex items-center gap-1">
            Xem quy trình chuẩn (SOP)
            <span class="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const overdueList = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    position: 'Senior Product Designer',
    avatar: 'https://i.pravatar.cc/150?u=an',
    remindCount: 2,
    deadline: 'Quá hạn 3 ngày',
    isOverdue: true,
    progress: 100
  },
  {
    id: 2,
    name: 'Lê Thị Mai',
    position: 'Creative Director',
    avatar: 'https://i.pravatar.cc/150?u=mai',
    remindCount: 1,
    deadline: 'Còn 12h nữa',
    isOverdue: false,
    progress: 75
  },
  {
    id: 3,
    name: 'Trần Minh Hoàng',
    position: 'Golang Developer',
    avatar: 'https://i.pravatar.cc/150?u=hoang',
    remindCount: 3,
    deadline: 'Quá hạn 1 tuần',
    isOverdue: true,
    progress: 100
  }
]
</script>
