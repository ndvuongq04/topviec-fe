<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const jobId = route.params.id as string
const applicationId = route.params.applicationId as string

// Hardcoded data based on mock-up
const candidate = {
  fullName: 'NGUYỄN MINH TUẤN',
  title: 'Senior Frontend Developer',
  email: 'tuan.nguyen@email.com',
  phone: '090 123 4567',
  address: 'Quận 7, TP. HCM',
  experience: [
    {
      company: 'Global Tech Solutions',
      duration: '2020 - Hiện tại',
      description: 'Chịu trách nhiệm phát triển giao diện người dùng cho các sản phẩm Fintech...',
    },
    {
      company: 'Startup Visionary',
      duration: '2018 - 2020',
      description: 'Phát triển MVP và tối ưu hóa hiệu suất trang web thương mại điện tử...',
    },
  ],
  skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js'],
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhgiM2fHNwNECX9THtUm3X8cOp7ubarcG94ZLGwvoOK5jjBvLiHXTN30TEKePzBI0j9kj4znVIUwNCAnLDJrHSNm52bCs6XDS9cpUOxKmQ2xJVkGMlgtB5PFvuSMvZ7CCDTASPOpGPZanBcDatOMFo-0HmcStLN6bDgBkc5FLv4a9gjt6pdrHePMTdKTkfVRKHjiyEpbTx89wqwuOod06oP5IyVb1PxoZT92Dk0-R4wQnx0ahk9zhxZ-RHCbKUD5xrSj8-s3OXVg',
}

const interactionHistory = [
  { text: 'Đã ứng tuyển vào vị trí Frontend Dev', time: '10:45 AM - 20/10/2023', color: 'bg-emerald-500' },
  { text: 'Admin đã xem hồ sơ', time: '02:15 PM - 20/10/2023', color: 'bg-slate-300' },
]
</script>

