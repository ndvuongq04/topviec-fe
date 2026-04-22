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
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
        :class="isActive(item.to)
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
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
        <GlobalDropdown align="left" direction="up" :offset="12">
          <template #trigger="{ toggle, isOpen }">
            <button
              class="text-slate-400 hover:text-primary transition-colors cursor-pointer"
              :class="{ 'text-primary': isOpen }"
              @click.stop="toggle"
            >
              <span class="material-symbols-outlined text-xl">settings</span>
            </button>
          </template>

          <template #default="{ close }">
            <GlobalDropdownItem
              icon="person_outline"
              label="Thông tin cá nhân"
              @click="() => { close(); showProfileModal = true }"
            />

            <GlobalDropdownItem
              icon="lock_open"
              label="Đổi mật khẩu"
              @click="close"
            />
            <div class="h-px bg-slate-100 my-1 mx-2"></div>
            <GlobalDropdownItem
              icon="logout"
              label="Đăng xuất"
              danger
              @click="() => { close(); authStore.logout() }"
            />
          </template>
        </GlobalDropdown>
      </div>
    </div>
  </aside>

  <EmployerProfileModal :visible="showProfileModal" @close="showProfileModal = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GlobalDropdown from '@/components/ui/GlobalDropdown.vue'
import GlobalDropdownItem from '@/components/ui/GlobalDropdownItem.vue'
import { useAuthStore } from '@/stores/auth.store'
import EmployerProfileModal from '@/components/recruiter/profile/EmployerProfileModal.vue'

const route = useRoute()
const authStore = useAuthStore()
const showProfileModal = ref(false)

// Routes nằm dưới /recruiter/jobs/* nhưng thuộc nhóm Phỏng vấn
const interviewJobRouteNames = new Set(['recruiter-job-interview-setup'])

function isActive(to: string): boolean {
  if (to === '/recruiter') return route.path === '/recruiter'

  if (to === '/recruiter/interviews') {
    return route.path.startsWith('/recruiter/interviews') ||
      interviewJobRouteNames.has(String(route.name))
  }

  if (to === '/recruiter/jobs') {
    return route.path.startsWith('/recruiter/jobs') &&
      !interviewJobRouteNames.has(String(route.name))
  }

  return route.path.startsWith(to)
}

const navItems = [
  { to: '/recruiter',           icon: 'dashboard',        label: 'Dashboard' },
  { to: '/recruiter/jobs',      icon: 'work',             label: 'Tin tuyển dụng' },
  // { to: '/recruiter/candidates',icon: 'group',            label: 'Ứng viên' },
  { to: '/recruiter/interviews', icon: 'event',    label: 'Phỏng vấn' },
  // { to: '/recruiter/offers',     icon: 'handshake', label: 'Mời làm việc' },
  // { to: '/recruiter/search-cv', icon: 'person_search',    label: 'Tìm CV' },
  // { to: '/recruiter/reports',   icon: 'bar_chart',        label: 'Báo cáo' },
  { to: '/recruiter/team',      icon: 'manage_accounts',  label: 'Quản lý nhóm' },
  { to: '/recruiter/company-profile', icon: 'business',     label: 'Thông tin công ty' },
  { to: '/recruiter/messages',  icon: 'chat',             label: 'Tin nhắn' },
  { to: '/recruiter/services',  icon: 'diamond',          label: 'Dịch vụ' },
  { to: '/recruiter/billing',   icon: 'receipt_long',     label: 'Lịch sử đơn hàng' },
]

// TODO: lấy từ auth store khi có employer profile
const user = {
  name: 'Hồng Nhung',
  title: 'HR Manager',
  avatarUrl: '',
}
</script>