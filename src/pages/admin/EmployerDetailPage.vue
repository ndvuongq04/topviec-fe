<template>
  <div class="space-y-6">
    <nav class="flex items-center gap-2 text-sm">
      <router-link
        :to="{ name: 'admin-employers' }"
        class="text-slate-500 transition-colors hover:text-[#963131]"
      >
        Quản lý Nhà Tuyển Dụng
      </router-link>
      <span class="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
      <span class="font-medium text-slate-900 dark:text-slate-100">Chi tiết NTD</span>
    </nav>

    <EmployerProfileHeader
      v-if="store.selectedCompany"
      :company="store.selectedCompany"
      @reset-password="onResetPassword"
      @warn="onWarn"
      @suspend="onSuspend"
    />

    <EmployerStatsCards :stats="stats" />

    <EmployerDetailTabs
      v-model:active-tab="activeTab"
      :tabs="tabs"
    />

    <EmployerProfileTab
      v-if="activeTab === 'profile' && store.selectedCompany"
      :company="store.selectedCompany"
    />

    <EmployerLicensePanel
      v-else-if="activeTab === 'license' && store.selectedCompany"
      :company="store.selectedCompany"
      @approve="onApprove"
      @reject="onReject"
      @request-supplement="onRequestSupplement"
    />

    <EmployerViolationScorePanel
      v-else-if="activeTab === 'violation'"
      :employer-id="employerId"
    />

    <div
      v-else-if="!store.selectedCompany"
      class="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900"
    >
      <p class="text-sm">Đang tải dữ liệu...</p>
    </div>

    <div
      v-else
      class="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900"
    >
      <span class="material-symbols-outlined mb-2 block text-4xl">construction</span>
      <p class="text-sm">
        Nội dung tab "{{ tabs.find((t) => t.key === activeTab)?.label }}" đang được phát triển...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EmployerDetailTabs from '@/components/admin/employers/EmployerDetailTabs.vue'
import EmployerLicensePanel from '@/components/admin/employers/EmployerLicensePanel.vue'
import EmployerProfileHeader from '@/components/admin/employers/EmployerProfileHeader.vue'
import EmployerProfileTab from '@/components/admin/employers/EmployerProfileTab.vue'
import EmployerStatsCards from '@/components/admin/employers/EmployerStatsCards.vue'
import EmployerViolationScorePanel from '@/components/admin/employers/EmployerViolationScorePanel.vue'
import { useToast } from '@/composables/useToast'
import { useAdminCompanyStore } from '@/stores/adminCompany.store'
import type { StatItem } from '@/components/admin/employers/EmployerStatsCards.vue'

const route = useRoute()
const router = useRouter()
const store = useAdminCompanyStore()
const toast = useToast()

const companyId = Number(route.params.id)
const employerId = computed(() => store.selectedCompany?.createdBy ?? null)

onMounted(async () => {
  if (!companyId) return
  await store.fetchById(companyId)
  if (store.error) {
    toast.error('Lỗi', 'Không tìm thấy công ty này.')
    router.push({ name: 'admin-employers' })
  }
})

const stats: StatItem[] = [
  {
    label: 'Tin đã đăng',
    value: 145,
    icon: 'post_add',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600',
  },
  {
    label: 'CV đã nhận',
    value: '2,482',
    icon: 'description',
    iconBg: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-600',
  },
  {
    label: 'Gói dịch vụ',
    value: 'Gói VIP Pro',
    icon: 'diamond',
    iconBg: 'bg-[#963131]/10',
    iconColor: 'text-[#963131]',
  },
]

const activeTab = ref('profile')
const tabs = [
  { key: 'profile', label: 'Hồ sơ công ty' },
  { key: 'license', label: 'Giấy phép & Xác thực' },
  { key: 'violation', label: 'Điểm vi phạm' },
  { key: 'activity', label: 'Lịch sử hoạt động' },
  { key: 'payment', label: 'Lịch sử thanh toán' },
]

function onResetPassword() {
  toast.info('Tính năng', 'Reset mật khẩu đang được phát triển.')
}

function onWarn() {
  toast.info('Tính năng', 'Gửi cảnh báo đang được phát triển.')
}

async function onSuspend() {
  if (!store.selectedCompany) return
  try {
    if (store.selectedCompany.status === 'suspended') {
      await store.unsuspendCompany(store.selectedCompany.id)
      toast.success('Thành công', 'Đã mở khóa công ty.')
    } else {
      await store.suspendCompany(store.selectedCompany.id, 'Admin khóa tài khoản')
      toast.success('Thành công', 'Đã khóa công ty.')
    }
  } catch {
    toast.error('Thất bại', store.error || 'Có lỗi xảy ra.')
  }
}

async function onApprove() {
  if (!store.selectedCompany) return
  try {
    await store.verifyCompany(store.selectedCompany.id, true)
    toast.success('Thành công', 'Công ty đã được xác thực.')
  } catch {
    toast.error('Thất bại', store.error || 'Không thể phê duyệt.')
  }
}

async function onReject(reason: string) {
  if (!store.selectedCompany) return
  if (!reason.trim()) {
    toast.warning('Chú ý', 'Vui lòng nhập lý do từ chối.')
    return
  }

  try {
    await store.verifyCompany(store.selectedCompany.id, false, reason)
    toast.success('Thành công', 'Đã từ chối xác thực công ty.')
  } catch {
    toast.error('Thất bại', store.error || 'Không thể từ chối.')
  }
}

function onRequestSupplement() {
  toast.info('Tính năng', 'Yêu cầu bổ sung hồ sơ đang được phát triển.')
}
</script>