<template>
  <div class="flex-1 flex flex-col overflow-hidden h-full">
    <!-- Candidate Detail Top Actions -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-2 text-sm">
        <button @click="router.back()" class="text-slate-500 hover:text-primary transition-colors cursor-pointer">Ứng viên</button>
        <span class="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
        <span class="font-bold text-primary">{{ candidate.fullName }}</span>
      </div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-all cursor-pointer">
          <span class="material-symbols-outlined text-lg">download</span>
          Tải CV
        </button>
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-all cursor-pointer">
          <span class="material-symbols-outlined text-lg">print</span>
          In
        </button>
      </div>
    </div>

    <!-- Main Content Area: Split View -->
    <div class="flex-1 overflow-hidden flex flex-col md:flex-row gap-6">
      <!-- Left Panel: CV Preview -->
      <section class="flex-1 flex flex-col h-full bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden relative group">
        <!-- Fullscreen overlay simulation -->
        <div class="absolute inset-0 bg-white/40 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-[1px]">
          <button class="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <span class="material-symbols-outlined">fullscreen</span>
            Xem toàn màn hình
          </button>
        </div>

        <!-- Scrollable CV Container -->
        <div class="flex-1 overflow-y-auto p-8 flex justify-center">
          <!-- CV Document Simulation -->
          <div class="w-full max-w-[800px] bg-white dark:bg-white shadow-2xl p-10 flex flex-col gap-8 rounded-sm text-slate-900 min-h-[1100px]">
            <!-- CV Header -->
            <div class="flex justify-between items-start">
              <div class="space-y-2">
                <h2 class="text-4xl font-extrabold text-slate-900 leading-tight">{{ candidate.fullName }}</h2>
                <p class="text-primary font-bold text-xl uppercase tracking-wider">{{ candidate.title }}</p>
              </div>
              <div class="w-32 h-32 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                <img :src="candidate.avatar" class="w-full h-full object-cover" alt="Candidate Avatar" />
              </div>
            </div>

            <!-- CV Body Grid -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 mt-4">
              <!-- Left Col -->
              <div class="md:col-span-5 space-y-8">
                <div>
                  <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Thông tin liên hệ</h3>
                  <ul class="text-sm space-y-3 text-slate-600">
                    <li class="flex items-center gap-3">
                      <span class="material-symbols-outlined text-primary text-lg">mail</span>
                      {{ candidate.email }}
                    </li>
                    <li class="flex items-center gap-3">
                      <span class="material-symbols-outlined text-primary text-lg">call</span>
                      {{ candidate.phone }}
                    </li>
                    <li class="flex items-center gap-3">
                      <span class="material-symbols-outlined text-primary text-lg">location_on</span>
                      {{ candidate.address }}
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Kỹ năng</h3>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in candidate.skills" :key="skill" class="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs rounded font-bold">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Right Col -->
              <div class="md:col-span-7 space-y-8">
                <div>
                  <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Kinh nghiệm làm việc</h3>
                  <div class="space-y-6">
                    <div v-for="exp in candidate.experience" :key="exp.company" class="relative pl-4 border-l-2 border-slate-100">
                      <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary"></div>
                      <p class="text-base font-bold text-slate-800">{{ exp.company }}</p>
                      <p class="text-xs text-slate-500 italic font-medium mb-1">{{ exp.duration }}</p>
                      <p class="text-xs text-slate-600 leading-relaxed">{{ exp.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Panel: Evaluation sidebar -->
      <section class="w-full md:w-[400px] flex flex-col gap-6 overflow-y-auto pr-1">
        <!-- Evaluation Card -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div class="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">assignment_turned_in</span>
              Phân loại & Đánh giá
            </h2>
          </div>
          
          <div class="p-6 space-y-8">
            <!-- Status Options -->
            <div class="space-y-3">
              <label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Trạng thái sàng lọc</label>
              <div class="grid grid-cols-1 gap-2">
                <label class="flex items-center gap-3 p-3 rounded-xl border-2 border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-900/10 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <input type="radio" name="status" checked class="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300" />
                  <span class="text-sm font-bold text-emerald-700 dark:text-emerald-400">Phù hợp</span>
                  <span class="material-symbols-outlined ml-auto text-emerald-500">check_circle</span>
                </label>
                <label class="flex items-center gap-3 p-3 rounded-xl border-2 border-amber-100 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-900/10 cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                  <input type="radio" name="status" class="w-4 h-4 text-amber-600 focus:ring-amber-500 border-slate-300" />
                  <span class="text-sm font-bold text-amber-700 dark:text-amber-400">Cân nhắc</span>
                  <span class="material-symbols-outlined ml-auto text-amber-500">help</span>
                </label>
                <label class="flex items-center gap-3 p-3 rounded-xl border-2 border-rose-100 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-900/10 cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                  <input type="radio" name="status" class="w-4 h-4 text-rose-600 focus:ring-rose-500 border-slate-300" />
                  <span class="text-sm font-bold text-rose-700 dark:text-rose-400">Từ chối</span>
                  <span class="material-symbols-outlined ml-auto text-rose-500">cancel</span>
                </label>
              </div>
            </div>

            <!-- Specialist Rating -->
            <div class="space-y-3">
              <label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Đánh giá chuyên môn</label>
              <div class="flex gap-2">
                <button v-for="i in 5" :key="i" class="transition-transform hover:scale-110 cursor-pointer">
                  <span class="material-symbols-outlined text-3xl" :class="i <= 4 ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'" 
                        :style="{ fontVariationSettings: i <= 4 ? `'FILL' 1` : `'FILL' 0` }">
                    star
                  </span>
                </button>
              </div>
            </div>

            <!-- Tags -->
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Nhãn (Tags)</label>
                <button class="text-xs text-primary font-bold hover:underline cursor-pointer">+ Thêm mới</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="group flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">
                  Kinh nghiệm tốt
                  <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100">close</span>
                </span>
                <span class="group flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">
                  Tiếng Anh lưu loát
                  <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100">close</span>
                </span>
                <span class="group flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-xs font-bold rounded-full border border-primary/20 hover:bg-blue-100 transition-colors cursor-pointer">
                  Ưu tiên phỏng vấn
                  <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100">close</span>
                </span>
              </div>
            </div>

            <!-- Notes -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Ghi chú nội bộ</label>
                <span class="text-[10px] text-slate-400 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">visibility_off</span> Chỉ tuyển dụng thấy
                </span>
              </div>
              <textarea class="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:text-slate-200 p-4 outline-none" placeholder="Nhập nhận xét về ứng viên này..." rows="4"></textarea>
            </div>
          </div>

          <!-- Sticky Footer Actions -->
          <div class="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            <button class="w-full bg-primary text-white py-3 rounded-xl font-extrabold text-sm shadow-lg shadow-primary/20 hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span class="material-symbols-outlined">save</span>
              Lưu Đánh Giá
            </button>

          </div>
        </div>

        <!-- History sidebar -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
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
    </div>
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
