<template>
  <aside class="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col shrink-0">
    <!-- Logo -->
    <div class="p-6 flex items-center gap-3">
      <div class="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
        <span class="material-symbols-outlined">rocket_launch</span>
      </div>
      <div>
        <h1 class="font-bold text-lg leading-tight">TopViec</h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">Employer Portal</p>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-4 space-y-1">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        active-class="!bg-primary/10 !text-primary font-semibold"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        {{ item.label }}
      </router-link>
    </nav>

    <!-- User info -->
    <div class="p-4 border-t border-slate-200 dark:border-slate-800">
      <div class="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div
          class="size-10 rounded-full bg-cover bg-center bg-slate-200"
          :style="user?.avatarUrl ? `background-image: url('${user.avatarUrl}')` : ''"
        >
          <div v-if="!user?.avatarUrl" class="w-full h-full flex items-center justify-center">
            <span class="material-symbols-outlined text-slate-400">person</span>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold truncate">{{ user?.name || 'Recruiter' }}</p>
          <p class="text-xs text-slate-500 truncate">{{ user?.title || 'HR Manager' }}</p>
        </div>
        <button class="text-slate-400 hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-xl">settings</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const navItems = [
  { to: '/recruiter',           icon: 'dashboard',        label: 'Dashboard' },
  { to: '/recruiter/jobs',      icon: 'work',             label: 'Tin tuyển dụng' },
  { to: '/recruiter/candidates',icon: 'group',            label: 'Ứng viên' },
  { to: '/recruiter/search-cv', icon: 'person_search',    label: 'Tìm CV' },
  { to: '/recruiter/reports',   icon: 'bar_chart',        label: 'Báo cáo' },
  { to: '/recruiter/team',      icon: 'manage_accounts',  label: 'Quản lý nhóm' },
  { to: '/recruiter/company-profile', icon: 'business',     label: 'Thông tin công ty' },
]

// TODO: lấy từ auth store khi có employer profile
const user = {
  name: 'Hồng Nhung',
  title: 'HR Manager',
  avatarUrl: '',
}
</script>