<template>
  <div class="space-y-8 pt-6">
    <!-- Breadcrumb & Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">
          <router-link to="/recruiter/interviews" class="hover:text-primary transition-colors">Phỏng vấn</router-link>
          <span class="material-symbols-outlined text-[12px]">chevron_right</span>
          <span class="text-primary">Đặt lịch thủ công</span>
        </nav>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tạo lịch phỏng vấn mới</h2>
        <p class="text-slate-500 mt-1 text-sm">Chủ động thiết lập thời gian và hình thức phỏng vấn cho ứng viên tiềm năng.</p>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Left Forms -->
      <div class="md:col-span-2 space-y-6">
        <!-- Candidate & Stage Selection -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div class="p-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">person_search</span>
              Thông tin ứng viên & Vòng phỏng vấn
            </h3>
          </div>
          <div class="p-6 space-y-6">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Chọn ứng viên</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <select class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 appearance-none text-slate-700 dark:text-slate-200">
                  <option value="">Tìm kiếm theo tên hoặc email ứng viên...</option>
                  <option value="1">Nguyễn Văn A - Frontend Developer</option>
                  <option value="2">Trần Thị B - Senior UI/UX Designer</option>
                  <option value="3">Lê Hoàng C - Backend Engineer</option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vòng phỏng vấn</label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button class="px-4 py-3 rounded-lg border-2 border-primary bg-primary/10 text-primary font-bold text-sm transition-all cursor-pointer">Vòng 1</button>
                <button class="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-500 hover:border-primary transition-all text-sm font-medium cursor-pointer">Vòng 2</button>
                <button class="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-500 hover:border-primary transition-all text-sm font-medium cursor-pointer">Vòng 3</button>
                <button class="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-500 hover:border-primary transition-all text-sm font-medium cursor-pointer">Final</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Time & Format Selection -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div class="p-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">schedule</span>
              Thời gian & Hình thức
            </h3>
          </div>
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ngày phỏng vấn</label>
                <input class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200" type="date" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Giờ phỏng vấn</label>
                <input class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200" type="time" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hình thức phỏng vấn</label>
              <div class="flex gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
                <button class="px-6 py-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm text-primary font-bold text-sm flex items-center gap-2 cursor-pointer">
                  <span class="material-symbols-outlined text-lg">videocam</span>
                  Online
                </button>
                <button class="px-6 py-2 rounded-lg text-slate-500 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all font-medium text-sm flex items-center gap-2 cursor-pointer">
                  <span class="material-symbols-outlined text-lg">location_on</span>
                  Trực tiếp
                </button>
              </div>
            </div>
            <div id="meeting-link-input">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Link họp trực tuyến (Google Meet/Zoom)</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">link</span>
                <input class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200" placeholder="https://meet.google.com/xxx-xxxx-xxx" type="url" />
              </div>
            </div>
          </div>
        </section>

        <!-- Notes Section -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div class="p-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">description</span>
              Ghi chú gửi ứng viên
            </h3>
          </div>
          <div class="p-6">
            <textarea class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 resize-none text-slate-700 dark:text-slate-200" placeholder="Nhập lời chào hoặc các lưu ý chuẩn bị cho ứng viên trước buổi phỏng vấn..." rows="4"></textarea>
            <div class="mt-4 flex items-center gap-2 text-slate-400 text-xs italic">
              <span class="material-symbols-outlined text-sm">info</span>
              Nội dung này sẽ được hiển thị trực tiếp trong email mời phỏng vấn.
            </div>
          </div>
        </section>
      </div>

      <!-- Right Sidebar Summary -->
      <div class="space-y-6">
        <section class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/10 dark:border-primary/20 overflow-hidden sticky top-24">
          <div class="h-2 bg-primary"></div>
          <div class="p-6">
            <h4 class="font-bold text-lg mb-4 text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-2">Tổng quan lịch hẹn</h4>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">person</span>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Ứng viên</p>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">Chưa chọn ứng viên</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Thời gian</p>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">--/--/---- lúc --:--</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">videocam</span>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 uppercase font-bold">Hình thức</p>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">Phỏng vấn Online</p>
                </div>
              </div>
            </div>
            <hr class="my-6 border-slate-100 dark:border-slate-800" />
            <button class="w-full py-4 bg-primary text-white rounded-xl font-extrabold shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span class="material-symbols-outlined">send</span>
              Xác nhận & Gửi email
            </button>
            <p class="text-[11px] text-center text-slate-400 mt-4 px-4 leading-relaxed">
              Bằng cách nhấn nút, hệ thống sẽ tự động tạo sự kiện lịch và gửi thư mời cho ứng viên.
            </p>
          </div>
        </section>

        <div class="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/10 dark:border-primary/20">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-symbols-outlined text-primary">lightbulb</span>
            <h5 class="font-bold text-primary text-sm uppercase tracking-wider">Gợi ý chuyên gia</h5>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Hãy đính kèm tài liệu yêu cầu hoặc JD vị trí trong phần Ghi chú để ứng viên có sự chuẩn bị tốt nhất cho buổi trao đổi.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Hardcoded content for demonstration.
</script>

<style scoped>
/* Any additional local styles if needed */
</style>
