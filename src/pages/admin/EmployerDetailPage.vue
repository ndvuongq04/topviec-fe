<template>
  <div class="space-y-6">

    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm">
      <router-link to="/admin/employers" class="text-slate-500 hover:text-[#963131] transition-colors">
        Quản lý Nhà Tuyển Dụng
      </router-link>
      <span class="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
      <span class="font-medium">Chi tiết NTT</span>
    </nav>

    <!-- Profile header -->
    <EmployerProfileHeader
      :employer="employer"
      @reset-password="onResetPassword"
      @send-warning="onSendWarning"
      @block="onBlock"
    />

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="stat in summaryStats"
        :key="stat.label"
        class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4"
      >
        <div class="p-3 rounded-lg" :class="stat.iconBg">
          <span class="material-symbols-outlined" :class="stat.iconColor">{{ stat.icon }}</span>
        </div>
        <div>
          <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">{{ stat.label }}</p>
          <p class="text-xl font-bold">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-slate-200 dark:border-slate-800">
      <div class="flex gap-8 px-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="py-4 text-sm font-bold relative transition-colors"
          :class="activeTab === tab.key
            ? 'text-[#963131] border-b-2 border-[#963131]'
            : 'text-slate-500 hover:text-[#963131]'"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Tab content -->
    <EmployerLicenseTab v-if="activeTab === 'license'" :employer="employer" />
    <div v-else-if="activeTab === 'profile'" class="text-slate-400 text-sm py-8 text-center">
      <!-- TODO: Hồ sơ công ty tab -->
      Nội dung hồ sơ công ty đang được phát triển.
    </div>
    <div v-else-if="activeTab === 'activity'" class="text-slate-400 text-sm py-8 text-center">
      <!-- TODO: Lịch sử hoạt động tab -->
      Nội dung lịch sử hoạt động đang được phát triển.
    </div>
    <div v-else-if="activeTab === 'payments'" class="text-slate-400 text-sm py-8 text-center">
      <!-- TODO: Lịch sử thanh toán tab -->
      Nội dung lịch sử thanh toán đang được phát triển.
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EmployerProfileHeader from '@/components/admin/employers/EmployerProfileHeader.vue'
import EmployerLicenseTab from '@/components/admin/employers/EmployerLicenseTab.vue'

const activeTab = ref('license')

const tabs = [
  { key: 'profile',  label: 'Hồ sơ công ty' },
  { key: 'license',  label: 'Giấy phép & Xác thực' },
  { key: 'activity', label: 'Lịch sử hoạt động' },
  { key: 'payments', label: 'Lịch sử thanh toán' },
]

// Dữ liệu mẫu — thay bằng API fetch theo route param
const employer = ref({
  id: 'CP001',
  name: 'Google Việt Nam',
  industry: 'Công nghệ phần mềm / Internet Services',
  verified: true,
  website: 'google.com.vn',
  email: 'hr-vn@google.com',
  phone: '028 1234 5678',
  location: 'Quận 1, TP. Hồ Chí Minh',
  logoUrl: '',
  licenseFile: {
    name: 'Giấy phép kinh doanh.pdf',
    size: '2.4 MB',
    uploadedAt: '12/10/2023 14:30',
    format: 'PDF (Digital Scan)',
    assignee: 'Admin_NguyenVanA',
  },
})

const summaryStats = [
  { icon: 'post_add',    label: 'Tin đã đăng',  value: '145',       iconBg: 'bg-blue-50 dark:bg-blue-900/20',           iconColor: 'text-blue-600'   },
  { icon: 'description', label: 'CV đã nhận',   value: '2,482',     iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',     iconColor: 'text-emerald-600'},
  { icon: 'diamond',     label: 'Gói dịch vụ',  value: 'Gói VIP Pro', iconBg: 'bg-[#963131]/10',                         iconColor: 'text-[#963131]'  },
]

function onResetPassword() { console.log('Reset password') }
function onSendWarning()   { console.log('Send warning') }
function onBlock()         { console.log('Block account') }
</script>