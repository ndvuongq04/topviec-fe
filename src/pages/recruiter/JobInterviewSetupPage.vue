<template>
  <div class="space-y-8 pt-6">
    <!-- Page Header & Breadcrumb -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">
          <router-link to="/recruiter/jobs" class="hover:text-primary transition-colors">Tin tuyển dụng</router-link>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-primary">Thiết lập vòng phỏng vấn</span>
        </nav>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Senior Frontend Developer</h2>
        <div class="flex items-center gap-3 mt-2">
          <span class="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">Job ID: #FE-2024-001</span>
          <span class="text-slate-500 text-sm flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">group</span> 12 Ứng viên đang chờ
          </span>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer">
          <span class="material-symbols-outlined">save</span>
          Lưu bản nháp
        </button>
        <button class="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
          <span class="material-symbols-outlined">rocket_launch</span>
          Xác nhận & Bắt đầu phỏng vấn
        </button>
      </div>
    </div>

    <!-- Dashboard Layout -->
    <div class="grid grid-cols-12 gap-8">
      <!-- Interview Stages Management Section (Main Content) -->
      <div class="col-span-12 lg:col-span-8 space-y-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">format_list_numbered</span>
            Các vòng phỏng vấn (4)
          </h3>
          <button class="text-primary text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer">
            <span class="material-symbols-outlined text-sm">add_circle</span>
            Thêm vòng mới
          </button>
        </div>

        <!-- Stage Cards -->
        <div class="space-y-4">
          <!-- Stage 1 -->
          <div class="group relative bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/20 hover:shadow-md transition-all">
            <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
              <span class="material-symbols-outlined text-slate-400">drag_indicator</span>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-extrabold text-primary text-xl border border-primary/10">1</div>
              <div class="flex-grow">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="text-base font-bold text-slate-900 dark:text-white">Sàng lọc CV (Initial Screening)</h4>
                    <p class="text-sm text-slate-500 mt-1">Đánh giá độ phù hợp của kỹ năng, kinh nghiệm và dự án thực tế so với yêu cầu.</p>
                  </div>
                  <div class="flex gap-1">
                    <button class="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"><span class="material-symbols-outlined text-sm">edit</span></button>
                    <button class="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"><span class="material-symbols-outlined text-sm">delete</span></button>
                  </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-4 items-center border-t border-slate-50 dark:border-slate-800/50 pt-4">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-slate-400 text-sm">person</span>
                    <span class="text-xs font-semibold text-slate-500">Phụ trách: </span>
                    <div class="flex -space-x-2">
                      <img class="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm" src="https://i.pravatar.cc/150?u=1" />
                      <div class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-900 text-[8px] font-bold text-slate-500">+1</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-slate-400 text-sm">timer</span>
                    <span class="text-xs text-slate-500 font-medium">Dự kiến: 15-20 phút</span>
                  </div>
                  <div class="ml-auto">
                    <span class="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-emerald-100 dark:border-emerald-800/50">Tự động hóa hồ sơ mới</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Stage 2 -->
          <div class="group relative bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/20 hover:shadow-md transition-all">
            <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
              <span class="material-symbols-outlined text-slate-400">drag_indicator</span>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-extrabold text-primary text-xl border border-primary/10">2</div>
              <div class="flex-grow">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="text-base font-bold text-slate-900 dark:text-white">Bài test Kỹ năng (Frontend Coding Challenge)</h4>
                    <p class="text-sm text-slate-500 mt-1">Lập trình ReactJS thực tế, tối ưu hóa hiệu năng và xử lý state management phức tạp.</p>
                  </div>
                  <div class="flex gap-1">
                    <button class="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"><span class="material-symbols-outlined text-sm">edit</span></button>
                    <button class="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"><span class="material-symbols-outlined text-sm">delete</span></button>
                  </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-4 items-center border-t border-slate-50 dark:border-slate-800/50 pt-4">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-slate-400 text-sm">person</span>
                    <span class="text-xs font-semibold text-slate-500">Phụ trách: </span>
                    <div class="flex -space-x-2">
                      <img class="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm" src="https://i.pravatar.cc/150?u=2" />
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-slate-400 text-sm">link</span>
                    <span class="text-xs text-slate-500 font-medium">HackerRank / GitHub Repo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Stage 3 -->
          <div class="group relative bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/20 hover:shadow-md transition-all">
            <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
              <span class="material-symbols-outlined text-slate-400">drag_indicator</span>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-extrabold text-primary text-xl border border-primary/10">3</div>
              <div class="flex-grow">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="text-base font-bold text-slate-900 dark:text-white">Phỏng vấn chuyên môn (Technical Interview)</h4>
                    <p class="text-sm text-slate-500 mt-1">Hệ thống hóa kiến thức, kiến trúc frontend, quy trình CI/CD và Unit Testing.</p>
                  </div>
                  <div class="flex gap-1">
                    <button class="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"><span class="material-symbols-outlined text-sm">edit</span></button>
                    <button class="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"><span class="material-symbols-outlined text-sm">delete</span></button>
                  </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-4 items-center border-t border-slate-50 dark:border-slate-800/50 pt-4">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-slate-400 text-sm">person</span>
                    <span class="text-xs font-semibold text-slate-500">Người phỏng vấn: </span>
                    <div class="flex -space-x-2">
                      <img class="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm" src="https://i.pravatar.cc/150?u=3" />
                      <img class="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm" src="https://i.pravatar.cc/150?u=4" />
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-slate-400 text-sm">video_call</span>
                    <span class="text-xs text-slate-500 font-medium">Google Meet / Zoom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Stage 4 -->
          <div class="group relative bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/20 hover:shadow-md transition-all">
            <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
              <span class="material-symbols-outlined text-slate-400">drag_indicator</span>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-extrabold text-primary text-xl border border-primary/10">4</div>
              <div class="flex-grow">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="text-base font-bold text-slate-900 dark:text-white">Phỏng vấn Văn hóa & Fit (Culture Fit)</h4>
                    <p class="text-sm text-slate-500 mt-1">Đánh giá tư duy làm việc nhóm, tinh thần học hỏi và sự phù hợp với giá trị cốt lõi của công ty.</p>
                  </div>
                  <div class="flex gap-1">
                    <button class="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"><span class="material-symbols-outlined text-sm">edit</span></button>
                    <button class="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"><span class="material-symbols-outlined text-sm">delete</span></button>
                  </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-4 items-center border-t border-slate-50 dark:border-slate-800/50 pt-4">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-slate-400 text-sm">person</span>
                    <span class="text-xs font-semibold text-slate-500">Người phỏng vấn: </span>
                    <div class="flex -space-x-2">
                      <img class="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm" src="https://i.pravatar.cc/150?u=5" />
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-slate-400 text-sm">location_on</span>
                    <span class="text-xs text-slate-500 font-medium">Văn phòng chính (Trực tiếp)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State Add Zone -->
        <button class="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 py-6 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 transition-all bg-white/50 dark:bg-slate-900/50 cursor-pointer">
          <span class="material-symbols-outlined text-3xl mb-1">add_circle</span>
          <span class="text-sm font-bold uppercase tracking-widest">Kéo thả để thêm vòng phỏng vấn mới</span>
        </button>
      </div>

      <!-- Configuration & Stats Sidebar -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <!-- Quick Settings Card -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h4 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Cấu hình nhanh</h4>
          <div class="space-y-4">
            <label class="flex items-center justify-between group cursor-pointer">
              <div>
                <p class="text-sm font-bold text-slate-900 dark:text-white">Tự động gửi mail</p>
                <p class="text-xs text-slate-500">Khi ứng viên qua vòng</p>
              </div>
              <div class="w-10 h-5 bg-primary/20 rounded-full relative transition-all">
                <div class="absolute right-0.5 top-0.5 w-4 h-4 bg-primary rounded-full"></div>
              </div>
            </label>
            <label class="flex items-center justify-between group cursor-pointer opacity-50">
              <div>
                <p class="text-sm font-bold text-slate-900 dark:text-white">Cho phép Re-test</p>
                <p class="text-xs text-slate-500">Tối đa 1 lần</p>
              </div>
              <div class="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full relative transition-all">
                <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white dark:bg-slate-600 rounded-full"></div>
              </div>
            </label>
            <label class="flex items-center justify-between group cursor-pointer">
              <div>
                <p class="text-sm font-bold text-slate-900 dark:text-white">Chấm điểm đồng bộ</p>
                <p class="text-xs text-slate-500">Yêu cầu từ 2 đánh giá</p>
              </div>
              <div class="w-10 h-5 bg-primary/20 rounded-full relative transition-all">
                <div class="absolute right-0.5 top-0.5 w-4 h-4 bg-primary rounded-full"></div>
              </div>
            </label>
          </div>
          <div class="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800/50">
            <h5 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Mẫu quy trình</h5>
            <div class="grid grid-cols-2 gap-2">
              <button class="px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-[10px] font-bold text-primary border border-primary/20 cursor-pointer">Frontend Standard</button>
              <button class="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-500 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer">Management</button>
            </div>
          </div>
        </div>

        <!-- Stats/Tips Card -->
        <div class="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
          <div class="relative z-10">
            <h4 class="text-base font-bold mb-2">Lời khuyên của TopViec</h4>
            <p class="text-xs opacity-90 leading-relaxed mb-4">Quy trình phỏng vấn Senior lý tưởng thường kéo dài 4 vòng trong 14 ngày để đảm bảo trải nghiệm tốt nhất cho ứng viên.</p>
            <div class="flex items-end justify-between">
              <div>
                <p class="text-[10px] uppercase font-bold tracking-widest opacity-80">Thời gian TB</p>
                <p class="text-2xl font-extrabold">12 Ngày</p>
              </div>
              <span class="material-symbols-outlined text-4xl opacity-30">tips_and_updates</span>
            </div>
          </div>
          <!-- Decorative patterns -->
          <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div class="absolute right-10 top-2 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
        </div>

        <!-- History Log Card -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h4 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Hoạt động gần đây</h4>
          <div class="space-y-4">
            <div class="flex gap-3">
              <div class="w-1 h-8 bg-blue-100 dark:bg-blue-900 rounded-full mt-1"></div>
              <div>
                <p class="text-[11px] font-bold text-slate-900 dark:text-white">Bạn đã cập nhật vòng 3</p>
                <p class="text-[10px] text-slate-500">10 phút trước</p>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="w-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-full mt-1"></div>
              <div>
                <p class="text-[11px] font-bold text-slate-900 dark:text-white">Thêm HR vào vòng 1</p>
                <p class="text-[10px] text-slate-500">2 giờ trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Feedback (Toast-like) -->
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-slow">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">info</span>
      <span class="text-sm font-medium">Kéo thả các thẻ để thay đổi thứ tự ưu tiên của vòng phỏng vấn.</span>
      <button class="text-xs font-bold uppercase tracking-widest text-primary ml-4 cursor-pointer">Đã hiểu</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Hardcoded for now as requested.
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

.font-manrope { font-family: 'Manrope', sans-serif; }
</style>
