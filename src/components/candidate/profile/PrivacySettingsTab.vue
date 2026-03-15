<template>
  <div class="space-y-6">

    <!-- CV Privacy -->
    <section class="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-6">
        <span class="material-symbols-outlined text-primary">description</span>
        CV Privacy
      </h3>
      <div class="space-y-4">

        <label
          v-for="option in cvPrivacyOptions"
          :key="option.value"
          class="flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all"
          :class="cvPrivacy === option.value
            ? 'border-primary bg-primary/5 dark:bg-primary/10'
            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'"
        >
          <input v-model="cvPrivacy" type="radio" :value="option.value" class="sr-only" />
          <div
            class="mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
            :class="cvPrivacy === option.value ? 'border-primary' : 'border-slate-300 dark:border-slate-600'"
          >
            <div v-if="cvPrivacy === option.value" class="w-2.5 h-2.5 rounded-full bg-primary"></div>
          </div>
          <div>
            <p class="text-sm font-bold text-text-main dark:text-white">{{ option.label }}</p>
            <p class="text-xs text-text-muted mt-0.5">{{ option.desc }}</p>
          </div>
        </label>

      </div>
    </section>

    <!-- Information Visibility -->
    <section class="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-6">
        <span class="material-symbols-outlined text-primary">visibility</span>
        Information Visibility
      </h3>
      <div class="space-y-4">

        <div
          v-for="item in visibilityItems"
          :key="item.key"
          class="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0"
        >
          <div>
            <p class="text-sm font-semibold text-text-main dark:text-white">{{ item.label }}</p>
            <p class="text-xs text-text-muted mt-0.5">{{ item.desc }}</p>
          </div>
          <button
            class="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0"
            :class="item.enabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'"
            @click="item.enabled = !item.enabled"
          >
            <span
              class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
              :class="item.enabled ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>

      </div>
    </section>

    <!-- Account Security -->
    <section class="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-6">
        <span class="material-symbols-outlined text-primary">shield</span>
        Account Security
      </h3>
      <div class="space-y-3">

        <div
          v-for="action in securityActions"
          :key="action.label"
          class="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              :class="action.danger ? 'bg-red-50 dark:bg-red-900/10 text-red-500' : 'bg-primary/10 text-primary'"
            >
              <span class="material-symbols-outlined text-[20px]">{{ action.icon }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold" :class="action.danger ? 'text-red-500' : 'text-text-main dark:text-white'">
                {{ action.label }}
              </p>
              <p class="text-xs text-text-muted mt-0.5">{{ action.desc }}</p>
            </div>
          </div>
          <button
            class="text-sm font-bold px-4 py-2 rounded-xl transition-colors"
            :class="action.danger
              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10'
              : 'text-primary hover:bg-primary/10'"
          >
            {{ action.cta }}
          </button>
        </div>

      </div>
    </section>

    <!-- Save button -->
    <div class="flex justify-end gap-3 pt-2">
      <button
        type="button"
        class="px-6 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-text-muted font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        Hủy
      </button>
      <button
        type="button"
        class="px-6 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-colors"
        @click="saveSettings"
      >
        Lưu thay đổi
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const cvPrivacy = ref<'public' | 'recruiters' | 'private'>('recruiters')

const cvPrivacyOptions = [
  {
    value: 'public',
    label: 'Công khai',
    desc: 'Tất cả mọi người đều có thể xem CV của bạn.',
  },
  {
    value: 'recruiters',
    label: 'Chỉ nhà tuyển dụng',
    desc: 'Chỉ nhà tuyển dụng đã đăng ký mới có thể xem CV.',
  },
  {
    value: 'private',
    label: 'Riêng tư',
    desc: 'CV của bạn sẽ bị ẩn hoàn toàn khỏi tìm kiếm.',
  },
]

const visibilityItems = reactive([
  { key: 'phone',    label: 'Số điện thoại',    desc: 'Hiển thị số điện thoại trên hồ sơ công khai.',       enabled: false },
  { key: 'email',    label: 'Địa chỉ email',     desc: 'Hiển thị email trên hồ sơ công khai.',               enabled: true  },
  { key: 'birthday', label: 'Ngày sinh',          desc: 'Hiển thị ngày sinh trên hồ sơ công khai.',           enabled: false },
  { key: 'salary',   label: 'Mức lương kỳ vọng', desc: 'Hiển thị mức lương mong muốn với nhà tuyển dụng.',   enabled: true  },
])

const securityActions = [
  {
    icon: 'lock',
    label: 'Đổi mật khẩu',
    desc: 'Cập nhật mật khẩu định kỳ để bảo vệ tài khoản.',
    cta: 'Đổi ngay',
    danger: false,
  },
  {
    icon: 'security',
    label: 'Xác thực 2 yếu tố',
    desc: 'Thêm lớp bảo mật bổ sung cho tài khoản của bạn.',
    cta: 'Bật',
    danger: false,
  },
  {
    icon: 'devices',
    label: 'Phiên đăng nhập',
    desc: 'Quản lý các thiết bị đang đăng nhập vào tài khoản.',
    cta: 'Xem',
    danger: false,
  },
  {
    icon: 'delete_forever',
    label: 'Xóa tài khoản',
    desc: 'Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu của bạn.',
    cta: 'Xóa',
    danger: true,
  },
]

function saveSettings() {
  // TODO: gọi API lưu cài đặt privacy
}
</script>