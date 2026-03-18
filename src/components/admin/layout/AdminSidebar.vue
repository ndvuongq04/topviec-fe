<template>
  <aside class="w-72 bg-[#963131] text-white flex flex-col fixed h-full shadow-xl z-50">

    <!-- Logo -->
    <div class="p-6 flex items-center gap-3">
      <div class="bg-white rounded-lg p-1">
        <span class="material-symbols-outlined text-[#963131] text-3xl">work</span>
      </div>
      <div>
        <h1 class="text-xl font-bold tracking-tight">TopViec Admin</h1>
        <p class="text-xs text-white/70">Recruitment System</p>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors"
        :active-class="item.to === '/admin' ? '' : '!bg-white/10 !text-white font-medium'"
        exact-active-class="!bg-white/10 !text-white font-medium"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Logout -->
    <div class="p-4 border-t border-white/10">
      <button
        class="flex w-full items-center justify-center gap-2 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
        @click="handleLogout"
      >
        <span class="material-symbols-outlined">logout</span>
        <span>Đăng xuất</span>
      </button>
    </div>

  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const navItems = [
  { to: '/admin',            icon: 'dashboard',            label: 'Dashboard' },
  { to: '/admin/admins',     icon: 'admin_panel_settings', label: 'Quản lý Admin' },
  { to: '/admin/employers',  icon: 'corporate_fare',       label: 'Quản lý Nhà Tuyển Dụng' },
  { to: '/admin/candidates', icon: 'group',                label: 'Quản lý Ứng Viên' },
  { to: '/admin/moderation', icon: 'fact_check',           label: 'Kiểm duyệt Nội dung' },
  { to: '/admin/reports',    icon: 'report',               label: 'Khiếu nại' },
  { to: '/admin/payments',   icon: 'payments',             label: 'Gói dịch vụ & Thanh toán' },
  { to: '/admin/statistics', icon: 'bar_chart',            label: 'Thống kê' },
  { to: '/admin/settings',   icon: 'settings',             label: 'Cài đặt' },
]

async function handleLogout() {
  await authStore.logout()
}
</script>