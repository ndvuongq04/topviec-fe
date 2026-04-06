<template>
  <footer class="bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Brand Info -->
        <div class="space-y-6">
          <router-link to="/" class="flex items-center gap-2 text-primary">
            <span class="material-symbols-outlined text-3xl">work_history</span>
            <h2 class="text-text-main dark:text-white text-2xl font-bold tracking-tight">TopViec</h2>
          </router-link>
          <p class="text-text-secondary text-sm leading-relaxed max-w-xs">
            Nền tảng kết nối ứng viên tài năng với những cơ hội nghề nghiệp tốt nhất. Chúng tôi giúp bạn xây dựng sự nghiệp mơ ước.
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
              <span class="material-symbols-outlined text-xl">facebook</span>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
              <span class="material-symbols-outlined text-xl">alternate_email</span>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
              <span class="material-symbols-outlined text-xl">language</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-bold text-text-main dark:text-white mb-6 uppercase tracking-wider text-xs">Dành cho ứng viên</h3>
          <ul class="space-y-4">
            <li><router-link to="/" class="text-text-secondary hover:text-primary text-sm transition-colors">Tìm việc làm</router-link></li>
            <li><router-link to="/applied-jobs" class="text-text-secondary hover:text-primary text-sm transition-colors">Việc làm đã ứng tuyển</router-link></li>
            <li><router-link to="/saved-jobs" class="text-text-secondary hover:text-primary text-sm transition-colors">Việc làm đã lưu</router-link></li>
            <li><router-link to="/interviews" class="text-text-secondary hover:text-primary text-sm transition-colors">Lịch phỏng vấn</router-link></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="font-bold text-text-main dark:text-white mb-6 uppercase tracking-wider text-xs">Hỗ trợ</h3>
          <ul class="space-y-4">
            <li><a href="#" class="text-text-secondary hover:text-primary text-sm transition-colors">Trung tâm trợ giúp</a></li>
            <li><a href="#" class="text-text-secondary hover:text-primary text-sm transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" class="text-text-secondary hover:text-primary text-sm transition-colors">Điều khoản dịch vụ</a></li>
            <li><a href="#" class="text-text-secondary hover:text-primary text-sm transition-colors">Câu hỏi thường gặp</a></li>
          </ul>
        </div>

        <!-- Download App -->
        <div class="space-y-6">
          <h3 class="font-bold text-text-main dark:text-white uppercase tracking-wider text-xs">Tải ứng dụng</h3>
          <div class="flex flex-col gap-3">
            <a href="#" class="flex items-center gap-3 px-4 py-2 bg-slate-900 rounded-lg text-white hover:bg-slate-800 transition-colors border border-slate-700">
              <span class="material-symbols-outlined text-2xl">phone_iphone</span>
              <div>
                <p class="text-[10px] opacity-70 uppercase leading-none">Download on</p>
                <p class="font-bold text-sm">App Store</p>
              </div>
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-2 bg-slate-900 rounded-lg text-white hover:bg-slate-800 transition-colors border border-slate-700">
              <span class="material-symbols-outlined text-2xl">play_store</span>
              <div>
                <p class="text-[10px] opacity-70 uppercase leading-none">Get it on</p>
                <p class="font-bold text-sm">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-text-muted text-xs">
          © {{ new Date().getFullYear() }} TopViec. All rights reserved.
        </p>
        <div class="flex items-center gap-6">
          <p class="text-text-muted text-xs">Made with <span class="text-red-500 text-[10px]">❤️</span> for candidates</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No logic needed for now
</script>
