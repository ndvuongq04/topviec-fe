<template>
  <div class="space-y-8 pt-6">
    <!-- Breadcrumb & Header -->
    <div>
      <div class="flex items-center gap-2 text-slate-400 mb-2">
        <router-link to="/recruiter/interviews" class="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Phỏng vấn</router-link>
        <span class="material-symbols-outlined text-sm">chevron_right</span>
        <span class="text-xs font-bold uppercase tracking-widest text-primary">Đề xuất khung giờ</span>
      </div>
      <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Gửi đề xuất thời gian phỏng vấn</h2>
      <p class="text-slate-500 mt-1">Hệ thống sẽ gửi email cho ứng viên để họ tự chọn khung giờ phù hợp nhất.</p>
    </div>

    <div class="grid grid-cols-12 gap-8">
      <!-- Main Form -->
      <div class="col-span-12 lg:col-span-8 space-y-6">
        <!-- Candidate & Round Selection -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-lg">person_search</span>
            Thông tin ứng viên & Vòng phỏng vấn
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest">Chọn ứng viên</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <select class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 appearance-none font-medium">
                  <option value="">Tìm kiếm ứng viên...</option>
                  <option>Nguyễn Văn A - Frontend Developer</option>
                  <option>Trần Thị B - Senior UI/UX Designer</option>
                  <option>Lê Hoàng C - Backend Engineer</option>
                </select>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest">Vòng phỏng vấn</label>
              <select class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 font-medium">
                <option>Vòng 1 (Sàng lọc)</option>
                <option>Vòng 2 (Technical Interview)</option>
                <option>Vòng 3 (Management)</option>
                <option>Final Round</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Time Slots -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-lg">schedule</span>
              Các khung giờ đề xuất (3-5 slots)
            </h3>
            <button @click="addSlot" class="text-primary text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer">
              <span class="material-symbols-outlined text-sm">add_circle</span>
              Thêm khung giờ
            </button>
          </div>

          <div class="space-y-3">
            <div v-for="(slot, index) in slots" :key="index" class="flex flex-wrap md:flex-nowrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl group">
              <div class="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-primary shadow-sm border border-primary/10">
                {{ index + 1 }}
              </div>
              <div class="flex-grow grid grid-cols-2 gap-3">
                <input type="date" v-model="slot.date" class="bg-white dark:bg-slate-800 border-none rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-primary/20 font-medium" />
                <div class="flex items-center gap-2">
                  <input type="time" v-model="slot.startTime" class="bg-white dark:bg-slate-800 border-none rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-primary/20 font-medium w-full" />
                  <span class="text-slate-400 text-xs">đến</span>
                  <input type="time" v-model="slot.endTime" class="bg-white dark:bg-slate-800 border-none rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-primary/20 font-medium w-full" />
                </div>
              </div>
              <button 
                @click="removeSlot(index)" 
                v-if="slots.length > 1"
                class="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <span class="material-symbols-outlined text-xl">delete</span>
              </button>
            </div>
            
            <div v-if="slots.length === 0" class="text-center py-8 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
              <p class="text-slate-400 text-sm">Chưa có khung giờ nào. Hãy thêm tối thiểu 3 khung giờ.</p>
            </div>
          </div>
          
          <div class="mt-6 flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
            <span class="material-symbols-outlined text-primary text-xl">lightbulb</span>
            <p class="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
              <strong>Mẹo:</strong> Hãy đề xuất các khung giờ cách nhau và trải dài trong ít nhất 2-3 ngày để tăng khả năng ứng viên chốt lịch nhanh chóng.
            </p>
          </div>
        </section>

        <!-- Form Actions -->
        <div class="flex items-center justify-end gap-3">
          <button class="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
            Lưu bản nháp
          </button>
          <button class="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined text-lg">send</span>
            Gửi email đề xuất
          </button>
        </div>
      </div>

      <!-- Preview Sidebar -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <section class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Xem trước email</h4>
          <div class="space-y-4 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-100 dark:border-slate-800">
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Tiêu đề email</p>
              <p class="text-xs font-bold text-slate-700 dark:text-slate-300">Mời phỏng vấn vị trí Senior Frontend Developer - TopViec</p>
            </div>
            <div class="p-6 text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
              <p>Chào bạn,</p>
              <p>Chúc mừng bạn đã vượt qua vòng hồ sơ. Chúng tôi muốn mời bạn tham gia buổi phỏng vấn tiếp theo.</p>
              <p>Vui lòng click vào link bên dưới để chọn một khung giờ phù hợp nhất với bạn:</p>
              <div class="py-2 space-y-1">
                <div v-for="(slot, i) in slots" :key="i" class="p-2 border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg text-primary font-bold text-[10px]">
                  {{ slot.date || '--/--/----' }} | {{ slot.startTime || '--:--' }} - {{ slot.endTime || '--:--' }}
                </div>
              </div>
              <p>Sau khi chọn, hệ thống sẽ tự động gửi email xác nhận lịch hẹn chính thức.</p>
              <p>Trân trọng,<br/><strong>Đội ngũ tuyển dụng TopViec</strong></p>
            </div>
          </div>
          <div class="mt-6 flex items-center gap-2 text-[10px] text-slate-400 italic">
            <span class="material-symbols-outlined text-sm">lock</span>
            Link UV nhận được là link duy nhất, định danh qua token JWT.
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const slots = ref([
  { date: '2026-03-27', startTime: '09:00', endTime: '10:00' },
  { date: '2026-03-27', startTime: '14:00', endTime: '15:00' },
  { date: '2026-03-28', startTime: '10:30', endTime: '11:30' },
])

const addSlot = () => {
  if (slots.value.length < 5) {
    slots.value.push({ date: '', startTime: '', endTime: '' })
  }
}

const removeSlot = (index: number) => {
  slots.value.splice(index, 1)
}
</script>

<style scoped>
/* No specific styles needed for now */
</style>
